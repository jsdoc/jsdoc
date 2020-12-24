const _ = require('lodash');
const { DepGraph } = require('dependency-graph');
const Emittery = require('emittery');
const {default: ow} = require('ow');
const Queue = require('p-queue').default;
const v = require('./validators');

// Work around an annoying typo in a method name.
DepGraph.prototype.dependentsOf = DepGraph.prototype.dependantsOf;

module.exports = class TaskRunner extends Emittery {
    constructor(context) {
        super();

        ow(context, ow.optional.object);

        this._init(context);
    }

    _addOrRemoveTasks(tasks, func, action) {
        func = _.bind(func, this);

        if (Array.isArray(tasks)) {
            tasks.forEach((task, i) => {
                try {
                    func(task);
                } catch (e) {
                    e.message = `Can't ${action} task ${i}: ${e.message}`;
                    throw e;
                }
            });
        } else if (tasks !== null && typeof tasks === 'object') {
            for (const task of Object.keys(tasks)) {
                try {
                    func(tasks[task]);
                } catch (e) {
                    e.message = `Can't ${action} task "${task}": ${e.message}`;
                    throw e;
                }
            }
        }
    }

    _addTaskEmitters(task) {
        const u = {};

        u.start = task.on('start', t => this.emit('taskStart', t));
        u.end = task.on('end', t => this.emit('taskEnd', t));
        u.error = task.on('error', (e => {
            this.emit('taskError', {
                task: e.task,
                error: e.error
            });

            if (!this._error) {
                this._error = e.error;
            }
        }));

        this._unsubscribers.set(task.name, u);
    }

    _bindTaskFunc(task) {
        return _.bind(task.run, task, this._context);
    }

    _createTaskSequence(tasks) {
        if (!tasks.length) {
            return null;
        }

        return () => tasks.reduce((p, taskName) => {
            const task = this._nameToTask.get(taskName);

            return p.then(
                this._bindTaskFunc(task),
                e => Promise.reject(e)
            );
        }, Promise.resolve());
    }

    _init(context) {
        this._context = context;
        this._deps = new Map();
        this._error = null;
        this._queue = new Queue();
        this._taskToName = new WeakMap();
        this._nameToTask = new Map();
        this._running = false;
        this._unsubscribers = new Map();

        this._queue.pause();
    }

    _newDependencyCycleError(cyclePath) {
        return new v.DependencyCycleError(
            `Tasks have circular dependencies: ${cyclePath.join(' > ')}`,
            cyclePath
        );
    }

    _newStateError() {
        return new v.StateError('The task runner is already running.');
    }

    _newUnknownDepsError(dependent, unknownDeps) {
        let errorText;

        if (unknownDeps.length === 1) {
            errorText = 'an unknown task';
        } else {
            errorText = 'unknown tasks';
        }

        return new v.UnknownDependencyError(`The task ${dependent} depends on ${errorText}: ` +
            `${unknownDeps.join(', ')}`);
    }

    _orderTasks() {
        let error;
        const graph = new DepGraph();
        let parallel;
        let sequential;

        for (const [task] of this._nameToTask) {
            graph.addNode(task);
        }

        for (const [dependent] of this._deps) {
            const unknownDeps = [];

            for (const dependency of this._deps.get(dependent)) {
                if (!this._nameToTask.has(dependency)) {
                    unknownDeps.push(dependency);
                } else {
                    graph.addDependency(dependent, dependency);
                }

                if (unknownDeps.length) {
                    error = this._newUnknownDepsError(dependency, unknownDeps);
                    break;
                }
            }
        }

        if (!error) {
            try {
                // Get standalone tasks with no dependencies and no dependents.
                parallel = graph.overallOrder(true)
                    .filter(task => !(graph.dependentsOf(task).length));
                // Get tasks with dependencies, in a correctly ordered list.
                sequential = graph.overallOrder().filter(task => !parallel.includes(task));
            } catch (e) {
                error = this._newDependencyCycleError(e.cyclePath);
            }
        }

        return {
            error,
            parallel,
            sequential
        };
    }

    _rejectIfRunning() {
        if (this.running) {
            return Promise.reject(this._newStateError());
        }

        return null;
    }

    _throwIfRunning() {
        if (this.running) {
            throw this._newStateError();
        }
    }

    _throwIfUnknownDeps(dependent, unknownDeps) {
        if (!unknownDeps.length) {
            return;
        }

        throw this._newUnknownDepsError(dependent, unknownDeps);
    }

    addTask(task) {
        ow(task, v.checkTaskOrString);

        this._throwIfRunning();

        this._nameToTask.set(task.name, task);
        if (task.dependsOn) {
            this._deps.set(task.name, task.dependsOn);
        }
        this._taskToName.set(task, task.name);
        this._addTaskEmitters(task);

        return this;
    }

    addTasks(tasks) {
        ow(tasks, ow.any(ow.array, ow.object));
        this._addOrRemoveTasks(tasks, this.addTask, 'add');

        return this;
    }

    end() {
        this.emit('end', {
            error: this._error
        });
        this._queue.clear();
        this._init();
    }

    removeTask(task) {
        let unsubscribers;

        ow(task, v.checkTaskOrString);
        this._throwIfRunning();

        if (typeof task === 'string') {
            task = this._nameToTask.get(task);

            if (!task) {
                throw new v.UnknownTaskError(`Unknown task: ${task}`);
            }
        } else if (typeof task === 'object') {
            if (!this._taskToName.has(task)) {
                throw new v.UnknownTaskError(`Unknown task: ${task}`);
            }
        }

        this._nameToTask.delete(task.name);
        this._taskToName.delete(task);
        this._deps.delete(task.name);

        unsubscribers = this._unsubscribers.get(task.name);
        for (const u of Object.keys(unsubscribers)) {
            unsubscribers[u]();
        }
        this._unsubscribers.delete(task.name);

        return this;
    }

    removeTasks(tasks) {
        ow(tasks, ow.any(ow.array, ow.object));
        this._addOrRemoveTasks(tasks, this.removeTask, 'remove');

        return this;
    }

    run(context) {
        ow(context, ow.optional.object);

        let endPromise;
        const { error, parallel, sequential } = this._orderTasks();
        let runningPromise;
        let taskFuncs = [];
        let taskSequence;

        // First, fail if the runner is already running.
        runningPromise = this._rejectIfRunning();
        if (runningPromise) {
            return runningPromise;
        }

        // Then fail if the tasks couldn't be ordered.
        if (error) {
            return Promise.reject(error);
        }

        this._context = context || this._context;

        for (const taskName of parallel) {
            taskFuncs.push(this._bindTaskFunc(this._nameToTask.get(taskName)));
        }

        taskSequence = this._createTaskSequence(sequential);
        if (taskSequence) {
            taskFuncs.push(taskSequence);
        }

        endPromise = this._queue.addAll(taskFuncs).then(() => {
            this.end();

            if (this._error) {
                return Promise.reject(this._error);
            } else {
                return Promise.resolve();
            }
        }, e => {
            this.end();

            return Promise.reject(e);
        });

        this.emit('start');
        this._running = true;
        try {
            this._queue.start();

            return endPromise;
        } catch (e) {
            this._error = e;
            this.end();

            return Promise.reject(e);
        }
    }

    get running() {
        return this._running;
    }

    get tasks() {
        const entries = [];

        for (const entry of this._nameToTask.entries()) {
            entries.push(entry);
        }

        return _.fromPairs(entries);
    }
};

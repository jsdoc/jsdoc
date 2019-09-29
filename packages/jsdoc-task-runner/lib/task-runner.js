const _ = require('lodash');
const { DepGraph } = require('dependency-graph');
const Emittery = require('emittery');
const ow = require('ow');
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

    _addTaskSequenceToQueue(tasks) {
        let firstTask;
        let promise;

        if (!tasks.length) {
            return;
        }

        firstTask = this._nameToTask.get(tasks[0]);
        // We don't want to run the first task yet, so we wrap it in another promise.
        promise = new Promise((resolve, reject) => {
            this._bindTaskFunc(firstTask)().then(resolve, reject);
        });

        promise = tasks.reduce((p, _taskName, i) => {
            const nextTask = this._nameToTask.get(tasks[i + 1]);

            if (!nextTask) {
                return p;
            } else {
                return p.then(this._bindTaskFunc(nextTask));
            }
        }, promise);

        this._queue.add(() => promise);
    }

    _addTaskToQueue(task) {
        this._queue.add(this._bindTaskFunc(task));
    }

    _bindTaskFunc(task) {
        return _.bind(task.run, task, this.context);
    }

    _init(context) {
        this._deps = new Map();
        this._error = null;
        this._queue = new Queue();
        this._taskToName = new WeakMap();
        this._nameToTask = new Map();
        this._running = false;
        this._unsubscribers = new Map();

        this.context = context || {};
    }

    _newCyclicalDependencyError(cyclePath) {
        return new v.CyclicalDependencyError(
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
                error = this._newCyclicalDependencyError(e.cyclePath);
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

    run() {
        let endPromise;
        let { error, parallel, sequential } = this._orderTasks();
        let runningPromise;

        // First, fail based on the runner's state.
        runningPromise = this._rejectIfRunning();
        if (runningPromise) {
            return runningPromise;
        }

        // Then fail if the tasks couldn't be ordered.
        if (error) {
            return Promise.reject(error);
        }

        this._queue.pause();

        for (const taskName of parallel) {
            this._addTaskToQueue(this._nameToTask.get(taskName));
        }
        this._addTaskSequenceToQueue(sequential);

        endPromise = this._queue.onIdle().then(() => {
            let p;

            if (this._error) {
                p = Promise.reject(this._error);
            } else {
                p = Promise.resolve();
            }
            this.end();

            return p;
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

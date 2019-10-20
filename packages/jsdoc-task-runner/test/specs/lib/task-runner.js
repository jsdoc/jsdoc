const Emittery = require('emittery');
const Task = require('../../../lib/task');
const TaskRunner = require('../../../lib/task-runner');

const ARGUMENT_ERROR = 'ArgumentError';
const DEPENDENCY_CYCLE_ERROR = 'DependencyCycleError';
const STATE_ERROR = 'StateError';
const UNKNOWN_DEPENDENCY_ERROR = 'UnknownDependencyError';
const UNKNOWN_TASK_ERROR = 'UnknownTaskError';

function rethrower(e) {
    return () => {
        throw e;
    };
}

describe('@jsdoc/task-runner/lib/task-runner', () => {
    let badTask;
    let bar;
    let barResult;
    const fakeTask = {
        name: 'foo',
        func: () => Promise.resolve()
    };
    let foo;
    let fooResult;
    let runner;

    beforeEach(() => {
        runner = new TaskRunner({});
        foo = new Task({
            name: 'foo',
            func: () => new Promise(resolve => {
                fooResult = true;
                resolve();
            })
        });
        fooResult = null;
        bar = new Task({
            name: 'bar',
            func: () => new Promise(resolve => {
                barResult = true;
                resolve();
            })
        });
        barResult = null;
        badTask = new Task({
            name: 'badTask',
            func: () => Promise.reject(new Error())
        });
    });

    it('is a function', () => {
        expect(TaskRunner).toBeFunction();
    });

    it('inherits from emittery', () => {
        expect(runner instanceof Emittery).toBeTrue();
    });

    it('has no required parameters', () => {
        function factory() {
            return new TaskRunner();
        }

        expect(factory).not.toThrow();
    });

    it('does not accept a non-object context', () => {
        function factory() {
            return new TaskRunner(7);
        }

        expect(factory).toThrowErrorOfType(ARGUMENT_ERROR);
    });

    describe('addTask', () => {
        it('adds `Task` objects', () => {
            function add() {
                runner.addTask(foo);
            }

            expect(add).not.toThrow();
        });

        it('fails with non-`Task` objects', () => {
            function add() {
                runner.addTask(fakeTask);
            }

            expect(add).toThrowErrorOfType(ARGUMENT_ERROR);
        });

        it('fails if the task runner is already running', () => {
            function addWhileRunning() {
                runner.run();
                runner.addTask(foo);
            }

            expect(addWhileRunning).toThrowErrorOfType(STATE_ERROR);
        });

        // We run the task, rather than just checking the value of `runner.tasks`, to make sure
        // _all_ the internal state was set correctly.
        it('correctly adds the task', async () => {
            runner.addTask(foo);
            await runner.run();

            expect(fooResult).toBeTrue();
        });

        it('causes the task to be emitted when the task starts', async () => {
            let promise;

            runner.addTask(foo);
            promise = runner.once('taskStart');

            foo.run();
            await promise.then(event => {
                expect(event).toBe(foo);
            });
        });

        it('causes the task to be emitted when the task ends', async () => {
            let event;
            let promise;

            runner.addTask(foo);
            promise = runner.once('taskEnd');

            foo.run();
            event = await promise;

            expect(event).toBe(foo);
        });

        it('causes an error to be emitted if the task errors', async () => {
            let error;
            let event;
            let promise;

            runner.addTask(badTask);
            promise = runner.once('taskError');

            try {
                await runner.run();
            } catch (e) {
                error = e;
            }

            event = await promise;

            expect(event).toBeObject();
            expect(rethrower(event.error)).toThrowError();
            expect(event.error).toBe(error);
            expect(event.task).toBe(badTask);
        });
    });

    describe('addTasks', () => {
        it('accepts an object whose values are tasks', () => {
            function addTasks() {
                runner.addTasks({ foo });
            }

            expect(addTasks).not.toThrow();
        });

        it('fails with an object whose values are not tasks', () => {
            function addTasks() {
                runner.addTasks({ foo: fakeTask });
            }

            expect(addTasks).toThrowErrorOfType(ARGUMENT_ERROR);
        });

        it('accepts an array of tasks', () => {
            function addTasks() {
                runner.addTasks([foo]);
            }

            expect(addTasks).not.toThrow();
        });

        it('fails with an array of non-tasks', () => {
            function addTasks() {
                runner.addTasks([fakeTask]);
            }

            expect(addTasks).toThrowErrorOfType(ARGUMENT_ERROR);
        });

        it('fails with non-object, non-array input', () => {
            function addTasks() {
                runner.addTasks(7);
            }

            expect(addTasks).toThrowErrorOfType(ARGUMENT_ERROR);
        });

        it('adds all the tasks in an object', () => {
            let tasks;

            runner.addTasks({
                foo,
                bar
            });
            tasks = runner.tasks;

            expect(tasks.foo).toBe(foo);
            expect(tasks.bar).toBe(bar);
        });

        it('adds all the tasks in an array', () => {
            let tasks;

            runner.addTasks([
                foo,
                bar
            ]);
            tasks = runner.tasks;

            expect(tasks.foo).toBe(foo);
            expect(tasks.bar).toBe(bar);
        });

        it('returns `this`', () => {
            const result = runner.addTasks({
                foo,
                bar
            });

            expect(result).toBe(runner);
        });
    });

    describe('end', () => {
        it('stops the task runner', () => {
            function addAfterEnding() {
                runner.addTask(foo);
                runner.run();
                runner.end();
                runner.addTask(bar);
            }

            expect(addAfterEnding).not.toThrow();
        });

        it('resets the tasks', async () => {
            runner.addTask(foo);
            runner.run();
            await runner.end();

            expect(runner.tasks).toBeEmptyObject();
        });
    });

    describe('removeTask', () => {
        it('removes `Task` objects', () => {
            runner.addTask(foo);
            runner.removeTask(foo);

            expect(runner.tasks.foo).toBeUndefined();
        });

        it('removes tasks by name', () => {
            runner.addTask(foo);
            runner.removeTask('foo');

            expect(runner.tasks.foo).toBeUndefined();
        });

        it('fails on invalid input types', () => {
            function addRemove() {
                runner.addTask(foo);
                runner.removeTask(7);
            }

            expect(addRemove).toThrowErrorOfType(ARGUMENT_ERROR);
        });

        it('fails on unknown tasks', () => {
            function addRemove() {
                runner.addTask(foo);
                runner.removeTask(bar);
            }

            expect(addRemove).toThrowErrorOfType(UNKNOWN_TASK_ERROR);
        });

        it('fails if the task runner is already running', () => {
            function removeWhileRunning() {
                runner.addTasks([foo, bar]);
                runner.run();
                runner.removeTask(foo);
            }

            expect(removeWhileRunning).toThrowErrorOfType(STATE_ERROR);
        });

        it('correctly removes the task', async () => {
            let error;

            runner.addTasks([foo, bar]);
            runner.removeTask(foo);

            try {
                await runner.run();
            } catch (e) {
                error = e;
            }

            expect(error).toBeUndefined();
            expect(fooResult).toBeNull();
            expect(barResult).toBeTrue();
        });

        it('prevents `taskStart`/`taskEnd` events for the task', async () => {
            let startEvent;
            let endEvent;

            runner.on('taskStart', e => {
                startEvent = e;
            });
            runner.on('taskEnd', e => {
                endEvent = e;
            });
            runner.addTask(foo);
            runner.removeTask(foo);
            await foo.run();

            expect(startEvent).toBeUndefined();
            expect(endEvent).toBeUndefined();
        });

        it('prevents `taskError` events for the task', async () => {
            let errorEvent;
            let taskErrorEvent;

            runner.addTask(badTask);
            runner.removeTask(badTask);

            badTask.on('error', e => {
                errorEvent = e;
            });
            runner.on('taskError', e => {
                taskErrorEvent = e;
            });

            try {
                await badTask.run();
            } catch (e) {
                // Expected behavior.
            }

            expect(errorEvent).toBeObject();
            expect(errorEvent.task).toBe(badTask);
            expect(taskErrorEvent).toBeUndefined();
        });

        it('returns `this`', () => {
            let result;

            runner.addTask(foo);
            result = runner.removeTask(foo);

            expect(result).toBe(runner);
        });
    });

    describe('removeTasks', () => {
        it('accepts an object whose values are tasks', () => {
            function removeTasks() {
                runner.removeTasks({ foo });
            }

            runner.addTask(foo);

            expect(removeTasks).not.toThrow();
        });

        it('fails with an object whose values are not tasks', () => {
            function removeTasks() {
                runner.removeTasks({ foo: 7 });
            }

            runner.addTask(foo);

            expect(removeTasks).toThrowErrorOfType(ARGUMENT_ERROR);
        });

        it('accepts an array of tasks', () => {
            function removeTasks() {
                runner.removeTasks([foo]);
            }

            runner.addTask(foo);

            expect(removeTasks).not.toThrow();
        });

        it('accepts an array of strings', () => {
            function removeTasks() {
                runner.removeTasks(['foo']);
            }

            runner.addTask(foo);

            expect(removeTasks).not.toThrow();
        });

        it('fails with an array whose values are not tasks or strings', () => {
            function removeTasks() {
                runner.removeTasks([fakeTask]);
            }

            expect(removeTasks).toThrowErrorOfType(ARGUMENT_ERROR);
        });

        it('fails with non-object, non-array input', () => {
            function removeTasks() {
                runner.removeTasks(7);
            }

            expect(removeTasks).toThrowErrorOfType(ARGUMENT_ERROR);
        });

        it('fails with unknown tasks', () => {
            function removeTasks() {
                runner.removeTasks([bar]);
            }

            expect(removeTasks).toThrowErrorOfType(UNKNOWN_TASK_ERROR);
        });

        it('removes all the tasks in an object', () => {
            const tasks = {
                foo,
                bar
            };

            runner.addTasks(tasks);
            runner.removeTasks(tasks);

            expect(runner.tasks).toBeEmptyObject();
        });

        it('removes all the tasks in an array', () => {
            const tasks = [
                foo,
                bar
            ];

            runner.addTasks(tasks);
            runner.removeTasks(tasks);

            expect(runner.tasks).toBeEmptyObject();
        });

        it('returns `this`', () => {
            runner.addTask(foo);

            expect(runner.removeTask(foo)).toBe(runner);
        });
    });

    describe('run', () => {
        let a;
        let b;
        let c;
        let taskA;
        let taskB;
        let taskC;

        beforeEach(() => {
            a = null;
            b = null;
            c = null;

            taskA = new Task({
                name: 'a',
                func: () => {
                    a = 5;

                    return Promise.resolve();
                }
            });
            taskB = new Task({
                name: 'b',
                func: () => {
                    b = a * 3;

                    return Promise.resolve();
                },
                dependsOn: ['a']
            });
            taskC = new Task({
                name: 'c',
                func: () => {
                    c = a + b;

                    return Promise.resolve();
                },
                dependsOn: ['b']
            });
        });

        it('runs every task', async () => {
            runner.addTasks([taskA, taskB, taskC]);
            await runner.run();

            expect(a).toBe(5);
            expect(b).toBe(15);
            expect(c).toBe(20);
        });

        it('runs tasks with dependencies in the correct order', async () => {
            const results = [];

            taskA.on('end', () => {
                results.push(a);
            });
            taskB.on('end', () => {
                results.push(b);
            });
            taskC.on('end', () => {
                results.push(c);
            });

            runner.addTasks([taskA, taskB, taskC]);
            await runner.run();

            expect(results).toEqual([5, 15, 20]);
        });

        it('fails if the task runner is already running', async () => {
            let error;

            runner.addTask(taskA);
            runner.run();

            try {
                await runner.run();
            } catch (e) {
                error = e;
            }

            expect(rethrower(error)).toThrowErrorOfType(STATE_ERROR);
        });

        it('clears all of its state after it runs', async () => {
            runner.addTask(taskA);
            await runner.run();

            expect(runner.tasks).toBeEmptyObject();
        });

        it('fails if a task errors', async () => {
            let error;

            runner.addTask(badTask);
            try {
                await runner.run();
            } catch (e) {
                error = e;
            }

            expect(rethrower(error)).toThrowError();
        });

        describe('context', () => {
            it('prefers the context passed to `run()`', async () => {
                const context = {};
                const t = new TaskRunner({});

                t.addTask(new Task({
                    name: 'foo',
                    func: ctx => {
                        ctx.foo = 'foo';

                        return Promise.resolve();
                    }
                }));
                await t.run(context);

                expect(context.foo).toBe('foo');
            });

            it('falls back on the context passed to the constructor', async () => {
                const context = {};
                const t = new TaskRunner(context);

                t.addTask(new Task({
                    name: 'foo',
                    func: ctx => {
                        ctx.foo = 'foo';

                        return Promise.resolve();
                    }
                }));
                await t.run();

                expect(context.foo).toBe('foo');
            });

            it('fails if the context is not an object', async () => {
                let error;

                try {
                    await new TaskRunner().run(7);
                } catch (e) {
                    error = e;
                }

                expect(error).toBeErrorOfType(ARGUMENT_ERROR);
            });

            it('passes the context to tasks with no dependencies', async () => {
                const context = {};
                const r = new TaskRunner(context);

                r.addTask(new Task({
                    name: 'usesContext',
                    func: ctx => {
                        ctx.foo = 'bar';

                        return Promise.resolve();
                    }
                }));

                await r.run();
                expect(context.foo).toBe('bar');
            });

            it('passes the context to tasks with dependencies', async () => {
                const context = {};
                const r = new TaskRunner(context);

                r.addTasks([
                    new Task({
                        name: 'one',
                        func: ctx => {
                            ctx.foo = 'bar';

                            return Promise.resolve();
                        }
                    }),
                    new Task({
                        name: 'two',
                        func: ctx => {
                            ctx.bar = ctx.foo + ' baz';

                            return Promise.resolve();
                        },
                        dependsOn: ['one']
                    })
                ]);

                await r.run();
                expect(context.bar).toBe('bar baz');
            });
        });

        describe('dependencies', () => {
            it('errors if a task depends on an unknown task', async () => {
                let error;

                runner.addTask(new Task({
                    name: 'badDependsOn',
                    func: () => Promise.resolve(),
                    dependsOn: ['mysteryTask']
                }));

                try {
                    await runner.run();
                } catch (e) {
                    error = e;
                }

                expect(rethrower(error)).toThrowErrorOfType(UNKNOWN_DEPENDENCY_ERROR);
            });

            it('errors if there are circular dependencies', async () => {
                let error;

                runner.addTasks([
                    new Task({
                        name: 'one',
                        func: () => Promise.resolve(),
                        dependsOn: ['two']
                    }),
                    new Task({
                        name: 'two',
                        func: () => Promise.resolve(),
                        dependsOn: ['one']
                    })
                ]);

                try {
                    await runner.run();
                } catch (e) {
                    error = e;
                }

                expect(rethrower(error)).toThrowErrorOfType(DEPENDENCY_CYCLE_ERROR);
            });
        });

        describe('events', () => {
            it('emits a `start` event', async () => {
                let emitted;

                runner.addTask(foo);
                runner.on('start', () => {
                    emitted = true;
                });
                await runner.run();

                expect(emitted).toBeTrue();
            });

            it('emits an `end` event', async () => {
                let emitted;

                runner.addTask(foo);
                runner.on('end', e => {
                    emitted = e;
                });
                await runner.run();

                expect(emitted).toBeObject();
                expect(emitted.error).toBeNull();
            });

            it('fails and emits an error in the `end` event if necessary', async () => {
                let endError;
                let error;

                runner.addTask(badTask);
                runner.on('end', e => {
                    endError = e.error;
                });

                try {
                    await runner.run();
                } catch (e) {
                    error = e;
                }

                expect(rethrower(endError)).toThrowError();
                expect(endError).toBe(error);
            });
        });
    });

    describe('running', () => {
        it('is true when the task runner is running', async () => {
            let running;

            runner.addTask(new Task({
                name: 'checkRunning',
                func: () => {
                    running = runner.running;

                    return Promise.resolve();
                }
            }));
            await runner.run();

            expect(running).toBeTrue();
        });

        it('is false when the task runner has not started', () => {
            runner.addTask(foo);

            expect(runner.running).toBeFalse();
        });

        it('is false after the task runner has finished', async () => {
            runner.addTask(foo);
            await runner.run();

            expect(runner.running).toBeFalse();
        });
    });

    describe('tasks', () => {
        it('is an object in which keys are task names and values are tasks', () => {
            let tasks;

            runner.addTask(foo);
            tasks = runner.tasks;

            expect(tasks).toBeObject();
            expect(tasks.foo).toBe(foo);
        });

        it('is an empty object if no tasks have been added', () => {
            expect(runner.tasks).toBeEmptyObject();
        });
    });
});

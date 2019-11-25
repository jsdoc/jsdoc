const Emittery = require('emittery');
const Task = require('../../../lib/task');

const ARGUMENT_ERROR = 'ArgumentError';

describe('@jsdoc/task-runner/lib/task', () => {
    it('is a function', () => {
        expect(Task).toBeFunction();
    });

    it('inherits from emittery', () => {
        expect(new Task() instanceof Emittery).toBeTrue();
    });

    it('can be constructed with no arguments', () => {
        function factory() {
            return new Task();
        }

        expect(factory).not.toThrow();
    });

    it('uses the provided name', () => {
        const task = new Task({ name: 'foo' });

        expect(task.name).toBe('foo');
    });

    it('uses the provided function', () => {
        const func = () => Promise.resolve();
        const task = new Task({ func });

        expect(task.func).toBe(func);
    });

    describe('dependsOn', () => {
        it('accepts an array of task names as dependencies', () => {
            const dependsOn = ['bar', 'baz'];
            const task = new Task({
                name: 'foo',
                func: () => Promise.resolve(),
                dependsOn
            });

            expect(task.dependsOn).toEqual(dependsOn);
        });

        it('accepts a single task name as a dependency', () => {
            const task = new Task({
                name: 'foo',
                func: () => Promise.resolve(),
                dependsOn: 'bar'
            });

            expect(task.dependsOn).toEqual(['bar']);
        });

        it('fails with non-string, non-array dependencies', () => {
            function factory() {
                return new Task({
                    name: 'foo',
                    func: () => Promise.resolve(),
                    dependsOn: 7
                });
            }

            expect(factory).toThrowErrorOfType(ARGUMENT_ERROR);
        });

        it('fails with non-string arrays of dependencies', () => {
            function factory() {
                return new Task({
                    name: 'foo',
                    func: () => Promise.resolve(),
                    dependsOn: [7]
                });
            }

            expect(factory).toThrowErrorOfType(ARGUMENT_ERROR);
        });
    });

    it('uses the provided dependencies', () => {
        const dependsOn = ['foo', 'bar'];
        const task = new Task({ dependsOn });

        expect(task.dependsOn).toEqual(dependsOn);
    });

    describe('run', () => {
        it('requires a name', async () => {
            let error;

            async function start() {
                const task = new Task({
                    func: () => Promise.resolve()
                });

                await task.run();
            }

            try {
                await start();
            } catch (e) {
                error = e;
            }

            expect(error).toBeDefined();
        });

        it('requires a function', async () => {
            let error;

            async function run() {
                const task = new Task({
                    name: 'foo'
                });

                await task.run();
            }

            try {
                await run();
            } catch (e) {
                error = e;
            }

            expect(error).toBeDefined();
        });

        it('accepts a context object', async () => {
            const context = {};
            const task = new Task({
                name: 'foo',
                func: c => {
                    c.foo = 'bar';

                    return Promise.resolve();
                }
            });

            await task.run(context);

            expect(context.foo).toBe('bar');
        });

        describe('events', () => {
            it('emits a `start` event', async () => {
                let event;
                const task = new Task({
                    name: 'foo',
                    func: () => Promise.resolve()
                });

                task.on('start', e => {
                    event = e;
                });

                await task.run();

                expect(event).toBe(task);
            });

            it('emits an `end` event', async () => {
                let event;
                const task = new Task({
                    name: 'foo',
                    func: () => Promise.resolve()
                });

                task.on('end', e => {
                    event = e;
                });

                await task.run();

                expect(event).toBe(task);
            });

            it('emits an `error` event if necessary', async () => {
                let error = new Error('oh no!');
                let event;
                const task = new Task({
                    name: 'foo',
                    func: () => Promise.reject(error)
                });

                task.on('error', e => {
                    event = e;
                });

                try {
                    await task.run();
                } catch (e) {
                    // Expected behavior.
                }


                expect(event.error).toBe(error);
                expect(event.task).toBe(task);
            });
        });
    });
});

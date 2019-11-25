const taskRunner = require('../../index');

describe('@jsdoc/task-runner', () => {
    it('is an object', () => {
        expect(taskRunner).toBeObject();
    });

    describe('Task', () => {
        it('is lib/task', () => {
            const Task = require('../../lib/task');

            expect(taskRunner.Task).toBe(Task);
        });
    });

    describe('TaskRunner', () => {
        it('is lib/task-runner', () => {
            const TaskRunner = require('../../lib/task-runner');

            expect(taskRunner.TaskRunner).toBe(TaskRunner);
        });
    });
});

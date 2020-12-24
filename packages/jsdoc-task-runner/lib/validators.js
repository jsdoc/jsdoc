const {default: ow} = require('ow');
const Task = require('./task');

function checkTask(t) {
    return {
        validator: t instanceof Task,
        message: `Expected ${t} to be a Task object`
    };
}

module.exports = {
    checkTaskOrString: ow.any(ow.object.validate(checkTask), ow.string),
    DependencyCycleError: class DependencyCycleError extends Error {
        constructor(message, cyclePath) {
            ow(message, ow.string);
            ow(cyclePath, ow.array.ofType(ow.string));
            super(message);

            this.cyclePath = cyclePath;
            this.name = 'DependencyCycleError';
        }
    },
    StateError: class StateError extends Error {
        constructor(message) {
            ow(message, ow.string);
            super(message);

            this.name = 'StateError';
        }
    },
    UnknownDependencyError: class UnknownDependencyError extends Error {
        constructor(message) {
            ow(message, ow.string);
            super(message);

            this.name = 'UnknownDependencyError';
        }
    },
    UnknownTaskError: class UnknownTaskError extends Error {
        constructor(message) {
            ow(message, ow.string);
            super(message);

            this.name = 'UnknownTaskError';
        }
    }
};

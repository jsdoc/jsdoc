const { addMatchers } = require('add-matchers');

require('jasmine-expect');

addMatchers({
    toBeError(value) {
        return value instanceof Error;
    },
    toBeErrorOfType(other, value) {
        return value instanceof Error && value.name === other;
    }
});

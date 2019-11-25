const { addMatchers } = require('add-matchers');

require('jasmine-expect');

addMatchers({
    toBeError(value) {
        return value instanceof Error;
    },
    toBeErrorOfType(other, value) {
        return value instanceof Error && value.name === other;
    },
    toBeInstanceOf(other, value) {
        let otherName;
        let valueName;

        if (typeof value !== 'object') {
            throw new TypeError(`Expected object value, got ${typeof value}`);
        }

        valueName = value.constructor.name;

        // Class name.
        if (typeof other === 'string') {
            otherName = other;
        // Class constructor.
        } else if (typeof other === 'function') {
            otherName = other.name;
        } else {
            otherName = other.constructor.name;
        }

        return valueName === otherName;
    }
});

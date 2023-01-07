const _ = require('lodash');
const { addMatchers } = require('add-matchers');
const diffableHtml = require('diffable-html');

// Adds matchers from https://github.com/JamieMason/Jasmine-Matchers.
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

    if (typeof other === 'string') {
      // Class name.
      otherName = other;
    } else if (typeof other === 'function') {
      // Class constructor.
      otherName = other.name;
    } else {
      otherName = other.constructor.name;
    }

    return valueName === otherName;
  },
  toHaveOwnProperty(other, value) {
    return Object.hasOwn(value, other);
  },
  // The objects in `value` must have all of the keys and values from the corresponding objects in
  // `other`. The object in `value` can have additional properties as well. For example, if
  // `other[0]` is `{ a: 1 }`, and `value[0]` is `{ a: 1, b: 2 }`, then the objects match.
  toMatchArrayOfObjects(other, value) {
    let isMatch = true;

    if (!Array.isArray(value)) {
      throw new TypeError(`Expected array value, got ${typeof value}`);
    }
    if (!Array.isArray(other)) {
      throw new TypeError(`Expected array value as expected value, got ${typeof other}`);
    }

    if (other.length !== value.length) {
      isMatch = false;
    } else {
      for (let i = 0, l = value.length; i < l; i++) {
        if (!_.isMatch(value[i], other[i])) {
          isMatch = false;
          break;
        }
      }
    }

    return isMatch;
  },
  toMatchHtml(other, value) {
    const otherDiffable = diffableHtml(other);
    const valueDiffable = diffableHtml(value);

    return otherDiffable.includes(valueDiffable);
  },
  // The `value` object must have all of the keys and values from the `other` object. The `value`
  // object can have additional properties as well. For example, if `other` is `{ a: 1 }`, and
  // `value` is `{ a: 1, b: 2 }`, then the objects match.
  toMatchObject(other, value) {
    return _.isMatch(value, other);
  },
});

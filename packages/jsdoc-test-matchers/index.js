/*
  Copyright 2019 the JSDoc Authors.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
const _ = require('lodash');
const { format } = require('prettier');

// Prettier lazy-loads its parsers, so preload the HTML parser while we know we're not mocked.
require('prettier/parser-html');

function stripWhitespace(str) {
  // Remove leading whitespace.
  str = str.replace(/^[\s]+/gm, '');
  // Remove empty lines.
  str = str.replace(/^\n$/gm, '');

  return str;
}

function normalizeHtml(str) {
  str = format(str, {
    parser: 'html',
    tabWidth: 2,
  });

  return stripWhitespace(str);
}

function isInstanceOf(actual, expected) {
  let actualName;
  let expectedName;

  if (!_.isObject(actual)) {
    throw new TypeError(`Expected object value, got ${typeof value}`);
  }

  actualName = actual.constructor.name;

  if (_.isString(expected)) {
    // Class name.
    expectedName = expected;
  } else if (_.isFunction(expected)) {
    // Class constructor.
    expectedName = expected.name;
  } else {
    expectedName = expected.constructor.name;
  }

  return actualName === expectedName;
}

function matchmaker(name, checker) {
  return (util) => ({
    compare: (actual, expected) => {
      const result = {
        pass: checker(actual, expected),
      };

      if (_.isArray(expected) || _.isObject(expected)) {
        result.message = util.buildFailureMessage(name, result.pass, actual, expected);
      }

      return result;
    },
  });
}

const matcherFuncs = {
  toBeArray: (actual) => {
    return _.isArray(actual);
  },
  toBeArrayOfSize: (actual, expected) => {
    if (_.isArray(actual) && actual.length === expected) {
      return true;
    }

    return false;
  },
  toBeArrayOfStrings: (actual) => {
    if (!_.isArray(actual) || !actual.length) {
      return false;
    }

    return !actual.some((item) => !_.isString(item));
  },
  toBeArrayOfObjects: (actual) => {
    return _.isArray(actual) && !actual.some((item) => !_.isObject(item));
  },
  toBeBoolean: (actual) => {
    return _.isBoolean(actual);
  },
  toBeEmptyArray: (actual) => {
    return _.isArray(actual) && actual.length === 0;
  },
  toBeEmptyObject: (actual) => {
    return _.isObject(actual) && !Object.keys(actual).length;
  },
  toBeEmptyString: (actual) => {
    return actual === '';
  },
  toBeError: (actual) => {
    return actual instanceof Error;
  },
  toBeErrorOfType: (actual, expected) => {
    return actual instanceof Error && actual.name === expected;
  },
  toBeFunction: (actual) => {
    return _.isFunction(actual);
  },
  toBeInstanceOf: isInstanceOf,
  toBeLessThanOrEqualTo: (actual, expected) => {
    return actual <= expected;
  },
  toBeNonEmptyObject: (actual) => {
    return _.isObject(actual) && Object.keys(actual).length;
  },
  toBeNonEmptyString: (actual) => {
    return _.isString(actual) && actual.length > 0;
  },
  toBeNumber: (actual) => {
    return _.isNumber(actual);
  },
  toBeObject: (actual) => {
    return _.isObject(actual);
  },
  toBeString: (actual) => {
    return _.isString(actual);
  },
  toBeWholeNumber: (actual) => {
    return Number.isInteger(actual);
  },
  toContainHtml: (actual, expected) => {
    const actualDiffable = normalizeHtml(actual);
    const expectedDiffable = normalizeHtml(expected);

    return actualDiffable.includes(expectedDiffable);
  },
  toEndWith: (actual, expected) => {
    return _.isString(actual) && _.isString(expected) && actual.endsWith(expected);
  },
  toHaveMethod: (actual, expected) => {
    return _.isObject(actual) && _.isFunction(actual[expected]);
  },
  toHaveOwnProperty: (actual, expected) => {
    return Object.hasOwn(actual, expected);
  },
  // The objects in `value` must have all of the keys and values from the corresponding objects in
  // `other`. The object in `value` can have additional properties as well. For example, if
  // `other[0]` is `{ a: 1 }`, and `value[0]` is `{ a: 1, b: 2 }`, then the objects match.
  toMatchArrayOfObjects: (actual, expected) => {
    let isMatch = true;

    if (!_.isArray(actual)) {
      throw new TypeError(`Expected array value, got ${typeof value}`);
    }
    if (!_.isArray(expected)) {
      throw new TypeError(`Expected the expected value to be an array, got ${typeof other}`);
    }

    if (expected.length !== actual.length) {
      isMatch = false;
    } else {
      for (let i = 0, l = actual.length; i < l; i++) {
        if (!_.isMatch(actual[i], expected[i])) {
          isMatch = false;
          break;
        }
      }
    }

    return isMatch;
  },
  // The `value` object must have all of the keys and values from the `other` object. The `value`
  // object can have additional properties as well. For example, if `other` is `{ a: 1 }`, and
  // `value` is `{ a: 1, b: 2 }`, then the objects match.
  toMatchObject: (actual, expected) => {
    return _.isMatch(actual, expected);
  },
  toThrowErrorOfType: (actual, expected) => {
    let error;

    try {
      actual();
    } catch (e) {
      error = e;
    }

    return error && error instanceof Error && isInstanceOf(error, expected);
  },
};

module.exports = (() => {
  const result = {};

  Object.keys(matcherFuncs).forEach((key) => {
    result[key] = matchmaker(key, matcherFuncs[key]);
  });

  return result;
})();

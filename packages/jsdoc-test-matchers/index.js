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

function isInstanceOf(actual, expected) {
  let actualName;
  let expectedName;
  let typeErrorMsg = 'Expected object value, got ';

  if (_.isNull(actual)) {
    throw new TypeError(typeErrorMsg + 'null');
  } else if (_.isArray(actual)) {
    throw new TypeError(typeErrorMsg + 'array');
  } else if (!_.isObject(actual)) {
    throw new TypeError(typeErrorMsg + typeof value);
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
  toBeArray: (actual) => _.isArray(actual),
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
  toBeArrayOfObjects: (actual) => _.isArray(actual) && !actual.some((item) => !_.isObject(item)),
  toBeBoolean: (actual) => _.isBoolean(actual),
  toBeEmptyArray: (actual) => _.isArray(actual) && actual.length === 0,
  toBeEmptyMap: (actual) => _.isMap(actual) && actual.size === 0,
  toBeEmptyObject: (actual) => _.isObject(actual) && !Object.keys(actual).length,
  toBeEmptySet: (actual) => _.isSet(actual) && actual.size === 0,
  toBeEmptyString: (actual) => actual === '',
  toBeError: (actual) => actual instanceof Error,
  toBeErrorOfType: (actual, expected) => actual instanceof Error && actual.name === expected,
  toBeFunction: (actual) => _.isFunction(actual),
  toBeInstanceOf: isInstanceOf,
  toBeLessThanOrEqualTo: (actual, expected) => actual <= expected,
  toBeMap: (actual) => _.isMap(actual),
  toBeNonEmptyObject: (actual) => _.isObject(actual) && Object.keys(actual).length,
  toBeNonEmptyString: (actual) => _.isString(actual) && actual.length > 0,
  toBeNumber: (actual) => _.isNumber(actual),
  toBeObject: (actual) => _.isObject(actual),
  toBeSet: (actual) => _.isSet(actual),
  toBeString: (actual) => _.isString(actual),
  toBeWholeNumber: (actual) => Number.isInteger(actual),
  toEndWith: (actual, expected) =>
    _.isString(actual) && _.isString(expected) && actual.endsWith(expected),
  toHave: (actual, expected) => (_.isMap(actual) || _.isSet(actual)) && actual.has(expected),
  toHaveMethod: (actual, expected) => _.isObject(actual) && _.isFunction(actual[expected]),
  toHaveOwnProperty: (actual, expected) => Object.hasOwn(actual, expected),
  // The objects in `actual` must have all of the keys and values from the corresponding objects in
  // `expected`. The object in `actual` can have additional properties as well. For example, if
  // `expected[0]` is `{ a: 1 }`, and `actual[0]` is `{ a: 1, b: 2 }`, then the objects match.
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
  // The `actual` object must have all of the keys and values from the `expected` object. The
  // `actual` object can have additional properties as well. For example, if `expected` is
  // `{ a: 1 }`, and `actual` is `{ a: 1, b: 2 }`, then the objects match.
  toMatchObject: (actual, expected) => _.isMatch(actual, expected),
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

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
/**
 * Module to convert values between various JavaScript types.
 *
 * @alias module:@jsdoc/util.cast
 */

/**
 * Check whether a string contains a boolean or numeric value, and convert the string to the
 * appropriate type if necessary.
 *
 * @private
 * @param {string} str - The string to convert.
 * @return {(string|number|boolean)} The converted value.
 */
function castString(str) {
  let number;
  let result;

  switch (str) {
    case 'true':
      result = true;
      break;

    case 'false':
      result = false;
      break;

    case 'NaN':
      result = NaN;
      break;

    case 'null':
      result = null;
      break;

    case 'undefined':
      result = undefined;
      break;

    default:
      if (typeof str === 'string') {
        if (str.includes('.')) {
          number = parseFloat(str);
        } else {
          number = parseInt(str, 10);
        }

        if (String(number) === str && !isNaN(number)) {
          result = number;
        } else {
          result = str;
        }
      }
  }

  return result;
}

/**
 * Check whether a string represents another primitive type, and convert the string to the
 * appropriate type if necessary.
 *
 * If an object or array is passed to this method, the object or array's values are recursively
 * converted to the appropriate types. The original object or array is not modified.
 *
 * @private
 * @param {(string|Object|Array)} item - The item whose type or types will be converted.
 * @return {*?} The converted value.
 */
export default function cast(item) {
  let result;

  if (Array.isArray(item)) {
    result = [];
    for (let i = 0, l = item.length; i < l; i++) {
      result[i] = cast(item[i]);
    }
  } else if (typeof item === 'object' && item !== null) {
    result = {};
    Object.keys(item).forEach((prop) => {
      result[prop] = cast(item[prop]);
    });
  } else if (typeof item === 'string') {
    result = castString(item);
  } else {
    result = item;
  }

  return result;
}

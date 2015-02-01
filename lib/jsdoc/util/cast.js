'use strict';

/**
 * Module to convert values between various JavaScript types.
 * @module
 * @private
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
    var number;
    var result;

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
                if (str.indexOf('.') !== -1) {
                    number = parseFloat(str);
                }
                else {
                    number = parseInt(str, 10);
                }

                if ( String(number) === str && !isNaN(number) ) {
                    result = number;
                }
                else {
                    result = str;
                }
            }
    }

    return result;
}

/**
 * Check whether a string contains a boolean or numeric value, and convert the string to the
 * appropriate type if necessary.
 *
 * If an object or array is passed to this method, the object or array's values will be recursively
 * converted to the appropriate types. The original object or array is not modified.
 *
 * @private
 * @param {(string|Object|Array)} item - The item whose type will be converted.
 * @return {(string|number|boolean|Object|Array)} The converted value.
 */
exports.cast = function cast(item) {
    var result;

    if ( Array.isArray(item) ) {
        result = [];
        for (var i = 0, l = item.length; i < l; i++) {
            result[i] = cast(item[i]);
        }
    }
    else if (typeof item === 'object' && item !== null) {
        result = {};
        Object.keys(item).forEach(function(prop) {
            result[prop] = cast(item[prop]);
        });
    }
    else if (typeof item === 'string') {
        result = castString(item);
    }
    else {
        result = item;
    }

    return result;
};

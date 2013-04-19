/**
 * Recursively print out all names and values in a data structure.
 * @module jsdoc/util/dumper
 * @author Michael Mathews <micmath@gmail.com>
 * @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

var util = require('util');

var seenItems = [];
function seen(object) {
    if (seenItems.indexOf(object) !== -1) {
        return true;
    }

    return false;
}

// some objects are unwalkable, like Java native objects
function isUnwalkable(o) {
    return (o && typeof o === 'object' && typeof o.constructor === 'undefined');
}

function isFunction(o) {
    return (o && typeof o === 'function' || o instanceof Function);
}

function isObject(o) {
    return o && o instanceof Object ||
        (o && typeof o.constructor !== 'undefined' && o.constructor.name === 'Object');
}

function checkCircularRefs(o, func) {
    if ( seen(o) ) {
        return '<CircularRef>';
    }
    else {
        seenItems.push(o);
        return func.call(this, o);
    }
}

function walk(o) {
    var result;

    if ( isUnwalkable(o) ) {
        result = '<Object>';
    }
    else if ( o === undefined ) {
        result = 'undefined';
    }
    else if ( Array.isArray(o) ) {
        result = checkCircularRefs(o, function(arr) {
            var newArray = [];
            arr.forEach(function(item) {
                newArray.push( walk(item) );
            });

            return newArray;
        });
    }
    else if ( util.isRegExp(o) ) {
        result = '<RegExp ' + o + '>';
    }
    else if ( util.isDate(o) ) {
        result = '<Date ' + o.toUTCString() + '>';
    }
    else if ( isFunction(o) ) {
        result = '<Function' + (o.name ? ' ' + o.name : '') + '>';
    }
    else if ( isObject(o) && o !== null ) {
        result = checkCircularRefs(o, function(obj) {
            var newObj = {};
            Object.keys(obj).forEach(function(key) {
                newObj[key] = walk(obj[key]);
            });

            return newObj;
        });
    }
    // should be safe to JSON.stringify() everything else
    else {
        result = o;
    }
   
    return result;
}

/**
 * @param {*} object
 */
exports.dump = function(object) {
    return JSON.stringify(walk(object), null, 4);
};

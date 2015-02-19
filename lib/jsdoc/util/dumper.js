/*global Set */
/**
 * Recursively print out all names and values in a data structure.
 * @module jsdoc/util/dumper
 * @author Michael Mathews <micmath@gmail.com>
 * @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
'use strict';

var util = require('util');

var OBJECT_WALKER_KEY = 'hasBeenSeenByWalkerDumper';
var SET_DEFINED = (typeof Set !== 'undefined');

function ObjectWalker() {
    this.seenItems = SET_DEFINED ? new Set() : [];
}

ObjectWalker.prototype.seen = function(object) {
    var result;

    if (SET_DEFINED) {
        result = this.seenItems.has(object);
    }
    else {
        result = object[OBJECT_WALKER_KEY];
    }
    return result;
};

ObjectWalker.prototype.markAsSeen = function(object) {
    if (SET_DEFINED) {
        this.seenItems.add(object);
    }
    else {
        object[OBJECT_WALKER_KEY] = true;
        this.seenItems.push(object);
    }
};

ObjectWalker.prototype.removeSeenFlag = function(obj) {
    if (SET_DEFINED) {
        this.seenItems.delete(obj);
    }
    else {
        delete obj[OBJECT_WALKER_KEY];
    }
};

// some objects are unwalkable, like Java native objects
ObjectWalker.prototype.isUnwalkable = function(o) {
    return (o && typeof o === 'object' && typeof o.constructor === 'undefined');
};

ObjectWalker.prototype.isFunction = function(o) {
    return (o && typeof o === 'function' || o instanceof Function);
};

ObjectWalker.prototype.isObject = function(o) {
    return o && o instanceof Object ||
        (o && typeof o.constructor !== 'undefined' && o.constructor.name === 'Object');
};

ObjectWalker.prototype.checkCircularRefs = function(o, func) {
    if ( this.seen(o) ) {
        return '<CircularRef>';
    }
    else {
        this.markAsSeen(o);
        return func(o);
    }
};

ObjectWalker.prototype.walk = function(o) {
    var result;

    var self = this;

    if ( this.isUnwalkable(o) ) {
        result = '<Object>';
    }
    else if ( o === undefined ) {
        result = null;
    }
    else if ( Array.isArray(o) ) {
        result = this.checkCircularRefs(o, function(arr) {
            var newArray = [];

            arr.forEach(function(item) {
                newArray.push( self.walk(item) );
            });

            self.removeSeenFlag(arr);

            return newArray;
        });
    }
    else if ( util.isRegExp(o) ) {
        result = '<RegExp ' + o + '>';
    }
    else if ( util.isDate(o) ) {
        result = '<Date ' + o.toUTCString() + '>';
    }
    else if ( util.isError(o) ) {
        result = { message: o.message };
    }
    else if ( this.isFunction(o) ) {
        result = '<Function' + (o.name ? ' ' + o.name : '') + '>';
    }
    else if ( this.isObject(o) && o !== null ) {
        result = this.checkCircularRefs(o, function(obj) {
            var newObj = {};

            Object.keys(obj).forEach(function(key) {
                if (!SET_DEFINED && key === OBJECT_WALKER_KEY) { return; }
                newObj[key] = self.walk(obj[key]);
            });

            self.removeSeenFlag(obj);

            return newObj;
        });
    }
    // should be safe to JSON.stringify() everything else
    else {
        result = o;
    }

    return result;
};

/**
 * @param {*} object
 */
exports.dump = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var result = [];
    var walker;

    for (var i = 0, l = args.length; i < l; i++) {
        walker = new ObjectWalker();
        result.push( JSON.stringify(walker.walk(args[i]), null, 4) );
    }

    return result.join('\n');
};

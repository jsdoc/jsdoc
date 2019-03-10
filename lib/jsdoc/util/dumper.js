/* global Set */
/**
 * Recursively print out all names and values in a data structure.
 * @module jsdoc/util/dumper
 */
const util = require('util');

const OBJECT_WALKER_KEY = 'hasBeenSeenByWalkerDumper';
const SET_DEFINED = (typeof Set !== 'undefined');

class ObjectWalker {
    constructor() {
        this.seenItems = SET_DEFINED ? new Set() : [];
    }

    seen(object) {
        let result;

        if (SET_DEFINED) {
            result = this.seenItems.has(object);
        }
        else {
            result = object[OBJECT_WALKER_KEY];
        }

        return result;
    }

    markAsSeen(object) {
        if (SET_DEFINED) {
            this.seenItems.add(object);
        }
        else {
            object[OBJECT_WALKER_KEY] = true;
            this.seenItems.push(object);
        }
    }

    removeSeenFlag(obj) {
        if (SET_DEFINED) {
            this.seenItems.delete(obj);
        }
        else {
            delete obj[OBJECT_WALKER_KEY];
        }
    }

    /* eslint-disable class-methods-use-this */
    // some objects are unwalkable, like Java native objects
    isUnwalkable(o) {
        return o && typeof o === 'object' && typeof o.constructor === 'undefined';
    }

    isFunction(o) {
        return (o && typeof o === 'function') || o instanceof Function;
    }

    isObject(o) {
        return (o && o instanceof Object) ||
            (o && typeof o.constructor !== 'undefined' && o.constructor.name === 'Object');
    }
    /* eslint-enable class-methods-use-this */

    checkCircularRefs(o, func) {
        if ( this.seen(o) ) {
            return '<CircularRef>';
        }
        else {
            this.markAsSeen(o);

            return func(o);
        }
    }

    walk(o) {
        let result;

        const self = this;

        if ( this.isUnwalkable(o) ) {
            result = '<Object>';
        }
        else if ( o === undefined ) {
            result = null;
        }
        else if ( Array.isArray(o) ) {
            result = this.checkCircularRefs(o, arr => {
                const newArray = [];

                arr.forEach(item => {
                    newArray.push( self.walk(item) );
                });

                self.removeSeenFlag(arr);

                return newArray;
            });
        }
        else if ( util.isRegExp(o) ) {
            result = `<RegExp ${o}>`;
        }
        else if ( util.isDate(o) ) {
            result = `<Date ${o.toUTCString()}>`;
        }
        else if ( util.isError(o) ) {
            result = { message: o.message };
        }
        else if ( this.isFunction(o) ) {
            result = `<Function${o.name ? ` ${o.name}` : ''}>`;
        }
        else if ( this.isObject(o) && o !== null ) {
            result = this.checkCircularRefs(o, obj => {
                const newObj = {};

                Object.keys(obj).forEach(key => {
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
    }
}

/**
 * @param {*} object
 */
exports.dump = function(...args) {
    const result = [];
    let walker;

    for (let arg of args) {
        walker = new ObjectWalker();
        result.push( JSON.stringify(walker.walk(arg), null, 4) );
    }

    return result.join('\n');
};

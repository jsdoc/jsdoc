/**
 * Deep clone a simple object. Ignores non-enumerable properties.
 * @private
 */
const setDefined = typeof Set !== 'undefined';

function addItem(set, item) {
    if (setDefined) {
        set.add(item);
    }
    else if (!set.includes(item)) {
        set.push(item);
    }
}

function hasItem(set, item) {
    if (setDefined) {
        return set.has(item);
    }
    else {
        return set.includes(item);
    }
}

// TODO: can we remove the circular-ref checking? pretty sure it's not needed anymore...
// if we still need this for some reason, we should share code with jsdoc/util/dumper
function doop(o, seen) {
    let clone;
    let descriptor;
    let props;
    let i;
    let l;

    if (!seen) {
        seen = setDefined ? new Set() : [];
    }

    if (o instanceof Object && o.constructor !== Function) {
        if ( hasItem(seen, o) ) {
            clone = '<CircularRef>';
        }
        else {
            addItem(seen, o);

            if ( Array.isArray(o) ) {
                clone = [];
                for (i = 0, l = o.length; i < l; i++) {
                    clone[i] = (o[i] instanceof Object) ? doop(o[i], seen) : o[i];
                }
            }
            else {
                clone = Object.create( Object.getPrototypeOf(o) );
                props = Object.keys(o);
                for (i = 0, l = props.length; i < l; i++) {
                    descriptor = Object.getOwnPropertyDescriptor(o, props[i]);
                    if (descriptor.value) {
                        descriptor.value = doop(descriptor.value, seen);
                    }

                    Object.defineProperty(clone, props[i], descriptor);
                }
            }
        }

        return clone;
    }

    return o;
}

// Wrapper to avoid exposing the 'seen' parameter outside of this module.
function doopWrapper(o) {
    return doop(o);
}

// for backwards compatibility
doopWrapper.doop = doopWrapper;

module.exports = doopWrapper;

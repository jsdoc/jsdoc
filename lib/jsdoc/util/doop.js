/**
    Deep clone a simple object.
    @private
 */
function doop(o) {
    var clone;
    var descriptor;
    var props;
    var i;
    var l;

    if (o instanceof Object && o.constructor != Function) {
        if ( Array.isArray(o) ) {
            clone = [];
            for (i = 0, l = o.length; i < l; i++) {
                clone[i] = (o[i] instanceof Object) ? doop(o[i]) : o[i];
            }
        }
        else {
            // TODO: replace some of this with Object.create()?
            // TODO: are we getting circular refs, etc., because we're not calling doop() on the
            // descriptor?
            clone = {};
            props = Object.getOwnPropertyNames(o);
            for (i = 0, l = props.length; i < l; i++) {
                descriptor = Object.getOwnPropertyDescriptor(o, props[i]);
                if (descriptor.value instanceof Object) {
                    descriptor.value = doop(descriptor.value);
                }
                Object.defineProperty(clone, props[i], descriptor);
            }
        }
        
        return clone;
    }
    
    return o;
}

// for backwards compatibility
doop.doop = doop;

module.exports = doop;

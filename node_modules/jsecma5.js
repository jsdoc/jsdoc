// ECMAScript3 versions of ECMAScript5 constructs used in Narcissus parser
// All properties will be writable, configurable and enumerable, no matter
// the descriptor. Descriptor get/set is also ignored.

(function() {
    if (Object.defineProperty === undefined) {
        Object.defineProperty = function(obj, prop, descriptor) {
            obj[prop] = descriptor.value;
        };
    }

    if (Object.defineProperties === undefined) {
        Object.defineProperties = function(obj, props) {
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    Object.defineProperty(obj, prop, props[prop]);
                }
            }
        };
    }

    if (Object.create === undefined) {
        Object.create = function(obj, props) {
            function ctor() {}
            ctor.prototype = obj;
            var o = new ctor();
            if (props !== undefined) {
                Object.defineProperties(o, props);
            }
            return o;
        };
    }
})();

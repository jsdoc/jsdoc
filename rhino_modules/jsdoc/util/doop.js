/**
    Deep clone a simple object.
    @private
 */
var doop = exports.doop = function(o) {
    var clone,
        hasOwnProp = Object.prototype.hasOwnProperty,
        prop;
    if (o instanceof Object && o.constructor != Function) {
        clone = o instanceof Array ? [] : {};
        
        for (prop in o){
            if ( hasOwnProp.call(o, prop) ) {
                clone[prop] = (o[prop] instanceof Object)? doop(o[prop]) : o[prop];
            }
        }
        return clone;
    }
    return o;
};

/**
    Deep clone a simple object.
    @private
 */
var doop = exports.doop = function(o) {
    var clone,
        prop;

    if (o instanceof Object && o.constructor != Function) {
        clone = o instanceof Array ? [] : {};
        
        Object.keys(o).forEach(function(prop) {
            clone[prop] = (o[prop] instanceof Object) ? doop(o[prop]) : o[prop];
        });

        return clone;
    }
    
    return o;
};

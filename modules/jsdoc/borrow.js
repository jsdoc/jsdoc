/**
    A collection of functions relating to resolving @borrows tags in JSDoc symbols.
    @module jsdoc/borrow
    @author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
(function() {

    // requires docs to have been indexes: docs.index must be defined here
    /**
        Take (a copy) of the docs for borrowed symbols and attach them to the
        docs for the borrowing symbol. This is recursive, because the borrowed
        symbol may itself be borrowed. This process changes the symbols involved,
        moving docs from the "borrowed" array and into the general docs, then
        deleting the borrowed array.
     */
    exports.resolveBorrows = function(docs) {
        docs.forEach(function(doc) {
            if (doc.borrowed) {
                doc.borrowed.forEach(function(b, i) {
                    var from = docs.index[b.from], // could be an array
                        asName = b['as'] || b.from;
                        
                    if (from) {
                        exports.resolveBorrows(from);
                        
                        var cloned = doop(from);

                        cloned.forEach(function(c) {
                            asName = asName.replace(/^prototype\./, '#');
                            var parts = asName.split('#');
                            
                            if (parts.length === 2) c.scope = 'instance';
                            else c.scope = 'static';
    
                            asName = parts.pop();
                            c.name = asName;
                            c.memberof = doc.longname;
                            c.longname = c.memberof + (c.scope === 'instance'? '#': '.') + c.name;
                            docs.push(c);
                        });
                        
                    }
                });
                
                delete doc.borrowed;
            }
        });
    }
    
    /**
        Deep clone a simple object.
        @private
     */

function doop(o) {
  if (o instanceof Object && o.constructor != Function){
    var clone = o instanceof Array ? [] : {}, prop;
 
    for (prop in o){
      if (o.hasOwnProperty(prop)){ 
        clone[prop] = (o[prop] instanceof Object) 
          ? doop(o[prop]) 
          : o[prop]; 
      }
    }
    return clone;
  }
  return o;
};
    
})();
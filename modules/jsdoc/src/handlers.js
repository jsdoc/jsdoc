(function() {
    var Doclet = require('jsdoc/doclet').Doclet;
    
    app.jsdoc.parser.on('jsdocCommentFound', function(e) {
        var newDoclet = new Doclet(e.comment, e.node, e.filename);
 
        if (newDoclet) {
            e = { doclet: newDoclet };
            this.fire('newDoclet', e);
            
            if (!e.defaultPrevented) {
                this.addResult(newDoclet);
            }
        }
    });
    
})();
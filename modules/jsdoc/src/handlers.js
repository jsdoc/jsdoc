(function() {

    var jsdoc = {doclet: require('jsdoc/doclet')};
    
    // handles JSDoc comments that include a @name tag -- the code is ignored in such a case
    app.jsdoc.parser.on('jsdocCommentFound', function(e) {
        var newDoclet = new jsdoc.doclet.Doclet(e.comment, e);
        if (!newDoclet.name) {
            return false; // only interested in virtual comments (with a @name) here
        }
        
        addDoclet.call(this, newDoclet);
        e.doclet = newDoclet;
    });
    
    // handles named symbols in the code, may or may not have a JSDoc comment attached
    app.jsdoc.parser.on('symbolFound', function(e) {
        var newDoclet = new jsdoc.doclet.Doclet(e.comment, e);
        
        // an undocumented symbol right after a virtual comment? rhino mistakenly connected the two
        if (newDoclet.name) { // there was a @name in comment
            // try again, without the comment
            e.comment = '@undocumented';
            newDoclet = new jsdoc.doclet.Doclet(e.comment, e);
        } 
        
        // we need to get the symbol name from code
        if (e.code && e.code.name) {
            newDoclet.addTag('name', e.code.name);
            
            if (!newDoclet.memberof && e.astnode) {
                var memberofName = this.astnodeToMemberof(e.astnode);

                if ( /^this\./.test(newDoclet.name) ) {
                    newDoclet.name = newDoclet.name.replace('this.', '');
                    memberofName = this.resolveThis(e.astnode);
                    if (memberofName) {
                        newDoclet.name = memberofName + '#' + newDoclet.name;
                    }
                }
                
                if (memberofName) newDoclet.addTag( 'memberof', memberofName);
            }
            
            newDoclet.postProcess();
        }
        else {
            return false;
        }
        
        addDoclet.call(this, newDoclet);
        e.doclet = newDoclet;
    });
    
    //app.jsdoc.parser.on('fileBegin', function(e) { });
    
    //app.jsdoc.parser.on('fileComplete', function(e) { });

    function addDoclet(newDoclet) {
        if (newDoclet) {
            e = { doclet: newDoclet };
            this.fire('newDoclet', e);
            
            if (!e.defaultPrevented) {
                this.addResult(newDoclet);
            }
        }
    }
    
})();
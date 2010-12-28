(function() {

    var Doclet = require('jsdoc/doclet').Doclet;
    
    app.jsdoc.parser.on('documentedCodeFound', function(e) {
        if ( !isValidJsdoc(e.comment) ) { return false; }
        
        var newDoclet = new Doclet(e.comment, e);
        if (newDoclet.name) { return false; }
        
        if (e.code.name) {
            newDoclet.addTag('name', e.code.name);
            if (!newDoclet.kind) {
                newDoclet.addTag( 'kind', codetypeToKind(e.code.type) );
            }
        }
        else {
            return false;
        }
        
        //dump(newDoclet);
        /*debug*///print('>>    added: '+newDoclet.name+'.'); 
        
        addDoclet.call(this, newDoclet);
    });
    
    app.jsdoc.parser.on('jsdocCommentFound', function(e) {
        if ( !isValidJsdoc(e.comment) ) { return false; }
        
        var newDoclet = new Doclet(e.comment, e);
        if (!newDoclet.name) { return false; }
        
        //dump(newDoclet);
        /*debug*///print('>>    added: '+newDoclet.name+'.');
        
        addDoclet.call(this, newDoclet);
    });
    
    app.jsdoc.parser.on('jsdocPragma', function(e) {
        if (e.pragma) {
            /*debug*///print('>>    pragma: '+e.pragma+'.');
        }
    });
    
    app.jsdoc.parser.on('fileBegin', function(e) {
        /*debug*///print('//---- Begin: '+e.filename+'------------------');
    });
    
    app.jsdoc.parser.on('fileComplete', function(e) {
        /*debug*///print('//---- Complete: '+e.filename+'------------------');
    });

    function addDoclet(newDoclet) {
        if (newDoclet) {
            e = { doclet: newDoclet };
            this.fire('newDoclet', e);
            
            if (!e.defaultPrevented) {
                this.addResult(newDoclet);
            }
        }
    }

    function codetypeToKind(type) {
        var kind = (type || '').toLowerCase();
        
        if (kind !== 'function') {
            return 'property';
        }
        
        return kind;
    }
    
    // ignore comments that start with /***...
    function isValidJsdoc(src) {
        return !/^\/\*\*\*+/.test(src);
    }
    
})();
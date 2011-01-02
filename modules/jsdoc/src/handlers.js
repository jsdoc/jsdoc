(function() {

    var Doclet = require('jsdoc/doclet').Doclet,
        Token  = Packages.org.mozilla.javascript.Token;
    
    app.jsdoc.parser.on('jsdocCommentFound', function(e) {
        if ( !isValidJsdoc(e.comment) ) { return false; }
        
        var newDoclet = new Doclet(e.comment, e);
        if (!newDoclet.name) { return false; } // only interested in virtual comments here
        
        e.doclet = newDoclet;
        addDoclet.call(this, newDoclet);
    });
    
    app.jsdoc.parser.on('symbolFound', function(e) {
        if ( !isValidJsdoc(e.comment) ) { return false; }
        
        var newDoclet = new Doclet(e.comment, e);
        
        // an undocumented symbol right after a virtual comment? rhino mistakenly connected the two
        if (newDoclet.name) { // there was a @name in comment
            // try again, without the comment
            e.comment = '/** @undocumented */';
            newDoclet = new Doclet(e.comment, e);
        } 
        
        // we need to get the symbol name from code
        if (e.code && e.code.name) {
            newDoclet.addTag('name', e.code.name);
            
            if (!newDoclet.kind) {
                newDoclet.addTag( 'kind', codetypeToKind(e.code.type) );
            }
            
            if (!newDoclet.memberof && e.astnode) {
                var memberofName = astnodeToMemberof.call(this, e.astnode);

                if ( /^this\./.test(newDoclet.name) ) {
                    newDoclet.name = newDoclet.name.replace('this.', '');
                    memberofName = whatsThis.call(this, e.astnode);
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
        
        e.doclet = newDoclet;
        addDoclet.call(this, newDoclet);
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
    
    /**
        @this The current parser
     */
    function astnodeToMemberof(astnode) {
        var memberof = {};
        
        if (astnode.type === Token.VAR || astnode.type === Token.FUNCTION) {
            if (astnode.enclosingFunction) { // an inner var or func
                memberof.id = 'astnode'+astnode.enclosingFunction.hashCode();
                memberof.doclet = this.refs[memberof.id];
                if (!memberof.doclet) return '[[anonymous]]~';
                return (memberof.doclet.longname||memberof.doclet.name) +  '~';
            }
        }
        else {
            memberof.id = 'astnode'+astnode.parent.hashCode();
            memberof.doclet = this.refs[memberof.id];
            if (!memberof.doclet) return ''; // global?
            return memberof.doclet.longname||memberof.doclet.name;
        }
    }
    
    /**
        Resolve what "this" refers too, in a symbol name
        @this The current parser
     */
    function whatsThis(astnode) {
        var memberof = {};
        
        if (astnode.enclosingFunction) {
            memberof.id = 'astnode'+astnode.enclosingFunction.hashCode();
            memberof.doclet = this.refs[memberof.id];
            //dump(memberof.doclet );
            if (!memberof.doclet) return '[[anonymous]]'; // TODO handle global this?
            
            // walk up to the closest @constructor we can find
            if (memberof.doclet.kind === 'constructor') return memberof.doclet.longname||memberof.doclet.name;
            else {
                
                if (memberof.doclet.meta.code.val){
                    return whatsThis.call(this, memberof.doclet.meta.code.val);
                }
                else return ''; // TODO handle global this?
            }
        }
        else if (astnode.parent) {
            //print('member of something that isnt a function? '+'astnode'+astnode.parent.parent.hashCode()+' ('+nodeToString(astnode.parent.parent)+')');
            
            var parent = astnode.parent;
            if (parent.type === Token.COLON) parent = parent.parent; // go up one more
            
            memberof.id = 'astnode'+parent.hashCode();
            memberof.doclet = this.refs[memberof.id];
            
            if (!memberof.doclet) return ''; // global?
            //print('~~ '+memberof.doclet.kind);
            return memberof.doclet.longname||memberof.doclet.name;
        }
        else {
            return ''; // global?
        }
    }
    
    /***** ignore comments that start with too many stars ******/
    function isValidJsdoc(src) {
        return !/^\/\*\*\*+/.test(src);
    }
    
})();
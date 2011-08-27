/**
 * @module jsdoc/src/parser
 * @requires common/util
 * @requires common/fs
 * @requires common/events
 */

(function() {
    var Token = Packages.org.mozilla.javascript.Token,
        currentParser = null,
        currentSourceName = '';
        
    /** 
     * @class
     * @mixes module:common/events
     * 
     * @example <caption>Create a new parser.</caption>
     * var jsdocParser = new (require('jsdoc/src/parser').Parser)();
     */
    exports.Parser = function() {
        this._resultBuffer = [];
        this.refs = {};
    }
    require('common/util').mixin(exports.Parser.prototype, require('common/events'));
    
    /**
     * Parse the given source files for JSDoc comments.
     * @param {Array.<string>} sourceFiles An array of filepaths to the JavaScript sources.
     * @param {string} [encoding=utf8]
     *
     * @fires jsdocCommentFound
     * @fires symbolFound
     * @fires newDoclet
     * @fires fileBegin
     * @fires fileComplete
     * 
     * @example <caption>Parse two source files.</caption>
     * var myFiles = ['file1.js', 'file2.js'];
     * var docs = jsdocParser.parse(myFiles);
     */
    exports.Parser.prototype.parse = function(sourceFiles, encoding) {
        const SCHEMA = 'javascript:';
        var sourceCode = '',
            filename = '';
        
        if (typeof sourceFiles === 'string') { sourceFiles = [sourceFiles]; }
        
        for (i = 0, leni = sourceFiles.length; i < leni; i++) {
            if (sourceFiles[i].indexOf(SCHEMA) === 0) {
                sourceCode = sourceFiles[i].substr(SCHEMA.length);
                filename = '[[string' + i + ']]';
            }
            else {
                filename = sourceFiles[i];
                try {
                    sourceCode = require('fs').readFileSync(filename, encoding);
                }
                catch(e) {
                    console.log('FILE READ ERROR: in module:jsdoc/parser.parseFiles: "' + filename + '" ' + e);
                    continue;
                }
            }
            
            currentParser = this;
            this._parseSourceCode(sourceCode, filename);
            currentParser = null;
        }
        
        return this._resultBuffer;
    }
    
    /**
     * @returns {Array<Doclet>} The accumulated results of any calls to parse.
     */
    exports.Parser.prototype.results = function() {
        return this._resultBuffer;
    }
    
    /**
     * @param {Object} o The parse result to add to the result buffer.
     */
    exports.Parser.prototype.addResult = function(o) {
        this._resultBuffer.push(o);
    }
    
    /**
     * Empty any accumulated results of calls to parse.
     */
    exports.Parser.prototype.clear = function() {
        currentParser = null;
        currentSourceName = '';
        this._resultBuffer = [];
    }
    
    /** @private */
    exports.Parser.prototype._parseSourceCode = function(sourceCode, sourceName) {
        currentSourceName = sourceName;
        
        sourceCode = pretreat(sourceCode);
        
        var ast = parserFactory().parse(sourceCode, sourceName, 1);
        
        var e = {filename: currentSourceName};
        this.fire('fileBegin', e);
        
        if (!e.defaultPrevented) {
            ast.visit(
                new Packages.org.mozilla.javascript.ast.NodeVisitor({
                    visit: visitNode
                })
            );
        }
        
        this.fire('fileComplete', e);
        
        currentSourceName = '';
    }
    
    function pretreat(code) {
        return code
            // merge adjacent doclets
            .replace(/\*\/\/\*\*+/g, '@also')
            // make lent objectliterals documentable by giving them a dummy name
            .replace(/(\/\*\*[\s\S]*?@lends\b[\s\S]*?\*\/\s*)\{/g, '$1____ = {');
    }
    
    /**
     * Given a node, determine what the node is a member of.
     * @param {astnode} node
     * @returns {string} The long name of the node that this is a member of.
     */
    exports.Parser.prototype.astnodeToMemberof = function(node) {
        var memberof = {};
        
        if (node.type === Token.VAR || node.type === Token.FUNCTION) {
            if (node.enclosingFunction) { // an inner var or func
                memberof.id = 'astnode'+node.enclosingFunction.hashCode();
                memberof.doclet = this.refs[memberof.id];
                if (!memberof.doclet) {
                    return '<anonymous>~';
                }
                return (memberof.doclet.longname||memberof.doclet.name) +  '~';
            }
        }
        else {
            memberof.id = 'astnode'+node.parent.hashCode();
            memberof.doclet = this.refs[memberof.id];
            if (!memberof.doclet) return ''; // global?
            return memberof.doclet.longname||memberof.doclet.name;
        }
    }
    
    /**
     * Resolve what "this" refers too, relative to a node.
     * @param {astnode} node - The "this" node
     * @returns {string} The longname of the enclosing node.
     */
    exports.Parser.prototype.resolveThis = function(node) {
        var memberof = {};
        
        if (node.enclosingFunction) {
            memberof.id = 'astnode'+node.enclosingFunction.hashCode();
            memberof.doclet = this.refs[memberof.id];
            
            if (!memberof.doclet) {
                return '<anonymous>'; // TODO handle global this?
            }
            
            if (memberof.doclet['this']) {
                return memberof.doclet['this'];
            }
            // like: Foo.constructor = function(n) { /** blah */ this.name = n; }
            else if (memberof.doclet.kind === 'function' && memberof.doclet.memberof) {
                return memberof.doclet.memberof;
            }
            // walk up to the closest class we can find
            else if (memberof.doclet.kind === 'class' || memberof.doclet.kind === 'module') {
                return memberof.doclet.longname||memberof.doclet.name;
            }
            else {
                if (node.enclosingFunction){
                    return this.resolveThis(node.enclosingFunction/*memberof.doclet.meta.code.val*/);
                }
                else return ''; // TODO handle global this?
            }
        }
        else if (node.parent) {
            var parent = node.parent;
            if (parent.type === Token.COLON) parent = parent.parent; // go up one more
            
            memberof.id = 'astnode'+parent.hashCode();
            memberof.doclet = this.refs[memberof.id];
            
            if (!memberof.doclet) return ''; // global?
            
            return memberof.doclet.longname||memberof.doclet.name;
        }
        else {
            return ''; // global?
        }
    }
    
    /**
     * Resolve what function a var is limited to.
     * @param {astnode} node
     * @param {string} basename The leftmost name in the long name: in foo.bar.zip the basename is foo.
     */
    exports.Parser.prototype.resolveVar = function(node, basename) {
        var doclet,
            enclosingFunction = node.enclosingFunction;
        
        if (!enclosingFunction) { return ''; } // global
        
        doclet = this.refs['astnode'+enclosingFunction.hashCode()];
        
        if ( doclet && doclet.meta.vars && ~doclet.meta.vars.indexOf(basename) ) {
            return doclet.longname;
        }
        
        return this.resolveVar(enclosingFunction, basename);
    }
    
    /** @private */
    function visitNode(node) {
        var e,
            commentSrc;

        // look for stand-alone doc comments
        if (node.type === Token.SCRIPT && node.comments) {
            // note: ALL comments are seen in this block...
            for each(var comment in node.comments.toArray()) {
                if (comment.commentType !== Token.CommentType.JSDOC) {
                    continue;
                }
                
                if (commentSrc = ''+comment.toSource()) {

                    e = {
                        comment: commentSrc,
                        lineno: comment.getLineno(),
                        filename: currentSourceName
                    };
                    
                    if ( isValidJsdoc(commentSrc) ) {
                        currentParser.fire('jsdocCommentFound', e, currentParser);
                    }
                }
            }
        }
        else if (node.type === Token.ASSIGN) {
            e = {
                id: 'astnode'+node.hashCode(), // the id of the ASSIGN node
                comment: String(node.jsDoc||'@undocumented'),
                lineno: node.getLineno(),
                filename: currentSourceName,
                astnode: node,
                code: aboutNode(node)
            };
            
            var basename = e.code.name.replace(/^([$a-z_][$a-z_0-9]*).*?$/i, '$1');
            if (basename !== 'this') e.code.funcscope = currentParser.resolveVar(node, basename);

            if ( isValidJsdoc(e.comment) ) {
                currentParser.fire('symbolFound', e, currentParser);
            }
            
            if (e.doclet) {
                currentParser.refs['astnode'+e.code.node.hashCode()] = e.doclet; // allow lookup from value => doclet
            }
        }
        else if (node.type === Token.COLON) { // assignment within an object literal
            e = {
                id: 'astnode'+node.hashCode(), // the id of the COLON node
                comment: String(node.left.jsDoc||'@undocumented'),
                lineno: node.getLineno(),
                filename: currentSourceName,
                astnode: node,
                code: aboutNode(node)
            };
            
            if ( isValidJsdoc(e.comment) ) {
                currentParser.fire('symbolFound', e, currentParser);
            }
            
            if (e.doclet) {
                currentParser.refs['astnode'+e.code.node.hashCode()] = e.doclet; // allow lookup from value => doclet
            }
        }
        else if (node.type == Token.VAR || node.type == Token.LET || node.type == Token.CONST) {

            if (node.variables) {
                return true; // we'll get each var separately on future visits
            }
            
            if (node.parent.variables.toArray()[0] === node) { // like /** blah */ var a=1, b=2, c=3;
                // the first var assignment gets any jsDoc before the whole var series
                node.jsDoc = node.parent.jsDoc;
            }

            e = {
                id: 'astnode'+node.hashCode(), // the id of the VARIABLE node
                comment: String(node.jsDoc||'@undocumented'),
                lineno: node.getLineno(),
                filename: currentSourceName,
                astnode: node,
                code: aboutNode(node)
            };
            
            // keep track of vars in a function scope
            if (node.enclosingFunction) {
                var func = 'astnode'+node.enclosingFunction.hashCode(),
                funcDoc = currentParser.refs[func];

                if (funcDoc) {
                    funcDoc.meta.vars = funcDoc.meta.vars || [];
                    funcDoc.meta.vars.push(e.code.name);
                }
            }

            if ( isValidJsdoc(e.comment) ) {
                currentParser.fire('symbolFound', e, currentParser);
            }
            
            if (e.doclet) {
                currentParser.refs['astnode'+e.code.node.hashCode()] = e.doclet; // allow lookup from value => doclet
            }
        }
        else if (node.type == Token.FUNCTION) {
            e = {
                id: 'astnode'+node.hashCode(), // the id of the COLON node
                comment: String(node.jsDoc||'@undocumented'),
                lineno: node.getLineno(),
                filename: currentSourceName,
                astnode: node,
                code: aboutNode(node)
            };

            e.code.name = String(node.name) || '';
            
            if ( isValidJsdoc(e.comment) ) {
                currentParser.fire('symbolFound', e, currentParser);
            }

            if (e.doclet) {
                currentParser.refs['astnode'+e.code.node.hashCode()] = e.doclet; // allow lookup from value => doclet
            }
            else if (!currentParser.refs['astnode'+e.code.node.hashCode()]) { // keep references to undocumented anonymous functions too as they might have scoped vars
                currentParser.refs['astnode'+e.code.node.hashCode()] = {
                    longname: '<anonymous>',
                    meta: { code: e.code }
                };
            }
        }
       
        return true;
    }
    
    /** @private */
    function parserFactory() {
        var cx = Packages.org.mozilla.javascript.Context.getCurrentContext();
        
        var ce = new Packages.org.mozilla.javascript.CompilerEnvirons();
        ce.setRecordingComments(true);
        ce.setRecordingLocalJsDocComments(true);
        ce.setLanguageVersion(180);
        
        ce.initFromContext(cx);
        return new Packages.org.mozilla.javascript.Parser(ce, ce.getErrorReporter());
    }
    
    /**
     * Attempts to find the name and type of the given node.
     * @private
     * @memberof module:src/parser.Parser
     */
    function aboutNode(node) {
        about = {};
        
        if (node.type == Token.FUNCTION) {
            about.name = '' + node.name;

            about.type = 'function';
            about.node = node;
            
            return about;
        }
        
        if (node.type == Token.VAR || node.type == Token.LET || node.type == Token.CONST) {
            about.name = nodeToString(node.target);
            if (node.initializer) {  // like var i = 0;
                about.node = node.initializer;
				about.value = nodeToString(about.node);
                about.type = getTypeName(node.initializer);
            }
            else { // like var i;
                about.node = node.target;
				about.value = nodeToString(about.node);
                about.type = 'undefined';
            }
            
            return about;
        }
         
        if (node.type === Token.ASSIGN || node.type === Token.COLON) {
            about.name = nodeToString(node.left);
            if (node.type === Token.COLON) {

                 // objlit keys with unsafe variable-name characters must be quoted
                if (!/^[$_a-z][$_a-z0-9]*$/i.test(about.name) ) {
                    about.name = '"'+about.name.replace(/"/g, '\\"')+'"';
                }
            }
            about.node = node.right;
			about.value = nodeToString(about.node);
            about.type = getTypeName(node.right);
            return about;
        }
        
        // type 39 (NAME)
        var string = nodeToString(node);
        if (string) {
            about.name = string;
            return about;
        }
		
        return about;
    }
    
    /** @private
        @memberof module:src/parser.Parser
    */
    function nodeToString(node) {
        var str;
        
        if (!node) return;
        
        if (node.type === Token.GETPROP) {
            str = [nodeToString(node.target), node.property.string].join('.');
        }
        else if (node.type === Token.VAR) {
            str = nodeToString(node.target)
        }
        else if (node.type === Token.NAME) {
            str = node.string;
        }
        else if (node.type === Token.STRING) {
            str = node.value;
        }
		else if (node.type === Token.NUMBER) {
            str = node.value;
        }
        else if (node.type === Token.THIS) {
            str = 'this';
        }
        else if (node.type === Token.GETELEM) {
            str = node.toSource(); // like: Foo['Bar']
        }
        else {
            str = getTypeName(node);
        }
        
        return '' + str;
    };
    
    /** @private
        @memberof module:src/parser.Parser
    */
    function getTypeName(node) {
        var type = '';
        
        if (node) {
            type = ''+ Packages.org.mozilla.javascript.Token.typeToName(node.getType());
        }
        
        return type;
    }
    
    /** @private
        @memberof module:src/parser.Parser
    */
    function isValidJsdoc(commentSrc) {
        return commentSrc.indexOf('/***') !== 0; /*** ignore comments that start with many stars ***/
    }
    
})();

/**
    Fired whenever the parser encounters a JSDoc comment in the current source code.
    @event jsdocCommentFound
    @memberof module:jsdoc/src/parser.Parser
    @param {event} e
    @param {string} e.comment The text content of the JSDoc comment
    @param {number} e.lineno The line number associated with the found comment.
    @param {string} e.filename The file name associated with the found comment.
 */
/**
    @module jsdoc/src/parser
    @requires module:common/events
    @requires module:jsdoc/doclet
 */

(function() {
    var Token  = Packages.org.mozilla.javascript.Token,
        Doclet = require('jsdoc/doclet').Doclet,
        currentParser = null,
        currentSourceName = '',
        seen = {},
        pragmas = {};
        
    /** 
        @constructor module:jsdoc/src/parser.Parser
        @mixesIn module:common/events.EventEmitter
     */
    var Parser = exports.Parser = function() {
        this._resultBuffer = [];
    }
    require('common/events').mixin(exports.Parser.prototype);
    
    /**
        @event jsdocCommentFound
        @param e
        @param {string} e.comment The raw text of the JSDoc comment that will be parsed.
        This value may be modified in place by your event handler.
        @param {string} e.file The name of the file containing the comment.
        @defaultAction The comment text will be used to create a new Doclet.
        Returning false from your handler will prevent this.
    */
    
    /**
        @event newDoclet
        @param e
        @param {string} e.doclet The new doclet that will be added to the results.
        The properties of this value may be modified in place by your event handler.
        @defaultAction The new doclet will be added to the parsers result set.
        Returning false from your handler will prevent this.
    */
    
    /**
        @method module:jsdoc/src/parser.Parser#parse
        @param {Array<string>} sourceFiles
        @param {string} [encoding=utf8]
        @fires jsdocCommentFound
        @fires documentedCodeFound
        @fires jsdocPragma
	    @fires newDoclet
     */
    Parser.prototype.parse = function(sourceFiles, encoding) {
        var sourceCode = '',
            filename = '',
            jsUriScheme = 'javascript:';
        
        if (typeof sourceFiles === 'string') { sourceFiles = [sourceFiles]; }
        
        for (i = 0, leni = sourceFiles.length; i < leni; i++) {
            if (sourceFiles[i].indexOf(jsUriScheme) === 0) {
                sourceCode = sourceFiles[i].substr(jsUriScheme.length);
                filename = '[[string' + i + ']]';
            }
            else {
                filename = sourceFiles[i];
                try {
                    sourceCode = require('common/fs').read(filename, encoding);
                }
                catch(e) {
                    print('FILE READ ERROR: in module:jsdoc/parser.parseFiles: "' + filename + '" ' + e);
                    continue;
                }
            }
            
            currentParser = this;
            parseSource(sourceCode, filename);
            currentParser = null;
            pragmas = {}; // always resets at end of file
        }
        
        return this._resultBuffer;
    }
    
    /**
        @method module:jsdoc/src/parser.Parser#results
        @returns {Array<Doclet>} The accumulated results of any calls to parse.
     */
    Parser.prototype.results = function() {
        return this._resultBuffer;
    }
    
    /**
        @method module:jsdoc/src/parser.Parser#addResult
     */
    Parser.prototype.addResult = function(o) {
        this._resultBuffer.push(o);
    }
    
    /**
        @method module:jsdoc/src/parser.Parser#clearResults
        @desc Empty any accumulated results of calls to parse.
     */
    Parser.prototype.clear = function() {
        currentParser = null;
        currentSourceName = '';
        seen = {};
        this._resultBuffer = [];
    }
    
    /**
        @private
        @function parseSource
     */
    function parseSource(source, sourceName) {
        currentSourceName = sourceName;
        
        var ast = parserFactory().parse(source, sourceName, 1);
        
        var e = {filename: currentSourceName};
        currentParser.fire('fileBegin', e);
        
        if (!e.defaultPrevented) {
            ast.visit(
                new Packages.org.mozilla.javascript.ast.NodeVisitor({
                    visit: visitNode
                })
            );
        }
        
        currentParser.fire('fileComplete', e);
        
        currentSourceName = '';
    }
    
    /**
        @private
        @function visitNode
     */
    function visitNode(node) {
        var e;
        
        // look for stand-alone doc comments
        if (node.type === Token.SCRIPT && node.comments) {
            // note: ALL comments are seen in this block...
            for each(var comment in node.comments.toArray()) {
                if (comment.commentType !== Token.CommentType.JSDOC) {
                    continue;
                }
                
                if (commentSrc = '' + comment.toSource()) {
                    var e = {
                        id: 'comment'+comment.hashCode(),
                        comment: commentSrc,
                        lineno: comment.getLineno(),
                        filename: currentSourceName
                    };
                    
                    // comments like this affect parsing: /**#blahblah*/
                    var m = /^\/\*\*#([\s\S]+?)\*\//.exec(commentSrc);
                    if (m && m[1]) {
                        pragmas[m[1]] = true;
                        e.pragma = m[1];
                        currentParser.fire('jsdocPragma', e, currentParser);
                    }
                    else {
                        currentParser.fire('jsdocCommentFound', e, currentParser);
                    }
                }
            }
        }
        // look for things being assigned to documented symbols
        else if ((node.type === Token.COLON || node.type === Token.ASSIGN) && node.left.jsDoc) {
            // this clause allows us to grab some more info: the {type} of the assigned value
            e = new DocumentationEvent(node.left, {name: nodeToString(node.left), type: getTypeName(node.right)});
            
            if (!seen[e.id]) {
                seen[e.id] = true;
                
                currentParser.fire('documentedCodeFound', e, currentParser);
            }
        }
        // look for documented but unassigned symbols
        else if (node.jsDoc) {
            // a symbol is documented but has no value assigned to it yet
            e = new DocumentationEvent(node, aboutNode(node));
            
            if (!seen[e.id]) { // wasn't already handled above?
                seen[e.id] = true;
                currentParser.fire('documentedCodeFound', e, currentParser);
            }
        }
        
        // Notice that, due to the way the AST is walked, an assignment node
        // like {ASSIGN: x = 1} will be visited before its individual parts
        // like {NAME: x}, and {NUMBER: 1} will be visited. In such a case the  
        // jsdoc will be seen twice, once for both the assignment node and again
        // for the name node and could therefore end up being documented twice.
        // We track which nodes have been handled in the `seen` hash to prevent
        // that.
        
        return true;
    }
    
    /**
        @private
        @event DocumentationEvent
     */
    function DocumentationEvent(node, codeInfo) {
        this.id = 'node' + node.jsDoc.hashCode();
        this.comment = '' + node.jsDoc;
        this.lineno = node.getLineno();
        this.filename = currentSourceName;
        this.code = codeInfo;
        this.node = node;
    }
    
    /**
        @private
        @function parserFactory
     */
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
        Attempts to find the name and type of the given node.
        @private
        @function aboutNode
     */
    function aboutNode(node) {
        about = {};
        
        if (node.type == Token.FUNCTION && String(node.name) !== '') {
            about.name = '' + node.name;
            about.type = 'function';
            
            return about;
        }
        
        if (node.type == Token.VAR || node.type == Token.LET || node.type == Token.CONST) {
            if (node.variables) {
                for each (var n in node.variables.toArray()) {
                    about.name = String(n.target.string);
                    if (n.initializer) { about.type = getTypeName(n.initializer); }
                    return about;
                }
            }
            else {
                about.name = nodeToString(node);
                if (node.initializer) { about.type = getTypeName(node.initializer); }
                
                return about;
            }
        }
         
         if (node.type === Token.ASSIGN || node.type === Token.COLON) {
             about.name = nodeToString(node.left);
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
    
    function getTypeName(node) {
        var type = '';
        
        if (node) {
            type = ''+ Packages.org.mozilla.javascript.Token.typeToName(node.getType());
        }
        
        return type;
    }
    
})();
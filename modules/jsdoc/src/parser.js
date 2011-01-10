/**
    @module jsdoc/src/parser
    @requires module:common/util
    @requires module:common/events
 */

(function() {
    var Token = Packages.org.mozilla.javascript.Token,
        currentParser = null,
        currentSourceName = '';
        
    /** 
        @constructor module:jsdoc/src/parser.Parser
        @mixesIn module:common/events
     */
    var Parser = exports.Parser = function() {
        this._resultBuffer = [];
        this.refs = {};
    },
    events = require('common/events');
    
    require('common/util').mixin(Parser.prototype, events);
    
    /**
        @method module:jsdoc/src/parser.Parser#parse
        @param {Array<string>} sourceFiles
        @param {string} [encoding=utf8]
        @fires jsdocCommentFound
        @fires symbolFound
        @fires fileBegin
	    @fires fileComplete
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

                    var e = {
                        comment: commentSrc,
                        lineno: comment.getLineno(),
                        filename: currentSourceName
                    };
                    
                    currentParser.fire('jsdocCommentFound', e, currentParser);
                }
            }
        }
        else if (node.type === Token.ASSIGN) {
            var e = {
                id: 'astnode'+node.hashCode(), // the id of the ASSIGN node
                comment: String(node.jsDoc||'@undocumented'), // document that it is undocumented :)
                lineno: node.getLineno(),
                filename: currentSourceName,
                astnode: node,
                code: aboutNode(node)
            };

            currentParser.fire('symbolFound', e, currentParser);
            
            if (e.doclet) {
                currentParser.refs['astnode'+e.code.val.hashCode()] = e.doclet; // allow lookup from value => doclet
            }
        }
        else if (node.type === Token.COLON) {
            var e = {
                id: 'astnode'+node.hashCode(), // the id of the COLON node
                comment: String(node.left.jsDoc||'@undocumented'),
                lineno: node.getLineno(),
                filename: currentSourceName,
                astnode: node,
                code: aboutNode(node)
            };

            currentParser.fire('symbolFound', e, currentParser);
            
            if (e.doclet) {
                currentParser.refs['astnode'+e.code.val.hashCode()] = e.doclet; // allow lookup from value => doclet
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

            var e = {
                id: 'astnode'+node.hashCode(), // the id of the VARIABLE node
                comment: String(node.jsDoc||'@undocumented'),
                lineno: node.getLineno(),
                filename: currentSourceName,
                astnode: node,
                code: aboutNode(node)
            };
           
            currentParser.fire('symbolFound', e, currentParser);
            
            if (e.doclet) {
                currentParser.refs['astnode'+e.code.val.hashCode()] = e.doclet; // allow lookup from value => doclet
                
            }
        }
        else if (node.type == Token.FUNCTION && String(node.name) !== '') {
            var e = {
                id: 'astnode'+node.hashCode(), // the id of the COLON node
                comment: String(node.jsDoc||'@undocumented'),
                lineno: node.getLineno(),
                filename: currentSourceName,
                astnode: node,
                code: aboutNode(node)
            };

            currentParser.fire('symbolFound', e, currentParser);
            
           if (e.doclet) {
                currentParser.refs['astnode'+node.hashCode()] = e.doclet; // allow lookup from value => doclet
           }
        }
       
        return true;
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
            about.name = nodeToString(node.target);
            if (node.initializer) {  // like var i = 0;
                about.val = node.initializer;
                about.type = getTypeName(node.initializer);
            }
            else { // like var i;
                about.val = node.target;
                about.type = 'undefined';
            }
            
            return about;
        }
         
        if (node.type === Token.ASSIGN || node.type === Token.COLON) {
            about.name = nodeToString(node.left);
            about.val = node.right;
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
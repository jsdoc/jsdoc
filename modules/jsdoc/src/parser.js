/**
    @module jsdoc/src/parser
    @requires module:common/events
    @requires module:jsdoc/doclet
 */

(function() {
    var Token  = Packages.org.mozilla.javascript.Token,
        Doclet = require('jsdoc/doclet').Doclet,
        currentParser = null,
        currentSourceName = '';
        
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
	    @fires newDoclet
     */
    Parser.prototype.parse = function(sourceFiles, encoding) {
        var sourceCode = '',
            filename = '',
            jsUriScheme = 'javascript:';
        
        if (arguments.length === 0) {
            throw 'module:jsdoc/parser.parseFiles requires argument sourceFiles(none provided).';
        }
        
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
    Parser.prototype.clearResults = function() {
        this._resultBuffer = [];
    }
    
    /**
        @private
        @function parseSource
     */
    function parseSource(source, sourceName) {
        currentSourceName = sourceName;
        
        var ast = parserFactory().parse(source, sourceName, 1);
        
        ast.visit(
            new Packages.org.mozilla.javascript.ast.NodeVisitor({
                visit: visitNode
            })
        );
        
        currentSourceName = '';
    }
    
    /**
        @private
        @function visitNode
     */
    function visitNode(node) {
        var commentSrc = '',
            thisDoclet = null;//,
            //thisDocletName = '',
            //thisDocletPath = '';
        
        // look for all comments that have names provided
        if (node.type === Token.SCRIPT && node.comments) {
            for each(var comment in node.comments.toArray()) {
                if (comment.commentType === Token.CommentType.JSDOC) {
                    if (commentSrc = '' + comment.toSource()) {
                        var e = {
                            comment: commentSrc,
                            filename: currentSourceName,
                            node: node
                        };
                        currentParser.fire('jsdocCommentFound', e, currentParser);

//                          if ( thisDoclet.hasTag('name') && thisDoclet.hasTag('kind') ) {
//                              jsdoc.doclets.addDoclet(thisDoclet);
//                              if (thisDoclet.tagValue('kind') === 'module') {
//                                  jsdoc.name.setCurrentModule( thisDoclet.tagValue('path') );
//                              }
//                          }
                    }
                }
            }
        }
        
        // use the nocode option to shortcut all the following blah blah
        if (env.opts.nocode) { return true; }
//          
//      // like function foo() {}
//      if (node.type == Token.FUNCTION && String(node.name) !== '') {
//          commentSrc = (node.jsDoc)? String(node.jsDoc) : '';
// 
//          if (commentSrc) {
//              thisDoclet = jsdoc.doclet.makeDoclet(commentSrc, node, currentSourceName);
//              thisDocletName = thisDoclet.tagValue('name');
//              
//              if (!thisDoclet.hasTag('kind')) { // guess kind from the source code
//                  thisDoclet.addTag('kind', 'method')
//              }
//              
//              if (!thisDocletName) { // guess name from the source code
//                  nodeName = jsdoc.name.resolveInner(node.name, node, thisDoclet);
//                  thisDoclet.setName(nodeName);
//                  jsdoc.doclets.addDoclet(thisDoclet);
//              }
//              jsdoc.name.refs.push([node, thisDoclet]);
//          }
//          else { // an uncommented function?
//              // this thing may have commented members, so keep a ref to the thing but don't add it to the doclets list
//              thisDoclet = jsdoc.doclet.makeDoclet('[[undocumented]]', node, currentSourceName);
// 
//              nodeName = jsdoc.name.resolvePath(node.name, node, thisDoclet);
//              thisDoclet.setName(nodeName);
//              jsdoc.name.refs.push([
//                  node, 
//                  thisDoclet
//              ]);
//          }
//          
//          return true;
//      }
//      
//      // like foo = function(){} or foo: function(){}
//      if (node.type === Token.ASSIGN || node.type === Token.COLON) {
// 
//          var nodeName = nodeToString(node.left),
//              nodeKind = '';
//          commentSrc = node.jsDoc || node.left.jsDoc;
// 
//          if (commentSrc) {
//              commentSrc = '' + commentSrc;
// 
//              thisDoclet = jsdoc.doclet.makeDoclet(commentSrc, node, currentSourceName);
//              thisDocletName = thisDoclet.tagValue('name');
//              nodeKind = thisDoclet.tagValue('kind');
// 
//              if (!thisDoclet.hasTag('kind')) { // guess kind from the source code
//                  if (node.right.type == Token.FUNCTION) { // assume it's a method
//                      thisDoclet.addTag('kind', 'method');
//                  }
//                  else {
//                      thisDoclet.addTag('kind', 'property');
//                  }
//              }
// 
//              if (!thisDocletName) { // guess name from the source code
//                  nodeName = jsdoc.name.resolvePath(nodeName, node, thisDoclet);
// 
//                  thisDoclet.setName(nodeName);
//                  jsdoc.doclets.addDoclet(thisDoclet);
//              }
//              jsdoc.name.refs.push([node.right, thisDoclet]);
//          }
//          else { // an uncommented objlit or anonymous function?
//              
//              // this thing may have commented members, so keep a ref to the thing but don't add it to the doclets list
// 
//              thisDoclet = jsdoc.doclet.makeDoclet('[[undocumented]]', node, currentSourceName);
//              nodeName = jsdoc.name.resolvePath(nodeName, node, thisDoclet);
//              
//              thisDoclet.setName(nodeName);
//              jsdoc.name.refs.push([
//                  node.right, 
//                  thisDoclet
//              ]);
//          }
//          return true;
//      }
//      
//      // like var foo = function(){} or var bar = {}
//      if (node.type == Token.VAR || node.type == Token.LET || node.type == Token.CONST) {
//          var counter = 0,
//              nodeKind;
// 
//          if (node.variables) for each (var n in node.variables.toArray()) {
// 
//              if (n.target.type === Token.NAME) {
//                  var val = n.initializer;
//                  
//                  commentSrc = (counter++ === 0 && !n.jsDoc)? node.jsDoc : n.jsDoc;
//                  if (commentSrc) {
//                      thisDoclet = jsdoc.doclet.makeDoclet('' + commentSrc, node, currentSourceName);
//                      thisDocletPath = thisDoclet.tagValue('path');
//                      thisDocletName = thisDoclet.tagValue('name');
// 
//                      if (!thisDoclet.hasTag('kind') && val) { // guess kind from the source code
//                          if (val.type == Token.FUNCTION) {
//                              thisDoclet.addTag('kind', 'method');
//                          }
//                          else {
//                              thisDoclet.addTag('kind', 'property');
//                          }
//                      }
//                      
//                      if (!thisDocletName) {
//                          thisDocletName = n.target.string;
//                          if (!thisDocletPath) { // guess path from the source code
//                              thisDocletPath = jsdoc.name.resolveInner(thisDocletName, node, thisDoclet);
//                              thisDoclet.setName(thisDocletPath);
//                          }
//                          else {
//                              thisDoclet.setName(thisDocletName);
//                          }
//                          jsdoc.doclets.addDoclet(thisDoclet);
//                      }
//                      
//                      if (val) { jsdoc.name.refs.push([val, thisDoclet]); }
//                  }
//                  else { // an uncommented objlit or anonymous function?
//                      var nodeName = nodeToString(n.target);
//                      // this thing may have commented members, so keep a ref to the thing but don't add it to the doclets list
//                      thisDoclet = jsdoc.doclet.makeDoclet('[[undocumented]]', n.target, currentSourceName);
// 
//                      nodeName = jsdoc.name.resolveInner(nodeName, n.target, thisDoclet);
//                      thisDoclet.setName(nodeName);
//                      
//                      if (val) jsdoc.name.refs.push([val, thisDoclet]);
//                  }
//              }
//              
//          }
//          return true;
//      }
//      
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
        ce.initFromContext(cx);
        return new Packages.org.mozilla.javascript.Parser(ce, ce.getErrorReporter());
    }
    
    /**
        @private
        @function nodeToString
        @param {org.mozilla.javascript.ast.AstNode} node
        @returns {string}
     */
    // credit: ringojs ninjas
    function nodeToString(node) {
        var str;
        
        if (node.type === Token.GETPROP) {
            str = [nodeToString(node.target), node.property.string].join('.');
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
    
    /**
        @private
        @function getTypeName
        @param {org.mozilla.javascript.ast.AstNode} node
        @returns {string}
     */
    // credit: ringojs ninjas
    function getTypeName(node) {
        return node ? ''+Packages.org.mozilla.javascript.Token.typeToName(node.getType()) : '' ;
    }
    
})();
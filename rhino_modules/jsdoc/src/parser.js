/**
 * @module jsdoc/src/parser
 * @requires common/util
 * @requires common/fs
 * @requires common/events
 */

var Token = Packages.org.mozilla.javascript.Token;
    
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

exports.Parser.currentParser = null,
exports.Parser.currentSourceName = '';

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
        
        exports.Parser.currentParser = this;
        this._parseSourceCode(sourceCode, filename);
        exports.Parser.currentParser = null;
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
    exports.Parser.currentParser = null;
    exports.Parser.currentSourceName = '';
    this._resultBuffer = [];
}

/**
 * Set the node visitor to use in parsing
 */
exports.Parser.prototype.setVisitor = function(visitor) {
    this._visitor = visitor;
}

/**
 * Get the node visitor to use in parsing
 */
exports.Parser.prototype.getVisitor = function() {
    return this._visitor;
}

/** @private */
exports.Parser.prototype._parseSourceCode = function(sourceCode, sourceName) {
    var e = {filename: sourceName};
    this.fire('fileBegin', e);
    
    if (!e.defaultPrevented) {
        e = {filename: sourceName, source: sourceCode};
        this.fire('beforeParse', e);
        sourceCode = e.source;
        exports.Parser.currentSourceName = sourceName = e.filename;
        
        sourceCode = pretreat(e.source);
               
        var ast = parserFactory().parse(sourceCode, sourceName, 1)
        
        ast.visit(
            new Packages.org.mozilla.javascript.ast.NodeVisitor({
                visit: this._visitor.visitNode
            })
        );
    }
    
    this.fire('fileComplete', e);
    
    exports.Parser.currentSourceName = '';
}

function pretreat(code) {
    return code
        // make starbangstar comments look like real jsdoc comments
        .replace(/\/\*\!\*/g, '/**')
        
        // make matching comment endings easier
        .replace(/\*\//g, '»')
        
        // merge adjacent doclets
        .replace(/»\/\*\*+/g, '@also')
        // make lent objectliterals documentable by giving them a dummy name
        .replace(/(\/\*\*[^»]*?@lends\b[^»]*?»\s*)\{/g, '$1 ____ = {') // like return @lends {
        .replace(/(\/\*\*[^»]*?@lends\b[^»]*?»)(\s*)return(\s*)\{/g, '$2$3 return $1 ____ = {') // like @lends return {
        
        // make matching comment endings harder
        .replace(/»/g, '*/');
}

var tkn = { NAMEDFUNCTIONTATEMENT: -1001 };
exports.Parser.tkn = tkn;

/**
 * Given a node, determine what the node is a member of.
 * @param {astnode} node
 * @returns {string} The long name of the node that this is a member of.
 */
exports.Parser.prototype.astnodeToMemberof = function(node) {
    var memberof = {};
    
    if (node.type === Token.VAR || node.type === Token.FUNCTION || node.type == tkn.NAMEDFUNCTIONTATEMENT) {
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
    
    if (node.type !== Token.COLON && node.enclosingFunction) {
        // get documentation for the enclosing function
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
    Given: foo = { x:1 }, find foo from x.
 */
exports.Parser.prototype.resolvePropertyParent = function(node) {
    var memberof = {};
    
    if (node.parent) {
        var parent = node.parent;
        if (parent.type === Token.COLON) parent = parent.parent; // go up one more
        
        memberof.id = 'astnode'+parent.hashCode();
        memberof.doclet = this.refs[memberof.id];
        
        if (memberof.doclet) { return memberof; }
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
    Fired whenever the parser encounters a JSDoc comment in the current source code.
    @event jsdocCommentFound
    @memberof module:jsdoc/src/parser.Parser
    @param {event} e
    @param {string} e.comment The text content of the JSDoc comment
    @param {number} e.lineno The line number associated with the found comment.
    @param {string} e.filename The file name associated with the found comment.
*/
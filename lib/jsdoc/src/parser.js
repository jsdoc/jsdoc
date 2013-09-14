/*global env: true, Packages: true */
/**
 * @module jsdoc/src/parser
 * @requires fs
 * @requires events
 */

var Token = Packages.org.mozilla.javascript.Token;
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * @class
 * @mixes module:events
 *
 * @example <caption>Create a new parser.</caption>
 * var jsdocParser = new (require('jsdoc/src/parser').Parser)();
 */
exports.Parser = function() {
    this._currentSourceName = '';
    this._resultBuffer = [];
    this._comments = {
        original: [],
        modified: []
    };
    //Initialize a global ref to store global members
    this.refs = {
        __global__: {
            meta: {}
        }
    };
    this._visitors = [];
};
exports.Parser.prototype = Object.create( require('events').EventEmitter.prototype );

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
    encoding = encoding || env.conf.encoding || 'utf8';

    const SCHEMA = 'javascript:';

    var filename = '';
    var sourceCode = '';
    var parsedFiles = [];
    var e = {};

    if (typeof sourceFiles === 'string') {
        sourceFiles = [sourceFiles];
    }

    e.sourcefiles = sourceFiles;

    this.emit('parseBegin', e);

    for (var i = 0, l = sourceFiles.length; i < l; i++) {
        sourceCode = '';

        if (sourceFiles[i].indexOf(SCHEMA) === 0) {
            sourceCode = sourceFiles[i].substr(SCHEMA.length);
            filename = '[[string' + i + ']]';
        }
        else {
            filename = sourceFiles[i];
            try {
                sourceCode = require('jsdoc/fs').readFileSync(filename, encoding);
            }
            catch(e) {
                console.log('FILE READ ERROR: in module:jsdoc/parser.parseFiles: "' + filename +
                    '" ' + e);
                continue;
            }
        }

        if (sourceCode.length) {
            this._parseSourceCode(sourceCode, filename);
            parsedFiles.push(filename);
        }
    }

    this.emit('parseComplete', {
        sourcefiles: parsedFiles,
        doclets: this._resultBuffer
    });

    return this._resultBuffer;
};

exports.Parser.prototype.fireProcessingComplete = function(doclets) {
    this.emit('processingComplete', { doclets: doclets });
};

/**
 * @returns {Array<Doclet>} The accumulated results of any calls to parse.
 */
exports.Parser.prototype.results = function() {
    return this._resultBuffer;
};

/**
 * @param {Object} o The parse result to add to the result buffer.
 */
exports.Parser.prototype.addResult = function(o) {
    this._resultBuffer.push(o);
};

/**
 * Empty any accumulated results of calls to parse.
 */
exports.Parser.prototype.clear = function() {
    this._currentSourceName = '';
    this._resultBuffer = [];
    this._comments = {
        original: [],
        modified: []
    };
};

/**
 * Adds a node visitor to use in parsing
 */
exports.Parser.prototype.addNodeVisitor = function(visitor) {
    this._visitors.push(visitor);
};

/**
 * Get the node visitors used in parsing
 */
exports.Parser.prototype.getVisitors = function() {
    return this._visitors;
};

function pretreat(code) {
    return code
        // make starbangstar comments look like real jsdoc comments
        .replace(/\/\*\!\*/g, '/**')

        // merge adjacent doclets
        .replace(/\*\/\/\*\*+/g, '@also')
        // make lent object literals documentable by giving them a dummy name
        // like return @lends {
        .replace(/(\/\*\*[^\*\/]*?[\*\s]*@lends\s(?:[^\*]|\*(?!\/))*\*\/\s*)\{/g, '$1 ____ = {')
        // like @lends return {
        .replace(/(\/\*\*[^\*\/]*?@lends\b[^\*\/]*?\*\/)(\s*)return(\s*)\{/g,
            '$2$3 return $1 ____ = {');
}

var tkn = {
    NAMEDFUNCTIONSTATEMENT: -1001
};
exports.Parser.tkn = tkn;

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

/** @private
    @memberof module:src/parser.Parser
*/
function getTypeName(node) {
    var type = '';

    if (node) {
        type = '' + Packages.org.mozilla.javascript.Token.typeToName(node.getType());
    }

    return type;
}

/** @private
    @memberof module:src/parser.Parser
*/
function nodeToString(node) {
    var str;

    if (!node) {
        return;
    }

    if (node.type === Token.GETPROP) {
        str = [nodeToString(node.target), node.property.string].join('.');
    }
    else if (node.type === Token.VAR) {
        str = nodeToString(node.target);
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
    else if (node.type === Token.NEG || node.type === Token.TRUE || node.type === Token.FALSE) {
        str = node.toSource(); // like -1
    }
    else {
        str = getTypeName(node);
    }

    return '' + str;
}

/**
 * Attempts to find the name and type of the given node.
 * @private
 * @memberof module:src/parser.Parser
 */
function aboutNode(node) {
    var about = {};

    if (node.type == Token.FUNCTION || node.type == tkn.NAMEDFUNCTIONSTATEMENT) {
        about.name = node.type == tkn.NAMEDFUNCTIONSTATEMENT? '' : '' + node.name;
        about.type = 'function';
        about.node = node;
    }
    else if (node.type == Token.VAR || node.type == Token.LET || node.type == Token.CONST) {
        about.name = nodeToString(node.target);
        if (node.initializer) {  // like var i = 0;
            about.node = node.initializer;
            about.value = nodeToString(about.node);
            about.type = getTypeName(node.initializer);
            if (about.type === 'FUNCTION' && about.node.name) {
                about.node.type = tkn.NAMEDFUNCTIONSTATEMENT;
            }
        }
        else { // like var i;
            about.node = node.target;
            about.value = nodeToString(about.node);
            about.type = 'undefined';
        }
    }
    else if (node.type === Token.ASSIGN || node.type === Token.COLON ||
             node.type === Token.GET || node.type === Token.SET) {
        about.name = nodeToString(node.left);
        if (node.type === Token.COLON) {

             // objlit keys with unsafe variable-name characters must be quoted
            if (!/^[$_a-z][$_a-z0-9]*$/i.test(about.name) ) {
                about.name = '"'+about.name.replace(/"/g, '\\"')+'"';
            }
        }
        about.node = node.right;
        about.value = nodeToString(about.node);

        // Getter and setter functions should be treated as properties
        if (node.type === Token.GET || node.type === Token.SET) {
            about.type = getTypeName(node);
        } else {
            about.type = getTypeName(node.right);
        }

        if (about.type === 'FUNCTION' && about.node.name) {
            about.node.type = tkn.NAMEDFUNCTIONSTATEMENT;
        }
    }
    else if (node.type === Token.GETPROP) {
        about.node = node;
        about.name = nodeToString(about.node);
        about.type = getTypeName(node);
    }
    else {
        // type 39 (NAME)
        var string = nodeToString(node);
        if (string) {
            about.name = string;
        }
    }

    // get names of the formal parameters declared for this function
    if (about.node && about.node.getParamCount) {
        var paramCount = about.node.getParamCount();
        if (typeof paramCount === 'number') {
            about.node.flattenSymbolTable(true);
            var paramNames = [];
            for (var i = 0, l = paramCount; i < l; i++) {
                paramNames.push( '' + about.node.getParamOrVarName(i) );
            }
            about.paramnames = paramNames;
        }
    }

    return about;
}

/** @private
    @memberof module:src/parser.Parser
*/
function isValidJsdoc(commentSrc) {
    /*** ignore comments that start with many stars ***/
    return commentSrc && commentSrc.indexOf('/***') !== 0;
}

/** @private
 * @memberof module:src/parser.Parser
 */
function makeVarsFinisher(funcDoc) {
    return function(e) {
        //no need to evaluate all things related to funcDoc again, just use it
        if (funcDoc && e.doclet && e.doclet.alias) {
            funcDoc.meta.vars[e.code.name] = e.doclet.longname;
        }
    };
}

/** @private
 * @memberof module:src/parser.Parser
 * @param {string} name Full symbol name.
 * @return {string} Basename.
 */
function getBasename(name) {
    if (name !== undefined) {
        return name.replace(/^([$a-z_][$a-z_0-9]*).*?$/i, '$1');
    }
    return name;
}

/** @private
 * @memberof module:src/parser.Parser
 * @param {object} node
 * @return {Array.<number>} Start and end lines.
 */
function getRange(node) {
    var range = [];
    
    range[0] = parseInt(String(node.getAbsolutePosition()), 10);
    range[1] = range[0] + parseInt(String(node.getLength()), 10);
    
    return range;
}

/** @private
 * @memberof module:src/parser.Parser
 */
exports.Parser.prototype._makeEvent = function(node, extras) {
    extras = extras || {};
    
    // fill in default values as needed. if we're overriding a property, don't execute the default
    // code for that property, since it might blow up.
    var result = {
        id: extras.id || 'astnode' + node.hashCode(),
        comment: extras.comment || String(node.getJsDoc() || '@undocumented'),
        lineno: extras.lineno || node.left.getLineno(),
        range: extras.range || getRange(node),
        filename: extras.filename || this._currentSourceName,
        astnode: extras.astnode || node,
        code: extras.code || aboutNode(node),
        event: extras.event || 'symbolFound',
        finishers: extras.finishers || [this.addDocletRef]
    };

    // use the modified version of the comment
    var idx = this._comments.original.indexOf(result.comment);
    if (idx !== -1) {
        result.comment = this._comments.modified[idx];
    }

    // make sure the result includes extras that don't have default values
    Object.keys(extras).forEach(function(prop) {
        result[prop] = extras[prop];
    });
    
    return result;
};

/** @private
 * @memberof module:src/parser.Parser
 */
exports.Parser.prototype._trackVars = function(node, e) {
    // keep track of vars in a function or global scope
    var func = '__global__';
    var funcDoc = null;

    if (node.enclosingFunction) {
        func = 'astnode' + node.enclosingFunction.hashCode();
    }

    funcDoc = this.refs[func];
    if (funcDoc) {
        funcDoc.meta.vars = funcDoc.meta.vars || {};
        funcDoc.meta.vars[e.code.name] = false;
        e.finishers.push(makeVarsFinisher(funcDoc));
    }
};

/** @private */
exports.Parser.prototype._visitComment = function(comment) {
    var e;
    var original = String( comment.toSource() );
    var modified;

    if ( original && isValidJsdoc(original) ) {
        this._comments.original.push(original);

        e = {
            comment: original,
            lineno: comment.getLineno(),
            filename: this._currentSourceName,
            range: getRange(comment)
        };

        this.emit('jsdocCommentFound', e, this);

        if (e.comment !== original) {
            modified = e.comment;
        }

        this._comments.modified.push(modified || original);
    }

    return true;
};

/** @private */
exports.Parser.prototype._visitNode = function(node) {
    var e,
        extras,
        basename,
        func,
        funcDoc,
        i,
        l;

    if (node.type === Token.ASSIGN) {
        e = this._makeEvent(node);

        basename = getBasename(e.code.name);

        if (basename !== 'this') {
            e.code.funcscope = this.resolveVar(node, basename);
        }
    }
    else if (node.type === Token.COLON) { // assignment within an object literal
        extras = {
            comment: String(node.left.getJsDoc() || '@undocumented'),
            finishers: [this.addDocletRef, this.resolveEnum]
        };
        e = this._makeEvent(node, extras);
    }
    else if (node.type === Token.GET || node.type === Token.SET) { // assignment within an object literal
        extras = {
            comment: String(node.left.getJsDoc() || '@undocumented')
        };
        e = this._makeEvent(node, extras);
    }
    else if (node.type === Token.GETPROP) { // like 'obj.prop' in '/** @typedef {string} */ obj.prop;'
        // this COULD be a Closure Compiler-style typedef, but it's probably not; to avoid filling
        // the parse results with junk, only fire an event if there's a JSDoc comment attached
        extras = {
            lineno: node.getLineno()
        };
        if ( node.getJsDoc() ) {
            e = this._makeEvent(node, extras);
        }
    }
    else if (node.type == Token.VAR || node.type == Token.LET || node.type == Token.CONST) {

        if (node.variables) {
            return true; // we'll get each var separately on future visits
        }

        if (node.parent.variables.toArray()[0] === node) { // like /** blah */ var a=1, b=2, c=3;
            // the first var assignment gets any jsDoc before the whole var series
            if (typeof node.setJsDoc !== 'undefined') { node.setJsDoc( node.parent.getJsDoc() ); }
        }

        extras = {
            lineno: node.getLineno()
        };
        e = this._makeEvent(node, extras);

        this._trackVars(node, e);
    }
    else if (node.type == Token.FUNCTION || node.type == tkn.NAMEDFUNCTIONSTATEMENT) {
        extras = {
            lineno: node.getLineno()
        };
        e = this._makeEvent(node, extras);

        e.code.name = (node.type == tkn.NAMEDFUNCTIONSTATEMENT)? '' : String(node.name) || '';

        this._trackVars(node, e);

        basename = getBasename(e.code.name);
        e.code.funcscope = this.resolveVar(node, basename);
    }

    if (!e) {
        e = {
            finishers: []
        };
    }

    for (i = 0, l = this._visitors.length; i < l; i++) {
        this._visitors[i].visitNode(node, e, this, this._currentSourceName);
        if (e.stopPropagation) { break; }
    }

    if (!e.preventDefault && isValidJsdoc(e.comment)) {
        this.emit(e.event, e, this);
    }

    for (i = 0, l = e.finishers.length; i < l; i++) {
        e.finishers[i].call(this, e);
    }

    return true;
};

/** @private */
exports.Parser.prototype._parseSourceCode = function(sourceCode, sourceName) {
    var NodeVisitor = Packages.org.mozilla.javascript.ast.NodeVisitor;
    
    var ast;
    var e = {
        filename: sourceName
    };

    this.emit('fileBegin', e);

    if (!e.defaultPrevented) {
        e = {
            filename: sourceName,
            source: sourceCode
        };
        this.emit('beforeParse', e);
        sourceCode = e.source;
        this._currentSourceName = sourceName = e.filename;

        sourceCode = pretreat(e.source);

        ast = parserFactory().parse(sourceCode, sourceName, 1);

        ast.visitComments(
            new NodeVisitor({
                visit: this._visitComment.bind(this)
            })
        );

        ast.visit(
            new NodeVisitor({
                visit: this._visitNode.bind(this)
            })
        );
    }

    this.emit('fileComplete', e);

    this._currentSourceName = '';
};

/**
 * Given a node, determine what the node is a member of.
 * @param {astnode} node
 * @returns {string} The long name of the node that this is a member of.
 */
exports.Parser.prototype.astnodeToMemberof = function(node) {
    var id,
        doclet,
        alias;

    if (node.type === Token.VAR || node.type === Token.FUNCTION ||
        node.type == tkn.NAMEDFUNCTIONSTATEMENT) {
        if (node.enclosingFunction) { // an inner var or func
            id = 'astnode' + node.enclosingFunction.hashCode();
            doclet = this.refs[id];
            if (!doclet) {
                return '<anonymous>~';
            }
            return (doclet.longname || doclet.name) +  '~';
        }
    }
    else {
        // check local references for aliases
        var scope = node,
            basename = getBasename(nodeToString(node.left));
        while(scope.enclosingFunction) {
            id = 'astnode' + scope.enclosingFunction.hashCode();
            doclet = this.refs[id];
            if ( doclet && doclet.meta.vars && hasOwnProp.call(doclet.meta.vars, basename) ) {
                return [doclet.meta.vars[basename], basename];
            }
            // move up
            scope = scope.enclosingFunction;
        }
        // First check to see if we have a global scope alias
        doclet = this.refs.__global__;
        if ( doclet && doclet.meta.vars && hasOwnProp.call(doclet.meta.vars, basename) ) {
            return [doclet.meta.vars[basename], basename];
        }

        id = 'astnode' + node.parent.hashCode();
        doclet = this.refs[id];
        if (!doclet) {
            return ''; // global?
        }
        return doclet.longname || doclet.name;
    }
};

/**
 * Resolve what "this" refers to relative to a node.
 * @param {astnode} node - The "this" node
 * @returns {string} The longname of the enclosing node.
 */
exports.Parser.prototype.resolveThis = function(node) {
    var memberof = {};
    var parent;

    if (node.type !== Token.COLON && node.enclosingFunction) {
        // get documentation for the enclosing function
        memberof.id = 'astnode' + node.enclosingFunction.hashCode();
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
            return memberof.doclet.longname || memberof.doclet.name;
        }
        else {
            if (node.enclosingFunction){
                // memberof.doclet.meta.code.val
                return this.resolveThis(node.enclosingFunction);
            }
            else {
                return ''; // TODO handle global this?
            }
        }
    }
    else if (node.parent) {
        if (node.parent.type === Token.COLON) {
            parent = node.parent.parent;
        }
        else {
            parent = node.parent;
        }

        memberof.id = 'astnode' + parent.hashCode();
        memberof.doclet = this.refs[memberof.id];

        if (!memberof.doclet) {
            return ''; // global?
        }

        return memberof.doclet.longname || memberof.doclet.name;
    }
    else {
        return ''; // global?
    }
};

/**
 * Given 'var foo = { x: 1 }', find foo from x.
 */
exports.Parser.prototype.resolvePropertyParent = function(node) {
    var memberof = {};
    var parent;

    if (node.parent && node.parent.type === Token.COLON) {
        parent = node.parent.parent;
    }
    else {
        parent = node.parent;
    }

    if (parent) {
        memberof.id = 'astnode' + parent.hashCode();
        memberof.doclet = this.refs[memberof.id];

        if (memberof.doclet) {
            return memberof;
        }
    }
};

/**
 * Resolve what function a var is limited to.
 * @param {astnode} node
 * @param {string} basename The leftmost name in the long name: in foo.bar.zip the basename is foo.
 */
exports.Parser.prototype.resolveVar = function(node, basename) {
    var doclet;
    var enclosingFunction = node.enclosingFunction;

    if (!enclosingFunction) {
        return ''; // global
    }

    doclet = this.refs['astnode'+enclosingFunction.hashCode()];
    if (doclet && doclet.meta.vars && basename in doclet.meta.vars) {
        return doclet.longname;
    }

    return this.resolveVar(enclosingFunction, basename);
};

exports.Parser.prototype.addDocletRef = function(e) {
    var node = e.code.node;
    // allow lookup from value => doclet
    if (e.doclet) {
        this.refs['astnode' + node.hashCode()] = e.doclet;
    }
    // keep references to undocumented anonymous functions, too, as they might have scoped vars
    else if ((node.type == Token.FUNCTION || node.type == tkn.NAMEDFUNCTIONSTATEMENT) &&
        !this.refs['astnode' + node.hashCode()]) {
        this.refs['astnode' + node.hashCode()] = {
            longname: '<anonymous>',
            meta: {
                code: e.code
            }
        };
    }
};

exports.Parser.prototype.resolveEnum = function(e) {
    var parent = this.resolvePropertyParent(e.code.node);

    if (parent && parent.doclet.isEnum) {
        if (!parent.doclet.properties) {
            parent.doclet.properties = [];
        }

        // members of an enum inherit the enum's type
        if (parent.doclet.type && !e.doclet.type) {
            e.doclet.type = parent.doclet.type;

        }

        delete e.doclet.undocumented;
        e.doclet.defaultvalue = e.doclet.meta.code.value;

        // add the doclet to the parent's properties
        // use a copy of the doclet to avoid circular references
        parent.doclet.properties.push( require('jsdoc/util/doop').doop(e.doclet) );
    }
};

/**
    Fired whenever the parser encounters a JSDoc comment in the current source code.
    @event jsdocCommentFound
    @memberof module:jsdoc/src/parser.Parser
    @param {event} e
    @param {string} e.comment The text content of the JSDoc comment
    @param {number} e.lineno The line number associated with the found comment.
    @param {string} e.filename The file name associated with the found comment.
*/
/*global env: true, Packages: true */
/**
 * @module jsdoc/src/parser
 */
'use strict';

var Doclet = require('jsdoc/doclet');
var name = require('jsdoc/name');
var Syntax = require('jsdoc/src/syntax').Syntax;
var util = require('util');

var hasOwnProp = Object.prototype.hasOwnProperty;

// Prefix for JavaScript strings that were provided in lieu of a filename.
var SCHEMA = 'javascript:';
// TODO: docs
var PARSERS = exports.PARSERS = {
    esprima: 'jsdoc/src/parser',
    rhino: 'rhino/jsdoc/src/parser'
};

// TODO: docs
exports.createParser = function(type) {
    var path = require('jsdoc/path');
    var runtime = require('jsdoc/util/runtime');

    var modulePath;

    if (!type) {
        type = runtime.isRhino() ? 'rhino' : 'esprima';
    }

    if (PARSERS[type]) {
        modulePath = PARSERS[type];
    }
    else {
        modulePath = path.join( path.getResourcePath(path.dirname(type)), path.basename(type) );
    }

    try {
        return new ( require(modulePath) ).Parser();
    }
    catch (e) {
        throw new Error('Unable to create the parser type "' + type + '": ' + e);
    }
};


// TODO: docs
/**
 * @class
 * @mixes module:events.EventEmitter
 *
 * @example <caption>Create a new parser.</caption>
 * var jsdocParser = new (require('jsdoc/src/parser').Parser)();
 */
var Parser = exports.Parser = function(builderInstance, visitorInstance, walkerInstance) {
    this.clear();

    this._astBuilder = builderInstance || new (require('jsdoc/src/astbuilder')).AstBuilder();
    this._visitor = visitorInstance || new (require('jsdoc/src/visitor')).Visitor(this);
    this._walker = walkerInstance || new (require('jsdoc/src/walker')).Walker();

    Object.defineProperties(this, {
        astBuilder: {
            get: function() {
                return this._astBuilder;
            }
        },
        visitor: {
            get: function() {
                return this._visitor;
            }
        },
        walker: {
            get: function() {
                return this._walker;
            }
        }
    });
};
util.inherits(Parser, require('events').EventEmitter);

// TODO: docs
Parser.prototype.clear = function() {
    this._resultBuffer = [];
    this.refs = {
        __global__: {
            meta: {}
        }
    };
};

// TODO: update docs
/**
 * Parse the given source files for JSDoc comments.
 * @param {Array.<string>} sourceFiles An array of filepaths to the JavaScript sources.
 * @param {string} [encoding=utf8]
 *
 * @fires module:jsdoc/src/parser.Parser.parseBegin
 * @fires module:jsdoc/src/parser.Parser.fileBegin
 * @fires module:jsdoc/src/parser.Parser.jsdocCommentFound
 * @fires module:jsdoc/src/parser.Parser.symbolFound
 * @fires module:jsdoc/src/parser.Parser.newDoclet
 * @fires module:jsdoc/src/parser.Parser.fileComplete
 * @fires module:jsdoc/src/parser.Parser.parseComplete
 *
 * @example <caption>Parse two source files.</caption>
 * var myFiles = ['file1.js', 'file2.js'];
 * var docs = jsdocParser.parse(myFiles);
 */
Parser.prototype.parse = function(sourceFiles, encoding) {
    encoding = encoding || env.conf.encoding || 'utf8';

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
                // TODO: shouldn't this be fatal if we're not in lenient mode?
                console.error('FILE READ ERROR: in module:jsdoc/src/parser.Parser#parse: "' +
                    filename + '" ' + e);
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

// TODO: docs
Parser.prototype.fireProcessingComplete = function(doclets) {
    this.emit('processingComplete', { doclets: doclets });
};

// TODO: docs
Parser.prototype.results = function() {
    return this._resultBuffer;
};

// TODO: update docs
/**
 * @param {Object} o The parse result to add to the result buffer.
 */
Parser.prototype.addResult = function(o) {
    this._resultBuffer.push(o);
};

// TODO: docs
Parser.prototype.addAstNodeVisitor = function(visitor) {
    this._visitor.addAstNodeVisitor(visitor);
};

// TODO: docs
Parser.prototype.getAstNodeVisitors = function() {
    return this._visitor.getAstNodeVisitors();
};

// TODO: docs
function pretreat(code) {
    return code
        // comment out hashbang at the top of the file, like: #!/usr/bin/env node
        .replace(/^(\#\![\S \t]+\r?\n)/, '// $1')

        // to support code minifiers that preserve /*! comments, treat /*!* as equivalent to /**
        .replace(/\/\*\!\*/g, '/**')
        // merge adjacent doclets
        .replace(/\*\/\/\*\*+/g, '@also')
        // add a dummy name to object literals that are lent to a function prototype
        //   like: return @lends {
        .replace(/(\/\*\*[^\*\/]*?[\*\s]*@lends\s(?:[^\*]|\*(?!\/))*\*\/\s*)\{/g, '$1 ____ = {')
        //   like: @lends return {
        .replace(/(\/\*\*[^\*\/]*?@lends\b[^\*\/]*?\*\/)(\s*)return(\s*)\{/g,
            '$2$3 return $1 ____ = {');
}

/** @private */
Parser.prototype._parseSourceCode = function(sourceCode, sourceName) {
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
        sourceName = e.filename;

        sourceCode = pretreat(e.source);

        ast = this._astBuilder.build(sourceCode, sourceName);
        this._walker.recurse(sourceName, ast, this._visitor);
    }

    this.emit('fileComplete', e);
};

// TODO: docs
Parser.prototype.addDocletRef = function(e) {
    var node;

    if (e && e.code && e.code.node) {
        node = e.code.node;
        // allow lookup from value => doclet
        if (e.doclet) {
            this.refs[node.nodeId] = e.doclet;
        }
        // keep references to undocumented anonymous functions, too, as they might have scoped vars
        else if (
            (node.type === Syntax.FunctionDeclaration || node.type === Syntax.FunctionExpression) &&
            !this.refs[node.nodeId] ) {
            this.refs[node.nodeId] = {
                longname: Doclet.ANONYMOUS_LONGNAME,
                meta: {
                    code: e.code
                }
            };
        }
    }
};

// TODO: docs
Parser.prototype._getDoclet = function(id) {
    if ( hasOwnProp.call(this.refs, id) ) {
        return this.refs[id];
    }

    return null;
};

// TODO: docs
/**
 * @private
 * @memberof module:src/parser.Parser
 */
function nodeToString(node) {
    var str;

    if (!node || !node.type) {
        return;
    }

    switch (node.type) {
        case Syntax.AssignmentExpression:
            str = nodeToString(node.left);
            break;

        case Syntax.FunctionDeclaration:
            // falls through
        
        case Syntax.FunctionExpression:
            str = 'function';
            break;

        case Syntax.Identifier:
            str = node.name;
            break;

        case Syntax.Literal:
            str = String(node.value);
            break;

        case Syntax.MemberExpression:
            // could be computed (like foo['bar']) or not (like foo.bar)
            str = nodeToString(node.object);
            if (node.computed) {
                str += util.format( '[%s]', node.property.raw || nodeToString(node.property) );
            }
            else {
                str += '.' + nodeToString(node.property);
            }
            break;

        case Syntax.ThisExpression:
            str = 'this';
            break;

        case Syntax.UnaryExpression:
            // like -1; operator can be prefix or postfix
            str = nodeToString(node.argument);

            if (node.prefix) {
                str = node.operator + str;
            }
            else {
                str = str + node.operator;
            }
            break;

        case Syntax.VariableDeclarator:
            str = nodeToString(node.id);
            break;

        default:
            str = Syntax[node.type] || 'UnknownType';
    }

    return str;
}

// TODO: docs
function getParamNames(node) {
    if (!node.params) {
        return [];
    }

    return node.params.map(function(param) {
        return nodeToString(param);
    });
}

// TODO: docs
function isAccessor(node) {
    return node.kind === 'get' || node.kind === 'set';
}

// TODO: docs
function isAssignment(node) {
    return node && (node.type === Syntax.AssignmentExpression ||
        node.type === Syntax.VariableDeclarator);
}

// TODO: docs
/**
 * Retrieve information about the node, including its name and type.
 * @memberof module:jsdoc/src/parser.Parser
 */
Parser.prototype.getNodeInfo = function(node) {
    var string;

    var about = {};
    var accessor = false;

    switch (node.type) {
        // like: "foo = 'bar'" (after foo has been declared)
        case Syntax.AssignmentExpression:
            about.node = node.right;
            about.name = nodeToString(node.left);
            about.type = about.node.type;
            about.value = nodeToString(about.node);
            break;

        // like: "function foo() {}"
        case Syntax.FunctionDeclaration:
            about.node = node;
            about.name = nodeToString(node.id);
            about.type = nodeToString(node);
            about.value = nodeToString(about.node);
            about.paramnames = getParamNames(node);
            break;
        
        // like the function in: "var foo = function() {}"
        case Syntax.FunctionExpression:
            about.node = node;
            about.name = '';
            about.type = nodeToString(node);
            about.value = nodeToString(about.node);
            about.paramnames = getParamNames(node);
            break;

        // like "a.b.c"
        case Syntax.MemberExpression:
            about.node = node;
            about.name = nodeToString(about.node);
            about.type = about.node.type;
            break;

        // like "a: 0" in "var foo = {a: 0}"
        case Syntax.Property:
            accessor = isAccessor(node);

            about.node = node.value;
            about.name = nodeToString(node.key);
            about.value = nodeToString(about.node);

            if (accessor) {
                about.type = nodeToString(node);
                about.paramnames = getParamNames(node);
            }
            else {
                about.type = about.node.type;
            }

            break;

        // like: "var i = 0" (has init property)
        // like: "var i" (no init property)
        case Syntax.VariableDeclarator:
            about.node = node.init || node.id;
            about.name = node.id.name;
            about.type = about.node.type || 'undefined';
            about.value = nodeToString(about.node);
            break;

        default:
            string = nodeToString(node);
            if (string) {
                about.name = string;
            }
    }

    return about;
};

// TODO: docs
/**
 * @param {string} name - The symbol's longname.
 * @return {string} The symbol's basename.
 */
Parser.prototype.getBasename = function(name) {
    if (name !== undefined) {
        return name.replace(/^([$a-z_][$a-z_0-9]*).*?$/i, '$1');
    }
};

// TODO: docs
function definedInScope(doclet, basename) {
    return !!doclet && !!doclet.meta && !!doclet.meta.vars &&
        hasOwnProp.call(doclet.meta.vars, basename);
}

// TODO: docs
/**
 * Given a node, determine what the node is a member of.
 * @param {astnode} node
 * @returns {string} The long name of the node that this is a member of.
 */
Parser.prototype.astnodeToMemberof = function(node) {
    var basename;
    var doclet;
    var scope;

    var result = '';
    var type = node.type;

    if ( (type === Syntax.FunctionDeclaration || type === Syntax.FunctionExpression ||
        type === Syntax.VariableDeclarator) && node.enclosingScope ) {
        doclet = this._getDoclet(node.enclosingScope.nodeId);
        
        if (!doclet) {
            result = Doclet.ANONYMOUS_LONGNAME + name.INNER;
       }
        else {
            result = (doclet.longname || doclet.name) + name.INNER;
        }
    }
    else {
        // check local references for aliases
        scope = node;
        basename = this.getBasename( nodeToString(node) );
        
        // walk up the scope chain until we find the scope in which the node is defined
        while (scope.enclosingScope) {
            doclet = this._getDoclet(scope.enclosingScope.nodeId);
            if ( doclet && definedInScope(doclet, basename) ) {
                result = [doclet.meta.vars[basename], basename];
                break;
            }
            else {
                // move up
                scope = scope.enclosingScope;
            }
        }

        // do we know that it's a global?
        doclet = this.refs.__global__;
        if ( doclet && definedInScope(doclet, basename) ) {
            result = [doclet.meta.vars[basename], basename];
        }

        // have we seen the node's parent? if so, use that
        else if (node.parent) {
            doclet = this._getDoclet(node.parent.nodeId);

            if (!doclet) {
                // global?
            }
            else {
                result = doclet.longname || doclet.name;
            }
        }
    }

    return result;
};

// TODO: docs
/**
 * Resolve what "this" refers to relative to a node.
 * @param {astnode} node - The "this" node
 * @returns {string} The longname of the enclosing node.
 */
Parser.prototype.resolveThis = function(node) {
    var doclet;
    var result;

    if (node.enclosingScope) {
        doclet = this._getDoclet(node.enclosingScope.nodeId);

        if (!doclet) {
            result = Doclet.ANONYMOUS_LONGNAME; // TODO handle global this?
        }
        else if (doclet['this']) {
            result = doclet['this'];
        }
        // like: Foo.constructor = function(n) { /** blah */ this.name = n; }
        else if (doclet.kind === 'function' && doclet.memberof) {
            result = doclet.memberof;
        }
        // like: var foo = function(n) { /** blah */ this.bar = n; }
        else if ( doclet.kind === 'member' && isAssignment(node) ) {
            result = doclet.longname || doclet.name;
        }
        // walk up to the closest class we can find
        else if (doclet.kind === 'class' || doclet.kind === 'module') {
            result = doclet.longname || doclet.name;
        }
        else if (node.enclosingScope) {
            result = this.resolveThis(node.enclosingScope);
        }
    }
    else if (node.parent) {
        doclet = this.refs[node.parent.nodeId];

        // TODO: is this behavior correct? when do we get here?
        if (!doclet) {
            result = ''; // global?
        }
        else {
            result = doclet.longname || doclet.name;
        }
    }
    // TODO: is this behavior correct? when do we get here?
    else {
        result = ''; // global?
    }

    return result;
};

// TODO: docs
/**
 * Given 'var foo = { x: 1 }', find foo from x.
 */
Parser.prototype.resolvePropertyParent = function(node) {
    var doclet;

    if (node.parent) {
        doclet = this._getDoclet(node.parent.nodeId);
    }

    return doclet;
};

// TODO docs
/**
 * Resolve what function a var is limited to.
 * @param {astnode} node
 * @param {string} basename The leftmost name in the long name: in foo.bar.zip the basename is foo.
 */
Parser.prototype.resolveVar = function(node, basename) {
    var doclet;
    var result;

    var scope = node.enclosingScope;

    if (!scope) {
        result = ''; // global
    }
    else {
        doclet = this._getDoclet(scope.nodeId);
        if ( definedInScope(doclet, basename) ) {
            result = doclet.longname;
        }
        else {
            result = this.resolveVar(scope, basename);
        }
    }

    return result;
};

// TODO: docs
Parser.prototype.resolveEnum = function(e) {
    var doclet = this.resolvePropertyParent(e.code.node.parent);

    if (doclet && doclet.isEnum) {
        if (!doclet.properties) {
            doclet.properties = [];
        }

        // members of an enum inherit the enum's type
        if (doclet.type && !e.doclet.type) {
            e.doclet.type = doclet.type;
        }

        delete e.doclet.undocumented;
        e.doclet.defaultvalue = e.doclet.meta.code.value;

        // add a copy of the doclet to the parent's properties
        doclet.properties.push( require('jsdoc/util/doop').doop(e.doclet) );
    }
};

// TODO: document other events
/**
 * Fired once for each JSDoc comment in the current source code.
 * @event jsdocCommentFound
 * @memberof module:jsdoc/src/parser.Parser
 * @param {event} e
 * @param {string} e.comment The text content of the JSDoc comment
 * @param {number} e.lineno The line number associated with the found comment.
 * @param {string} e.filename The file name associated with the found comment.
 */

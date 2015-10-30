/**
 * @module jsdoc/src/parser
 */
'use strict';

var events = require('events');
var fs = require('jsdoc/fs');
var jsdoc = {
    doclet: require('jsdoc/doclet'),
    env: require('jsdoc/env'),
    name: require('jsdoc/name'),
    src: {
        astnode: require('jsdoc/src/astnode'),
        syntax: require('jsdoc/src/syntax')
    },
    util: {
        doop: require('jsdoc/util/doop'),
        runtime: require('jsdoc/util/runtime')
    }
};
var logger = require('jsdoc/util/logger');
var path = require('jsdoc/path');
var util = require('util');

var hasOwnProp = Object.prototype.hasOwnProperty;
var Syntax = jsdoc.src.syntax.Syntax;

// TODO: docs
var PARSERS = exports.PARSERS = {
    js: 'jsdoc/src/parser'
};
/* eslint-disable no-script-url */
// Prefix for JavaScript strings that were provided in lieu of a filename.
var SCHEMA = 'javascript:';
/* eslint-enable no-script-url */

function DocletCache() {
    this._doclets = {};
}

DocletCache.prototype.get = function(name) {
    if ( !hasOwnProp.call(this._doclets, name) ) {
        return null;
    }

    // always return the most recent doclet
    return this._doclets[name][this._doclets[name].length - 1];
};

DocletCache.prototype.put = function(name, value) {
    if ( !hasOwnProp.call(this._doclets, name) ) {
        this._doclets[name] = [];
    }

    this._doclets[name].push(value);
};

// TODO: docs
exports.createParser = function(type) {
    var modulePath;

    if (!type) {
        /* istanbul ignore next */
        type = 'js';
    }

    if (hasOwnProp.call(PARSERS, type)) {
        modulePath = PARSERS[type];
    }
    else {
        logger.fatal('The parser type "%s" is not recognized.', type);
        return null;
    }

    return new ( require(modulePath) ).Parser();
};

// TODO: docs
/**
 * @class
 * @alias module:jsdoc/src/parser.Parser
 * @mixes module:events.EventEmitter
 *
 * @example <caption>Create a new parser.</caption>
 * var jsdocParser = new (require('jsdoc/src/parser').Parser)();
 */
var Parser = exports.Parser = function(builderInstance, visitorInstance, walkerInstance) {
    this.clear();

    this._astBuilder = builderInstance || new (require('jsdoc/src/astbuilder')).AstBuilder();
    this._visitor = visitorInstance || new (require('jsdoc/src/visitor')).Visitor();
    this._walker = walkerInstance || new (require('jsdoc/src/walker')).Walker();

    this._visitor.setParser(this);

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
util.inherits(Parser, events.EventEmitter);

// TODO: docs
Parser.prototype.clear = function() {
    this._resultBuffer = [];
    this._byNodeId = new DocletCache();
    this._byLongname = new DocletCache();
    this._byLongname.put(jsdoc.name.LONGNAMES.GLOBAL, {
        meta: {}
    });
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
    encoding = encoding || jsdoc.env.conf.encoding || 'utf8';

    var filename = '';
    var sourceCode = '';
    var parsedFiles = [];
    var e = {};

    if (typeof sourceFiles === 'string') {
        sourceFiles = [sourceFiles];
    }

    e.sourcefiles = sourceFiles;
    logger.debug('Parsing source files: %j', sourceFiles);

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
                sourceCode = fs.readFileSync(filename, encoding);
            }
            catch (err) {
                logger.error('Unable to read and parse the source file %s: %s', filename, err);
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
    logger.debug('Finished parsing source files.');

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
        .replace(/\*\/\/\*\*+/g, '@also');
}

/** @private */
Parser.prototype._parseSourceCode = function(sourceCode, sourceName) {
    var ast;
    var globalScope;

    var e = {
        filename: sourceName
    };

    this.emit('fileBegin', e);
    logger.info('Parsing %s ...', sourceName);

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
        if (ast) {
            this._walkAst(ast, this._visitor, sourceName);
        }
    }

    this.emit('fileComplete', e);
};

/** @private */
Parser.prototype._walkAst = function(ast, visitor, sourceName) {
    this._walker.recurse(ast, visitor, sourceName);
};

// TODO: docs
Parser.prototype.addDocletRef = function(e) {
    var fakeDoclet;
    var node;

    if (e && e.code && e.code.node) {
        node = e.code.node;
        if (e.doclet) {
            // allow lookup from node ID => doclet
            this._byNodeId.put(node.nodeId, e.doclet);
            this._byLongname.put(e.doclet.longname, e.doclet);
        }
        // keep references to undocumented anonymous functions, too, as they might have scoped vars
        else if (
            (node.type === Syntax.FunctionDeclaration || node.type === Syntax.FunctionExpression ||
                node.type === Syntax.ArrowFunctionExpression) &&
                !this._getDocletById(node.nodeId) ) {
            fakeDoclet = {
                longname: jsdoc.name.LONGNAMES.ANONYMOUS,
                meta: {
                    code: e.code
                }
            };
            this._byNodeId.put(node.nodeId, fakeDoclet);
            this._byLongname.put(fakeDoclet.longname, fakeDoclet);
        }
    }
};

// TODO: docs
Parser.prototype._getDocletById = function(id) {
    return this._byNodeId.get(id);
};

/**
 * Retrieve the most recently seen doclet that has the given longname.
 *
 * @param {string} longname - The longname to search for.
 * @return {module:jsdoc/doclet.Doclet?} The most recent doclet for the longname.
 */
Parser.prototype._getDocletByLongname = function(longname) {
    return this._byLongname.get(longname);
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
    return !!doclet && !!doclet.meta && !!doclet.meta.vars && !!basename &&
        hasOwnProp.call(doclet.meta.vars, basename);
}

// TODO: docs
/**
 * Given a node, determine what the node is a member of.
 * @param {node} node
 * @returns {string} The long name of the node that this is a member of.
 */
Parser.prototype.astnodeToMemberof = function(node) {
    var basename;
    var doclet;
    var scope;

    var result = '';
    var type = node.type;

    if ( (type === Syntax.FunctionDeclaration || type === Syntax.FunctionExpression ||
        type === Syntax.ArrowFunctionExpression || type === Syntax.VariableDeclarator) &&
        node.enclosingScope ) {
        doclet = this._getDocletById(node.enclosingScope.nodeId);

        if (!doclet) {
            result = jsdoc.name.LONGNAMES.ANONYMOUS + jsdoc.name.SCOPE.PUNC.INNER;
       }
        else {
            result = doclet.longname + jsdoc.name.SCOPE.PUNC.INNER;
        }
    }
    else {
        // check local references for aliases
        scope = node;
        basename = this.getBasename( jsdoc.src.astnode.nodeToValue(node) );

        // walk up the scope chain until we find the scope in which the node is defined
        while (scope.enclosingScope) {
            doclet = this._getDocletById(scope.enclosingScope.nodeId);
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
        doclet = this._getDocletByLongname(jsdoc.name.LONGNAMES.GLOBAL);
        if ( doclet && definedInScope(doclet, basename) ) {
            result = [doclet.meta.vars[basename], basename];
        }
        else {
            doclet = this._getDocletById(node.parent.nodeId);

            // set the result if we found a doclet. (if we didn't, the AST node may describe a
            // global symbol.)
            if (doclet) {
                result = doclet.longname || doclet.name;
            }
        }
    }

    return result;
};

/**
 * Get the doclet for the lowest-level class, if any, that is in the scope chain for a given node.
 *
 * @param {Object} node - The node whose scope chain will be searched.
 * @return {module:jsdoc/doclet.Doclet?} The doclet for the lowest-level class in the node's scope
 * chain.
 */
Parser.prototype._getParentClass = function(node) {
    var doclet;
    var nameAtoms;
    var scope = node.enclosingScope;

    function isClass(d) {
        return d && d.kind === 'class';
    }

    while (scope) {
        // get the doclet, if any, for the parent scope
        doclet = this._getDocletById(scope.nodeId);

        if (doclet) {
            // is the doclet for a class? if so, we're done
            if ( isClass(doclet) ) {
                break;
            }

            // is the doclet for an instance member of a class? if so, try to get the doclet for the
            // owning class
            nameAtoms = jsdoc.name.shorten(doclet.longname);
            if (nameAtoms.scope === jsdoc.name.SCOPE.PUNC.INSTANCE) {
                doclet = this._getDocletByLongname(nameAtoms.memberof);
                if ( isClass(doclet) ) {
                    break;
                }
            }
        }

        // move up to the next parent scope
        scope = scope.enclosingScope;
    }

    return (isClass(doclet) ? doclet : null);
};

// TODO: docs
/**
 * Resolve what "this" refers to relative to a node.
 * @param {node} node - The "this" node
 * @returns {string} The longname of the enclosing node.
 */
Parser.prototype.resolveThis = function(node) {
    var doclet;
    var parentClass;
    var result;

    // In general, if there's an enclosing scope, we use the enclosing scope to resolve `this`.
    // For object properties, we use the node's parent (the object) instead.
    if (node.type !== Syntax.Property && node.enclosingScope) {
        doclet = this._getDocletById(node.enclosingScope.nodeId);

        if (!doclet) {
            result = jsdoc.name.LONGNAMES.ANONYMOUS; // TODO handle global this?
        }
        else if (doclet.this) {
            result = doclet.this;
        }
        else if (doclet.kind === 'function' && doclet.memberof) {
            parentClass = this._getParentClass(node);

            // like: function Foo() { this.bar = function(n) { /** blah */ this.name = n; };
            // or:   Foo.prototype.bar = function(n) { /** blah */ this.name = n; };
            // or:   var Foo = exports.Foo = function(n) { /** blah */ this.name = n; };
            // or:   Foo.constructor = function(n) { /** blah */ this.name = n; }
            if ( parentClass || /\.constructor$/.test(doclet.longname) ) {
                result = doclet.memberof;
            }
            // like: function notAClass(n) { /** global this */ this.name = n; }
            else {
                result = doclet.longname;
            }
        }
        // like: var foo = function(n) { /** blah */ this.bar = n; }
        else if ( doclet.kind === 'member' && jsdoc.src.astnode.isAssignment(node) ) {
            result = doclet.longname;
        }
        // walk up to the closest class we can find
        else if (doclet.kind === 'class' || doclet.kind === 'module') {
            result = doclet.longname;
        }
        else if (node.enclosingScope) {
            result = this.resolveThis(node.enclosingScope);
        }
    }
    else {
        doclet = this._getDocletById(node.parent.nodeId);

        // TODO: is this behavior correct? when do we get here?
        if (!doclet) {
            result = ''; // global?
        }
        else {
            result = doclet.longname;
        }
    }

    return result;
};

/**
 * Given an AST node representing an object property, find the doclets for the parent object or
 * objects.
 *
 * If the object is part of a simple assignment (for example, `var foo = { x: 1 }`), this method
 * returns a single doclet (in this case, the doclet for `foo`).
 *
 * If the object is part of a chained assignment (for example, `var foo = exports.FOO = { x: 1 }`,
 * this method returns multiple doclets (in this case, the doclets for `foo` and `exports.FOO`).
 *
 * @param {Object} node - An AST node representing an object property.
 * @return {Array.<module:jsdoc/doclet.Doclet>} An array of doclets for the parent object or objects, or
 * an empty array if no doclets are found.
 */
Parser.prototype.resolvePropertyParents = function(node) {
    var currentAncestor = node.parent;
    var nextAncestor = currentAncestor.parent;
    var doclet;
    var doclets = [];

    while (currentAncestor) {
        doclet = this._getDocletById(currentAncestor.nodeId);
        if (doclet) {
            doclets.push(doclet);
        }

        // if the next ancestor is an assignment expression (for example, `exports.FOO` in
        // `var foo = exports.FOO = { x: 1 }`, keep walking upwards
        if (nextAncestor && nextAncestor.type === Syntax.AssignmentExpression) {
            nextAncestor = nextAncestor.parent;
            currentAncestor = currentAncestor.parent;
        }
        // otherwise, we're done
        else {
            currentAncestor = null;
        }
    }

    return doclets;
};

// TODO: docs
/**
 * Resolve what function a var is limited to.
 * @param {astnode} node
 * @param {string} basename The leftmost name in the long name: in foo.bar.zip the basename is foo.
 */
Parser.prototype.resolveVar = function(node, basename) {
    var doclet;
    var result;
    var scope = node.enclosingScope;

    // HACK: return an empty string for function declarations so they don't end up in anonymous
    // scope (see #685 and #693)
    if (node.type === Syntax.FunctionDeclaration) {
        result = '';
    }
    else if (!scope) {
        result = ''; // global
    }
    else {
        doclet = this._getDocletById(scope.nodeId);
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
    var doclets = this.resolvePropertyParents(e.code.node.parent);

    doclets.forEach(function(doclet) {
        if (doclet && doclet.isEnum) {
            doclet.properties = doclet.properties || [];

            // members of an enum inherit the enum's type
            if (doclet.type && !e.doclet.type) {
                // clone the type to prevent circular refs
                e.doclet.type = jsdoc.util.doop(doclet.type);
            }

            delete e.doclet.undocumented;
            e.doclet.defaultvalue = e.doclet.meta.code.value;

            // add the doclet to the parent's properties
            doclet.properties.push(e.doclet);
        }
    });
};

// TODO: document other events
/**
 * Fired once for each JSDoc comment in the current source code.
 * @event jsdocCommentFound
 * @memberof module:jsdoc/src/parser.Parser
 * @type {Object}
 * @property {string} comment The text content of the JSDoc comment
 * @property {number} lineno The line number associated with the found comment.
 * @property {string} filename The file name associated with the found comment.
 */

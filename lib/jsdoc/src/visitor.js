/**
 * @module jsdoc/src/visitor
 */
'use strict';

// TODO: consider exporting more stuff so users can override it

var jsdoc = {
    doclet: require('jsdoc/doclet'),
    name: require('jsdoc/name'),
    src: {
        astnode: require('jsdoc/src/astnode'),
        syntax: require('jsdoc/src/syntax')
    },
    util: {
        logger: require('jsdoc/util/logger')
    }
};
var util = require('util');

var hasOwnProp = Object.prototype.hasOwnProperty;
var Syntax = jsdoc.src.syntax.Syntax;

// TODO: docs
function getLeadingComment(node) {
    var comment = null;
    var leadingComments = node.leadingComments;

    if (Array.isArray(leadingComments) && leadingComments.length && leadingComments[0].raw) {
        comment = leadingComments[0].raw;
    }

    return comment;
}

// TODO: docs
function makeVarsFinisher(scopeDoclet) {
    return function(e) {
        // no need to evaluate all things related to scopeDoclet again, just use it
        if ( scopeDoclet && e.doclet && (e.doclet.alias || e.doclet.memberof) ) {
            scopeDoclet.meta.vars[e.code.name] = e.doclet.longname;
        }
    };
}

// Given an event, get the parent node's doclet.
function getParentDocletFromEvent(parser, e) {
    if (e.doclet && e.doclet.meta && e.doclet.meta.code && e.doclet.meta.code.node &&
        e.doclet.meta.code.node.parent) {
        return parser._getDocletById(e.doclet.meta.code.node.parent.nodeId);
    }

    return null;
}

/**
 * For function parameters that have inline documentation, create a function that will merge the
 * inline documentation into the function's doclet. If the parameter is already documented in the
 * function's doclet, the inline documentation will be ignored.
 *
 * @private
 * @param {module:jsdoc/src/parser.Parser} parser - The JSDoc parser.
 * @return {function} A function that merges a parameter's inline documentation into the function's
 * doclet.
 */
function makeInlineParamsFinisher(parser) {
    return function(e) {
        var documentedParams;
        var knownParams;
        var param;
        var parentDoclet;

        var i = 0;

        parentDoclet = getParentDocletFromEvent(parser, e);
        if (!parentDoclet) {
            return;
        }

        // we only want to use the doclet if it's param-specific (but not, for example, if it's
        // a param tagged with `@exports` in an AMD module)
        if (e.doclet.kind !== 'param') {
            return;
        }

        parentDoclet.params = parentDoclet.params || [];
        documentedParams = parentDoclet.params;
        knownParams = parentDoclet.meta.code.paramnames || [];

        while (true) {
            param = documentedParams[i];

            // is the param already documented? if so, we don't need to use the doclet
            if (param && param.name === e.doclet.name) {
                e.doclet.undocumented = true;
                break;
            }

            // if we ran out of documented params, or we're at the parameter's actual position,
            // splice in the param at the current index
            if ( !param || i === knownParams.indexOf(e.doclet.name) ) {
                documentedParams.splice(i, 0, {
                    type: e.doclet.type || {},
                    description: '',
                    name: e.doclet.name
                });

                // the doclet is no longer needed
                e.doclet.undocumented = true;

                break;
            }

            i++;
        }
    };
}

/**
 * Given an array of nodes that represent function parameters, find the node for the rest parameter,
 * if any.
 *
 * @private
 * @param {Array.<Object>} params - An array of nodes that represent function parameters.
 * @return {Object?} The node for the rest parameter.
 */
function findRestParam(params) {
    var restParam = null;

    params.some(function(param) {
        if (param.type === Syntax.RestElement) {
            restParam = param;
            return true;
        }
        return false;
    });

    return restParam;
}

/**
 * For functions that may include a rest parameter, create a function that will automatically update
 * the rest parameter's documentation to indicate that the parameter is repeatable. If the parameter
 * is not documented, the function's doclet will remain unchanged.
 *
 * @private
 * @param {module:jsdoc/src/parser.Parser} parser - The JSDoc parser.
 * @return {function} A function that updates the rest parameter's documentation to indicate that
 * the parameter is repeatable.
 */
function makeRestParamFinisher(parser) {
    return function(e) {
        var doclet = e.doclet;
        var documentedParams;
        var restNode;

        if (!doclet) {
            return;
        }

        documentedParams = doclet.params = doclet.params || [];
        restNode = findRestParam(e.code.node.params || e.code.node.value.params);

        if (restNode) {
            for (var i = documentedParams.length - 1; i >= 0; i--) {
                if (documentedParams[i].name === restNode.argument.name) {
                    documentedParams[i].variable = true;
                    break;
                }
            }
        }
    };
}

/**
 * Given an array of nodes that represent function parameters, find the nodes for the default
 * parameters, if any.
 *
 * @private
 * @param {Array.<Object>} params - An array of nodes that represent function parameters.
 * @return {Array.<Object>} The nodes for the default parameters.
 */
function findDefaultParams(params) {
    var defaultParams = [];

    params.forEach(function(param) {
        if (param.type === Syntax.AssignmentPattern) {
            defaultParams.push(param);
        }
        else {
            defaultParams.push(null);
        }
    });

    return defaultParams;
}

/**
 * For functions that may have at least one parameter with default values, create a function that
 * will automatically add the parameters' default values to the function's documentation. If any
 * default value is already documented, the function's doclet will remain unchanged.
 *
 * This function is only intended to handle default parameters whose node type is `Syntax.Literal`
 * (string, numeric, and boolean literals). This is because more complex default values may include,
 * for example, references to internal variables, which it may not make sense to include in
 * documentation.
 *
 * @private
 * @param {module:jsdoc/src/parser.Parser} parser - The JSDoc parser.
 * @return {function} A function that updates the function doclet to include the default values of
 * parameters.
 */
function makeDefaultParamFinisher(parser) {
    return function(e) {
        var defaultValues;
        var doclet = e.doclet;
        var documentedParams;
        var paramName;
        var params;

        if (!doclet) {
            return;
        }

        documentedParams = doclet.params = doclet.params || [];
        params = e.code.node.params || e.code.node.value.params;
        defaultValues = findDefaultParams(params);

        for (var i = 0, j = 0, l = params.length; i < l; i++) {
            // bail out if we ran out of documented params
            if (!documentedParams[j]) {
                break;
            }

            // if the current parameter doesn't appear to be documented, move to the next one
            paramName = params[i].type === Syntax.AssignmentPattern ?
                params[i].left.name :
                params[i].name;
            if (paramName !== documentedParams[j].name) {
                continue;
            }

            // add the default value iff a) a literal default value is defined in the code,
            // b) no default value is documented, and c) the default value is not an empty string
            if (defaultValues[i] &&
                defaultValues[i].right &&
                defaultValues[i].right.type === Syntax.Literal &&
                typeof documentedParams[j].defaultvalue === 'undefined' &&
                defaultValues[i].right.value !== '') {
                documentedParams[j].defaultvalue =
                    jsdoc.src.astnode.nodeToValue(defaultValues[i].right);
            }

            // move to the next documented param
            j++;
        }
    };
}

/**
 * For method definitions that are constructors, create a function that will merge portions of the
 * constructor's doclet into the class's doclet, provided that a doclet exists for the class.
 * Merging the constructor's documentation allows ES 2015 classes to be documented in a natural way,
 * with separate JSDoc comments for the class and its constructor.
 *
 * @private
 * @param {module:jsdoc/src/parser.Parser} parser - The JSDoc parser.
 * @return {function} A function that merges the constructor's doclet into the class's doclet.
 */
function makeConstructorFinisher(parser) {
    return function(e) {
        var doclet = e.doclet;
        var parentDoclet = parser._getDocletById(e.code.node.parent.parent.nodeId);

        if (!doclet || !parentDoclet || parentDoclet.undocumented) {
            return;
        }

        if (!parentDoclet.description && doclet.description) {
            parentDoclet.description = doclet.description;
        }
        if (!parentDoclet.params && doclet.params) {
            parentDoclet.params = doclet.params.slice(0);
        }

        doclet.undocumented = true;
    };
}

// TODO: docs
function SymbolFound(node, filename, extras) {
    var self = this;
    extras = extras || {};

    this.id = extras.id || node.nodeId;
    this.comment = extras.comment || getLeadingComment(node) || '@undocumented';
    this.lineno = extras.lineno || node.loc.start.line;
    this.range = extras.range || node.range;
    this.filename = extras.filename || filename;
    this.astnode = extras.astnode || node;
    this.code = extras.code;
    this.event = extras.event || 'symbolFound';
    this.finishers = extras.finishers || [];

    // make sure the event includes properties that don't have default values
    Object.keys(extras).forEach(function(key) {
        self[key] = extras[key];
    });
}

// TODO: docs
function JsdocCommentFound(comment, filename) {
    this.comment = comment.raw;
    this.lineno = comment.loc.start.line;
    this.filename = filename;
    this.range = comment.range;

    Object.defineProperty(this, 'event', {
        value: 'jsdocCommentFound'
    });
}

// TODO: docs
var Visitor = exports.Visitor = function() {
    this._parser = null;

    // Mozilla Parser API node visitors added by plugins
    this._nodeVisitors = [];
    // built-in visitors
    this._visitors = [
        this.visitNodeComments,
        this.visitNode
    ];
};

/**
 * Set the parser instance that visitors can use.
 *
 * @param {module:jsdoc/src/parser.Parser} parser - The parser instance.
 */
Visitor.prototype.setParser = function(parser) {
    this._parser = parser;
};

// TODO: docs
Visitor.prototype.addAstNodeVisitor = function(visitor) {
    this._nodeVisitors.push(visitor);
};

// TODO: docs
Visitor.prototype.removeAstNodeVisitor = function(visitor) {
    var idx = this._nodeVisitors.indexOf(visitor);
    if (idx !== -1) {
        this._nodeVisitors.splice(idx, 1);
    }
};

// TODO: docs
Visitor.prototype.getAstNodeVisitors = function() {
    return this._nodeVisitors;
};

// TODO: docs; visitor signature is (node, parser, filename)
Visitor.prototype.visit = function(node, filename) {
    var i;
    var l;

    for (i = 0, l = this._visitors.length; i < l; i++) {
        this._visitors[i].call(this, node, this._parser, filename);
    }

    return true;
};

// TODO: docs
/**
 * Verify that a block comment exists and that its leading delimiter does not contain three or more
 * asterisks.
 *
 * @private
 * @memberof module:jsdoc/src/parser.Parser
 */
function isValidJsdoc(commentSrc) {
    return commentSrc && commentSrc.indexOf('/***') !== 0;
}

// TODO: docs
function hasJsdocComments(node) {
    return (node && node.leadingComments && node.leadingComments.length) ||
        (node && node.trailingComments && node.trailingComments.length);
}

// TODO: docs
function removeCommentDelimiters(comment) {
    return comment.substring(2, comment.length - 2);
}

// TODO: docs
function updateCommentNode(commentNode, comment) {
    commentNode.raw = comment;
    commentNode.value = removeCommentDelimiters(comment);
}

// TODO: docs
Visitor.prototype.visitNodeComments = function(node, parser, filename) {
    var comment;
    var comments;
    var e;

    var BLOCK_COMMENT = 'Block';

    if ( !hasJsdocComments(node) && (!node.type || node.type !== BLOCK_COMMENT) ) {
        return true;
    }

    comments = (node.type === BLOCK_COMMENT) ? [node] : [];

    if (node.leadingComments && node.leadingComments.length) {
        comments = comments.concat( node.leadingComments.slice(0) );
    }

    if (node.trailingComments && node.trailingComments.length) {
        comments = comments.concat( node.trailingComments.slice(0) );
    }

    for (var i = 0, l = comments.length; i < l; i++) {
        comment = comments[i];
        if ( isValidJsdoc(comment.raw) ) {
            e = new JsdocCommentFound(comment, filename);

            parser.emit(e.event, e, parser);

            if (e.comment !== comment.raw) {
                updateCommentNode(comment, e.comment);
            }
        }
    }

    return true;
};

// TODO: docs
Visitor.prototype.visitNode = function(node, parser, filename) {
    var i;
    var l;

    var e = this.makeSymbolFoundEvent(node, parser, filename);

    if (this._nodeVisitors && this._nodeVisitors.length) {
        for (i = 0, l = this._nodeVisitors.length; i < l; i++) {
            this._nodeVisitors[i].visitNode(node, e, parser, filename);
            if (e.stopPropagation) {
                break;
            }
        }
    }

    if (!e.preventDefault && e.comment && isValidJsdoc(e.comment)) {
        parser.emit(e.event, e, parser);
    }

    // add the node to the parser's lookup table
    parser.addDocletRef(e);

    for (i = 0, l = e.finishers.length; i < l; i++) {
        e.finishers[i].call(parser, e);
    }

    return true;
};

// TODO: docs
// TODO: note that it's essential to call this function before you try to resolve names!
function trackVars(parser, node, e) {
    var doclet;
    var enclosingScopeId = node.enclosingScope ? node.enclosingScope.nodeId : null;

    if (enclosingScopeId) {
        doclet = parser._getDocletById(enclosingScopeId);
    }
    else {
        doclet = parser._getDocletByLongname(jsdoc.name.LONGNAMES.GLOBAL);
    }

    if (doclet) {
        doclet.meta.vars = doclet.meta.vars || {};
        doclet.meta.vars[e.code.name] = null;
        e.finishers.push( makeVarsFinisher(doclet) );
    }
}

// TODO: docs
Visitor.prototype.makeSymbolFoundEvent = function(node, parser, filename) {
    var logger = jsdoc.util.logger;

    var e;
    var basename;
    var i;
    var l;
    var parent;

    var extras = {
        code: jsdoc.src.astnode.getInfo(node)
    };

    switch (node.type) {
        // like: i = 0;
        case Syntax.AssignmentExpression:
            e = new SymbolFound(node, filename, extras);

            trackVars(parser, node, e);

            basename = parser.getBasename(e.code.name);
            if (basename !== 'this') {
                e.code.funcscope = parser.resolveVar(node, basename);
            }

            break;

        // like `bar='baz'` in: function foo(bar='baz') {}
        case Syntax.AssignmentPattern:
            parent = node.parent;

            if ( node.leadingComments && parent && jsdoc.src.astnode.isFunction(parent) ) {
                extras.finishers = [makeInlineParamsFinisher(parser)];
                e = new SymbolFound(node, filename, extras);

                trackVars(parser, node, e);
            }

            break;

        // like: class foo {}
        case Syntax.ClassDeclaration:
            // falls through

        // like: let MyClass = class {}
        case Syntax.ClassExpression:
            e = new SymbolFound(node, filename, extras);

            trackVars(parser, node, e);

            basename = parser.getBasename(e.code.name);

            break;

        // like: export * from 'foo'
        case Syntax.ExportAllDeclaration:
            e = new SymbolFound(node, filename, extras);

            break;

        // like: export default 'foo'
        case Syntax.ExportDefaultDeclaration:
            // falls through

        // like: export var foo;
        // or:   export {foo}
        case Syntax.ExportNamedDeclaration:
            // falls through

        // like `foo as bar` in: export {foo as bar}
        case Syntax.ExportSpecifier:
            e = new SymbolFound(node, filename, extras);

            trackVars(parser, node, e);

            break;

        // like: var foo = () => {};
        case Syntax.ArrowFunctionExpression:
            // falls through

        // like: function foo() {}
        case Syntax.FunctionDeclaration:
            // falls through

        // like: var foo = function() {};
        case Syntax.FunctionExpression:
            extras.finishers = [
                // handle cases where at least one parameter has a default value
                makeDefaultParamFinisher(parser),
                // handle rest parameters
                makeRestParamFinisher(parser)
            ];

            e = new SymbolFound(node, filename, extras);

            trackVars(parser, node, e);

            basename = parser.getBasename(e.code.name);
            e.code.funcscope = parser.resolveVar(node, basename);

            break;

        // like `bar` in: function foo(/** @type {string} */ bar) {}
        // or `module` in: define("MyModule", function(/** @exports MyModule */ module) {}
        // This is an extremely common type of node; we only care about function parameters with
        // inline comments. No need to fire an event in other cases.
        case Syntax.Identifier:
            parent = node.parent;

            // function parameters with inline comments
            if ( node.leadingComments && parent && jsdoc.src.astnode.isFunction(parent) ) {
                extras.finishers = [makeInlineParamsFinisher(parser)];
                e = new SymbolFound(node, filename, extras);

                trackVars(parser, node, e);
            }

            break;

        // like `obj.prop` in: /** @typedef {string} */ obj.prop;
        // Closure Compiler uses this pattern extensively for enums.
        // No need to fire an event unless the node is already commented.
        case Syntax.MemberExpression:
            if (node.leadingComments) {
                e = new SymbolFound(node, filename, extras);
            }

            break;

        // like: foo() {}
        // or:   constructor() {}
        case Syntax.MethodDefinition:
            extras.finishers = [
                // handle cases where at least one parameter has a default value
                makeDefaultParamFinisher(parser),
                // handle rest parameters
                makeRestParamFinisher(parser)
            ];
            // for constructors, we attempt to merge the constructor's docs into the class's docs
            if (node.kind === 'constructor') {
                extras.finishers.push( makeConstructorFinisher(parser) );
            }

            e = new SymbolFound(node, filename, extras);

            break;

        // like `{}` in: function Foo = Class.create(/** @lends Foo */ {});
        case Syntax.ObjectExpression:
            e = new SymbolFound(node, filename, extras);

            break;

        // like `bar: true` in: var foo = { bar: true };
        // like `get bar() {}` in: var foo = { get bar() {} };
        case Syntax.Property:
            if (node.kind !== 'get' && node.kind !== 'set') {
                extras.finishers = [parser.resolveEnum];
            }

            e = new SymbolFound(node, filename, extras);

            break;

        // like `...bar` in: function foo(...bar) {}
        case Syntax.RestElement:
            parent = node.parent;

            if ( node.leadingComments && parent && jsdoc.src.astnode.isFunction(parent) ) {
                extras.finishers = [makeInlineParamsFinisher(parser)];
                e = new SymbolFound(node, filename, extras);

                trackVars(parser, node, e);
            }

            break;

        // like: var i = 0;
        case Syntax.VariableDeclarator:
            e = new SymbolFound(node, filename, extras);

            trackVars(parser, node, e);

            basename = parser.getBasename(e.code.name);
            // auto-detect constants
            if (node.parent.kind === 'const') {
                e.code.kind = 'constant';
            }

            break;

        default:
            // ignore
    }

    if (!e) {
        e = {
            finishers: []
        };
    }

    return e;
};

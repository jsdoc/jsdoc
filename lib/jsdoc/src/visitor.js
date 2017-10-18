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

var Syntax = jsdoc.src.syntax.Syntax;

/**
 * Get the raw comment string for a block comment node.
 *
 * @private
 * @param {!Object} comment - A comment node with `type` and `value` properties.
 */
function getRawComment(comment) {
    return '/*' + comment.value + '*/';
}

/**
 * Check whether a comment node represents a block comment.
 *
 * @param {!Object} comment - A comment node with `type` and `value` properties.
 * @return {boolean} `true` if the comment is a block comment, `false` otherwise.
 */
function isBlockComment(comment) {
    return comment.type === 'CommentBlock';
}

/**
 * Verify that a block comment exists; that it is a JSDoc comment; and that its leading delimiter
 * does not contain three or more asterisks.
 *
 * @private
 * @memberof module:jsdoc/src/parser.Parser
 */
function isValidJsdoc(commentSrc) {
    return commentSrc && commentSrc.length > 4 && commentSrc.indexOf('/**') === 0 &&
        commentSrc.indexOf('/***') !== 0;
}

// TODO: docs
function getLeadingJsdocComment(node) {
    var comment = null;
    var leadingComments = node.leadingComments;

    if (Array.isArray(leadingComments) && leadingComments.length) {
        // the attached comments may include line comments, which we don't want
        leadingComments = leadingComments.filter(isBlockComment);

        if (leadingComments.length) {
            // treat the comment closest to the node as the leading comment
            comment = getRawComment(leadingComments[leadingComments.length - 1]);

            if ( !isValidJsdoc(comment) ) {
                comment = null;
            }
        }
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
 * @return {function} A function that updates the rest parameter's documentation to indicate that
 * the parameter is repeatable.
 */
function makeRestParamFinisher() {
    return function(e) {
        var doclet = e.doclet;
        var documentedParams;
        var restNode;

        if (!doclet) {
            return;
        }

        documentedParams = doclet.params = doclet.params || [];
        restNode = findRestParam(e.code.node.params ||
            (e.code.node.value && e.code.node.value.params) ||
            (e.code.node.init && e.code.node.init.params) ||
            []);

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
 * @return {function} A function that updates the function doclet to include the default values of
 * parameters.
 */
function makeDefaultParamFinisher() {
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
        params = e.code.node.params || (e.code.node.value && e.code.node.value.params) || [];
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
        var combined;
        var doclet = e.doclet;
        var parentDoclet;

        // for class declarations that are named module exports, the node that's documented is the
        // ExportNamedDeclaration, not the ClassDeclaration
        if (e.code.node.parent.parent.parent &&
            e.code.node.parent.parent.parent.type === Syntax.ExportNamedDeclaration) {
            parentDoclet = parser._getDocletById(e.code.node.parent.parent.parent.nodeId);
        }
        // otherwise, we want the ClassDeclaration
        else {
            parentDoclet = parser._getDocletById(e.code.node.parent.parent.nodeId);
        }

        if (!doclet || !parentDoclet || parentDoclet.undocumented) {
            return;
        }

        combined = jsdoc.doclet.combine(doclet, parentDoclet);
        combined.longname = parentDoclet.longname;

        // make sure an undocumented constructor won't override a documented class
        // remove the 'undocumented = true' property when the parentDoclet didn't had it.
        if (combined.undocumented === true && !parentDoclet.undocumented) {
            delete combined.undocumented;
        }
        // add the parentDoclet's comment back if only the constructor didn't had any comments.
        if (combined.comment === '' && parentDoclet.comment !== '') {
            combined.comment = parentDoclet.comment;
        }

        if (parentDoclet.memberof) {
            combined.memberof = parentDoclet.memberof;
        }

        parser.addResult(combined);

        parentDoclet.undocumented = doclet.undocumented = true;
    };
}

/**
 * Create a function that will add an `async` property to the doclet for async functions.
 *
 * @private
 * @return {function} A function that adds an `async` property to the doclet of async functions.
 */
function makeAsyncFunctionFinisher() {
    return function(e) {
        var doclet = e.doclet;

        if (!doclet) {
            return;
        }

        if ( e.code.node.async || (e.code.node.value && e.code.node.value.async) ||
            (e.code.node.init && e.code.node.init.async) ) {
            doclet.async = true;
        }
    };
}

/**
 * Create a function that will mark a doclet as private.
 *
 * @private
 * @return {function} A function that marks a doclet as private.
 */
function makePrivatePropertyFinisher() {
    return function(e) {
        e.doclet.access = 'private';
    };
}

/**
 * Create a function that will mark a doclet as a generator function.
 *
 * @private
 * @return {function} A function that marks a doclet as a generator function.
 */
function makeGeneratorFinisher() {
    return function(e) {
        var doclet = e.doclet;

        if (!doclet) {
            return;
        }

        if ( e.code.node.generator || (e.code.node.init && e.code.node.init.generator) ||
            (e.code.node.value && e.code.node.value.generator) ) {
            doclet.generator = true;
        }
    };
}

// TODO: docs
function SymbolFound(node, filename, extras) {
    var self = this;

    extras = extras || {};

    this.id = extras.id || node.nodeId;
    this.comment = extras.comment || getLeadingJsdocComment(node) || '@undocumented';
    this.lineno = extras.lineno || node.loc.start.line;
    this.columnno = extras.columnno || node.loc.start.column;
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
function JsdocCommentFound(comment, rawComment, filename) {
    this.comment = rawComment;
    this.lineno = comment.loc.start.line;
    this.columnno = comment.loc.start.column;
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
function hasComments(node) {
    return (node && node.leadingComments && node.leadingComments.length) ||
        (node && node.trailingComments && node.trailingComments.length) ||
        (node && node.innerComments && node.innerComments.length);
}

// TODO: docs
function removeCommentDelimiters(comment) {
    return comment.substring(2, comment.length - 2);
}

// TODO: docs
function updateCommentNode(commentNode, comment) {
    commentNode.value = removeCommentDelimiters(comment);
}

// TODO: docs
Visitor.prototype.visitNodeComments = function(node, parser, filename) {
    var comment;
    var comments;
    var e;
    var isBlock = isBlockComment(node);
    var lastTrailingComment;
    var nextProgramNode;
    var nextProgramNodeIndex;
    var rawComment;

    function addComments(source) {
        comments = comments.concat( source.slice(0) );
    }

    if ( !hasComments(node) && (!node.type || !isBlock) ) {
        return true;
    }

    comments = isBlock ? [node] : [];

    if (node.leadingComments && node.leadingComments.length) {
        addComments(node.leadingComments);
    }

    // trailing comments are always duplicates of leading comments unless they're attached to the
    // Program node...
    if (node.type === Syntax.Program && node.trailingComments && node.trailingComments.length) {
        addComments(node.trailingComments);
    }

    // ...or if they were comments from the end of the file that were erroneously attached to a
    // `'use strict';` declaration (https://github.com/babel/babylon/issues/619).
    if (node.type === Syntax.ExpressionStatement && node.directive === 'use strict' &&
        node.trailingComments && node.trailingComments.length) {
        // to be safe, we verify that the trailing comments came after the next node in the Program
        // body, which means the comments were attached to the wrong node
        if (node.parent.body.length > 1) {
            nextProgramNodeIndex = node.parent.body.indexOf(node) + 1;
            nextProgramNode = node.parent.body[nextProgramNodeIndex];
            lastTrailingComment = node.trailingComments[node.trailingComments.length - 1];

            if (lastTrailingComment.start > nextProgramNode.end) {
                addComments(node.trailingComments);
            }
        }
    }

    if (node.innerComments && node.innerComments.length) {
        addComments(node.innerComments);
    }

    for (var i = 0, l = comments.length; i < l; i++) {
        comment = comments[i];
        rawComment = getRawComment(comment);

        if ( isValidJsdoc(rawComment) ) {
            e = new JsdocCommentFound(comment, rawComment, filename);

            parser.emit(e.event, e, parser);

            if (e.comment !== rawComment) {
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

    if (!e.preventDefault) {
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
    var e;
    var basename;
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

        // like `#b = 1` in: class A { #b = 1; }
        case Syntax.ClassPrivateProperty:
            extras.finishers = [
                parser.resolveEnum,
                makePrivatePropertyFinisher()
            ];

            e = new SymbolFound(node, filename, extras);

            break;

        // like `b = 1` in: class A { b = 1; }
        case Syntax.ClassProperty:
            extras.finishers = [parser.resolveEnum];

            e = new SymbolFound(node, filename, extras);

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
                makeDefaultParamFinisher(),
                // handle rest parameters
                makeRestParamFinisher(),
                // handle async functions
                makeAsyncFunctionFinisher(),
                // handle generator functions
                makeGeneratorFinisher()
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
                makeDefaultParamFinisher(),
                // handle rest parameters
                makeRestParamFinisher(),
                // handle async functions
                makeAsyncFunctionFinisher(),
                // handle generator functions
                makeGeneratorFinisher()
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
            extras.finishers = [
                // handle cases where at least one parameter has a default value
                makeDefaultParamFinisher(),
                // handle rest parameters
                makeRestParamFinisher(),
                // handle async functions
                makeAsyncFunctionFinisher(),
                // handle generator functions
                makeGeneratorFinisher()
            ];

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

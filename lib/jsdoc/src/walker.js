/**
 * Traversal utilities for ASTs that are compatible with the ESTree API.
 *
 * @module jsdoc/src/walker
 */
'use strict';

var astnode = require('jsdoc/src/astnode');
var logger = require('jsdoc/util/logger');
var Syntax = require('jsdoc/src/syntax').Syntax;

// TODO: docs
function getCurrentScope(scopes) {
    return scopes[scopes.length - 1] || null;
}

// TODO: docs
function moveLeadingComments(source, target, count) {
    if (source.leadingComments) {
        if (count === undefined) {
            count = source.leadingComments.length;
        }

        target.leadingComments = source.leadingComments.slice(0, count);
        source.leadingComments = source.leadingComments.slice(count);
    }
}

// TODO: docs
function moveTrailingComments(source, target, count) {
    if (source.trailingComments) {
        if (count === undefined) {
            count = source.trailingComments.length;
        }

        target.trailingComments = source.trailingComments.slice(
            source.trailingComments.length - count, count
        );
        source.trailingComments = source.trailingComments.slice(0);
    }
}

/* eslint-disable no-empty-function, no-unused-vars */
function leafNode(node, parent, state, cb) {}
/* eslint-enable no-empty-function, no-unused-vars */

// TODO: docs
var walkers = exports.walkers = {};

walkers[Syntax.ArrayExpression] = function(node, parent, state, cb) {
    var e;

    for (var i = 0, l = node.elements.length; i < l; i++) {
        e = node.elements[i];

        if (e) {
            cb(e, node, state);
        }
    }
};

// TODO: verify correctness
walkers[Syntax.ArrayPattern] = function(node, parent, state, cb) {
    var e;

    for (var i = 0, l = node.elements.length; i < l; i++) {
        e = node.elements[i];
        // must be an identifier or an expression
        if (e && e.type !== Syntax.Identifier) {
            cb(e, node, state);
        }
    }
};

walkers[Syntax.ArrowFunctionExpression] = function(node, parent, state, cb) {
    var i;
    var l;

    if (node.id) {
        cb(node.id, node, state);
    }

    for (i = 0, l = node.params.length; i < l; i++) {
        cb(node.params[i], node, state);
    }

    cb(node.body, node, state);
};

walkers[Syntax.AssignmentExpression] = function(node, parent, state, cb) {
    cb(node.left, node, state);
    cb(node.right, node, state);
};

walkers[Syntax.AssignmentPattern] = walkers[Syntax.AssignmentExpression];

walkers[Syntax.AwaitExpression] = function(node, parent, state, cb) {
    cb(node.argument, node, state);
};

walkers[Syntax.BigIntLiteral] = leafNode;

walkers[Syntax.BinaryExpression] = function(node, parent, state, cb) {
    cb(node.left, node, state);
    cb(node.right, node, state);
};

walkers[Syntax.BindExpression] = function(node, parent, state, cb) {
    if (node.object) {
        cb(node.object, node, state);
    }

    cb(node.callee, node, state);
};

walkers[Syntax.BlockStatement] = function(node, parent, state, cb) {
    for (var i = 0, l = node.body.length; i < l; i++) {
        cb(node.body[i], node, state);
    }
};

walkers[Syntax.BreakStatement] = leafNode;

walkers[Syntax.CallExpression] = function(node, parent, state, cb) {
    var i;
    var l;

    cb(node.callee, node, state);
    if (node.arguments) {
        for (i = 0, l = node.arguments.length; i < l; i++) {
            cb(node.arguments[i], node, state);
        }
    }
};

walkers[Syntax.CatchClause] = leafNode;

walkers[Syntax.ClassBody] = walkers[Syntax.BlockStatement];

walkers[Syntax.ClassDeclaration] = function(node, parent, state, cb) {
    if (node.id) {
        cb(node.id, node, state);
    }

    if (node.superClass) {
        cb(node.superClass, node, state);
    }

    if (node.body) {
        cb(node.body, node, state);
    }

    if (node.decorators) {
        for (var i = 0, l = node.decorators.length; i < l; i++) {
            cb(node.decorators[i], node, state);
        }
    }
};

walkers[Syntax.ClassExpression] = walkers[Syntax.ClassDeclaration];

// walkers[Syntax.ClassPrivateProperty] is defined later

// walkers[Syntax.ClassProperty] is defined later

// TODO: verify correctness
walkers[Syntax.ComprehensionBlock] = walkers[Syntax.AssignmentExpression];

// TODO: verify correctness
walkers[Syntax.ComprehensionExpression] = function(node, parent, state, cb) {
    cb(node.body, node, state);

    if (node.filter) {
        cb(node.filter, node, state);
    }

    for (var i = 0, l = node.blocks.length; i < l; i++) {
        cb(node.blocks[i], node, state);
    }
};

walkers[Syntax.ConditionalExpression] = function(node, parent, state, cb) {
    cb(node.test, node, state);
    cb(node.consequent, node, state);
    cb(node.alternate, node, state);
};

walkers[Syntax.ContinueStatement] = leafNode;

walkers[Syntax.DebuggerStatement] = leafNode;

walkers[Syntax.Decorator] = function(node, parent, state, cb) {
    cb(node.expression, node, state);
};

walkers[Syntax.DoExpression] = function(node, parent, state, cb) {
    cb(node.body, node, state);
};

walkers[Syntax.DoWhileStatement] = function(node, parent, state, cb) {
    cb(node.test, node, state);
    cb(node.body, node, state);
};

walkers[Syntax.EmptyStatement] = leafNode;

walkers[Syntax.ExperimentalRestProperty] = function(node, parent, state, cb) {
    cb(node.argument, node, state);
};

walkers[Syntax.ExperimentalSpreadProperty] = walkers[Syntax.ExperimentalRestProperty];

walkers[Syntax.ExportAllDeclaration] = function(node, parent, state, cb) {
    if (node.source) {
        cb(node.source, node, state);
    }
};

walkers[Syntax.ExportDefaultDeclaration] = function(node, parent, state, cb) {
    // if the declaration target is a class, move leading comments to the declaration target
    if (node.declaration && node.declaration.type === Syntax.ClassDeclaration) {
        moveLeadingComments(node, node.declaration);
    }

    if (node.declaration) {
        cb(node.declaration, node, state);
    }
};

walkers[Syntax.ExportDefaultSpecifier] = function(node, parent, state, cb) {
    cb(node.exported, node, state);
};

walkers[Syntax.ExportNamedDeclaration] = function(node, parent, state, cb) {
    var i;
    var l;

    if (node.declaration) {
        cb(node.declaration, node, state);
    }

    for (i = 0, l = node.specifiers.length; i < l; i++) {
        cb(node.specifiers[i], node, state);
    }

    if (node.source) {
        cb(node.source, node, state);
    }
};

walkers[Syntax.ExportNamespaceSpecifier] = function(node, parent, state, cb) {
    cb(node.exported, node, state);
};

walkers[Syntax.ExportSpecifier] = function(node, parent, state, cb) {
    if (node.exported) {
        cb(node.exported, node, state);
    }

    if (node.local) {
        cb(node.local, node, state);
    }
};

walkers[Syntax.ExpressionStatement] = function(node, parent, state, cb) {
    moveLeadingComments(node, node.expression);

    cb(node.expression, node, state);
};

walkers[Syntax.File] = function(node, parent, state, cb) {
    cb(node.program, node, state);
};

walkers[Syntax.ForInStatement] = function(node, parent, state, cb) {
    cb(node.left, node, state);
    cb(node.right, node, state);
    cb(node.body, node, state);
};

walkers[Syntax.ForOfStatement] = walkers[Syntax.ForInStatement];

walkers[Syntax.ForStatement] = function(node, parent, state, cb) {
    if (node.init) {
        cb(node.init, node, state);
    }

    if (node.test) {
        cb(node.test, node, state);
    }

    if (node.update) {
        cb(node.update, node, state);
    }

    cb(node.body, node, state);
};

walkers[Syntax.FunctionDeclaration] = walkers[Syntax.ArrowFunctionExpression];

walkers[Syntax.FunctionExpression] = walkers[Syntax.ArrowFunctionExpression];

walkers[Syntax.Identifier] = leafNode;

walkers[Syntax.IfStatement] = function(node, parent, state, cb) {
    cb(node.test, node, state);
    cb(node.consequent, node, state);
    if (node.alternate) {
        cb(node.alternate, node, state);
    }
};

walkers[Syntax.Import] = leafNode;

walkers[Syntax.ImportDeclaration] = function(node, parent, state, cb) {
    if (node.specifiers) {
        for (var i = 0, l = node.specifiers.length; i < l; i++) {
            cb(node.specifiers[i], node, state);
        }
    }

    if (node.source) {
        cb(node.source, node, state);
    }
};

walkers[Syntax.ImportDefaultSpecifier] = function(node, parent, state, cb) {
    if (node.local) {
        cb(node.local, node, state);
    }
};

walkers[Syntax.ImportNamespaceSpecifier] = walkers[Syntax.ImportDefaultSpecifier];

walkers[Syntax.ImportSpecifier] = walkers[Syntax.ExportSpecifier];

walkers[Syntax.JSXAttribute] = function(node, parent, state, cb) {
    cb(node.name, node, state);

    if (node.value) {
        cb(node.value, node, state);
    }
};

walkers[Syntax.JSXClosingElement] = function(node, parent, state, cb) {
    cb(node.name, node, state);
};

walkers[Syntax.JSXElement] = function(node, parent, state, cb) {
    cb(node.openingElement, node, state);

    if (node.closingElement) {
        cb(node.closingElement, node, state);
    }

    for (var i = 0, l = node.children.length; i < l; i++) {
        cb(node.children[i], node, state);
    }
};

walkers[Syntax.JSXEmptyExpression] = leafNode;

walkers[Syntax.JSXExpressionContainer] = function(node, parent, state, cb) {
    cb(node.expression, node, state);
};

walkers[Syntax.JSXIdentifier] = leafNode;

walkers[Syntax.JSXMemberExpression] = function(node, parent, state, cb) {
    cb(node.object, node, state);

    cb(node.property, node, state);
};

walkers[Syntax.JSXNamespacedName] = function(node, parent, state, cb) {
    cb(node.namespace, node, state);

    cb(node.name, node, state);
};

walkers[Syntax.JSXOpeningElement] = function(node, parent, state, cb) {
    cb(node.name, node, state);

    for (var i = 0, l = node.attributes.length; i < l; i++) {
        cb(node.attributes[i], node, state);
    }
};

walkers[Syntax.JSXSpreadAttribute] = function(node, parent, state, cb) {
    cb(node.argument, node, state);
};

walkers[Syntax.JSXText] = leafNode;

walkers[Syntax.LabeledStatement] = function(node, parent, state, cb) {
    cb(node.body, node, state);
};

// TODO: add scope info??
walkers[Syntax.LetStatement] = function(node, parent, state, cb) {
    var head;

    for (var i = 0, l = node.head.length; i < l; i++) {
        head = node.head[i];
        cb(head.id, node, state);
        if (head.init) {
            cb(head.init, node, state);
        }
    }

    cb(node.body, node, state);
};

walkers[Syntax.Literal] = leafNode;

walkers[Syntax.LogicalExpression] = walkers[Syntax.BinaryExpression];

walkers[Syntax.MemberExpression] = function(node, parent, state, cb) {
    cb(node.object, node, state);
    if (node.property) {
        cb(node.property, node, state);
    }
};

walkers[Syntax.MetaProperty] = leafNode;

walkers[Syntax.MethodDefinition] = function(node, parent, state, cb) {
    if (node.key) {
        cb(node.key, node, state);
    }

    if (node.value) {
        cb(node.value, node, state);
    }

    if (node.decorators) {
        for (var i = 0, l = node.decorators.length; i < l; i++) {
            cb(node.decorators[i], node, state);
        }
    }
};

walkers[Syntax.ModuleDeclaration] = function(node, parent, state, cb) {
    if (node.id) {
        cb(node.id, node, state);
    }

    if (node.source) {
        cb(node.source, node, state);
    }

    if (node.body) {
        cb(node.body, node, state);
    }
};

walkers[Syntax.NewExpression] = walkers[Syntax.CallExpression];

walkers[Syntax.ObjectExpression] = function(node, parent, state, cb) {
    for (var i = 0, l = node.properties.length; i < l; i++) {
        cb(node.properties[i], node, state);
    }
};

walkers[Syntax.ObjectPattern] = walkers[Syntax.ObjectExpression];

walkers[Syntax.PrivateName] = function(node, parent, state, cb) {
    cb(node.name, node, state);
};

walkers[Syntax.Program] = function(node, parent, state, cb) {
    // if the first item in the body has multiple leading comments, move all but the last one to
    // this node. this happens, for example, when a file has a /** @module */ standalone comment
    // followed by one or more other comments.
    if (node.body[0] && node.body[0].leadingComments && node.body[0].leadingComments.length > 1) {
        moveLeadingComments(node.body[0], node, node.body[0].leadingComments.length - 1);
    }

    // if the last item in the body has trailing comments, move them to this node
    if (node.body.length && node.body[node.body.length - 1].trailingComments) {
        moveTrailingComments(node.body[node.body.length - 1], node);
    }

    for (var i = 0, l = node.body.length; i < l; i++) {
        cb(node.body[i], node, state);
    }
};

walkers[Syntax.Property] = function(node, parent, state, cb) {
    // move leading comments from key to property node
    moveLeadingComments(node.key, node);

    if (node.value) {
        cb(node.value, node, state);
    }

    if (node.decorators) {
        for (var i = 0, l = node.decorators.length; i < l; i++) {
            cb(node.decorators[i], node, state);
        }
    }
};

walkers[Syntax.ClassPrivateProperty] = walkers[Syntax.Property];

walkers[Syntax.ClassProperty] = walkers[Syntax.Property];

walkers[Syntax.RestElement] = function(node, parent, state, cb) {
    if (node.argument) {
        cb(node.argument, node, state);
    }
};

walkers[Syntax.ReturnStatement] = function(node, parent, state, cb) {
    if (node.argument) {
        cb(node.argument, node, state);
    }
};

walkers[Syntax.SequenceExpression] = function(node, parent, state, cb) {
    for (var i = 0, l = node.expressions.length; i < l; i++) {
        cb(node.expressions[i], node, state);
    }
};

walkers[Syntax.SpreadElement] = function(node, parent, state, cb) {
    if (node.argument) {
        cb(node.argument, node, state);
    }
};

walkers[Syntax.Super] = leafNode;

walkers[Syntax.SwitchCase] = function(node, parent, state, cb) {
    if (node.test) {
        cb(node.test, node, state);
    }

    for (var i = 0, l = node.consequent.length; i < l; i++) {
        cb(node.consequent[i], node, state);
    }
};

walkers[Syntax.SwitchStatement] = function(node, parent, state, cb) {
    cb(node.discriminant, node, state);

    for (var i = 0, l = node.cases.length; i < l; i++) {
        cb(node.cases[i], node, state);
    }
};

walkers[Syntax.TaggedTemplateExpression] = function(node, parent, state, cb) {
    if (node.tag) {
        cb(node.tag, node, state);
    }
    if (node.quasi) {
        cb(node.quasi, node, state);
    }
};

walkers[Syntax.TemplateElement] = leafNode;

walkers[Syntax.TemplateLiteral] = function(node, parent, state, cb) {
    var i;
    var l;

    if (node.quasis && node.quasis.length) {
        for (i = 0, l = node.quasis.length; i < l; i++) {
            cb(node.quasis[i], node, state);
        }
    }

    if (node.expressions && node.expressions.length) {
        for (i = 0, l = node.expressions.length; i < l; i++) {
            cb(node.expressions[i], node, state);
        }
    }
};

walkers[Syntax.ThisExpression] = leafNode;

walkers[Syntax.ThrowStatement] = function(node, parent, state, cb) {
    cb(node.argument, node, state);
};

walkers[Syntax.TryStatement] = function(node, parent, state, cb) {
    cb(node.block, node, state);

    if (node.handler) {
        cb(node.handler.body, node, state);
    }

    if (node.finalizer) {
        cb(node.finalizer, node, state);
    }
};

walkers[Syntax.UnaryExpression] = function(node, parent, state, cb) {
    cb(node.argument, node, state);
};

walkers[Syntax.UpdateExpression] = walkers[Syntax.UnaryExpression];

walkers[Syntax.VariableDeclaration] = function(node, parent, state, cb) {
    // move leading comments to first declarator
    moveLeadingComments(node, node.declarations[0]);

    for (var i = 0, l = node.declarations.length; i < l; i++) {
        cb(node.declarations[i], node, state);
    }
};

walkers[Syntax.VariableDeclarator] = function(node, parent, state, cb) {
    cb(node.id, node, state);

    if (node.init) {
        cb(node.init, node, state);
    }
};

walkers[Syntax.WhileStatement] = walkers[Syntax.DoWhileStatement];

walkers[Syntax.WithStatement] = function(node, parent, state, cb) {
    cb(node.object, node, state);
    cb(node.body, node, state);
};

walkers[Syntax.YieldExpression] = function(node, parent, state, cb) {
    if (node.argument) {
        cb(node.argument, node, state);
    }
};

/**
 * Create a walker that can traverse an AST that is consistent with the Mozilla Parser API.
 *
 * @todo docs
 * @memberof module:jsdoc/src/walker
 */
var Walker = exports.Walker = function(walkerFuncs) {
    this._walkers = walkerFuncs || walkers;
};

// TODO: docs
Walker.prototype._recurse = function(filename, ast) {
    var self = this;
    var state = {
        filename: filename,
        nodes: [],
        scopes: []
    };

    function logUnknownNodeType(node) {
        logger.debug('Found a node with unrecognized type %s. Ignoring the node and its ' +
            'descendants.', node.type);
    }

    function cb(node, parent, cbState) {
        var currentScope;

        var isScope = astnode.isScope(node);

        astnode.addNodeProperties(node);
        node.parent = parent || null;

        currentScope = getCurrentScope(cbState.scopes);
        if (currentScope) {
            node.enclosingScope = currentScope;
        }

        if (isScope) {
            cbState.scopes.push(node);
        }
        cbState.nodes.push(node);

        if (!self._walkers[node.type]) {
            logUnknownNodeType(node);
        } else {
            self._walkers[node.type](node, parent, cbState, cb);
        }

        if (isScope) {
            cbState.scopes.pop();
        }
    }

    cb(ast, null, state);

    return state;
};

// TODO: docs
Walker.prototype.recurse = function(ast, visitor, filename) {
    var shouldContinue;
    var state = this._recurse(filename, ast);

    if (visitor) {
        for (var i = 0, l = state.nodes.length; i < l; i++) {
            shouldContinue = visitor.visit(state.nodes[i], filename);
            if (!shouldContinue) {
                break;
            }
        }
    }

    return ast;
};

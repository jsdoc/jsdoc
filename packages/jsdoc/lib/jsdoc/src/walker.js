/**
 * Traversal utilities for ASTs that are compatible with the ESTree API.
 *
 * @module jsdoc/src/walker
 */
const { astNode } = require('@jsdoc/parse');
const { log } = require('@jsdoc/util');
const { Syntax } = require('@jsdoc/parse');

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
const walkers = exports.walkers = {};

walkers[Syntax.ArrayExpression] = (node, parent, state, cb) => {
    for (let element of node.elements) {
        if (element) {
            cb(element, node, state);
        }
    }
};

// TODO: verify correctness
walkers[Syntax.ArrayPattern] = (node, parent, state, cb) => {
    for (let element of node.elements) {
        // must be an identifier or an expression
        if (element && element.type !== Syntax.Identifier) {
            cb(element, node, state);
        }
    }
};

walkers[Syntax.ArrowFunctionExpression] = (node, parent, state, cb) => {
    if (node.id) {
        cb(node.id, node, state);
    }

    for (let param of node.params) {
        cb(param, node, state);
    }

    cb(node.body, node, state);
};

walkers[Syntax.AssignmentExpression] = (node, parent, state, cb) => {
    cb(node.left, node, state);
    cb(node.right, node, state);
};

walkers[Syntax.AssignmentPattern] = walkers[Syntax.AssignmentExpression];

walkers[Syntax.AwaitExpression] = (node, parent, state, cb) => {
    cb(node.argument, node, state);
};

walkers[Syntax.BigIntLiteral] = leafNode;

walkers[Syntax.BinaryExpression] = (node, parent, state, cb) => {
    cb(node.left, node, state);
    cb(node.right, node, state);
};

walkers[Syntax.BindExpression] = (node, parent, state, cb) => {
    if (node.object) {
        cb(node.object, node, state);
    }

    cb(node.callee, node, state);
};

walkers[Syntax.BlockStatement] = (node, parent, state, cb) => {
    for (let bodyItem of node.body) {
        cb(bodyItem, node, state);
    }
};

walkers[Syntax.BreakStatement] = leafNode;

walkers[Syntax.CallExpression] = function(node, parent, state, cb) {
    cb(node.callee, node, state);

    if (node.arguments) {
        for (let arg of node.arguments) {
            cb(arg, node, state);
        }
    }
};

walkers[Syntax.CatchClause] = leafNode;

walkers[Syntax.ClassBody] = walkers[Syntax.BlockStatement];

walkers[Syntax.ClassDeclaration] = (node, parent, state, cb) => {
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
        for (let decorator of node.decorators) {
            cb(decorator, node, state);
        }
    }
};

walkers[Syntax.ClassExpression] = walkers[Syntax.ClassDeclaration];

// walkers[Syntax.ClassPrivateProperty] is defined later

// walkers[Syntax.ClassProperty] is defined later

// TODO: verify correctness
walkers[Syntax.ComprehensionBlock] = walkers[Syntax.AssignmentExpression];

// TODO: verify correctness
walkers[Syntax.ComprehensionExpression] = (node, parent, state, cb) => {
    cb(node.body, node, state);

    if (node.filter) {
        cb(node.filter, node, state);
    }

    for (let block of node.blocks) {
        cb(block, node, state);
    }
};

walkers[Syntax.ConditionalExpression] = (node, parent, state, cb) => {
    cb(node.test, node, state);
    cb(node.consequent, node, state);
    cb(node.alternate, node, state);
};

walkers[Syntax.ContinueStatement] = leafNode;

walkers[Syntax.DebuggerStatement] = leafNode;

walkers[Syntax.Decorator] = (node, parent, state, cb) => {
    cb(node.expression, node, state);
};

walkers[Syntax.DoExpression] = (node, parent, state, cb) => {
    cb(node.body, node, state);
};

walkers[Syntax.DoWhileStatement] = (node, parent, state, cb) => {
    cb(node.test, node, state);
    cb(node.body, node, state);
};

walkers[Syntax.EmptyStatement] = leafNode;

walkers[Syntax.ExperimentalRestProperty] = (node, parent, state, cb) => {
    cb(node.argument, node, state);
};

walkers[Syntax.ExperimentalSpreadProperty] = walkers[Syntax.ExperimentalRestProperty];

walkers[Syntax.ExportAllDeclaration] = (node, parent, state, cb) => {
    if (node.source) {
        cb(node.source, node, state);
    }
};

walkers[Syntax.ExportDefaultDeclaration] = (node, parent, state, cb) => {
    // if the declaration target is a class, move leading comments to the declaration target
    if (node.declaration && node.declaration.type === Syntax.ClassDeclaration) {
        moveLeadingComments(node, node.declaration);
    }

    if (node.declaration) {
        cb(node.declaration, node, state);
    }
};

walkers[Syntax.ExportDefaultSpecifier] = (node, parent, state, cb) => {
    cb(node.exported, node, state);
};

walkers[Syntax.ExportNamedDeclaration] = (node, parent, state, cb) => {
    if (node.declaration) {
        cb(node.declaration, node, state);
    }

    for (let specifier of node.specifiers) {
        cb(specifier, node, state);
    }

    if (node.source) {
        cb(node.source, node, state);
    }
};

walkers[Syntax.ExportNamespaceSpecifier] = (node, parent, state, cb) => {
    cb(node.exported, node, state);
};

walkers[Syntax.ExportSpecifier] = (node, parent, state, cb) => {
    if (node.exported) {
        cb(node.exported, node, state);
    }

    if (node.local) {
        cb(node.local, node, state);
    }
};

walkers[Syntax.ExpressionStatement] = (node, parent, state, cb) => {
    moveLeadingComments(node, node.expression);

    cb(node.expression, node, state);
};

walkers[Syntax.File] = (node, parent, state, cb) => {
    cb(node.program, node, state);
};

walkers[Syntax.ForInStatement] = (node, parent, state, cb) => {
    cb(node.left, node, state);
    cb(node.right, node, state);
    cb(node.body, node, state);
};

walkers[Syntax.ForOfStatement] = walkers[Syntax.ForInStatement];

walkers[Syntax.ForStatement] = (node, parent, state, cb) => {
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

walkers[Syntax.IfStatement] = (node, parent, state, cb) => {
    cb(node.test, node, state);
    cb(node.consequent, node, state);
    if (node.alternate) {
        cb(node.alternate, node, state);
    }
};

walkers[Syntax.Import] = leafNode;

walkers[Syntax.ImportDeclaration] = (node, parent, state, cb) => {
    if (node.specifiers) {
        for (let specifier of node.specifiers) {
            cb(specifier, node, state);
        }
    }

    if (node.source) {
        cb(node.source, node, state);
    }
};

walkers[Syntax.ImportDefaultSpecifier] = (node, parent, state, cb) => {
    if (node.local) {
        cb(node.local, node, state);
    }
};

walkers[Syntax.ImportNamespaceSpecifier] = walkers[Syntax.ImportDefaultSpecifier];

walkers[Syntax.ImportSpecifier] = walkers[Syntax.ExportSpecifier];

walkers[Syntax.JSXAttribute] = (node, parent, state, cb) => {
    cb(node.name, node, state);

    if (node.value) {
        cb(node.value, node, state);
    }
};

walkers[Syntax.JSXClosingElement] = (node, parent, state, cb) => {
    cb(node.name, node, state);
};

walkers[Syntax.JSXElement] = (node, parent, state, cb) => {
    cb(node.openingElement, node, state);

    if (node.closingElement) {
        cb(node.closingElement, node, state);
    }

    for (let child of node.children) {
        cb(child, node, state);
    }
};

walkers[Syntax.JSXEmptyExpression] = leafNode;

walkers[Syntax.JSXExpressionContainer] = (node, parent, state, cb) => {
    cb(node.expression, node, state);
};

walkers[Syntax.JSXIdentifier] = leafNode;

walkers[Syntax.JSXMemberExpression] = (node, parent, state, cb) => {
    cb(node.object, node, state);

    cb(node.property, node, state);
};

walkers[Syntax.JSXNamespacedName] = (node, parent, state, cb) => {
    cb(node.namespace, node, state);

    cb(node.name, node, state);
};

walkers[Syntax.JSXOpeningElement] = (node, parent, state, cb) => {
    cb(node.name, node, state);

    for (let attribute of node.attributes) {
        cb(attribute, node, state);
    }
};

walkers[Syntax.JSXSpreadAttribute] = (node, parent, state, cb) => {
    cb(node.argument, node, state);
};

walkers[Syntax.JSXText] = leafNode;

walkers[Syntax.LabeledStatement] = (node, parent, state, cb) => {
    cb(node.body, node, state);
};

// TODO: add scope info??
walkers[Syntax.LetStatement] = (node, parent, state, cb) => {
    for (let headItem of node.head) {
        cb(headItem.id, node, state);
        if (headItem.init) {
            cb(headItem.init, node, state);
        }
    }

    cb(node.body, node, state);
};

walkers[Syntax.Literal] = leafNode;

walkers[Syntax.LogicalExpression] = walkers[Syntax.BinaryExpression];

walkers[Syntax.MemberExpression] = (node, parent, state, cb) => {
    cb(node.object, node, state);
    if (node.property) {
        cb(node.property, node, state);
    }
};

walkers[Syntax.MetaProperty] = leafNode;

walkers[Syntax.MethodDefinition] = (node, parent, state, cb) => {
    if (node.key) {
        cb(node.key, node, state);
    }

    if (node.value) {
        cb(node.value, node, state);
    }

    if (node.decorators) {
        for (let decorator of node.decorators) {
            cb(decorator, node, state);
        }
    }
};

walkers[Syntax.ModuleDeclaration] = (node, parent, state, cb) => {
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

walkers[Syntax.ObjectExpression] = (node, parent, state, cb) => {
    for (let property of node.properties) {
        cb(property, node, state);
    }
};

walkers[Syntax.ObjectPattern] = walkers[Syntax.ObjectExpression];

walkers[Syntax.PrivateName] = (node, parent, state, cb) => {
    cb(node.id, node, state);
};

walkers[Syntax.Program] = (node, parent, state, cb) => {
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

    for (let bodyItem of node.body) {
        cb(bodyItem, node, state);
    }
};

walkers[Syntax.Property] = (node, parent, state, cb) => {
    // move leading comments from key to property node
    moveLeadingComments(node.key, node);

    if (node.value) {
        cb(node.value, node, state);
    }

    if (node.decorators) {
        for (let decorator of node.decorators) {
            cb(decorator, node, state);
        }
    }
};

walkers[Syntax.ClassPrivateProperty] = (node, parent, state, cb) => {
    // move leading comments from key to property node
    moveLeadingComments(node.key, node);

    // add `name` property to key, so we don't have to give this type of node special treatment
    // when we resolve its name
    node.key.name = node.key.id.name;

    if (node.value) {
        cb(node.value, node, state);
    }

    if (node.decorators) {
        for (let decorator of node.decorators) {
            cb(decorator, node, state);
        }
    }
};

walkers[Syntax.ClassProperty] = walkers[Syntax.Property];

walkers[Syntax.RestElement] = (node, parent, state, cb) => {
    if (node.argument) {
        cb(node.argument, node, state);
    }
};

walkers[Syntax.ReturnStatement] = (node, parent, state, cb) => {
    if (node.argument) {
        cb(node.argument, node, state);
    }
};

walkers[Syntax.SequenceExpression] = (node, parent, state, cb) => {
    for (let expression of node.expressions) {
        cb(expression, node, state);
    }
};

walkers[Syntax.SpreadElement] = (node, parent, state, cb) => {
    if (node.argument) {
        cb(node.argument, node, state);
    }
};

walkers[Syntax.Super] = leafNode;

walkers[Syntax.SwitchCase] = (node, parent, state, cb) => {
    if (node.test) {
        cb(node.test, node, state);
    }

    for (let consequentItem of node.consequent) {
        cb(consequentItem, node, state);
    }
};

walkers[Syntax.SwitchStatement] = (node, parent, state, cb) => {
    cb(node.discriminant, node, state);

    for (let caseItem of node.cases) {
        cb(caseItem, node, state);
    }
};

walkers[Syntax.TaggedTemplateExpression] = (node, parent, state, cb) => {
    if (node.tag) {
        cb(node.tag, node, state);
    }
    if (node.quasi) {
        cb(node.quasi, node, state);
    }
};

walkers[Syntax.TemplateElement] = leafNode;

walkers[Syntax.TemplateLiteral] = (node, parent, state, cb) => {
    if (node.quasis && node.quasis.length) {
        for (let quasi of node.quasis) {
            cb(quasi, node, state);
        }
    }

    if (node.expressions && node.expressions.length) {
        for (let expression of node.expressions) {
            cb(expression, node, state);
        }
    }
};

walkers[Syntax.ThisExpression] = leafNode;

walkers[Syntax.ThrowStatement] = (node, parent, state, cb) => {
    cb(node.argument, node, state);
};

walkers[Syntax.TryStatement] = (node, parent, state, cb) => {
    cb(node.block, node, state);

    if (node.handler) {
        cb(node.handler.body, node, state);
    }

    if (node.finalizer) {
        cb(node.finalizer, node, state);
    }
};

walkers[Syntax.UnaryExpression] = (node, parent, state, cb) => {
    cb(node.argument, node, state);
};

walkers[Syntax.UpdateExpression] = walkers[Syntax.UnaryExpression];

walkers[Syntax.VariableDeclaration] = (node, parent, state, cb) => {
    // move leading comments to first declarator
    moveLeadingComments(node, node.declarations[0]);

    for (let declaration of node.declarations) {
        cb(declaration, node, state);
    }
};

walkers[Syntax.VariableDeclarator] = (node, parent, state, cb) => {
    cb(node.id, node, state);

    if (node.init) {
        cb(node.init, node, state);
    }
};

walkers[Syntax.WhileStatement] = walkers[Syntax.DoWhileStatement];

walkers[Syntax.WithStatement] = (node, parent, state, cb) => {
    cb(node.object, node, state);
    cb(node.body, node, state);
};

walkers[Syntax.YieldExpression] = (node, parent, state, cb) => {
    if (node.argument) {
        cb(node.argument, node, state);
    }
};

/**
 * Create a walker that can traverse an ESTree AST.
 *
 * @memberof module:jsdoc/src/walker
 */
class Walker {
    // TODO: docs
    constructor(walkerFuncs = walkers) {
        this._walkers = walkerFuncs;
    }

    // TODO: docs
    _recurse(filename, ast) {
        const self = this;
        const state = {
            filename: filename,
            nodes: [],
            scopes: []
        };

        function logUnknownNodeType({type}) {
            log.debug(
                `Found a node with unrecognized type ${type}. Ignoring the node and its ` +
                'descendants.'
            );
        }

        function cb(node, parent, cbState) {
            let currentScope;

            const isScope = astNode.isScope(node);

            astNode.addNodeProperties(node);
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
    }

    // TODO: docs
    recurse(ast, visitor, filename) {
        let shouldContinue;
        const state = this._recurse(filename, ast);

        if (visitor) {
            for (let node of state.nodes) {
                shouldContinue = visitor.visit(node, filename);
                if (!shouldContinue) {
                    break;
                }
            }
        }

        return ast;
    }
}
exports.Walker = Walker;

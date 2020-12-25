// TODO: docs
/** @module @jsdoc/parse.astNode */
const _ = require('lodash');
const { cast } = require('@jsdoc/util');
const { SCOPE } = require('@jsdoc/core').name;
const { Syntax } = require('./syntax');

// Counter for generating unique node IDs.
let uid = 100000000;

/**
 * Check whether an AST node represents a function.
 *
 * @alias module:@jsdoc/parse.astNode.isFunction
 * @param {(Object|string)} node - The AST node to check, or the `type` property of a node.
 * @return {boolean} Set to `true` if the node is a function or `false` in all other cases.
 */
const isFunction = exports.isFunction = node => {
    let type;

    if (!node) {
        return false;
    }

    if (typeof node === 'string') {
        type = node;
    }
    else {
        type = node.type;
    }

    return type === Syntax.FunctionDeclaration || type === Syntax.FunctionExpression ||
        type === Syntax.MethodDefinition || type === Syntax.ArrowFunctionExpression;
};

/**
 * Check whether an AST node creates a new scope.
 *
 * @alias module:@jsdoc/parse.astNode.isScope
 * @param {Object} node - The AST node to check.
 * @return {Boolean} Set to `true` if the node creates a new scope, or `false` in all other cases.
 */
exports.isScope = node => // TODO: handle blocks with "let" declarations
    Boolean(node) && typeof node === 'object' && (node.type === Syntax.CatchClause ||
        node.type === Syntax.ClassDeclaration || node.type === Syntax.ClassExpression || isFunction(node));

// TODO: docs
exports.addNodeProperties = node => {
    const newProperties = {};

    if (!node || typeof node !== 'object') {
        return null;
    }

    if (!node.nodeId) {
        newProperties.nodeId = {
            value: `astnode${uid++}`,
            enumerable: true
        };
    }

    if (_.isUndefined(node.parent)) {
        newProperties.parent = {
            // `null` means 'no parent', so use `undefined` for now
            value: undefined,
            writable: true
        };
    }

    if (_.isUndefined(node.enclosingScope)) {
        newProperties.enclosingScope = {
            // `null` means 'no enclosing scope', so use `undefined` for now
            value: undefined,
            writable: true
        };
    }

    if (_.isUndefined(node.parentId)) {
        newProperties.parentId = {
            enumerable: true,
            get() {
                return this.parent ? this.parent.nodeId : null;
            }
        };
    }

    if (_.isUndefined(node.enclosingScopeId)) {
        newProperties.enclosingScopeId = {
            enumerable: true,
            get() {
                return this.enclosingScope ? this.enclosingScope.nodeId : null;
            }
        };
    }

    Object.defineProperties(node, newProperties);

    return node;
};

// TODO: docs
const nodeToValue = exports.nodeToValue = node => {
    let key;
    let parent;
    let str;
    let tempObject;

    switch (node.type) {
        case Syntax.ArrayExpression:
            tempObject = [];
            node.elements.forEach((el, i) => {
                // handle sparse arrays. use `null` to represent missing values, consistent with
                // JSON.stringify([,]).
                if (!el) {
                    tempObject[i] = null;
                }
                else {
                    tempObject[i] = nodeToValue(el);
                }
            });

            str = JSON.stringify(tempObject);
            break;

        case Syntax.AssignmentExpression:
            // falls through

        case Syntax.AssignmentPattern:
            str = nodeToValue(node.left);
            break;

        case Syntax.BigIntLiteral:
            str = node.value;
            break;

        case Syntax.ClassDeclaration:
            str = nodeToValue(node.id);
            break;

        case Syntax.ClassPrivateProperty:
            // TODO: Strictly speaking, the name should be '#' plus node.key, but because we
            // already use '#' as scope punctuation, that causes JSDoc to get extremely confused.
            // The solution probably involves quoting part or all of the name, but JSDoc doesn't
            // deal with quoted names very nicely right now, and most people probably won't want to
            // document class private properties anyhow. So for now, we'll just cheat and omit the
            // leading '#'.
            str = nodeToValue(node.key.id);
            break;

        case Syntax.ClassProperty:
            str = nodeToValue(node.key);
            break;

        case Syntax.ExportAllDeclaration:
            // falls through

        case Syntax.ExportDefaultDeclaration:
            str = 'module.exports';
            break;

        case Syntax.ExportNamedDeclaration:
            if (node.declaration) {
                // like `var` in: export var foo = 'bar';
                // we need a single value, so we use the first variable name
                if (node.declaration.declarations) {
                    str = `exports.${nodeToValue(node.declaration.declarations[0])}`;
                }
                else {
                    str = `exports.${nodeToValue(node.declaration)}`;
                }
            }

            // otherwise we'll use the ExportSpecifier nodes
            break;

        case Syntax.ExportSpecifier:
            str = `exports.${nodeToValue(node.exported)}`;
            break;

        case Syntax.ArrowFunctionExpression:
            // falls through

        case Syntax.FunctionDeclaration:
            // falls through

        case Syntax.FunctionExpression:
            if (node.id && node.id.name) {
                str = node.id.name;
            }
            break;

        case Syntax.Identifier:
            str = node.name;
            break;

        case Syntax.Literal:
            str = node.value;
            break;

        case Syntax.MemberExpression:
            // could be computed (like foo['bar']) or not (like foo.bar)
            str = nodeToValue(node.object);
            if (node.computed) {
                str += `[${node.property.raw}]`;
            }
            else {
                str += `.${nodeToValue(node.property)}`;
            }
            break;

        case Syntax.MethodDefinition:
            parent = node.parent.parent;
            // for class expressions, we want the name of the variable the class is assigned to
            // (but there won't be a name if the class is returned by an arrow function expression)
            // TODO: we should use `LONGNAMES.ANONYMOUS` instead of an empty string, but that
            // causes problems downstream if the parent class has an `@alias` tag
            if (parent.type === Syntax.ClassExpression) {
                str = nodeToValue(parent.parent) || '';
            }
            // for the constructor of a module's default export, use a special name
            else if (node.kind === 'constructor' && parent.parent &&
                parent.parent.type === Syntax.ExportDefaultDeclaration) {
                str = 'module.exports';
            }
            // for the constructor of a module's named export, use the name of the export
            // declaration
            else if (node.kind === 'constructor' && parent.parent &&
                parent.parent.type === Syntax.ExportNamedDeclaration) {
                str = nodeToValue(parent.parent);
            }
            // for other constructors, use the name of the parent class
            else if (node.kind === 'constructor') {
                str = nodeToValue(parent);
            }
            // if the method is a member of a module's default export, ignore the name, because it's
            // irrelevant
            else if (parent.parent && parent.parent.type === Syntax.ExportDefaultDeclaration) {
                str = '';
            }
            // otherwise, use the class's name
            else {
                str = parent.id ? nodeToValue(parent.id) : '';
            }

            if (node.kind !== 'constructor') {
                if (str) {
                    str += node.static ? SCOPE.PUNC.STATIC : SCOPE.PUNC.INSTANCE;
                }
                str += nodeToValue(node.key);
            }
            break;

        case Syntax.ObjectExpression:
            tempObject = {};
            node.properties.forEach(prop => {
                // ExperimentalSpreadProperty have no key
                // like var hello = {...hi};
                if (!prop.key) {
                    return;
                }

                key = prop.key.name;

                // preserve literal values so that the JSON form shows the correct type
                if (prop.value.type === Syntax.Literal) {
                    tempObject[key] = prop.value.value;
                }
                else {
                    tempObject[key] = nodeToValue(prop);
                }
            });

            str = JSON.stringify(tempObject);
            break;

        case Syntax.RestElement:
            str = nodeToValue(node.argument);
            break;

        case Syntax.ThisExpression:
            str = 'this';
            break;

        case Syntax.UnaryExpression:
            // like -1. in theory, operator can be prefix or postfix. in practice, any value with a
            // valid postfix operator (such as -- or ++) is not a UnaryExpression.
            str = nodeToValue(node.argument);

            if (node.prefix === true) {
                str = cast(node.operator + str);
            }
            else {
                // this shouldn't happen
                throw new Error(`Found a UnaryExpression with a postfix operator: ${node}`);
            }
            break;

        case Syntax.VariableDeclarator:
            str = nodeToValue(node.id);
            break;

        default:
            str = '';
    }

    return str;
};

// backwards compatibility
exports.nodeToString = nodeToValue;

// TODO: docs
const getParamNames = exports.getParamNames = node => {
    let params;

    if (!node || !node.params) {
        return [];
    }

    params = node.params.slice(0);

    return params.map(param => nodeToValue(param));
};

// TODO: docs
const isAccessor = exports.isAccessor = node => Boolean(node) && typeof node === 'object' &&
    (node.type === Syntax.Property || node.type === Syntax.MethodDefinition) &&
    (node.kind === 'get' || node.kind === 'set');

// TODO: docs
exports.isAssignment = node => Boolean(node) && typeof node === 'object' &&
    (node.type === Syntax.AssignmentExpression || node.type === Syntax.VariableDeclarator);

// TODO: docs
/**
 * Retrieve information about the node, including its name and type.
 */
exports.getInfo = node => {
    const info = {};

    switch (node.type) {
        // like the function in: "var foo = () => {}"
        case Syntax.ArrowFunctionExpression:
            info.node = node;
            info.name = '';
            info.type = info.node.type;
            info.paramnames = getParamNames(node);
            break;

        // like: "foo = 'bar'" (after declaring foo)
        // like: "MyClass.prototype.myMethod = function() {}" (after declaring MyClass)
        case Syntax.AssignmentExpression:
            info.node = node.right;
            info.name = nodeToValue(node.left);
            info.type = info.node.type;
            info.value = nodeToValue(info.node);
            // if the assigned value is a function, we need to capture the parameter names here
            info.paramnames = getParamNames(node.right);
            break;

        // like "bar='baz'" in: function foo(bar='baz') {}
        case Syntax.AssignmentPattern:
            info.node = node;
            info.name = nodeToValue(node.left);
            info.type = info.node.type;
            info.value = nodeToValue(info.node);

            break;

        // like:          "class Foo {}"
        // or "class" in: "export default class {}"
        case Syntax.ClassDeclaration:
            info.node = node;
            // if this class is the default export, we need to use a special name
            if (node.parent && node.parent.type === Syntax.ExportDefaultDeclaration) {
                info.name = 'module.exports';
            }
            else {
                info.name = node.id ? nodeToValue(node.id) : '';
            }
            info.type = info.node.type;
            info.paramnames = [];

            node.body.body.some(({kind, value}) => {
                if (kind === 'constructor') {
                    info.paramnames = getParamNames(value);

                    return true;
                }

                return false;
            });

            break;

        // like "#b = 1;" in: "class A { #b = 1; }"
        case Syntax.ClassPrivateProperty:
            info.node = node;
            info.name = nodeToValue(info.node);
            info.type = info.node.type;
            break;

        // like "b = 1;" in: "class A { b = 1; }"
        case Syntax.ClassProperty:
            info.node = node;
            info.name = nodeToValue(info.node);
            info.type = info.node.type;
            break;

        // like: "export * from 'foo'"
        case Syntax.ExportAllDeclaration:
            info.node = node;
            info.name = nodeToValue(info.node);
            info.type = info.node.type;
            break;

        // like: "export default 'foo'"
        case Syntax.ExportDefaultDeclaration:
            info.node = node.declaration;
            info.name = nodeToValue(node);
            info.type = info.node.type;

            if ( isFunction(info.node) ) {
                info.paramnames = getParamNames(info.node);
            }

            break;

        // like: "export var foo;" (has declaration)
        // or:   "export {foo}" (no declaration)
        case Syntax.ExportNamedDeclaration:
            info.node = node;
            info.name = nodeToValue(info.node);
            info.type = info.node.declaration ? info.node.declaration.type :
                Syntax.ObjectExpression;

            if (info.node.declaration) {
                if ( isFunction(info.node.declaration) ) {
                    info.paramnames = getParamNames(info.node.declaration);
                }

                // TODO: This duplicates logic for another node type in `jsdoc/src/visitor` in
                // `makeSymbolFoundEvent()`. Is there a way to combine the logic for both node types
                // into a single module?
                if (info.node.declaration.kind === 'const') {
                    info.kind = 'constant';
                }
            }

            break;

        // like "foo as bar" in: "export {foo as bar}"
        case Syntax.ExportSpecifier:
            info.node = node;
            info.name = nodeToValue(info.node);
            info.type = info.node.local.type;

            if ( isFunction(info.node.local) ) {
                info.paramnames = getParamNames(info.node.local);
            }

            break;

        // like: "function foo() {}"
        // or the function in: "export default function() {}"
        case Syntax.FunctionDeclaration:
            info.node = node;
            info.name = node.id ? nodeToValue(node.id) : '';
            info.type = info.node.type;
            info.paramnames = getParamNames(node);
            break;

        // like the function in: "var foo = function() {}"
        case Syntax.FunctionExpression:
            info.node = node;
            // TODO: should we add a name for, e.g., "var foo = function bar() {}"?
            info.name = '';
            info.type = info.node.type;
            info.paramnames = getParamNames(node);
            break;

        // like the param "bar" in: "function foo(bar) {}"
        case Syntax.Identifier:
            info.node = node;
            info.name = nodeToValue(info.node);
            info.type = info.node.type;
            break;

        // like "a.b.c"
        case Syntax.MemberExpression:
            info.node = node;
            info.name = nodeToValue(info.node);
            info.type = info.node.type;
            break;

        // like: "foo() {}"
        case Syntax.MethodDefinition:
            info.node = node;
            info.name = nodeToValue(info.node);
            info.type = info.node.type;
            info.paramnames = getParamNames(node.value);
            break;

        // like "a: 0" in "var foo = {a: 0}"
        case Syntax.Property:
            info.node = node.value;
            info.name = nodeToValue(node.key);
            info.value = nodeToValue(info.node);

            // property names with unsafe characters must be quoted
            if ( !/^[$_a-zA-Z0-9]*$/.test(info.name) ) {
                info.name = `"${String(info.name).replace(/"/g, '\\"')}"`;
            }

            if ( isAccessor(node) ) {
                info.type = nodeToValue(info.node);
                info.paramnames = getParamNames(info.node);
            }
            else {
                info.type = info.node.type;
            }

            break;

        // like "...bar" in: function foo(...bar) {}
        case Syntax.RestElement:
            info.node = node;
            info.name = nodeToValue(info.node.argument);
            info.type = info.node.type;

            break;

        // like: "var i = 0" (has init property)
        // like: "var i" (no init property)
        case Syntax.VariableDeclarator:
            info.node = node.init || node.id;
            info.name = node.id.name;

            if (node.init) {
                info.type = info.node.type;
                info.value = nodeToValue(info.node);
            }

            break;

        default:
            info.node = node;
            info.type = info.node.type;
    }

    return info;
};

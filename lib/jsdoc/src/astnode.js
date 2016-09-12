// TODO: docs
/** @module jsdoc/src/astnode */
'use strict';

var cast = require('jsdoc/util/cast').cast;
var env = require('jsdoc/env');
var name = require('jsdoc/name');
var Syntax = require('jsdoc/src/syntax').Syntax;
var util = require('util');

// Counter for generating unique node IDs.
var uid = 100000000;

/**
 * Check whether an AST node represents a function.
 *
 * @alias module:jsdoc/src/astnode.isFunction
 * @param {(Object|string)} node - The AST node to check, or the `type` property of a node.
 * @return {boolean} Set to `true` if the node is a function or `false` in all other cases.
 */
var isFunction = exports.isFunction = function(node) {
    var type;

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
 * @alias module:jsdoc/src/astnode.isScope
 * @param {Object} node - The AST node to check.
 * @return {Boolean} Set to `true` if the node creates a new scope, or `false` in all other cases.
 */
var isScope = exports.isScope = function(node) {
    // TODO: handle blocks with "let" declarations
    return !!node && typeof node === 'object' && ( node.type === Syntax.CatchClause ||
        isFunction(node) );
};

// TODO: docs
var addNodeProperties = exports.addNodeProperties = function(node) {
    var debugEnabled = !!env.opts.debug;
    var newProperties = {};

    if (!node || typeof node !== 'object') {
        return null;
    }

    if (!node.nodeId) {
        newProperties.nodeId = {
            value: 'astnode' + uid++,
            enumerable: debugEnabled
        };
    }

    if (!node.parent && node.parent !== null) {
        newProperties.parent = {
            // `null` means 'no parent', so use `undefined` for now
            value: undefined,
            writable: true
        };
    }

    if (!node.enclosingScope && node.enclosingScope !== null) {
        newProperties.enclosingScope = {
            // `null` means 'no enclosing scope', so use `undefined` for now
            value: undefined,
            writable: true
        };
    }

    if (debugEnabled && typeof node.parentId === 'undefined') {
        newProperties.parentId = {
            enumerable: true,
            get: function() {
                return this.parent ? this.parent.nodeId : null;
            }
        };
    }

    if (debugEnabled && typeof node.enclosingScopeId === 'undefined') {
        newProperties.enclosingScopeId = {
            enumerable: true,
            get: function() {
                return this.enclosingScope ? this.enclosingScope.nodeId : null;
            }
        };
    }

    Object.defineProperties(node, newProperties);

    return node;
};

// TODO: docs
var nodeToValue = exports.nodeToValue = function(node) {
    var parent;
    var str;
    var tempObject;

    switch (node.type) {
        case Syntax.ArrayExpression:
            tempObject = [];
            node.elements.forEach(function(el, i) {
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

        case Syntax.ClassDeclaration:
            str = nodeToValue(node.id);
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
                    str = 'exports.' + nodeToValue(node.declaration.declarations[0]);
                }
                else {
                    str = 'exports.' + nodeToValue(node.declaration);
                }
            }

            // otherwise we'll use the ExportSpecifier nodes
            break;

        case Syntax.ExportSpecifier:
            str = 'exports.' + nodeToValue(node.exported);
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
                str += util.format('[%s]', node.property.raw);
            }
            else {
                str += '.' + nodeToValue(node.property);
            }
            break;

        case Syntax.MethodDefinition:
            parent = node.parent.parent;
            // for class expressions, we want the name of the variable the class is assigned to
            if (parent.type === Syntax.ClassExpression) {
                str = nodeToValue(parent.parent);
            }
            // for the constructor of a module's default export, use a special name
            else if (node.kind === 'constructor' && parent.parent &&
                parent.parent.type === Syntax.ExportDefaultDeclaration) {
                str = 'module.exports';
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
                    str += node.static ? name.SCOPE.PUNC.STATIC : name.SCOPE.PUNC.INSTANCE;
                }
                str += nodeToValue(node.key);
            }
            break;

        case Syntax.ObjectExpression:
            tempObject = {};
            node.properties.forEach(function(prop) {
                // ExperimentalSpreadProperty have no key
                // like var hello = {...hi};
                if (!prop.key) {
                    return;
                }

                var key = prop.key.name;
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
                throw new Error( util.format('Found a UnaryExpression with a postfix operator: %j',
                    node) );
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
var getParamNames = exports.getParamNames = function(node) {
    var params;

    if (!node || !node.params) {
        return [];
    }

    params = node.params.slice(0);

    return params.map(function(param) {
        return nodeToValue(param);
    });
};

// TODO: docs
var isAccessor = exports.isAccessor = function(node) {
    return !!node && typeof node === 'object' &&
        (node.type === Syntax.Property || node.type === Syntax.MethodDefinition) &&
        (node.kind === 'get' || node.kind === 'set');
};

// TODO: docs
var isAssignment = exports.isAssignment = function(node) {
    return !!node && typeof node === 'object' && (node.type === Syntax.AssignmentExpression ||
        node.type === Syntax.VariableDeclarator);
};

// TODO: docs
/**
 * Retrieve information about the node, including its name and type.
 * @alias module:jsdoc/src/astnode.getInfo
 */
var getInfo = exports.getInfo = function(node) {
    var info = {};

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

            node.body.body.some(function(definition) {
                if (definition.kind === 'constructor') {
                    info.paramnames = getParamNames(definition.value);
                    return true;
                }
                return false;
            });

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

                // TODO: This duplicates logic for another node type in
                // visitor.makeSymbolFoundEvent(). Is there a way to combine the logic for both
                // node types into a single module?
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
                info.name = '"' + String(info.name).replace(/"/g, '\\"') + '"';
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

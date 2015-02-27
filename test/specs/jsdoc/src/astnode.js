'use strict';

describe('jsdoc/src/astNode', function() {
    var astBuilder = require('jsdoc/src/astbuilder');
    var astNode = require('jsdoc/src/astnode');
    var doop = require('jsdoc/util/doop');
    var env = require('jsdoc/env');
    var espree = require('espree');
    var Syntax = require('jsdoc/src/syntax').Syntax;

    function parse(str) {
        return espree.parse(str, astBuilder.parserOptions);
    }

    // create the AST nodes we'll be testing
    var arrayExpression = parse('[,]').body[0].expression;
    var assignmentExpression = parse('foo = 1;').body[0].expression;
    var binaryExpression = parse('foo & foo;').body[0].expression;
    var functionDeclaration1 = parse('function foo() {}').body[0];
    var functionDeclaration1a = parse('function bar() {}').body[0];
    var functionDeclaration2 = parse('function foo(bar) {}').body[0];
    var functionDeclaration3 = parse('function foo(bar, baz, qux) {}').body[0];
    var functionDeclaration4 = parse('function foo(...bar) {}').body[0];
    var functionExpression1 = parse('var foo = function() {};').body[0].declarations[0].init;
    var functionExpression2 = parse('var foo = function(bar) {};').body[0].declarations[0].init;
    var identifier = parse('foo;').body[0].expression;
    var literal = parse('1;').body[0].expression;
    var memberExpression = parse('foo.bar;').body[0].expression;
    var memberExpressionComputed1 = parse('foo["bar"];').body[0].expression;
    var memberExpressionComputed2 = parse('foo[\'bar\'];').body[0].expression;
    var propertyGet = parse('var foo = { get bar() {} };').body[0].declarations[0].init
        .properties[0];
    var propertyInit = parse('var foo = { bar: {} };').body[0].declarations[0].init.properties[0];
    var propertySet = parse('var foo = { set bar(a) {} };').body[0].declarations[0].init
        .properties[0];
    var thisExpression = parse('this;').body[0].expression;
    var unaryExpression1 = parse('+1;').body[0].expression;
    var unaryExpression2 = parse('+foo;').body[0].expression;
    var variableDeclaration1 = parse('var foo = 1;').body[0];
    var variableDeclaration2 = parse('var foo = 1, bar = 2;').body[0];
    var variableDeclarator1 = parse('var foo = 1;').body[0].declarations[0];
    var variableDeclarator2 = parse('var foo;').body[0].declarations[0];

    it('should exist', function() {
        expect(typeof astNode).toBe('object');
    });

    it('should export an addNodeProperties method', function() {
        expect(typeof astNode.addNodeProperties).toBe('function');
    });

    it('should export a getInfo method', function() {
        expect(typeof astNode.getInfo).toBe('function');
    });

    it('should export a getParamNames method', function() {
        expect(typeof astNode.getParamNames).toBe('function');
    });

    it('should export an isAccessor method', function() {
        expect(typeof astNode.isAccessor).toBe('function');
    });

    it('should export an isAssignment method', function() {
        expect(typeof astNode.isAssignment).toBe('function');
    });

    it('should export an isScope method', function() {
        expect(typeof astNode.isScope).toBe('function');
    });

    it('should export a nodeToString method', function() {
        expect(typeof astNode.nodeToString).toBe('function');
    });

    it('should export a nodeToValue method', function() {
        expect(typeof astNode.nodeToValue).toBe('function');
    });

    describe('addNodeProperties', function() {
        var debugEnabled;

        beforeEach(function() {
            debugEnabled = !!env.opts.debug;
        });

        afterEach(function() {
            env.opts.debug = debugEnabled;
        });

        it('should return null for undefined input', function() {
            expect( astNode.addNodeProperties() ).toBe(null);
        });

        it('should return null if the input is not an object', function() {
            expect( astNode.addNodeProperties('foo') ).toBe(null);
        });

        it('should preserve existing properties that are not "node properties"', function() {
            var node = astNode.addNodeProperties({foo: 1});

            expect(typeof node).toBe('object');
            expect(node.foo).toBe(1);
        });

        it('should add a non-enumerable nodeId if necessary', function() {
            var node = astNode.addNodeProperties({});
            var descriptor = Object.getOwnPropertyDescriptor(node, 'nodeId');

            expect(descriptor).toBeDefined();
            expect(typeof descriptor.value).toBe('string');
            expect(descriptor.enumerable).toBe(false);
        });

        it('should not overwrite an existing nodeId', function() {
            var nodeId = 'foo';
            var node = astNode.addNodeProperties({nodeId: nodeId});

            expect(node.nodeId).toBe(nodeId);
        });

        it('should add an enumerable nodeId in debug mode', function() {
            var descriptor;
            var node;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});
            descriptor = Object.getOwnPropertyDescriptor(node, 'nodeId');

            expect(descriptor.enumerable).toBe(true);
        });

        it('should add a non-enumerable, writable parent if necessary', function() {
            var node = astNode.addNodeProperties({});
            var descriptor = Object.getOwnPropertyDescriptor(node, 'parent');

            expect(descriptor).toBeDefined();
            expect(descriptor.value).toBe(undefined);
            expect(descriptor.enumerable).toBe(false);
            expect(descriptor.writable).toBe(true);
        });

        it('should not overwrite an existing parent', function() {
            var parent = {};
            var node = astNode.addNodeProperties({parent: parent});

            expect(node.parent).toBe(parent);
        });

        it('should not overwrite a null parent', function() {
            var node = astNode.addNodeProperties({parent: null});

            expect(node.parent).toBe(null);
        });

        it('should add an enumerable parentId in debug mode', function() {
            var descriptor;
            var node;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});
            descriptor = Object.getOwnPropertyDescriptor(node, 'parentId');

            expect(descriptor).toBeDefined();
            expect(descriptor.enumerable).toBe(true);
        });

        it('should provide a null parentId in debug mode for nodes with no parent', function() {
            var descriptor;
            var node;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});

            expect(node.parentId).toBe(null);
        });

        it('should provide a non-null parentId in debug mode for nodes with a parent', function() {
            var descriptor;
            var node;
            var parent;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});
            parent = astNode.addNodeProperties({});
            node.parent = parent;

            expect(node.parentId).toBe(parent.nodeId);
        });

        it('should add a non-enumerable, writable enclosingScope if necessary', function() {
            var node = astNode.addNodeProperties({});
            var descriptor = Object.getOwnPropertyDescriptor(node, 'enclosingScope');

            expect(descriptor).toBeDefined();
            expect(descriptor.value).toBe(undefined);
            expect(descriptor.enumerable).toBe(false);
            expect(descriptor.writable).toBe(true);
        });

        it('should not overwrite an existing enclosingScope', function() {
            var enclosingScope = {};
            var node = astNode.addNodeProperties({enclosingScope: enclosingScope});

            expect(node.enclosingScope).toBe(enclosingScope);
        });

        it('should not overwrite a null enclosingScope', function() {
            var node = astNode.addNodeProperties({enclosingScope: null});

            expect(node.enclosingScope).toBe(null);
        });

        it('should add an enumerable enclosingScopeId in debug mode', function() {
            var descriptor;
            var node;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});
            descriptor = Object.getOwnPropertyDescriptor(node, 'enclosingScopeId');

            expect(descriptor).toBeDefined();
            expect(descriptor.enumerable).toBe(true);
        });

        it('should provide a null enclosingScopeId in debug mode for nodes with no enclosing scope',
            function() {
            var descriptor;
            var node;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});

            expect(node.enclosingScopeId).toBe(null);
        });

        it('should provide a non-null enclosingScopeId in debug mode for nodes with an enclosing ' +
            'scope', function() {
            var descriptor;
            var enclosingScope;
            var node;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});
            enclosingScope = astNode.addNodeProperties({});
            node.enclosingScope = enclosingScope;

            expect(node.enclosingScopeId).toBe(enclosingScope.nodeId);
        });
    });

    describe('getInfo', function() {
        it('should throw an error for undefined input', function() {
            function noNode() {
                astNode.getInfo();
            }

            expect(noNode).toThrow();
        });

        it('should return the correct info for an AssignmentExpression', function() {
            var info = astNode.getInfo(assignmentExpression);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.Literal);
            expect(info.node.value).toBe(1);

            expect(info.name).toBe('foo');
            expect(info.type).toBe(Syntax.Literal);
            expect(info.value).toBe(1);
        });

        it('should return the correct info for a FunctionDeclaration', function() {
            var info = astNode.getInfo(functionDeclaration2);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.FunctionDeclaration);

            expect(info.name).toBe('foo');
            expect(info.type).toBe(Syntax.FunctionDeclaration);
            expect(info.value).not.toBeDefined();
            expect( Array.isArray(info.paramnames) ).toBe(true);
            expect(info.paramnames.length).toBe(1);
            expect(info.paramnames[0]).toBe('bar');
        });

        it('should return the correct info for a FunctionExpression', function() {
            var info = astNode.getInfo(functionExpression2);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.FunctionExpression);

            expect(info.name).toBe('');
            expect(info.type).toBe(Syntax.FunctionExpression);
            expect(info.value).not.toBeDefined();
            expect( Array.isArray(info.paramnames) ).toBe(true);
            expect(info.paramnames.length).toBe(1);
            expect(info.paramnames[0]).toBe('bar');
        });

        it('should return the correct info for a MemberExpression', function() {
            var info = astNode.getInfo(memberExpression);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.MemberExpression);

            expect(info.name).toBe('foo.bar');
            expect(info.type).toBe(Syntax.MemberExpression);
        });

        it('should return the correct info for a computed MemberExpression', function() {
            var info = astNode.getInfo(memberExpressionComputed1);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.MemberExpression);

            expect(info.name).toBe('foo["bar"]');
            expect(info.type).toBe(Syntax.MemberExpression);
        });

        it('should return the correct info for a Property initializer', function() {
            var info = astNode.getInfo(propertyInit);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.ObjectExpression);

            expect(info.name).toBe('bar');
            expect(info.type).toBe(Syntax.ObjectExpression);
        });

        it('should return the correct info for a Property setter', function() {
            var info = astNode.getInfo(propertySet);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.FunctionExpression);

            expect(info.name).toBe('bar');
            expect(info.type).toBe('function');
            expect(info.value).toBe('function');
            expect( Array.isArray(info.paramnames) ).toBe(true);
            expect(info.paramnames.length).toBe(1);
            expect(info.paramnames[0]).toBe('a');
        });

        it('should return the correct info for a VariableDeclarator with a value', function() {
            var info = astNode.getInfo(variableDeclarator1);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.Literal);

            expect(info.name).toBe('foo');
            expect(info.type).toBe(Syntax.Literal);
            expect(info.value).toBe(1);
        });

        it('should return the correct info for a VariableDeclarator with no value', function() {
            var info = astNode.getInfo(variableDeclarator2);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.Identifier);

            expect(info.name).toBe('foo');
            expect(info.type).not.toBeDefined();
            expect(info.value).not.toBeDefined();
        });

        it('should return the correct info for other node types', function() {
            var info = astNode.getInfo(binaryExpression);

            expect(info).toBeDefined();

            expect(info.node).toBe(binaryExpression);
            expect(info.type).toBe(Syntax.BinaryExpression);
        });
    });

    describe('getParamNames', function() {
        it('should return an empty array for undefined input', function() {
            var params = astNode.getParamNames();

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(0);
        });

        it('should return an empty array if the input has no params property', function() {
            var params = astNode.getParamNames({});

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(0);
        });

        it('should return an empty array if the input has no params', function() {
            var params = astNode.getParamNames(functionDeclaration1);

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(0);
        });

        it('should return a single-item array if the input has a single param', function() {
            var params = astNode.getParamNames(functionDeclaration2);

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(1);
            expect(params[0]).toBe('bar');
        });

        it('should return a multi-item array if the input has multiple params', function() {
            var params = astNode.getParamNames(functionDeclaration3);

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(3);
            expect(params[0]).toBe('bar');
            expect(params[1]).toBe('baz');
            expect(params[2]).toBe('qux');
        });

        it('should include rest parameters', function() {
            var params = astNode.getParamNames(functionDeclaration4);

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(1);
            expect(params[0]).toBe('bar');
        });
    });

    describe('isAccessor', function() {
        it('should return false for undefined values', function() {
            expect( astNode.isAccessor() ).toBe(false);
        });

        it('should return false if the parameter is not an object', function() {
            expect( astNode.isAccessor('foo') ).toBe(false);
        });

        it('should return false for non-Property nodes', function() {
            expect( astNode.isAccessor(binaryExpression) ).toBe(false);
        });

        it('should return false for Property nodes whose kind is "init"', function() {
            expect( astNode.isAccessor(propertyInit) ).toBe(false);
        });

        it('should return true for Property nodes whose kind is "get"', function() {
            expect( astNode.isAccessor(propertyGet) ).toBe(true);
        });

        it('should return true for Property nodes whose kind is "set"', function() {
            expect( astNode.isAccessor(propertySet) ).toBe(true);
        });
    });

    describe('isAssignment', function() {
        it('should return false for undefined values', function() {
            expect( astNode.isAssignment() ).toBe(false);
        });

        it('should return false if the parameter is not an object', function() {
            expect( astNode.isAssignment('foo') ).toBe(false);
        });

        it('should return false for nodes that are not assignments', function() {
            expect( astNode.isAssignment(binaryExpression) ).toBe(false);
        });

        it('should return true for AssignmentExpression nodes', function() {
            expect( astNode.isAssignment(assignmentExpression) ).toBe(true);
        });

        it('should return true for VariableDeclarator nodes', function() {
            expect( astNode.isAssignment(variableDeclarator1) ).toBe(true);
        });
    });

    describe('isScope', function() {
        it('should return false for undefined values', function() {
            expect( astNode.isScope() ).toBe(false);
        });

        it('should return false if the parameter is not an object', function() {
            expect( astNode.isScope('foo') ).toBe(false);
        });

        it('should return true for CatchClause nodes', function() {
            expect( astNode.isScope({type: Syntax.CatchClause}) ).toBe(true);
        });

        it('should return true for FunctionDeclaration nodes', function() {
            expect( astNode.isScope({type: Syntax.FunctionDeclaration}) ).toBe(true);
        });

        it('should return true for FunctionExpression nodes', function() {
            expect( astNode.isScope({type: Syntax.FunctionExpression}) ).toBe(true);
        });

        it('should return false for other nodes', function() {
            expect( astNode.isScope({type: Syntax.NameExpression}) ).toBe(false);
        });
    });

    describe('nodeToString', function() {
        it('should be an alias to nodeToValue', function() {
            expect(astNode.nodeToString).toBe(astNode.nodeToValue);
        });
    });

    describe('nodeToValue', function() {
        it('should return `[null]` for the sparse array `[,]`', function() {
            expect( astNode.nodeToValue(arrayExpression) ).toBe('[null]');
        });

        it('should return the variable name for assignment expressions', function() {
            expect( astNode.nodeToValue(assignmentExpression) ).toBe('foo');
        });

        it('should return "function" for function declarations', function() {
            expect( astNode.nodeToValue(functionDeclaration1) ).toBe('function');
        });

        it('should return "function" for function expressions', function() {
            expect( astNode.nodeToValue(functionExpression1) ).toBe('function');
        });

        it('should return the identifier name for identifiers', function() {
            expect( astNode.nodeToValue(identifier) ).toBe('foo');
        });

        it('should return the literal value for literals', function() {
            expect( astNode.nodeToValue(literal) ).toBe(1);
        });

        it('should return the object and property for noncomputed member expressions', function() {
            expect( astNode.nodeToValue(memberExpression) ).toBe('foo.bar');
        });

        it('should return the object and property, with a computed property that uses the same ' +
            'quote character as the original source, for computed member expressions', function() {
            expect( astNode.nodeToValue(memberExpressionComputed1) ).toBe('foo["bar"]');
            expect( astNode.nodeToValue(memberExpressionComputed2) ).toBe('foo[\'bar\']');
        });

        it('should return "this" for this expressions', function() {
            expect( astNode.nodeToValue(thisExpression) ).toBe('this');
        });

        it('should return the operator and nodeToValue value for prefix unary expressions',
            function() {
            expect( astNode.nodeToValue(unaryExpression1) ).toBe('+1');
            expect( astNode.nodeToValue(unaryExpression2) ).toBe('+foo');
        });

        it('should throw an error for postfix unary expressions', function() {
            function postfixNodeToValue() {
                // there's no valid source representation for this one, so we fake it
                var unaryExpressionPostfix = (function() {
                    var node = parse('+1;').body[0].expression;
                    node.prefix = false;
                    return node;
                })();
                return astNode.nodeToValue(unaryExpressionPostfix);
            }

            expect(postfixNodeToValue).toThrow();
        });

        it('should return the variable name for variable declarators', function() {
            expect( astNode.nodeToValue(variableDeclarator1) ).toBe('foo');
        });

        it('should return an empty string for all other nodes', function() {
            expect( astNode.nodeToValue(binaryExpression) ).toBe('');
        });
    });
});

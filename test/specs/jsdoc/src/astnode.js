'use strict';

describe('jsdoc/src/astnode', function() {
    var astnode = require('jsdoc/src/astnode');
    var doop = require('jsdoc/util/doop');
    var esprima = require('esprima');
    var Syntax = require('jsdoc/src/syntax').Syntax;

    // we need this in Esprima <1.1.0 for some node types
    var opts = {
        raw: true
    };

    // create the AST nodes we'll be testing
    var arrayExpression = esprima.parse('[,]').body[0].expression;
    var assignmentExpression = esprima.parse('foo = 1;').body[0].expression;
    var binaryExpression = esprima.parse('foo & foo;').body[0].expression;
    var functionDeclaration1 = esprima.parse('function foo() {}').body[0];
    var functionDeclaration1a = esprima.parse('function bar() {}').body[0];
    var functionDeclaration2 = esprima.parse('function foo(bar) {}').body[0];
    var functionDeclaration3 = esprima.parse('function foo(bar, baz, qux) {}').body[0];
    var functionExpression1 = esprima.parse('var foo = function() {};').body[0].declarations[0]
        .init;
    var functionExpression2 = esprima.parse('var foo = function(bar) {};').body[0].declarations[0]
        .init;
    var identifier = esprima.parse('foo;').body[0].expression;
    var literal = esprima.parse('1;').body[0].expression;
    var memberExpression = esprima.parse('foo.bar;').body[0].expression;
    var memberExpressionComputed1 = esprima.parse('foo["bar"];', opts).body[0].expression;
    var memberExpressionComputed2 = esprima.parse('foo[\'bar\'];', opts).body[0].expression;
    var propertyGet = esprima.parse('var foo = { get bar() {} };').body[0].declarations[0].init
        .properties[0];
    var propertyInit = esprima.parse('var foo = { bar: {} };').body[0].declarations[0].init
        .properties[0];
    var propertySet = esprima.parse('var foo = { set bar(a) {} };').body[0].declarations[0].init
        .properties[0];
    var thisExpression = esprima.parse('this;').body[0].expression;
    var unaryExpression1 = esprima.parse('+1;').body[0].expression;
    var unaryExpression2 = esprima.parse('+foo;').body[0].expression;
    var variableDeclaration1 = esprima.parse('var foo = 1;').body[0];
    var variableDeclaration2 = esprima.parse('var foo = 1, bar = 2;').body[0];
    var variableDeclarator1 = esprima.parse('var foo = 1;').body[0].declarations[0];
    var variableDeclarator2 = esprima.parse('var foo;').body[0].declarations[0];

    it('should exist', function() {
        expect(astnode).toBeDefined();
        expect(typeof astnode).toBe('object');
    });

    it('should export a nodeToString method', function() {
        expect(astnode.nodeToString).toBeDefined();
        expect(typeof astnode.nodeToString).toBe('function');
    });

    it('should export an addNodeProperties method', function() {
        expect(astnode.addNodeProperties).toBeDefined();
        expect(typeof astnode.addNodeProperties).toBe('function');
    });

    it('should export a getInfo method', function() {
        expect(astnode.getInfo).toBeDefined();
        expect(typeof astnode.getInfo).toBe('function');
    });

    it('should export a getParamNames method', function() {
        expect(astnode.getParamNames).toBeDefined();
        expect(typeof astnode.getParamNames).toBe('function');
    });

    it('should export an isAccessor method', function() {
        expect(astnode.isAccessor).toBeDefined();
        expect(typeof astnode.isAccessor).toBe('function');
    });

    it('should export an isAssignment method', function() {
        expect(astnode.isAssignment).toBeDefined();
        expect(typeof astnode.isAssignment).toBe('function');
    });

    it('should export an isScope method', function() {
        expect(astnode.isScope).toBeDefined();
        expect(typeof astnode.isScope).toBe('function');
    });

    describe('addNodeProperties', function() {
        var debugEnabled;

        beforeEach(function() {
            debugEnabled = !!global.env.opts.debug;
        });

        afterEach(function() {
            global.env.opts.debug = debugEnabled;
        });

        it('should return null for undefined input', function() {
            expect( astnode.addNodeProperties() ).toBe(null);
        });

        it('should return null if the input is not an object', function() {
            expect( astnode.addNodeProperties('foo') ).toBe(null);
        });

        it('should preserve existing properties that are not "node properties"', function() {
            var node = astnode.addNodeProperties({foo: 1});

            expect(typeof node).toBe('object');
            expect(node.foo).toBe(1);
        });

        it('should add a non-enumerable nodeId if necessary', function() {
            var node = astnode.addNodeProperties({});
            var descriptor = Object.getOwnPropertyDescriptor(node, 'nodeId');

            expect(descriptor).toBeDefined();
            expect(typeof descriptor.value).toBe('string');
            expect(descriptor.enumerable).toBe(false);
        });

        it('should not overwrite an existing nodeId', function() {
            var nodeId = 'foo';
            var node = astnode.addNodeProperties({nodeId: nodeId});

            expect(node.nodeId).toBe(nodeId);
        });

        it('should add an enumerable nodeId in debug mode', function() {
            var descriptor;
            var node;

            global.env.opts.debug = true;
            node = astnode.addNodeProperties({});
            descriptor = Object.getOwnPropertyDescriptor(node, 'nodeId');

            expect(descriptor.enumerable).toBe(true);
        });

        it('should add a non-enumerable, writable parent if necessary', function() {
            var node = astnode.addNodeProperties({});
            var descriptor = Object.getOwnPropertyDescriptor(node, 'parent');

            expect(descriptor).toBeDefined();
            expect(descriptor.value).toBe(undefined);
            expect(descriptor.enumerable).toBe(false);
            expect(descriptor.writable).toBe(true);
        });

        it('should not overwrite an existing parent', function() {
            var parent = {};
            var node = astnode.addNodeProperties({parent: parent});

            expect(node.parent).toBe(parent);
        });

        it('should not overwrite a null parent', function() {
            var node = astnode.addNodeProperties({parent: null});

            expect(node.parent).toBe(null);
        });

        it('should add an enumerable parentId in debug mode', function() {
            var descriptor;
            var node;

            global.env.opts.debug = true;
            node = astnode.addNodeProperties({});
            descriptor = Object.getOwnPropertyDescriptor(node, 'parentId');

            expect(descriptor).toBeDefined();
            expect(descriptor.enumerable).toBe(true);
        });

        it('should provide a null parentId in debug mode for nodes with no parent', function() {
            var descriptor;
            var node;

            global.env.opts.debug = true;
            node = astnode.addNodeProperties({});

            expect(node.parentId).toBe(null);
        });

        it('should provide a non-null parentId in debug mode for nodes with a parent', function() {
            var descriptor;
            var node;
            var parent;

            global.env.opts.debug = true;
            node = astnode.addNodeProperties({});
            parent = astnode.addNodeProperties({});
            node.parent = parent;

            expect(node.parentId).toBe(parent.nodeId);
        });

        it('should add a non-enumerable, writable enclosingScope if necessary', function() {
            var node = astnode.addNodeProperties({});
            var descriptor = Object.getOwnPropertyDescriptor(node, 'enclosingScope');

            expect(descriptor).toBeDefined();
            expect(descriptor.value).toBe(undefined);
            expect(descriptor.enumerable).toBe(false);
            expect(descriptor.writable).toBe(true);
        });

        it('should not overwrite an existing enclosingScope', function() {
            var enclosingScope = {};
            var node = astnode.addNodeProperties({enclosingScope: enclosingScope});

            expect(node.enclosingScope).toBe(enclosingScope);
        });

        it('should not overwrite a null enclosingScope', function() {
            var node = astnode.addNodeProperties({enclosingScope: null});

            expect(node.enclosingScope).toBe(null);
        });

        it('should add an enumerable enclosingScopeId in debug mode', function() {
            var descriptor;
            var node;

            global.env.opts.debug = true;
            node = astnode.addNodeProperties({});
            descriptor = Object.getOwnPropertyDescriptor(node, 'enclosingScopeId');

            expect(descriptor).toBeDefined();
            expect(descriptor.enumerable).toBe(true);
        });

        it('should provide a null enclosingScopeId in debug mode for nodes with no enclosing scope',
            function() {
            var descriptor;
            var node;

            global.env.opts.debug = true;
            node = astnode.addNodeProperties({});

            expect(node.enclosingScopeId).toBe(null);
        });

        it('should provide a non-null enclosingScopeId in debug mode for nodes with an enclosing ' +
            'scope', function() {
            var descriptor;
            var enclosingScope;
            var node;

            global.env.opts.debug = true;
            node = astnode.addNodeProperties({});
            enclosingScope = astnode.addNodeProperties({});
            node.enclosingScope = enclosingScope;

            expect(node.enclosingScopeId).toBe(enclosingScope.nodeId);
        });
    });

    describe('getInfo', function() {
        it('should throw an error for undefined input', function() {
            function noNode() {
                astnode.getInfo();
            }

            expect(noNode).toThrow();
        });

        it('should return the correct info for an AssignmentExpression', function() {
            var info = astnode.getInfo(assignmentExpression);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.Literal);
            expect(info.node.value).toBe(1);

            expect(info.name).toBe('foo');
            expect(info.type).toBe(Syntax.Literal);
            expect(info.value).toBe('1');
        });

        it('should return the correct info for a FunctionDeclaration', function() {
            var info = astnode.getInfo(functionDeclaration2);

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
            var info = astnode.getInfo(functionExpression2);

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
            var info = astnode.getInfo(memberExpression);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.MemberExpression);

            expect(info.name).toBe('foo.bar');
            expect(info.type).toBe(Syntax.MemberExpression);
        });

        it('should return the correct info for a computed MemberExpression', function() {
            var info = astnode.getInfo(memberExpressionComputed1);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.MemberExpression);

            expect(info.name).toBe('foo["bar"]');
            expect(info.type).toBe(Syntax.MemberExpression);
        });

        it('should return the correct info for a Property initializer', function() {
            var info = astnode.getInfo(propertyInit);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.ObjectExpression);

            expect(info.name).toBe('bar');
            expect(info.type).toBe(Syntax.ObjectExpression);
        });

        it('should return the correct info for a Property setter', function() {
            var info = astnode.getInfo(propertySet);

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
            var info = astnode.getInfo(variableDeclarator1);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.Literal);

            expect(info.name).toBe('foo');
            expect(info.type).toBe(Syntax.Literal);
            expect(info.value).toBe('1');
        });

        it('should return the correct info for a VariableDeclarator with no value', function() {
            var info = astnode.getInfo(variableDeclarator2);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.Identifier);

            expect(info.name).toBe('foo');
            expect(info.type).not.toBeDefined();
            expect(info.value).not.toBeDefined();
        });

        it('should return the correct info for other node types', function() {
            var info = astnode.getInfo(binaryExpression);

            expect(info).toBeDefined();

            expect(info.node).toBe(binaryExpression);
            expect(info.type).toBe(Syntax.BinaryExpression);
        });
    });

    describe('getParamNames', function() {
        it('should return an empty array for undefined input', function() {
            var params = astnode.getParamNames();

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(0);
        });

        it('should return an empty array if the input has no params property', function() {
            var params = astnode.getParamNames({});

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(0);
        });

        it('should return an empty array if the input has no params', function() {
            var params = astnode.getParamNames(functionDeclaration1);

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(0);
        });

        it('should return a single-item array if the input has a single param', function() {
            var params = astnode.getParamNames(functionDeclaration2);

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(1);
            expect(params[0]).toBe('bar');
        });

        it('should return a multi-item array if the input has multiple params', function() {
            var params = astnode.getParamNames(functionDeclaration3);

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(3);
            expect(params[0]).toBe('bar');
            expect(params[1]).toBe('baz');
            expect(params[2]).toBe('qux');
        });
    });

    describe('isAccessor', function() {
        it('should return false for undefined values', function() {
            expect( astnode.isAccessor() ).toBe(false);
        });

        it('should return false if the parameter is not an object', function() {
            expect( astnode.isAccessor('foo') ).toBe(false);
        });

        it('should return false for non-Property nodes', function() {
            expect( astnode.isAccessor(binaryExpression) ).toBe(false);
        });

        it('should return false for Property nodes whose kind is "init"', function() {
            expect( astnode.isAccessor(propertyInit) ).toBe(false);
        });

        it('should return true for Property nodes whose kind is "get"', function() {
            expect( astnode.isAccessor(propertyGet) ).toBe(true);
        });

        it('should return true for Property nodes whose kind is "set"', function() {
            expect( astnode.isAccessor(propertySet) ).toBe(true);
        });
    });

    describe('isAssignment', function() {
        it('should return false for undefined values', function() {
            expect( astnode.isAssignment() ).toBe(false);
        });

        it('should return false if the parameter is not an object', function() {
            expect( astnode.isAssignment('foo') ).toBe(false);
        });

        it('should return false for nodes that are not assignments', function() {
            expect( astnode.isAssignment(binaryExpression) ).toBe(false);
        });

        it('should return true for AssignmentExpression nodes', function() {
            expect( astnode.isAssignment(assignmentExpression) ).toBe(true);
        });

        it('should return true for VariableDeclarator nodes', function() {
            expect( astnode.isAssignment(variableDeclarator1) ).toBe(true);
        });
    });

    describe('isScope', function() {
        it('should return false for undefined values', function() {
            expect( astnode.isScope() ).toBe(false);
        });

        it('should return false if the parameter is not an object', function() {
            expect( astnode.isScope('foo') ).toBe(false);
        });

        it('should return true for CatchClause nodes', function() {
            expect( astnode.isScope({type: Syntax.CatchClause}) ).toBe(true);
        });

        it('should return true for FunctionDeclaration nodes', function() {
            expect( astnode.isScope({type: Syntax.FunctionDeclaration}) ).toBe(true);
        });

        it('should return true for FunctionExpression nodes', function() {
            expect( astnode.isScope({type: Syntax.FunctionExpression}) ).toBe(true);
        });

        it('should return false for other nodes', function() {
            expect( astnode.isScope({type: Syntax.NameExpression}) ).toBe(false);
        });
    });

    describe('nodeToString', function() {
        it('should return `[null]` for the sparse array `[,]`', function() {
            expect( astnode.nodeToString(arrayExpression) ).toBe('[null]');
        });

        it('should return the variable name for assignment expressions', function() {
            expect( astnode.nodeToString(assignmentExpression) ).toBe('foo');
        });

        it('should return "function" for function declarations', function() {
            expect( astnode.nodeToString(functionDeclaration1) ).toBe('function');
        });

        it('should return "function" for function expressions', function() {
            expect( astnode.nodeToString(functionExpression1) ).toBe('function');
        });

        it('should return the identifier name for identifiers', function() {
            expect( astnode.nodeToString(identifier) ).toBe('foo');
        });

        it('should return the literal value (as a string) for literals', function() {
            expect( astnode.nodeToString(literal) ).toBe('1');
        });

        it('should return the object and property for noncomputed member expressions', function() {
            expect( astnode.nodeToString(memberExpression) ).toBe('foo.bar');
        });

        it('should return the object and property, with a computed property that uses the same ' +
            'quote character as the original source, for computed member expressions', function() {
            expect( astnode.nodeToString(memberExpressionComputed1) ).toBe('foo["bar"]');
            expect( astnode.nodeToString(memberExpressionComputed2) ).toBe('foo[\'bar\']');
        });

        it('should return "this" for this expressions', function() {
            expect( astnode.nodeToString(thisExpression) ).toBe('this');
        });

        it('should return the operator and nodeToString value for prefix unary expressions',
            function() {
            expect( astnode.nodeToString(unaryExpression1) ).toBe('+1');
            expect( astnode.nodeToString(unaryExpression2) ).toBe('+foo');
        });

        it('should throw an error for postfix unary expressions', function() {
            function postfixNodeToString() {
                // there's no valid source representation for this one, so we fake it
                var unaryExpressionPostfix = (function() {
                    var node = esprima.parse('+1;').body[0].expression;
                    node.prefix = false;
                    return node;
                })();
                return astnode.nodeToString(unaryExpressionPostfix);
            }

            expect(postfixNodeToString).toThrow();
        });

        it('should return the variable name for variable declarators', function() {
            expect( astnode.nodeToString(variableDeclarator1) ).toBe('foo');
        });

        it('should return an empty string for all other nodes', function() {
            expect( astnode.nodeToString(binaryExpression) ).toBe('');
        });
    });
});

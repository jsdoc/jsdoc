describe('jsdoc/src/astNode', () => {
    const astBuilder = require('./astbuilder');
    const astNode = require('./astnode');
    const babelParser = require('@babel/parser');
    const env = require('../env');
    const Syntax = require('./syntax').Syntax;

    function parse(str) {
        return babelParser.parse(str, astBuilder.parserOptions).program.body[0];
    }

    // create the AST nodes we'll be testing
    const arrayExpression = parse('[,]').expression;
    const arrowFunctionExpression = parse('var foo = () => {};').declarations[0].init;
    const assignmentExpression = parse('foo = 1;').expression;
    const binaryExpression = parse('foo & foo;').expression;
    const experimentalObjectRestSpread = parse('var one = {...two, three: 4};').declarations[0].init;
    const functionDeclaration1 = parse('function foo() {}');
    const functionDeclaration2 = parse('function foo(bar) {}');
    const functionDeclaration3 = parse('function foo(bar, baz, qux) {}');
    const functionDeclaration4 = parse('function foo(...bar) {}');
    const functionExpression1 = parse('var foo = function() {};').declarations[0].init;
    const functionExpression2 = parse('var foo = function(bar) {};').declarations[0].init;
    const identifier = parse('foo;').expression;
    const literal = parse('1;').expression;
    const memberExpression = parse('foo.bar;').expression;
    const memberExpressionComputed1 = parse('foo["bar"];').expression;
    const memberExpressionComputed2 = parse('foo[\'bar\'];').expression;
    const methodDefinition1 = parse('class Foo { bar() {} }').body.body[0];
    const methodDefinition2 = parse('var foo = () => class { bar() {} };').declarations[0].init.body
        .body[0];
    const propertyGet = parse('var foo = { get bar() {} };').declarations[0].init.properties[0];
    const propertyInit = parse('var foo = { bar: {} };').declarations[0].init.properties[0];
    const propertySet = parse('var foo = { set bar(a) {} };').declarations[0].init.properties[0];
    const thisExpression = parse('this;').expression;
    const unaryExpression1 = parse('+1;').expression;
    const unaryExpression2 = parse('+foo;').expression;
    const variableDeclarator1 = parse('var foo = 1;').declarations[0];
    const variableDeclarator2 = parse('var foo;').declarations[0];

    it('should exist', () => {
        expect(typeof astNode).toBe('object');
    });

    it('should export an addNodeProperties method', () => {
        expect(typeof astNode.addNodeProperties).toBe('function');
    });

    it('should export a getInfo method', () => {
        expect(typeof astNode.getInfo).toBe('function');
    });

    it('should export a getParamNames method', () => {
        expect(typeof astNode.getParamNames).toBe('function');
    });

    it('should export an isAccessor method', () => {
        expect(typeof astNode.isAccessor).toBe('function');
    });

    it('should export an isAssignment method', () => {
        expect(typeof astNode.isAssignment).toBe('function');
    });

    it('should export an isFunction method', () => {
        expect(typeof astNode.isFunction).toBe('function');
    });

    it('should export an isScope method', () => {
        expect(typeof astNode.isScope).toBe('function');
    });

    it('should export a nodeToString method', () => {
        expect(typeof astNode.nodeToString).toBe('function');
    });

    it('should export a nodeToValue method', () => {
        expect(typeof astNode.nodeToValue).toBe('function');
    });

    describe('addNodeProperties', () => {
        let debugEnabled;

        beforeEach(() => {
            debugEnabled = Boolean(env.opts.debug);
        });

        afterEach(() => {
            env.opts.debug = debugEnabled;
        });

        it('should return null for undefined input', () => {
            expect( astNode.addNodeProperties() ).toBe(null);
        });

        it('should return null if the input is not an object', () => {
            expect( astNode.addNodeProperties('foo') ).toBe(null);
        });

        it('should preserve existing properties that are not "node properties"', () => {
            const node = astNode.addNodeProperties({foo: 1});

            expect(typeof node).toBe('object');
            expect(node.foo).toBe(1);
        });

        it('should add a non-enumerable nodeId if necessary', () => {
            const node = astNode.addNodeProperties({});
            const descriptor = Object.getOwnPropertyDescriptor(node, 'nodeId');

            expect(descriptor).toBeDefined();
            expect(typeof descriptor.value).toBe('string');
            expect(descriptor.enumerable).toBe(false);
        });

        it('should not overwrite an existing nodeId', () => {
            const nodeId = 'foo';
            const node = astNode.addNodeProperties({nodeId: nodeId});

            expect(node.nodeId).toBe(nodeId);
        });

        it('should add an enumerable nodeId in debug mode', () => {
            let descriptor;
            let node;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});
            descriptor = Object.getOwnPropertyDescriptor(node, 'nodeId');

            expect(descriptor.enumerable).toBe(true);
        });

        it('should add a non-enumerable, writable parent if necessary', () => {
            const node = astNode.addNodeProperties({});
            const descriptor = Object.getOwnPropertyDescriptor(node, 'parent');

            expect(descriptor).toBeDefined();
            expect(descriptor.value).toBe(undefined);
            expect(descriptor.enumerable).toBe(false);
            expect(descriptor.writable).toBe(true);
        });

        it('should not overwrite an existing parent', () => {
            const parent = {};
            const node = astNode.addNodeProperties({parent: parent});

            expect(node.parent).toBe(parent);
        });

        it('should not overwrite a null parent', () => {
            const node = astNode.addNodeProperties({parent: null});

            expect(node.parent).toBe(null);
        });

        it('should add an enumerable parentId in debug mode', () => {
            let descriptor;
            let node;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});
            descriptor = Object.getOwnPropertyDescriptor(node, 'parentId');

            expect(descriptor).toBeDefined();
            expect(descriptor.enumerable).toBe(true);
        });

        it('should provide a null parentId in debug mode for nodes with no parent', () => {
            let node;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});

            expect(node.parentId).toBe(null);
        });

        it('should provide a non-null parentId in debug mode for nodes with a parent', () => {
            let node;
            let parent;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});
            parent = astNode.addNodeProperties({});
            node.parent = parent;

            expect(node.parentId).toBe(parent.nodeId);
        });

        it('should add a non-enumerable, writable enclosingScope if necessary', () => {
            const node = astNode.addNodeProperties({});
            const descriptor = Object.getOwnPropertyDescriptor(node, 'enclosingScope');

            expect(descriptor).toBeDefined();
            expect(descriptor.value).toBe(undefined);
            expect(descriptor.enumerable).toBe(false);
            expect(descriptor.writable).toBe(true);
        });

        it('should not overwrite an existing enclosingScope', () => {
            const enclosingScope = {};
            const node = astNode.addNodeProperties({enclosingScope: enclosingScope});

            expect(node.enclosingScope).toBe(enclosingScope);
        });

        it('should not overwrite a null enclosingScope', () => {
            const node = astNode.addNodeProperties({enclosingScope: null});

            expect(node.enclosingScope).toBe(null);
        });

        it('should add an enumerable enclosingScopeId in debug mode', () => {
            let descriptor;
            let node;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});
            descriptor = Object.getOwnPropertyDescriptor(node, 'enclosingScopeId');

            expect(descriptor).toBeDefined();
            expect(descriptor.enumerable).toBe(true);
        });

        it('should provide a null enclosingScopeId in debug mode for nodes with no enclosing scope',
            () => {
                let node;

                env.opts.debug = true;
                node = astNode.addNodeProperties({});

                expect(node.enclosingScopeId).toBe(null);
            });

        it('should provide a non-null enclosingScopeId in debug mode for nodes with an enclosing ' +
            'scope', () => {
            let enclosingScope;
            let node;

            env.opts.debug = true;
            node = astNode.addNodeProperties({});
            enclosingScope = astNode.addNodeProperties({});
            node.enclosingScope = enclosingScope;

            expect(node.enclosingScopeId).toBe(enclosingScope.nodeId);
        });
    });

    describe('getInfo', () => {
        it('should throw an error for undefined input', () => {
            function noNode() {
                astNode.getInfo();
            }

            expect(noNode).toThrow();
        });

        it('should return the correct info for an AssignmentExpression', () => {
            const info = astNode.getInfo(assignmentExpression);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.Literal);
            expect(info.node.value).toBe(1);

            expect(info.name).toBe('foo');
            expect(info.type).toBe(Syntax.Literal);
            expect(info.value).toBe(1);
        });

        it('should return the correct info for a FunctionDeclaration', () => {
            const info = astNode.getInfo(functionDeclaration2);

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

        it('should return the correct info for a FunctionExpression', () => {
            const info = astNode.getInfo(functionExpression2);

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

        it('should return the correct info for a MemberExpression', () => {
            const info = astNode.getInfo(memberExpression);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.MemberExpression);

            expect(info.name).toBe('foo.bar');
            expect(info.type).toBe(Syntax.MemberExpression);
        });

        it('should return the correct info for a computed MemberExpression', () => {
            const info = astNode.getInfo(memberExpressionComputed1);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.MemberExpression);

            expect(info.name).toBe('foo["bar"]');
            expect(info.type).toBe(Syntax.MemberExpression);
        });

        it('should return the correct info for a Property initializer', () => {
            const info = astNode.getInfo(propertyInit);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.ObjectExpression);

            expect(info.name).toBe('bar');
            expect(info.type).toBe(Syntax.ObjectExpression);
        });

        it('should return the correct info for a Property setter', () => {
            const info = astNode.getInfo(propertySet);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.FunctionExpression);

            expect(info.name).toBe('bar');
            expect(info.type).toBeUndefined();
            expect(info.value).toBeUndefined();
            expect( Array.isArray(info.paramnames) ).toBe(true);
            expect(info.paramnames.length).toBe(1);
            expect(info.paramnames[0]).toBe('a');
        });

        it('should return the correct info for a VariableDeclarator with a value', () => {
            const info = astNode.getInfo(variableDeclarator1);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.Literal);

            expect(info.name).toBe('foo');
            expect(info.type).toBe(Syntax.Literal);
            expect(info.value).toBe(1);
        });

        it('should return the correct info for a VariableDeclarator with no value', () => {
            const info = astNode.getInfo(variableDeclarator2);

            expect(info).toBeDefined();

            expect(info.node).toBeDefined();
            expect(info.node.type).toBe(Syntax.Identifier);

            expect(info.name).toBe('foo');
            expect(info.type).not.toBeDefined();
            expect(info.value).not.toBeDefined();
        });

        it('should return the correct info for other node types', () => {
            const info = astNode.getInfo(binaryExpression);

            expect(info).toBeDefined();

            expect(info.node).toBe(binaryExpression);
            expect(info.type).toBe(Syntax.BinaryExpression);
        });
    });

    describe('getParamNames', () => {
        it('should return an empty array for undefined input', () => {
            const params = astNode.getParamNames();

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(0);
        });

        it('should return an empty array if the input has no params property', () => {
            const params = astNode.getParamNames({});

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(0);
        });

        it('should return an empty array if the input has no params', () => {
            const params = astNode.getParamNames(functionDeclaration1);

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(0);
        });

        it('should return a single-item array if the input has a single param', () => {
            const params = astNode.getParamNames(functionDeclaration2);

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(1);
            expect(params[0]).toBe('bar');
        });

        it('should return a multi-item array if the input has multiple params', () => {
            const params = astNode.getParamNames(functionDeclaration3);

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(3);
            expect(params[0]).toBe('bar');
            expect(params[1]).toBe('baz');
            expect(params[2]).toBe('qux');
        });

        it('should include rest parameters', () => {
            const params = astNode.getParamNames(functionDeclaration4);

            expect( Array.isArray(params) ).toBe(true);
            expect(params.length).toBe(1);
            expect(params[0]).toBe('bar');
        });
    });

    describe('isAccessor', () => {
        it('should return false for undefined values', () => {
            expect( astNode.isAccessor() ).toBe(false);
        });

        it('should return false if the parameter is not an object', () => {
            expect( astNode.isAccessor('foo') ).toBe(false);
        });

        it('should return false for non-Property nodes', () => {
            expect( astNode.isAccessor(binaryExpression) ).toBe(false);
        });

        it('should return false for Property nodes whose kind is "init"', () => {
            expect( astNode.isAccessor(propertyInit) ).toBe(false);
        });

        it('should return true for Property nodes whose kind is "get"', () => {
            expect( astNode.isAccessor(propertyGet) ).toBe(true);
        });

        it('should return true for Property nodes whose kind is "set"', () => {
            expect( astNode.isAccessor(propertySet) ).toBe(true);
        });
    });

    describe('isAssignment', () => {
        it('should return false for undefined values', () => {
            expect( astNode.isAssignment() ).toBe(false);
        });

        it('should return false if the parameter is not an object', () => {
            expect( astNode.isAssignment('foo') ).toBe(false);
        });

        it('should return false for nodes that are not assignments', () => {
            expect( astNode.isAssignment(binaryExpression) ).toBe(false);
        });

        it('should return true for AssignmentExpression nodes', () => {
            expect( astNode.isAssignment(assignmentExpression) ).toBe(true);
        });

        it('should return true for VariableDeclarator nodes', () => {
            expect( astNode.isAssignment(variableDeclarator1) ).toBe(true);
        });
    });

    describe('isFunction', () => {
        it('should recognize function declarations as functions', () => {
            expect( astNode.isFunction(functionDeclaration1) ).toBe(true);
        });

        it('should recognize function expressions as functions', () => {
            expect( astNode.isFunction(functionExpression1) ).toBe(true);
        });

        it('should recognize method definitions as functions', () => {
            expect( astNode.isFunction(methodDefinition1) ).toBe(true);
        });

        it('should recognize arrow function expressions as functions', () => {
            expect( astNode.isFunction(arrowFunctionExpression) ).toBe(true);
        });

        it('should recognize non-functions', () => {
            expect( astNode.isFunction(arrayExpression) ).toBe(false);
        });
    });

    describe('isScope', () => {
        it('should return false for undefined values', () => {
            expect( astNode.isScope() ).toBe(false);
        });

        it('should return false if the parameter is not an object', () => {
            expect( astNode.isScope('foo') ).toBe(false);
        });

        it('should return true for CatchClause nodes', () => {
            expect( astNode.isScope({type: Syntax.CatchClause}) ).toBe(true);
        });

        it('should return true for FunctionDeclaration nodes', () => {
            expect( astNode.isScope({type: Syntax.FunctionDeclaration}) ).toBe(true);
        });

        it('should return true for FunctionExpression nodes', () => {
            expect( astNode.isScope({type: Syntax.FunctionExpression}) ).toBe(true);
        });

        it('should return false for other nodes', () => {
            expect( astNode.isScope({type: Syntax.NameExpression}) ).toBe(false);
        });
    });

    describe('nodeToString', () => {
        it('should be an alias to nodeToValue', () => {
            expect(astNode.nodeToString).toBe(astNode.nodeToValue);
        });
    });

    describe('nodeToValue', () => {
        it('should return `[null]` for the sparse array `[,]`', () => {
            expect( astNode.nodeToValue(arrayExpression) ).toBe('[null]');
        });

        it('should return the variable name for assignment expressions', () => {
            expect( astNode.nodeToValue(assignmentExpression) ).toBe('foo');
        });

        it('should return the function name for function declarations', () => {
            expect( astNode.nodeToValue(functionDeclaration1) ).toBe('foo');
        });

        it('should return undefined for anonymous function expressions', () => {
            expect( astNode.nodeToValue(functionExpression1) ).toBeUndefined();
        });

        it('should return the identifier name for identifiers', () => {
            expect( astNode.nodeToValue(identifier) ).toBe('foo');
        });

        it('should return the literal value for literals', () => {
            expect( astNode.nodeToValue(literal) ).toBe(1);
        });

        it('should return the object and property for noncomputed member expressions', () => {
            expect( astNode.nodeToValue(memberExpression) ).toBe('foo.bar');
        });

        it('should return the object and property, with a computed property that uses the same ' +
            'quote character as the original source, for computed member expressions', () => {
            expect( astNode.nodeToValue(memberExpressionComputed1) ).toBe('foo["bar"]');
            expect( astNode.nodeToValue(memberExpressionComputed2) ).toBe('foo[\'bar\']');
        });

        // TODO: we can't test this here because JSDoc, not Babylon, adds the `parent` property to
        // nodes. also, we currently return an empty string instead of `<anonymous>` in this case;
        // see `module:jsdoc/src/astnode.nodeToValue` and the comment on `Syntax.MethodDefinition`
        // for details
        xit('should return `<anonymous>` for method definitions inside classes that were ' +
            'returned by an arrow function expression', () => {
            expect( astNode.nodeToValue(methodDefinition2) ).toBe('<anonymous>');
        });

        it('should return "this" for this expressions', () => {
            expect( astNode.nodeToValue(thisExpression) ).toBe('this');
        });

        it('should return the operator and nodeToValue value for prefix unary expressions',
            () => {
                expect( astNode.nodeToValue(unaryExpression1) ).toBe('+1');
                expect( astNode.nodeToValue(unaryExpression2) ).toBe('+foo');
            });

        it('should throw an error for postfix unary expressions', () => {
            function postfixNodeToValue() {
                // there's no valid source representation for this one, so we fake it
                const unaryExpressionPostfix = (() => {
                    const node = parse('+1;').body[0].expression;

                    node.prefix = false;

                    return node;
                })();

                return astNode.nodeToValue(unaryExpressionPostfix);
            }

            expect(postfixNodeToValue).toThrow();
        });

        it('should return the variable name for variable declarators', () => {
            expect( astNode.nodeToValue(variableDeclarator1) ).toBe('foo');
        });

        it('should return an empty string for all other nodes', () => {
            expect( astNode.nodeToValue(binaryExpression) ).toBe('');
        });

        it('should understand and ignore ExperimentalSpreadProperty', () => {
            expect( astNode.nodeToValue(experimentalObjectRestSpread) ).toBe('{"three":4}');
        });
    });
});

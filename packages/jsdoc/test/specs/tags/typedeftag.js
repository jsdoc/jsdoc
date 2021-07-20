describe('@typedef tag', () => {
    afterEach(() => {
        jsdoc.restoreTagDictionary();
    });

    describe('JSDoc tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('jsdoc');
        });

        it('When a comment has a @typedef tag, the doclet has a kind property set to "typedef".', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/typedeftag.js');
            const numberlike = docSet.getByLongname('calc.NumberLike')[0];

            expect(numberlike.kind).toBe('typedef');
        });

        it('When a comment has a @typedef tag with a type, the doclet has a type property set to that type.', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/typedeftag.js');
            const numberlike = docSet.getByLongname('calc.NumberLike')[0];

            expect(numberlike.type).toBeObject();
            expect(numberlike.type.names).toBeArrayOfSize(2);
            expect(numberlike.type.names[0]).toBe('string');
            expect(numberlike.type.names[1]).toBe('number');
        });

        it('When a comment has a @typedef tag with a name, the doclet has a name property set to that name.', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/typedeftag.js');
            const numberlike = docSet.getByLongname('calc.NumberLike')[0];

            expect(numberlike.name).toBe('NumberLike');
            expect(numberlike.longname).toBe('calc.NumberLike');
        });

        it('When a symbol has a @typedef tag without a name, the doclet has a name property set to the symbol name.', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/typedeftag.js');
            const operator = docSet.getByLongname('calc.Operator')[0];

            expect(operator.name).toBe('Operator');
            expect(operator.longname).toBe('calc.Operator');
        });

        it('When a symbol has a @typedef tag with a name, the name in the tag takes precedence over the symbol name.', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/typedeftag.js');
            const result = docSet.getByLongname('calc.Result')[0];

            expect(result.name).toBe('Result');
            expect(result.longname).toBe('calc.Result');
        });

        it('When a symbol has a @typedef tag with a name and no scope, the scope defaults to `global`.', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/typedeftag.js');
            const calculatorBattery = docSet.getByLongname('CalculatorBattery')[0];

            expect(calculatorBattery).toBeObject();
            expect(calculatorBattery.scope).toBe('global');
        });

        it('When a symbol has a @typedef tag with a name, in file with module scope, the scope is `inner`.', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/typedeftag3.js');
            const moduleScopedTypedef = docSet.getByLongname('module:m~ModuleScopedTypedef')[0];


            expect(moduleScopedTypedef).toBeObject();
            expect(moduleScopedTypedef.scope).toBe('inner');
        });

        it('When a symbol has @global on a @typedef tag with a name, in a file with module scope, the scope is `global`.', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/typedeftag3.js');

            const globallyScopedTypedef = docSet.getByLongname('GloballyScopedTypedef')[0];

            expect(globallyScopedTypedef).toBeObject();
            expect(globallyScopedTypedef.scope).toBe('global');
        });
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('closure');
        });

        it('When a comment has a @typedef tag, the doclet has a kind property set to "typedef".', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/typedeftag2.js');
            const numberlike = docSet.getByLongname('calc.NumberLike')[0];

            expect(numberlike.kind).toBe('typedef');
        });

        it('When a comment has a @typedef tag with a type, the doclet has a type property set to that type.', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/typedeftag2.js');
            const numberlike = docSet.getByLongname('calc.NumberLike')[0];

            expect(numberlike.type).toBeObject();
            expect(numberlike.type.names).toBeArrayOfSize(2);
            expect(numberlike.type.names[0]).toBe('string');
            expect(numberlike.type.names[1]).toBe('number');
        });

        it('When a symbol has a @typedef tag, the doclet has a name property set to the symbol name.', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/typedeftag2.js');
            const numberlike = docSet.getByLongname('calc.NumberLike')[0];

            expect(numberlike.name).toBe('NumberLike');
        });
    });
});

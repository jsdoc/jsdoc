describe('@this tag', () => {
    afterEach(() => {
        jsdoc.restoreTagDictionary();
    });

    describe('JSDoc tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('jsdoc');
        });

        it('should add a `this` property set to the @this tag\'s value', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/thistag.js');
            const setName = docSet.getByLongname('setName')[0];

            expect(setName.this).toBe('Foo');
        });

        it('should change the memberof for symbols like `this.foo`', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/thistag.js');
            const fooName = docSet.getByLongname('Foo#name')[0];

            expect(fooName).toBeObject();
            expect(fooName.name).toBe('name');
            expect(fooName.memberof).toBe('Foo');
            expect(fooName.scope).toBe('instance');
        });
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('closure');
        });

        it('should add a `this` property set to the @this tag\'s type expression', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/thistag2.js');
            const setName = docSet.getByLongname('setName')[0];

            expect(setName.this).toBe('Foo');
        });

        it('should change the memberof for symbols like `this.foo`', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/thistag2.js');
            const fooName = docSet.getByLongname('Foo#name')[0];

            expect(fooName).toBeObject();
            expect(fooName.name).toBe('name');
            expect(fooName.memberof).toBe('Foo');
            expect(fooName.scope).toBe('instance');
        });

        it('should work with type unions', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/thistag2.js');
            const getName = docSet.getByLongname('getName')[0];

            expect(getName.this).toBe('(Foo|Bar)');
        });
    });
});

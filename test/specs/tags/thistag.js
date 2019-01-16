describe('@this tag', () => {
    afterEach(() => {
        jasmine.restoreTagDictionary();
    });

    describe('JSDoc tags', () => {
        beforeEach(() => {
            jasmine.replaceTagDictionary('jsdoc');
        });

        it('should add a `this` property set to the @this tag\'s value', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/thistag.js');
            const setName = docSet.getByLongname('setName')[0];

            expect(setName.this).toBe('Foo');
        });

        it('should change the memberof for symbols like `this.foo`', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/thistag.js');
            const fooName = docSet.getByLongname('Foo#name')[0];

            expect(typeof fooName).toBe('object');
            expect(fooName.name).toBe('name');
            expect(fooName.memberof).toBe('Foo');
            expect(fooName.scope).toBe('instance');
        });
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jasmine.replaceTagDictionary('closure');
        });

        it('should add a `this` property set to the @this tag\'s type expression', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/thistag2.js');
            const setName = docSet.getByLongname('setName')[0];

            expect(setName.this).toBe('Foo');
        });

        it('should change the memberof for symbols like `this.foo`', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/thistag2.js');
            const fooName = docSet.getByLongname('Foo#name')[0];

            expect(typeof fooName).toBe('object');
            expect(fooName.name).toBe('name');
            expect(fooName.memberof).toBe('Foo');
            expect(fooName.scope).toBe('instance');
        });

        it('should work with type unions', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/thistag2.js');
            const getName = docSet.getByLongname('getName')[0];

            expect(getName.this).toBe('(Foo|Bar)');
        });
    });
});

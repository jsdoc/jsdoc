describe('@public tag', () => {
    afterEach(() => {
        jasmine.restoreTagDictionary();
    });

    describe('JSDoc tags', () => {
        beforeEach(() => {
            jasmine.replaceTagDictionary('jsdoc');
        });

        it('should set the doclet\'s `access` property to `public`', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/publictag.js');
            const foo = docSet.getByLongname('Foo')[0];

            expect(foo.access).toBe('public');
        });
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jasmine.replaceTagDictionary('closure');
        });

        it('should set the doclet\'s `access` property to `public`', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/publictag2.js');
            const bar = docSet.getByLongname('bar')[0];

            expect(bar.access).toBe('public');
        });

        it('should include the type if one is provided', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/publictag2.js');
            const bar = docSet.getByLongname('bar')[0];

            expect(bar.type).toBeDefined();
            expect(bar.type.names.length).toBe(1);
            expect(bar.type.names[0]).toBe('string');
        });
    });
});

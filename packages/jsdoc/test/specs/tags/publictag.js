describe('@public tag', () => {
    afterEach(() => {
        jsdoc.restoreTagDictionary();
    });

    describe('JSDoc tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('jsdoc');
        });

        it('should set the doclet\'s `access` property to `public`', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/publictag.js');
            const foo = docSet.getByLongname('Foo')[0];

            expect(foo.access).toBe('public');
        });
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('closure');
        });

        it('should set the doclet\'s `access` property to `public`', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/publictag2.js');
            const bar = docSet.getByLongname('bar')[0];

            expect(bar.access).toBe('public');
        });

        it('should include the type if one is provided', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/publictag2.js');
            const bar = docSet.getByLongname('bar')[0];

            expect(bar.type).toBeObject();
            expect(bar.type.names).toBeArrayOfSize(1);
            expect(bar.type.names[0]).toBe('string');
        });
    });
});

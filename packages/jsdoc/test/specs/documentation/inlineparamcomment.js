describe('inline comments on function parameters', () => {
    it('should not crash when multiple parameters have inline comments that do not contain any' +
        'JSDoc tags', () => {
        function loadDocSet() {
            jsdoc.getDocSetFromFile('test/fixtures/inlineparamcomment.js');
        }

        expect(loadDocSet).not.toThrow();
    });

    describe('ES 2015 only', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/inlineparamcomment2.js');
        const foo = docSet.getByLongname('ns.foo')[0];

        it('should attach inline comments to default parameters', () => {
            expect(foo.params[0].type.names).toBeArrayOfSize(1);
            expect(foo.params[0].type.names[0]).toBe('string');
        });

        it('should attach inline comments to rest parameters', () => {
            expect(foo.params[1].type.names).toBeArrayOfSize(1);
            expect(foo.params[1].type.names[0]).toBe('number');
        });
    });
});

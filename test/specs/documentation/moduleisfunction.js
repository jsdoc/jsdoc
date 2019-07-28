describe('module that exports a function that is not a constructor', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduleisfunction.js');
    const functions = docSet.doclets.filter(({kind}) => kind === 'function');

    it('should include one doclet whose kind is "function"', () => {
        expect(functions).toBeArrayOfSize(1);
        expect(functions[0].kind).toBe('function');
    });

    describe('function doclet', () => {
        it('should not include a "scope" property', () => {
            expect(functions[0].scope).not.toBeDefined();
        });

        it('should not include a "memberof" property', () => {
            expect(functions[0].memberof).not.toBeDefined();
        });
    });
});

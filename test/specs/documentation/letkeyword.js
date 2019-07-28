describe('let keyword', () => {
    function getDocSet() {
        return jsdoc.getDocSetFromFile('test/fixtures/letkeyword.js');
    }

    it('should be able to compile JS files that contain the "let" keyword', () => {
        expect(getDocSet).not.toThrow();
    });

    it('should correctly recognize a module defined with the "let" keyword', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/letkeyword.js');
        const exampleModule = docSet.getByLongname('module:exampleModule');

        expect(exampleModule).toBeArrayOfSize(1);
    });

    it('should correctly recognize members of a module defined with the "let" keyword', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/letkeyword.js');
        const exampleMethod = docSet.getByLongname('module:exampleModule.exampleMethod');

        expect(exampleMethod).toBeArrayOfSize(1);
    });
});

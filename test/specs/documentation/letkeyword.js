describe('let keyword', () => {
    let docSet;
    let exampleModule;
    let exampleMethod;

    function getDocSet() {
        docSet = jsdoc.getDocSetFromFile('test/fixtures/letkeyword.js');
        exampleModule = docSet.getByLongname('module:exampleModule');
        exampleMethod = docSet.getByLongname('module:exampleModule.exampleMethod');
    }

    it('should be able to compile JS files that contain the "let" keyword', () => {
        expect(getDocSet).not.toThrow();
    });

    it('should correctly recognize a module defined with the "let" keyword', () => {
        expect(exampleModule).toBeDefined();
        expect( Array.isArray(exampleModule) ).toBe(true);
        expect(exampleModule.length).toBe(1);
    });

    it('should correctly recognize members of a module defined with the "let" keyword', () => {
        expect(exampleMethod).toBeDefined();
        expect( Array.isArray(exampleMethod) ).toBe(true);
        expect(exampleMethod.length).toBe(1);
    });
});

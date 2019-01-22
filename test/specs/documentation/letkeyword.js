/* global jsdoc */
describe('let keyword', () => {
    function getDocSet() {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/letkeyword.js');
    }

    it('should be able to compile JS files that contain the "let" keyword', () => {
        expect(getDocSet).not.toThrow();
    });

    it('should correctly recognize a module defined with the "let" keyword', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/letkeyword.js');
        const exampleModule = docSet.getByLongname('module:exampleModule');

        expect(exampleModule).toBeDefined();
        expect(Array.isArray(exampleModule)).toBe(true);
        expect(exampleModule.length).toBe(1);
    });

    it('should correctly recognize members of a module defined with the "let" keyword', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/letkeyword.js');
        const exampleMethod = docSet.getByLongname('module:exampleModule.exampleMethod');

        expect(exampleMethod).toBeDefined();
        expect(Array.isArray(exampleMethod)).toBe(true);
        expect(exampleMethod.length).toBe(1);
    });
});

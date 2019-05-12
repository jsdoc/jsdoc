describe('method definition inside a class declaration', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/methoddefinition.js');
    const runMethod = docSet.getByLongname('Test#run')[0];
    const staticRunMethod = docSet.getByLongname('Test.run')[0];

    it('methods should have documentation comments', () => {
        expect(runMethod).toBeDefined();
        expect(runMethod.description).toBe('Document me.');
        expect(runMethod.kind).toBe('function');

        expect(staticRunMethod).toBeDefined();
        expect(staticRunMethod.description).toBe('Static document me.');
        expect(staticRunMethod.kind).toBe('function');
    });
});

describe('class without a name', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/classwithoutname.js').doclets
        .filter(({name}) => name === '');

    it('When the doclet for a class has an empty name, it should also have an empty longname', () => {
        expect(docSet).toBeArray();
        expect(docSet.length).toBe(1);
        expect(docSet[0].description).toBe('Create an instance of MyClass.');
        expect(docSet[0].longname).toBe('');
    });
});

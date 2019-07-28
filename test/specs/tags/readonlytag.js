describe('@readonly tag', () => {
    it('When a symbol has an @readonly tag, the doclet has an readonly property that is true.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/readonlytag.js');
        const length = docSet.getByLongname('Collection#length')[0];

        expect(length.readonly).toBeTrue();
    });
});

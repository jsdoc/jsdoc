describe('@description tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/descriptiontag.js');
    const doc = docSet.getByLongname('x')[0];
    const doc2 = docSet.getByLongname('y')[0];

    it('sets the doclet\'s "description" property to the description', () => {
        expect(doc2.description).toBe('lkjasdf');
    });

    it('overrides the default description', () => {
        expect(doc.description).toBe('halb halb halb');
    });
});

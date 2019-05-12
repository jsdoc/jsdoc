describe('@summary tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/summarytag.js');
    const doc = docSet.getByLongname('Sam')[0];

    it("sets the doclet's 'summary' property to the tag value", () => {
        expect(doc.summary).toBe('I do not like green eggs and ham!');
    });
});

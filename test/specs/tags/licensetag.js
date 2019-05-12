describe('@license tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/licensetag.js');
    const doc = docSet.getByLongname('x')[0];

    it("sets the doclet's 'license' property to the tag value", () => {
        expect(doc.license).toBe('GPL v2');
    });
});

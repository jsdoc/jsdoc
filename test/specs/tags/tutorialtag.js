describe('@tutorial tag', () => {
    // these are tests for the block usage, not the inline usage. see util/templateHelper for that.
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/tutorialtag.js');
    const doc = docSet.getByLongname('x')[0];

    it("adds the listed tutorials to a 'tutorials' array on the doclet", () => {
        expect(Array.isArray(doc.tutorials)).toBeTruthy();
        expect(doc.tutorials.length).toBe(2);
        expect(doc.tutorials).toContain('tute1');
        expect(doc.tutorials).toContain('tute2');
    });
});

describe('@undocumented tag', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/undocumentedtag.js');
    const doc = docSet.getByLongname('x')[0];

    it("sets the doclet's 'undocumented' property to true", () => {
        expect(doc.undocumented).toBeTruthy();
    });

    it("clears the doclet's 'comment' property", () => {
        expect(doc.comment).toBe('');
    });
});

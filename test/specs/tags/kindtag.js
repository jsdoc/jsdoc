describe('@kind tag', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/kindtag.js');
    const doc = docSet.getByLongname('x')[0];

    it("sets the doclet's 'kind' property to the tag value", () => {
        expect(doc.kind).toBeDefined();
        expect(doc.kind).toBe('function');
    });
});

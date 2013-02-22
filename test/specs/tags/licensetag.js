describe("@license tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/licensetag.js'),
        doc = docSet.getByLongname('x')[0];

    it("sets the doclet's 'license' property to the tag value", function() {
        expect(doc.license).toBe('GPL v2');
    });
});

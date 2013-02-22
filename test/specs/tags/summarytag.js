describe("@summary tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/summarytag.js'),
        doc = docSet.getByLongname('Sam')[0];
    it("sets the doclet's 'summary' property to the tag value", function() {
        expect(doc.summary).toBe('I do not like green eggs and ham!');
    });
});


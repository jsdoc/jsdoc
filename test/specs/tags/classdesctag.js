describe("@classdesc tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/classdesctag.js'),
        doc = docSet.getByLongname('Foo')[0];

    it('adds a classdesc property to the doclet with the description', function() {
        expect(doc.classdesc).toBe('A description of the class.');
    });
});

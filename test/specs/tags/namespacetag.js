describe("@namespace tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/namespacetag.js'),
        doc = docSet.getByLongname('x')[0],
        doc2 = docSet.getByLongname('Foo')[0],
        doc3 = docSet.getByLongname('Bar')[0];

    it("sets the doclet's kind to 'namespace'", function () {
        expect(doc.kind).toBe('namespace');
        expect(doc2.kind).toBe('namespace');
        expect(doc3.kind).toBe('namespace');
    });

    it("sets the doclet's name to the tag value (if provided)", function() {
        expect(doc.name).toBe('x');
        expect(doc2.name).toBe('Foo');
        expect(doc3.name).toBe('Bar');
    });

    it("sets the doclet's type (if provided in @namespace)", function() {
        expect(doc3.type).toBeDefined();
        expect(Array.isArray(doc3.type.names)).toBeTruthy();
        expect(doc3.type.names.length).toBe(1);
        expect(doc3.type.names[0]).toBe('function');
    });
});

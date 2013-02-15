describe("@kind tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @kind function */', {});
    it("sets the doclet's 'kind' property to the tag value", function() {
        expect(doc.kind).toBeDefined();
        expect(doc.kind).toBe('function');
    });
});

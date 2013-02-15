describe("@license tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @license GPL v2 */', {});

    it("sets the doclet's 'license' property to the tag value", function() {
        expect(doc.license).toBe('GPL v2');
    });
});

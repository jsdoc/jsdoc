describe("@summary tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @summary I do not like green eggs and ham! */', {});
    it("sets the doclet's 'summary' property to the tag value", function() {
        expect(doc.summary).toBe('I do not like green eggs and ham!');
    });
});


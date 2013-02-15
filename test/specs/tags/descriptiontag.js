describe("@description tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** Blah Blah Blah\n @desc halb halb halb */', {}),
        doc2 = new doclet.Doclet('/** @description lkjasdf */', {});

    it("sets the doclet's 'description' property to the description", function() {
        expect(doc2.description).toBeDefined();
        expect(doc2.description).toBe('lkjasdf');
    });

    it("overrides the default description", function() {
        expect(doc.description).toBeDefined();
        expect(doc.description).toBe('halb halb halb');
    });
});

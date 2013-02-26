describe("@lends tag", function() {
    // see also specs/documentation/lends.js for tests on @lends behaviour.
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @lends */', {}),
        doc2 = new doclet.Doclet('/** @lends MyClass# */', {});

    it("sets the doclet's 'alias' property to the tag value or <global>", function() {
        expect(doc.alias).toBe('<global>');
        expect(doc2.alias).toBe('MyClass#');
    });

    it("sets the doclet's 'undocumented' property to 'true'", function() {
        expect(doc.undocumented).toBeTruthy();
        expect(doc2.undocumented).toBeTruthy();
    });
});

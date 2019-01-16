describe('@lends tag', () => {
    // see also specs/documentation/lends.js for tests on @lends behaviour.
    const doclet = require('jsdoc/doclet');

    const doc = new doclet.Doclet('/** @lends */', {});
    const doc2 = new doclet.Doclet('/** @lends MyClass# */', {});

    it("sets the doclet's 'alias' property to the tag value or <global>", () => {
        expect(doc.alias).toBe('<global>');
        expect(doc2.alias).toBe('MyClass#');
    });

    it("sets the doclet's 'undocumented' property to 'true'", () => {
        expect(doc.undocumented).toBeTruthy();
        expect(doc2.undocumented).toBeTruthy();
    });
});

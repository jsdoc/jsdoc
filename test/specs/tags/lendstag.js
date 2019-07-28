describe('@lends tag', () => {
    // see also specs/documentation/lends.js for tests on @lends behaviour.
    const { Doclet } = require('jsdoc/doclet');

    const doc = new Doclet('/** @lends */', {});
    const doc2 = new Doclet('/** @lends MyClass# */', {});

    it("sets the doclet's 'alias' property to the tag value or <global>", () => {
        expect(doc.alias).toBe('<global>');
        expect(doc2.alias).toBe('MyClass#');
    });

    it("sets the doclet's 'undocumented' property to 'true'", () => {
        expect(doc.undocumented).toBeTrue();
        expect(doc2.undocumented).toBeTrue();
    });
});

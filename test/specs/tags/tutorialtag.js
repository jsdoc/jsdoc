describe("@tutorial tag", function() {
    // these are tests for the block usage, not the inline usage. see util/templateHelper for that.
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @tutorial tute1\n@tutorial tute2 */', {});

    it("adds the listed tutorials to a 'tutorials' array on the doclet", function () {
        expect(Array.isArray(doc.tutorials)).toBeTruthy();
        expect(doc.tutorials.length).toBe(2);
        expect(doc.tutorials).toContain('tute1');
        expect(doc.tutorials).toContain('tute2');
    });
});


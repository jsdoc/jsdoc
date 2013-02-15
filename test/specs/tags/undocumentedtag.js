describe("@undocumented tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** Foo bar\n@undocumented */', {});

    it("sets the doclet's 'undocumented' property to true", function () {
        expect(doc.undocumented).toBeTruthy();
    });

    it("clears the doclet's 'comment' property", function () {
        expect(doc.comment).toBe('');
    });
});


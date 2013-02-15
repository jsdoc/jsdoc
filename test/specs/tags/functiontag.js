describe("@function tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @func Foo */', {}),
        doc2 = new doclet.Doclet('/** @method */', {});

    it("sets the doclet's kind to 'function'", function() {
        expect(doc.kind).toBe('function');
        expect(doc2.kind).toBe('function');
    });

    it("sets the doclet's name to the tag value, if provided", function() {
        expect(doc.name).toBe('Foo');
        expect(doc2.name).toBeFalsy();
    });

    // parameter etc tests take place elsewhere: on its own, all @func does is
    // set doclet.kind to function and sets the doclet's name.
});

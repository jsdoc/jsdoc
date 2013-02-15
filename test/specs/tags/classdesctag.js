describe("@classdesc tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** Asdf. @class Foo\n@classdesc A description of the class. */', {});
    it('adds a classdesc property to the doclet with the description', function() {
        expect(doc.classdesc).toBe('A description of the class.');
    });
});

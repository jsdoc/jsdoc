describe("@alias tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @name Foo\n@alias Bar */', {});

    it("adds an 'alias' property to the doclet with the tag's value", function() {
        expect(doc.alias).toBeDefined();
        expect(doc.alias).toBe('Bar');
    });
    // further tests (ensuring alias has the proper effect): documentation/alias.js
});

describe("@member tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @member */', {}),
        doc2 = new doclet.Doclet('/** @var foobar */', {}),
        doc3 = new doclet.Doclet('/** @var {string} baz */', {});

    it("sets the doclet's 'kind' property to 'member'", function() {
        expect(doc.kind).toBe('member');
        expect(doc2.kind).toBe('member');
        expect(doc3.kind).toBe('member');
    });

    it("If specified with a name, sets the doclet's name property", function() {
        expect(doc.name).toBeFalsy();
        expect(doc2.name).toBe('foobar');
        expect(doc3.name).toBe('baz');
    });

    it("If specified with a type and name, sets the doclet's type appropriately", function() {
        expect(doc3.type).toBeDefined();
        expect(Array.isArray(doc3.type.names)).toBeTruthy();
        expect(doc3.type.names.length).toBe(1);
        expect(doc3.type.names[0]).toBe('string');
    });
});

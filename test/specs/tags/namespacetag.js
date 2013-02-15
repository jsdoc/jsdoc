describe("@namespace tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @namespace */', {}),
        doc2 = new doclet.Doclet('/** @namespace Foo */', {}),
        doc3 = new doclet.Doclet('/** @namespace {function} Bar */', {});

    it("sets the doclet's kind to 'namespace'", function () {
        expect(doc.kind).toBe('namespace');
        expect(doc2.kind).toBe('namespace');
        expect(doc3.kind).toBe('namespace');
    });

    it("sets the doclet's name to the tag value (if provided)", function() {
        expect(doc.name).toBeFalsy();
        expect(doc2.name).toBe('Foo');
        expect(doc3.name).toBe('Bar');
    });

    it("sets the doclet's type (if provided in @namespace)", function() {
        expect(doc3.type).toBeDefined();
        expect(Array.isArray(doc3.type.names)).toBeTruthy();
        expect(doc3.type.names.length).toBe(1);
        expect(doc3.type.names[0]).toBe('function');
    });
});

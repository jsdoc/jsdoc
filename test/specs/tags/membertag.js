'use strict';

describe('@member tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/membertag.js');
    var doc = docSet.getByLongname('x')[0];
    var doc2 = docSet.getByLongname('foobar')[0];
    var doc3 = docSet.getByLongname('baz')[0];
    var doc4 = docSet.getByLongname('y')[0];

    it("sets the doclet's 'kind' property to 'member'", function() {
        expect(doc.kind).toBe('member');
        expect(doc2.kind).toBe('member');
        expect(doc3.kind).toBe('member');
        expect(doc4.kind).toBe('member');
    });

    it("If specified with a name, sets the doclet's name property", function() {
        expect(doc.name).toBe('x');
        expect(doc2.name).toBe('foobar');
        expect(doc3.name).toBe('baz');
    });

    it("If specified with a type and name, sets the doclet's type appropriately", function() {
        expect(doc3.type).toBeDefined();
        expect(Array.isArray(doc3.type.names)).toBeTruthy();
        expect(doc3.type.names.length).toBe(1);
        expect(doc3.type.names[0]).toBe('string');
    });

    it("If specified with a type but no name, sets the doclet's name from the following JavaScript syntax", function() {
        expect(doc4.name).toBe('y');
    });

    it("If specified with a type but no name, sets the doclet's type appropriately", function() {
        expect(doc4.type).toBeDefined();
        expect(Array.isArray(doc4.type.names)).toBeTruthy();
        expect(doc4.type.names.length).toBe(1);
        expect(doc4.type.names[0]).toBe('Object');
    });
});

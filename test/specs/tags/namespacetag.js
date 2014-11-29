'use strict';

describe('@namespace tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/namespacetag.js');
    var x = docSet.getByLongname('x')[0];
    var Foo = docSet.getByLongname('Foo')[0];
    var Bar = docSet.getByLongname('Bar')[0];
    var Socket = docSet.getByLongname('S.Socket')[0];

    it("sets the doclet's kind to 'namespace'", function () {
        expect(x.kind).toBe('namespace');
        expect(Foo.kind).toBe('namespace');
        expect(Bar.kind).toBe('namespace');
    });

    it("sets the doclet's name to the tag value (if provided)", function() {
        expect(x.name).toBe('x');
        expect(Foo.name).toBe('Foo');
        expect(Bar.name).toBe('Bar');
    });

    it("sets the doclet's type (if provided in @namespace)", function() {
        expect(Bar.type).toBeDefined();
        expect(Array.isArray(Bar.type.names)).toBeTruthy();
        expect(Bar.type.names.length).toBe(1);
        expect(Bar.type.names[0]).toBe('function');
    });

    it("sets the doclet's longname correctly when the namespace is a substring of the name",
        function() {
        expect(Socket).toBeDefined();
        expect(Socket.name).toBe('Socket');
    });
});

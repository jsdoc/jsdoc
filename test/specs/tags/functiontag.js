'use strict';

describe('@function tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/functiontag.js');
    var doc = docSet.getByLongname('Foo')[0];
    var doc2 = docSet.getByLongname('Bar')[0];

    it('sets the doclet\'s kind to "function"', function() {
        expect(doc.kind).toBe('function');
        expect(doc2.kind).toBe('function');
    });

    it('sets the doclet\'s name to the tag value, if provided', function() {
        expect(doc.name).toBe('Foo');
        expect(doc2.name).toBe('Bar');
    });

    // parameter etc tests take place elsewhere: on its own, all @func does is
    // set doclet.kind to function and sets the doclet's name.
});

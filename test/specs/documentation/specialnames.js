'use strict';

describe('documenting symbols with special names', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/specialnames.js');
    var name = docSet.getByLongname('hasOwnProperty').filter(function($) {
        return !($.undocumented);
    });
    var proto = docSet.getByLongname('prototype')[0];
    var protoValueOf = docSet.getByLongname('prototype.valueOf')[0];

    it('When a symbol is named "hasOwnProperty," the symbol should appear in the docs.', function() {
        expect(name.length).toEqual(1);
    });

    it('When a symbol is named "prototype", the symbol should appear in the docs.', function() {
        expect(proto).toBeDefined();
    });

    it('When a symbol is named "prototype", its members are resolved correctly.', function() {
        expect(protoValueOf).toBeDefined();
    });
});

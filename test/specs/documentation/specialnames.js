'use strict';

describe('documenting symbols with special names', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/specialnames.js');
    var construct = docSet.getByLongname('constructor')[0];
    var constructToString = docSet.getByLongname('constructor.toString')[0];
    var hasOwnProp = docSet.getByLongname('hasOwnProperty')[0];
    var proto = docSet.getByLongname('prototype')[0];
    var protoValueOf = docSet.getByLongname('prototype.valueOf')[0];

    it('When a symbol is named "constructor", the symbol should appear in the docs.', function() {
        expect(construct).toBeDefined();
    });

    it('When a symbol is named "constructor", its members are resolved correctly.', function() {
        expect(constructToString).toBeDefined();
    });

    it('When a symbol is named "hasOwnProperty," the symbol should appear in the docs.', function() {
        expect(hasOwnProp).toBeDefined();
    });

    it('When a symbol is named "prototype", the symbol should appear in the docs.', function() {
        expect(proto).toBeDefined();
    });

    it('When a symbol is named "prototype", its members are resolved correctly.', function() {
        expect(protoValueOf).toBeDefined();
    });
});

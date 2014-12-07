'use strict';

describe('documenting symbols with special names', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/specialnames.js');
    var name = docSet.getByLongname('hasOwnProperty').filter(function($) {
        return ! $.undocumented;
    });

    it('When a symbol is named "hasOwnProperty," the symbol should appear in the docs.', function() {
        expect(name.length).toEqual(1);
    });
});

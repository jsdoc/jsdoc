'use strict';

describe('when a documented var memeber is inside a named function', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/inner.js');
    var found1 = docSet.getByLongname('sendMessage~encoding');
    var found2 = docSet.getByLongname('sendMessage~encrypt');

    it('A doclet with the correct longname should be found', function() {
        expect(found1.length).toBe(1);
        expect(found2.length).toBe(1);
    });

    it('The short name should be correct', function() {
        expect(found1[0].name).toBe('encoding');
        expect(found2[0].name).toBe('encrypt');
    });

    it('The memberof should be correct', function() {
        expect(found1[0].memberof).toBe('sendMessage');
        expect(found2[0].memberof).toBe('sendMessage');
    });
    it('The scope should default to "inner"', function() {
        expect(found1[0].scope).toBe('inner');
        expect(found2[0].scope).toBe('inner');
    });
});

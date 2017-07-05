'use strict';

describe('generator functions', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/generators.js');
    var startsAt0 = docSet.getByLongname('startsAt0')[0];
    var startsAt1 = docSet.getByLongname('startsAt1')[0];
    var startsAt2 = docSet.getByLongname('Generator#startsAt2')[0];

    it('should flag generator functions', function() {
        expect(startsAt0.generator).toBe(true);
    });

    it('should flag generator functions assigned to variables', function() {
        expect(startsAt1.generator).toBe(true);
    });

    it('should flag generator functions that are method definitions', function() {
        expect(startsAt2.generator).toBe(true);
    });
});

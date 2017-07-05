'use strict';

describe('@generator tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/generatortag.js');
    var idMaker = docSet.getByLongname('idMaker')[0];

    it('should mark the symbol as a generator function', function() {
        expect(idMaker.generator).toBe(true);
    });
});

'use strict';

describe('async functions', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/asyncfunction.js');
    var add = docSet.getByLongname('add')[0];
    var subtract = docSet.getByLongname('subtract')[0];
    var adderAdd = docSet.getByLongname('Adder#add')[0];

    it('should automatically document async functions as async', function() {
        expect(add.async).toBe(true);
    });

    it('should work when the async function is assigned to a variable', function() {
        expect(subtract.async).toBe(true);
    });

    it('should work when the async function is a method definition', function() {
        expect(adderAdd.async).toBe(true);
    });
});

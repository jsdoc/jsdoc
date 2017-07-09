'use strict';

describe('@yields tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/yieldstag.js');
    var fibonacci = docSet.getByLongname('fibonacci')[0];
    var fibonacci2 = docSet.getByLongname('fibonacci2')[0];
    var fibonacci3 = docSet.getByLongname('fibonacci3')[0];

    it('should add the type and description to the doclet\'s `yields` property', function() {
        expect(Array.isArray(fibonacci.yields)).toBe(true);
        expect(fibonacci.yields.length).toBe(1);
        expect(fibonacci.yields[0].type.names.join(', ')).toBe('number');
        expect(fibonacci.yields[0].description).toBe('The next number in the Fibonacci sequence.');
    });

    it('should work when only a description is present', function() {
        expect(Array.isArray(fibonacci2.yields)).toBe(true);
        expect(fibonacci2.yields.length).toBe(1);
        expect(fibonacci2.yields[0].type).not.toBeDefined();
        expect(fibonacci2.yields[0].description).toBe('The next number in the Fibonacci sequence.');
    });

    it('should work when only a type is present', function() {
        expect(Array.isArray(fibonacci3.yields)).toBe(true);
        expect(fibonacci3.yields.length).toBe(1);
        expect(fibonacci3.yields[0].type.names.join(', ')).toBe('number');
        expect(fibonacci3.yields[0].description).not.toBeDefined();
    });
});

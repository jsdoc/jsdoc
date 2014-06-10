/*global describe, expect, it, jasmine */
describe('virtual symbols', function() {

    describe('simple cases', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/virtual.js');
        var dimensions = docSet.getByLongname('dimensions');
        var width = docSet.getByLongname('width');

        it('should document virtual symbols', function() {
            expect(dimensions.length).toBe(1);
        });

        it('should document an undocumented symbol found after a comment for a virtual symbol', function() {
            expect(width.length).toBe(1);
        });
    });

    describe('complex cases', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/virtual2.js');
        var say = docSet.getByLongname('Person#say')[0];
        var sayCallback = docSet.getByLongname('Person~sayCallback')[0];

        it('should document virtual symbols inside an object literal', function() {
            expect(sayCallback).toBeDefined();
            expect(sayCallback.undocumented).not.toBeDefined();
        });

        it('should attach the comment to a documented symbol that follows a virtual symbol', function() {
            expect(say).toBeDefined();
            expect(say.undocumented).not.toBeDefined();
        });
    });
});

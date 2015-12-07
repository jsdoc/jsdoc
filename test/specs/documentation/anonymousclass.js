'use strict';

describe('anonymous class', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/anonymousclass.js');
    var klass = docSet.getByLongname('module:test')[2];
    var foo = docSet.getByLongname('module:test#foo')[0];
    var klassTest = docSet.getByLongname('module:test#test')[0];
    var klassStaticTest = docSet.getByLongname('module:test.staticTest')[0];

    it('should merge the constructor docs with the class docs', function() {
        expect(klass.description).toBe('Test constructor');
    });

    it('should use the correct longname for instance properties', function() {
        expect(foo.description).toBe('Test member');
    });

    it('should use the correct longname for instance methods', function() {
        expect(klassTest.description).toBe('Test method');
    });

    it('should use the correct longname for static methods', function() {
        expect(klassStaticTest.description).toBe('Test static method');
    });
});

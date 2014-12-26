'use strict';

describe('@variation tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/variationtag.js');
    var someObject = docSet.getByLongname('someObject')[0];
    var someObject2 = docSet.getByLongname('someObject(2)')[0];
    var someObject2Method = docSet.getByLongname('someObject(2).someMethod')[0];
    var someObject3 = docSet.getByLongname('someObject(3)')[0];

    it('When a symbol has a variation tag, the longname includes that variation.', function() {
        expect(someObject2.longname).toBe('someObject(2)');
    });

    it('When a symbol is a member of a variation, the longname includes the variation.', function() {
        expect(someObject2Method.longname).toBe('someObject(2).someMethod');
    });

    it('When the variation tag\'s value is enclosed in parentheses, the parentheses are removed', function() {
        expect(someObject3).toBeDefined();

        expect(someObject3.variation).toBe('3');
    });
});

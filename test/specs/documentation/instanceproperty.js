'use strict';

describe('Properties documented in instance methods', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/instanceproperty.js');
    var bar = docSet.getByLongname('Foo#bar')[0];

    it('should set the correct longname when a property is documented in an instance method', function() {
        expect(bar).toBeDefined();
        expect(bar.name).toBe('bar');
        expect(bar.kind).toBe('member');
    });
});

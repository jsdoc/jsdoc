'use strict';

describe('@classdesc tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/classdesctag.js');
    var foo = docSet.getByLongname('Foo')[0];
    var bar = docSet.getByLongname('Bar')[0];

    it('should add a classdesc property to the doclet with the description', function() {
        expect(foo.classdesc).toBe('A description of the class.');
    });

    it('should work when the @class and @constructor tags are also present, and @class has a value', function() {
        expect(bar.classdesc).toBe('A description of the class.');
    });
});

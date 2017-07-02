'use strict';

describe('@async tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/asynctag.js');
    var foo = docSet.getByLongname('foo')[0];

    it('should add an `async` property to the doclet', function() {
        expect(foo.async).toBe(true);
    });
});

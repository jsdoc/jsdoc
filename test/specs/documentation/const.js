'use strict';

describe('const declarations', function() {
    it('should automatically set the doclet.kind to "constant" for const declarations', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/constanttag.js');
        var myPocket = docSet.getByLongname('myPocket')[0];

        expect(myPocket.kind).toBe('constant');
    });
});

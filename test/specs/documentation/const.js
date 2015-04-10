'use strict';

describe('const declarations', function() {
    it('should automatically set the doclet.kind to "constant" for const declarations', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/constanttag.js');
        var myPocket = docSet.getByLongname('myPocket')[0];

        expect(myPocket.kind).toBe('constant');
    });

    if (jasmine.jsParser !== 'rhino') {
        describe('ES 2015 only', function() {
            it('should not override kind="class" when a const is autodetected', function() {
                var docSet = jasmine.getDocSetFromFile('test/fixtures/constanttag2.js');
                var foo = docSet.getByLongname('Foo')[0];

                expect(foo.kind).toBe('class');
            });
        });
    }
});

'use strict';

describe('inline comments on function parameters', function() {
    var docSet;

    it('should not crash when multiple parameters have inline comments that do not contain any' +
        'JSDoc tags', function() {
        function loadDocSet() {
            docSet = jasmine.getDocSetFromFile('test/fixtures/inlineparamcomment.js');
        }

        expect(loadDocSet).not.toThrow();
    });

    if (jasmine.jsParser !== 'rhino') {
        describe('ES 2015 only', function() {
            var docSet2 = jasmine.getDocSetFromFile('test/fixtures/inlineparamcomment2.js');
            var foo = docSet2.getByLongname('ns.foo')[0];

            it('should attach inline comments to default parameters', function() {
                expect(foo.params[0].type.names.length).toBe(1);
                expect(foo.params[0].type.names[0]).toBe('string');
            });

            it('should attach inline comments to rest parameters', function() {
                expect(foo.params[1].type.names.length).toBe(1);
                expect(foo.params[1].type.names[0]).toBe('number');
            });
        });
    }
});

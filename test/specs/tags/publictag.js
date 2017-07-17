'use strict';

describe('@public tag', function() {
    afterEach(function() {
        jasmine.restoreTagDictionary();
    });

    describe('JSDoc tags', function() {
        beforeEach(function() {
            jasmine.replaceTagDictionary('jsdoc');
        });

        it('should set the doclet\'s `access` property to `public`', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/publictag.js');
            var foo = docSet.getByLongname('Foo')[0];

            expect(foo.access).toBe('public');
        });
    });

    describe('Closure Compiler tags', function() {
        beforeEach(function() {
            jasmine.replaceTagDictionary('closure');
        });

        it('should set the doclet\'s `access` property to `public`', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/publictag2.js');
            var bar = docSet.getByLongname('bar')[0];

            expect(bar.access).toBe('public');
        });

        it('should include the type if one is provided', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/publictag2.js');
            var bar = docSet.getByLongname('bar')[0];

            expect(bar.type).toBeDefined();
            expect(bar.type.names.length).toBe(1);
            expect(bar.type.names[0]).toBe('string');
        });
    });
});

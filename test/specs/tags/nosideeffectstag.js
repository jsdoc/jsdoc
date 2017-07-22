'use strict';

describe('@nosideeffects tag', function() {
    afterEach(function() {
        jasmine.restoreTagDictionary();
    });

    describe('Closure Compiler tags', function() {
        beforeEach(function() {
            jasmine.replaceTagDictionary('closure');
        });

        it('should set the doclet\'s `modifies` property to an empty array', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/nosideeffectstag.js');
            var doNothing = docSet.getByLongname('doNothing')[0];

            expect(Array.isArray(doNothing.modifies)).toBe(true);
            expect(doNothing.modifies.length).toBe(0);
        });
    });
});

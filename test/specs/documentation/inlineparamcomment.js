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
});

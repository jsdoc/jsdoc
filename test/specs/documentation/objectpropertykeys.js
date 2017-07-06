'use strict';

describe('using existing Object properties as object literal keys', function() {
    function loadDocSet() {
        jasmine.getDocSetFromFile('test/fixtures/objectpropertykeys.js');
    }

    it('should not crash', function() {
        expect(loadDocSet).not.toThrow();
    });
});

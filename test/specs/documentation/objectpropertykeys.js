'use strict';

describe('using existing Object properties as object literal keys', function() {
	function loadDocSet() {
		var docSet = jasmine.getDocSetFromFile('test/fixtures/objectpropertykeys.js');
	}

    it('should not crash', function() {
        expect(loadDocSet).not.toThrow();
    });
});

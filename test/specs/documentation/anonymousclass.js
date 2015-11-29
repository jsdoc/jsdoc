'use strict';

describe('anonymous class', function() {
    it('should not crash JSDoc', function() {
        function getDocs() {
            return jasmine.getDocSetFromFile('test/fixtures/anonymousclass.js');
        }

        expect(getDocs).not.toThrow();
    });
});

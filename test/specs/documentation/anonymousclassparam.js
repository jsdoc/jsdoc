'use strict';

describe('anonymous class passed as a parameter', function() {
    it('should not crash JSDoc', function() {
        function loadFile() {
            jasmine.getDocSetFromFile('test/fixtures/anonymousclassparam.js');
        }

        expect(loadFile).not.toThrow();
    });
});

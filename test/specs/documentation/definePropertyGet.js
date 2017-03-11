'use strict';

describe('When a getter is defined in Object.defineProperty', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/definePropertyGet.js');
    var bar = docSet.getByLongname('bar')[0];

    it('should be an instance member', function() {
        expect(bar).toBeDefined();
        expect(bar.kind).toBe('member');
        expect(bar.scope).toBe('instance');
    });
});

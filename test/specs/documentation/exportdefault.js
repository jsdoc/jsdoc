'use strict';

describe('export default', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/exportdefault.js');
    var member = docSet.getByLongname('module:test')[1];

    it('should use the correct kind and description for the default export', function() {
        expect(member.kind).toBe('member');
        expect(member.description).toBe('Test value');
    });
});

'use strict';

describe('object keys', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/objectkeys.js');

    it('should assign the correct longname and memberof to object keys after the first key', function() {
        var bar = docSet.getByLongname('myObject.bar')[0];

        expect(bar).toBeDefined();
        expect(bar.memberof).toBe('myObject');
    });
});

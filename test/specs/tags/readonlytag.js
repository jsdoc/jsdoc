'use strict';

describe('@readonly tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/readonlytag.js');
    var Collection = docSet.getByLongname('Collection')[0];
    var length = docSet.getByLongname('Collection#length')[0];

    it('When a symbol has an @readonly tag, the doclet has an readonly property that is true.', function() {
        expect(length.readonly).toBe(true);
    });
});

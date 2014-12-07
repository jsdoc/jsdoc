'use strict';

describe('@description tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/descriptiontag.js');
    var doc = docSet.getByLongname('x')[0];
    var doc2 = docSet.getByLongname('y')[0];

    it('sets the doclet\'s "description" property to the description', function() {
        expect(doc2.description).toBeDefined();
        expect(doc2.description).toBe('lkjasdf');
    });

    it('overrides the default description', function() {
        expect(doc.description).toBeDefined();
        expect(doc.description).toBe('halb halb halb');
    });
});

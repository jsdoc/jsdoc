'use strict';

describe('@kind tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/kindtag.js');
    var doc = docSet.getByLongname('x')[0];

    it("sets the doclet's 'kind' property to the tag value", function() {
        expect(doc.kind).toBeDefined();
        expect(doc.kind).toBe('function');
    });
});

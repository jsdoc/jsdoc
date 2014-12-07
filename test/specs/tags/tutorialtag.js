'use strict';

describe('@tutorial tag', function() {
    // these are tests for the block usage, not the inline usage. see util/templateHelper for that.
    var docSet = jasmine.getDocSetFromFile('test/fixtures/tutorialtag.js');
    var doc = docSet.getByLongname('x')[0];

    it("adds the listed tutorials to a 'tutorials' array on the doclet", function () {
        expect(Array.isArray(doc.tutorials)).toBeTruthy();
        expect(doc.tutorials.length).toBe(2);
        expect(doc.tutorials).toContain('tute1');
        expect(doc.tutorials).toContain('tute2');
    });
});

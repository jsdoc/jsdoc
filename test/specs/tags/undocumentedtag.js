'use strict';

describe('@undocumented tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/undocumentedtag.js');
    var doc = docSet.getByLongname('x')[0];

    it("sets the doclet's 'undocumented' property to true", function () {
        expect(doc.undocumented).toBeTruthy();
    });

    it("clears the doclet's 'comment' property", function () {
        expect(doc.comment).toBe('');
    });
});

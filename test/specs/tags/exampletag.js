'use strict';

describe('@example tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/exampletag.js');
    var doc = docSet.getByLongname('x')[0];
    var doc2 = docSet.getByLongname('y')[0];
    var txtRegExp = new RegExp('console\\.log\\("foo"\\);[\\r\\n]{1,2}console\\.log\\("bar"\\);');
    var txt2RegExp = new RegExp('<caption>Example 2</caption>[\\r\\n]{1,2}1 \\+ 2;');

    it("creates an 'examples' property on the doclet with the example", function() {
        expect(doc.examples).toBeDefined();
        expect(Array.isArray(doc.examples)).toBe(true);
        expect(doc.examples.length).toBe(1);
        expect(doc.examples).toMatch(txtRegExp);
    });

    it('can be specified multiple times on one doclet', function() {
        expect(doc2.examples).toBeDefined();
        expect(Array.isArray(doc2.examples)).toBe(true);
        expect(doc2.examples.length).toBe(2);
        expect(doc2.examples).toMatch(txtRegExp);
        expect(doc2.examples).toMatch(txt2RegExp);
    });
});

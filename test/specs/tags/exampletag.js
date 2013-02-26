describe("@example tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/exampletag.js'),
        doc = docSet.getByLongname('x')[0],
        doc2 = docSet.getByLongname('y')[0],
        txt = 'console.log("foo");\nconsole.log("bar");',
        txt2 = '<caption>Example 2</caption>\n1 + 2;';

    it("creates an 'examples' property on the doclet with the example", function() {
        expect(doc.examples).toBeDefined();
        expect(Array.isArray(doc.examples)).toBe(true);
        expect(doc.examples.length).toBe(1);
        expect(doc.examples).toContain(txt);
    });

    it("can be specified multiple times on one doclet", function() {
        expect(doc2.examples).toBeDefined();
        expect(Array.isArray(doc2.examples)).toBe(true);
        expect(doc2.examples.length).toBe(2);
        expect(doc2.examples).toContain(txt);
        expect(doc2.examples).toContain(txt2);
    });
});

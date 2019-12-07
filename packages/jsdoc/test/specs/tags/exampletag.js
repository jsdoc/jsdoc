describe('@example tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/exampletag.js');
    const doc = docSet.getByLongname('x')[0];
    const doc2 = docSet.getByLongname('y')[0];
    const txtRegExp = /console\.log\("foo"\);[\r\n]{1,2}console\.log\("bar"\)/;
    const txt2RegExp = /<caption>Example 2<\/caption>[\r\n]{1,2}1 \+ 2;/;

    it("creates an 'examples' property on the doclet with the example", () => {
        expect(doc.examples).toBeArrayOfSize(1);
        expect(doc.examples).toMatch(txtRegExp);
    });

    it('can be specified multiple times on one doclet', () => {
        expect(doc2.examples).toBeArrayOfSize(2);
        expect(doc2.examples).toMatch(txtRegExp);
        expect(doc2.examples).toMatch(txt2RegExp);
    });
});

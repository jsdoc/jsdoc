describe('@see tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/seetag.js');
    const foo = docSet.getByLongname('foo')[0];
    const bar = docSet.getByLongname('bar')[0];

    it('When a symbol has an @see tag, the doclet has a see property that includes that value.', () => {
        expect(typeof foo.see).toBe('object');
        expect(foo.see[0]).toBe('{@link bar}');

        expect(typeof bar.see).toBe('object');
        expect(bar.see[0]).toBe('http://example.com/someref');
    });
});

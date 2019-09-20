describe('@since tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/sincetag.js');
    const foo = docSet.getByLongname('foo')[0];

    it('When a symbol has an @since tag, the doclet has a since property set to true.', () => {
        expect(foo.since).toBe('1.2.3');
    });
});

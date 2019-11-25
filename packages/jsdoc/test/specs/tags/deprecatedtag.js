describe('@deprecated tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/deprecatedtag.js');
    const foo = docSet.getByLongname('foo')[0];
    const bar = docSet.getByLongname('bar')[0];

    it('When a symbol has a @deprecated tag with no value, the doclet has a deprecated property set to true.', () => {
        expect(foo.deprecated).toBeTrue();
    });

    it('When a symbol has a @deprecated tag with a value, the doclet has a deprecated property set to that value.', () => {
        expect(bar.deprecated).toBe('since version 2.0');
    });
});

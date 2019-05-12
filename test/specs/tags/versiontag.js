describe('@version tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/versiontag.js');
    const foo = docSet.getByLongname('foo')[0];

    it('When a symbol has a @version tag, the doclet has a version property set to that value.', () => {
        expect(foo.version).toBe('1.2.3');
    });
});

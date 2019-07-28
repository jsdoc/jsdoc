describe('@async tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/asynctag.js');
    const foo = docSet.getByLongname('foo')[0];

    it('should add an `async` property to the doclet', () => {
        expect(foo.async).toBeTrue();
    });
});

describe('@copyright tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/copyrighttag.js');
    const Thingy = docSet.getByLongname('Thingy')[0];

    it('When a symbol has a @copyright tag, the doclet has a copyright property with that value.', () => {
        expect(Thingy.copyright).toBe('(c) 2011 Michael Mathews');
    });
});

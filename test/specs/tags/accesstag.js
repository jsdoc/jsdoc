describe('@access tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/accesstag.js');
    const foo = docSet.getByLongname('Thingy~foo')[0];
    const _bar = docSet.getByLongname('Thingy#_bar')[0];
    const _gnu = docSet.getByLongname('Thingy#_gnu')[0];
    const pez = docSet.getByLongname('Thingy#pez')[0];
    const foo2 = docSet.getByLongname('OtherThingy~foo')[0];
    const _bar2 = docSet.getByLongname('OtherThingy#_bar')[0];
    const _gnu2 = docSet.getByLongname('OtherThingy#_gnu')[0];
    const pez2 = docSet.getByLongname('OtherThingy#pez')[0];

    it('should set the doclet\'s \'access\' property to \'private\' when there is an @access private tag', () => {
        expect(foo.access).toBe('private');
        expect(foo2.access).toBe('private');
    });

    it('should set the doclet\'s \'access\' property to \'protected\' when there is an @access protected tag', () => {
        expect(_bar.access).toBe('protected');
        expect(_bar2.access).toBe('protected');
    });

    it('should set the doclet\'s \'access\' property to \'public\' when there is an @access public tag', () => {
        expect(_gnu.access).toBe('public');
        expect(_gnu2.access).toBe('public');
    });

    it('should set no \'access\' property on the doclet when there is no @access tag', () => {
        expect(pez.access).toBeUndefined();
        expect(pez2.access).toBeUndefined();
    });
});

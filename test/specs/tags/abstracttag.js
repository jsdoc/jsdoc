describe('@abstract tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/abstracttag.js');
    const thingy = docSet.getByLongname('Thingy')[0];
    const thingyPez = docSet.getByLongname('Thingy#pez')[0];
    const otherThingyPez = docSet.getByLongname('OtherThingy#pez')[0];

    it('should have an undefined "virtual" property with no "@abstract" tag', () => {
        expect(thingy.virtual).toBeUndefined();
    });

    it('should set the doclet\'s "virtual" property to true when "@abstract" tag is present', () => {
        expect(thingyPez.virtual).toBeTrue();
        expect(otherThingyPez.virtual).toBeTrue();
    });
});

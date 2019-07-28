describe('@author tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/authortag.js');
    const Thingy = docSet.getByLongname('Thingy')[0];
    const Thingy2 = docSet.getByLongname('Thingy2')[0];

    it('When a symbol has a @author tag, the doclet has a author property with that value.', () => {
        expect(Thingy.author).toBeArray();
        expect(Thingy.author[0]).toBe('Michael Mathews <micmath@gmail.com>');
    });

    it('When a symbol has multiple @author tags, the doclet has a author property, an array with those values.', () => {
        expect(Thingy2.author).toBeArray();
        expect(Thingy2.author).toContain('Jane Doe <jane.doe@gmail.com>');
        expect(Thingy2.author).toContain('John Doe <john.doe@gmail.com>');
    });
});

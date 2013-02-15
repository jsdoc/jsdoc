describe("@author tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/authortag.js'),
        Thingy = docSet.getByLongname('Thingy')[0],
        Thingy2 = docSet.getByLongname('Thingy2')[0];

    it('When a symbol has a @author tag, the doclet has a author property with that value.', function() {
        expect(Thingy.author).toBeDefined();
        expect(Array.isArray(Thingy.author)).toBe(true);
        expect(Thingy.author[0]).toBe('Michael Mathews <micmath@gmail.com>');
    });

    it('When a symbol has multiple @author tags, the doclet has a author property, an array with those values.', function() {
        expect(Thingy2.author).toBeDefined();
        expect(Array.isArray(Thingy2.author)).toBe(true);
        expect(Thingy2.author).toContain('Jane Doe <jane.doe@gmail.com>');
        expect(Thingy2.author).toContain('John Doe <john.doe@gmail.com>');
    });
});

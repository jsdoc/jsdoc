describe('@ignore tag', () => {
    let docSet = jasmine.getDocSetFromFile('test/fixtures/ignoretag.js');
    let foo = docSet.getByLongname('foo')[0];

    it('When a symbol has an @ignore tag, the doclet has a ignore property set to true.', () => {
        expect(foo.ignore).toBe(true);
    });

    it('When a symbol has an @ignore tag with a value an error is thrown', () => {
        try {
            docSet = jasmine.getDocSetFromFile('test/fixtures/ignoretag2.js');
            foo = docSet.getByLongname('foo')[0];
        } catch (e) {
            expect(e instanceof Error).toBe(true);
        }
    });
});

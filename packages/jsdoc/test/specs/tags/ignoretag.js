describe('@ignore tag', () => {
    it('When a symbol has an @ignore tag, the doclet has a ignore property set to true.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/ignoretag.js');
        const foo = docSet.getByLongname('foo')[0];

        expect(foo.ignore).toBe(true);
    });

    it('When a symbol has an @ignore tag with a value a warning is logged', () => {
        function getDocSet() {
            jsdoc.getDocSetFromFile('test/fixtures/ignoretag2.js');
        }

        expect(jsdoc.didLog(getDocSet, 'warn')).toBeTrue();
    });
});

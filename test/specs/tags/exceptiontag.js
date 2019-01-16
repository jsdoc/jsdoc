describe('@exception tag', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/exceptiontag.js');
    const foo = docSet.getByLongname('foo')[0];
    const bar = docSet.getByLongname('bar')[0];
    const pez = docSet.getByLongname('pez')[0];
    const cos = docSet.getByLongname('cos')[0];

    it('When a symbol has an @exception tag, the doclet has a exception property set to that value.', () => {
        expect(typeof foo.exceptions).toBe('object');
        expect(foo.exceptions.length).toBe(1);

        expect(typeof bar.exceptions).toBe('object');
        expect(bar.exceptions.length).toBe(1);

        expect(typeof pez.exceptions).toBe('object');
        expect(pez.exceptions.length).toBe(1);
    });

    it('The description and type for the @exception tag are not added to the parent doclet.', () => {
        expect(pez.description).not.toBeDefined();
        expect(pez.type).not.toBeDefined();
    });

    it('When a symbol has a description, plus an @exception tag with a description, neither description overwrites the other.', () => {
        expect(cos.description).toBe('A description of the function.');
        expect(cos.exceptions.length).toBe(1);
        expect(cos.exceptions[0].description).toBe('A description of the exception.');
    });
});

describe('@variation tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/variationtag.js');
    const someObject2 = docSet.getByLongname('someObject(2)')[0];
    const someObject2Method = docSet.getByLongname('someObject(2).someMethod')[0];
    const someObject3 = docSet.getByLongname('someObject(3)')[0];

    it('When a symbol has a variation tag, the longname includes that variation.', () => {
        expect(someObject2.longname).toBe('someObject(2)');
    });

    it('When a symbol is a member of a variation, the longname includes the variation.', () => {
        expect(someObject2Method.longname).toBe('someObject(2).someMethod');
    });

    it('When the variation tag\'s value is enclosed in parentheses, the parentheses are removed', () => {
        expect(someObject3).toBeObject();
        expect(someObject3.variation).toBe('3');
    });
});

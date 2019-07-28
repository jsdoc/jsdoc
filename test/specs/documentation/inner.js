describe('when a documented var memeber is inside a named function', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/inner.js');
    const found1 = docSet.getByLongname('sendMessage~encoding');
    const found2 = docSet.getByLongname('sendMessage~encrypt');

    it('A doclet with the correct longname should be found', () => {
        expect(found1).toBeArrayOfSize(1);
        expect(found2).toBeArrayOfSize(1);
    });

    it('The short name should be correct', () => {
        expect(found1[0].name).toBe('encoding');
        expect(found2[0].name).toBe('encrypt');
    });

    it('The memberof should be correct', () => {
        expect(found1[0].memberof).toBe('sendMessage');
        expect(found2[0].memberof).toBe('sendMessage');
    });
    it('The scope should default to "inner"', () => {
        expect(found1[0].scope).toBe('inner');
        expect(found2[0].scope).toBe('inner');
    });
});

describe('var statements', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/var.js');
    const found = [
        docSet.getByLongname('GREEN'),
        docSet.getByLongname('RED'),
        docSet.getByLongname('validate'),
        docSet.getByLongname('i'),
        docSet.getByLongname('results')
    ];

    describe('when a series of constants is documented', () => {
        it('should find the first constant', () => {
            expect(found[0].length).toBe(1);
        });

        it('should attach the docs to the first constant', () => {
            expect(found[0][0].comment).toBe('/** document me */');
        });

        it('should have the correct name', () => {
            expect(found[0][0].name).toBe('GREEN');
        });

        it('should have the correct memberof', () => {
            expect(found[0][0].memberof).toBeUndefined();
        });

        it('should give the constant a global scope', () => {
            expect(found[0][0].scope).toBe('global');
        });

        it('should find the second constant', () => {
            expect(found[1].length).toBe(1);
        });

        it('should not attach the docs to the second constant', () => {
            expect(found[1][0].undocumented).toBe(true);
        });
    });

    describe('when a member of a series of vars is documented', () => {
        it('should attach the docs to the correct var', () => {
            expect(found[4][0].comment).toBe('/** document me */');
        });

        it('should have the correct name', () => {
            expect(found[4][0].name).toBe('results');
        });

        it('should leave memberof undefined', () => {
            expect(found[4][0].memberof).toBeUndefined();
        });

        it('should give the var a global scope', () => {
            expect(found[4][0].scope).toBe('global');
        });
    });
});

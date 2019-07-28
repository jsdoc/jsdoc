describe('var statements', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/var.js');
    const GREEN = docSet.getByLongname('GREEN')[0];
    const RED = docSet.getByLongname('RED')[0];
    const results = docSet.getByLongname('results')[0];

    describe('when a series of constants is documented', () => {
        it('should find the first constant', () => {
            expect(GREEN).toBeObject();
        });

        it('should attach the docs to the first constant', () => {
            expect(GREEN.comment).toBe('/** document me */');
        });

        it('should have the correct name', () => {
            expect(GREEN.name).toBe('GREEN');
        });

        it('should have the correct memberof', () => {
            expect(GREEN.memberof).toBeUndefined();
        });

        it('should give the constant a global scope', () => {
            expect(GREEN.scope).toBe('global');
        });

        it('should find the second constant', () => {
            expect(RED).toBeObject();
        });

        it('should not attach the docs to the second constant', () => {
            expect(RED.undocumented).toBeTrue();
        });
    });

    describe('when a member of a series of vars is documented', () => {
        it('should attach the docs to the correct var', () => {
            expect(results.comment).toBe('/** document me */');
        });

        it('should have the correct name', () => {
            expect(results.name).toBe('results');
        });

        it('should leave memberof undefined', () => {
            expect(results.memberof).toBeUndefined();
        });

        it('should give the var a global scope', () => {
            expect(results.scope).toBe('global');
        });
    });
});

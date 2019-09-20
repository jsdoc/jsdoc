describe('generator functions', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/generators.js');
    const startsAt0 = docSet.getByLongname('startsAt0')[0];
    const startsAt1 = docSet.getByLongname('startsAt1')[0];
    const startsAt2 = docSet.getByLongname('Generator#startsAt2')[0];

    it('should flag generator functions', () => {
        expect(startsAt0.generator).toBeTrue();
    });

    it('should flag generator functions assigned to variables', () => {
        expect(startsAt1.generator).toBeTrue();
    });

    it('should flag generator functions that are method definitions', () => {
        expect(startsAt2.generator).toBeTrue();
    });
});

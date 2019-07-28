describe('@generator tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/generatortag.js');
    const idMaker = docSet.getByLongname('idMaker')[0];

    it('should mark the symbol as a generator function', () => {
        expect(idMaker.generator).toBeTrue();
    });
});

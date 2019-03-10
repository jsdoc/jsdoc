describe('@generator tag', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/generatortag.js');
    const idMaker = docSet.getByLongname('idMaker')[0];

    it('should mark the symbol as a generator function', () => {
        expect(idMaker.generator).toBe(true);
    });
});

describe('async functions', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/asyncfunction.js');
    const add = docSet.getByLongname('add')[0];
    const subtract = docSet.getByLongname('subtract')[0];
    const adderAdd = docSet.getByLongname('Adder#add')[0];

    it('should automatically document async functions as async', () => {
        expect(add.async).toBe(true);
    });

    it('should work when the async function is assigned to a variable', () => {
        expect(subtract.async).toBe(true);
    });

    it('should work when the async function is a method definition', () => {
        expect(adderAdd.async).toBe(true);
    });
});

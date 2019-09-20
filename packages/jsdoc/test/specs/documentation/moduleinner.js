describe('inner scope for modules', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduleinner.js');
    const fooIn = docSet.getByLongname('module:my/module~fooIn')[0];
    const fooOut = docSet.getByLongname('module:my/module~fooOut')[0];

    it('When a function appears in the topscope of a module, the symbol is documented as an inner member of that module.', () => {
        expect(typeof fooOut).toBe('object');
        expect(fooOut.longname).toBe('module:my/module~fooOut');

        expect(typeof fooIn).toBe('object');
        expect(fooIn.longname).toBe('module:my/module~fooIn');
    });
});

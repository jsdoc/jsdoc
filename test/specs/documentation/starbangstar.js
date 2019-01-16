describe('starbangstar', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/starbangstar.js');
    const mod = docSet.getByLongname('module:myscript/core')[0];
    const x = docSet.getByLongname('module:myscript/core.x')[0];

    it('should not treat a doclet starting with /*!* as a JSDoc comment.', () => {
        expect(mod.description).toEqual('Script that does something awesome');
    });

    it('should not treat a doclet starting with /*!** as a JSDoc comment.', () => {
        expect(x).toBeUndefined();
    });
});

describe('starbangstar', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/starbangstar.js');
    const mod = docSet.getByLongname('module:myscript/core')[0];
    const x = docSet.getByLongname('module:myscript/core.x')[0];

    it('should not treat a doclet starting with /*!* as a JSDoc comment.', () => {
        expect(mod.description).toBe('Script that does something awesome');
    });

    it('should not treat a doclet starting with /*!** as a JSDoc comment.', () => {
        expect(x).toBeUndefined();
    });
});

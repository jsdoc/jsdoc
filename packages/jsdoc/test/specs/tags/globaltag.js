describe('@global tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/globaltag.js');

    it('When an inner symbol has a @global tag it is documented as if it were global.', () => {
        const found = docSet.getByLongname('foo').filter(({undocumented}) => !(undocumented));

        expect(found[0].name).toBe('foo');
        expect(found[0].longname).toBe('foo');
        expect(found[0].memberof).toBeUndefined();
        expect(found[0].scope).toBe('global');
    });

    it('When an nested symbol has a @global tag it is documented as if it were global.', () => {
        const found = docSet.getByLongname('Bar').filter(({undocumented}) => !(undocumented));

        expect(found[0].name).toBe('Bar');
        expect(found[0].longname).toBe('Bar');
        expect(found[0].memberof).toBeUndefined();
        expect(found[0].scope).toBe('global');
    });
});

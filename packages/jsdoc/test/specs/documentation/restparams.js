describe('rest parameters', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/restparams.js');
    const setAdmins = docSet.getByLongname('setAdmins')[0];
    const setManagers = docSet.getByLongname('setManagers')[0];
    const setWidgetAccess = docSet.getByLongname('setWidgetAccess')[0];

    it('should automatically mark standalone rest parameters as repeatable', () => {
        const restParam = setAdmins.params[0];

        expect(restParam.name).toBe('users');
        expect(restParam.variable).toBeTrue();
    });

    it('should automatically mark rest parameters as repeatable when they are mixed with other params', () => {
        const restParam = setWidgetAccess.params[1];

        expect(restParam.name).toBe('users');
        expect(restParam.variable).toBeTrue();
    });

    it('should automatically mark rest parameters as repeatable when the function is assigned to a variable', () => {
        const restParam = setManagers.params[0];

        expect(restParam.name).toBe('users');
        expect(restParam.variable).toBeTrue();
    });

    describe('ES2015 methods', () => {
        const docSet2 = jsdoc.getDocSetFromFile('test/fixtures/restparams2.js');
        const addUsers = docSet2.getByLongname('Widget#addUsers')[0];

        it('should autodetect rest parameters', () => {
            expect(addUsers.params[0].variable).toBeTrue();
        });
    });
});

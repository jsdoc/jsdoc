describe('default parameters', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/defaultparams.js');

    const setActive = docSet.getByLongname('setActive')[0];
    const setBirthYear = docSet.getByLongname('setBirthYear')[0];
    const setDogName = docSet.getByLongname('setDogName')[0];
    const setFirstName = docSet.getByLongname('setFirstName')[0];
    const setIsNinja = docSet.getByLongname('setIsNinja')[0];
    const setLastName = docSet.getByLongname('setLastName')[0];
    const setName = docSet.getByLongname('setName')[0];
    const setPizzaToppings = docSet.getByLongname('setPizzaToppings')[0];

    it('should automatically add string-literal values as defaults when no default value is documented', () => {
        expect(setFirstName.params[0].defaultvalue).toBe('Buster');
    });

    it('should not automatically mark parameters with default values as optional', () => {
        expect(setFirstName.params[0].optional).toBeUndefined();
    });

    it('should not automatically mark parameters with default values as nullable', () => {
        expect(setFirstName.params[0].nullable).toBeUndefined();
    });

    it('should not override documented default values', () => {
        expect(setLastName.params[0].defaultvalue).toBe('Braun');
    });

    it('should work when some parameters have default values and others do not', () => {
        expect(setName.params[0].defaultvalue).toBeUndefined();
        expect(setName.params[1].defaultvalue).toBe('Bluster');
        expect(setName.params[2].defaultvalue).toBe('Brown');
    });

    it('should ignore empty strings', () => {
        expect(setDogName.params[0].defaultvalue).toBeUndefined();
    });

    it('should work with boolean literals', () => {
        expect(setActive.params[0].defaultvalue).toBeTrue();
    });

    it('should work with numeric literals', () => {
        expect(setBirthYear.params[0].defaultvalue).toBe(3000);
    });

    it('should ignore non-literal default values, such as variable identifiers', () => {
        expect(setPizzaToppings.params[0].defaultvalue).toBeUndefined();
    });

    it('should work when the function is assigned to a variable', () => {
        expect(setIsNinja.params[0].defaultvalue).toBeTrue();
    });

    describe('ES2015 methods', () => {
        const docSet2 = jsdoc.getDocSetFromFile('test/fixtures/defaultparams2.js');

        const setSardines = docSet2.getByLongname('PizzaToppings#setSardines')[0];

        it('should autodetect default parameters', () => {
            expect(setSardines.params[0].defaultvalue).toBeTrue();
        });
    });
});

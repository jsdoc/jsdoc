describe('@constructs tag', () => {
    it('When a symbol has a @constructs tag, it is documented as a class with that name.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/constructstag.js');
        const textblock = docSet.getByLongname('TextBlock')[0];

        expect(textblock.kind).toBe('class');
        expect(textblock.longname).toBe('TextBlock');
    });

    it('When a symbol has a @constructs tag, it is documented as a class.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/constructstag2.js');
        const menu = docSet.getByLongname('Menu')[0];

        expect(menu.name).toBe('Menu');
        expect(menu.kind).toBe('class');
    });

    it('When a function symbol has a @constructs tag, any this-variables are ducumented as instance members of the class.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/constructstag3.js');
        const personName = docSet.getByLongname('Person#name')[0];

        expect(personName.memberof).toBe('Person');
        expect(personName.scope).toBe('instance');
    });

    it('When a function symbol has a @constructs tag with no value, in a @lends block with a "Name#" value, the function is documented as a constructor of "Name".', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/constructstag4.js');
        const person = docSet.getByLongname('Person').filter(({undocumented}) => !(undocumented))[0];

        expect(person.kind).toBe('class');
    });

    it('When a function symbol has a @constructs tag with no value, any this-variables are documented as instance members of the class.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/constructstag4.js');
        const personName = docSet.getByLongname('Person#name')[0];

        expect(personName.memberof).toBe('Person');
        expect(personName.scope).toBe('instance');
    });

    it('When a object literal property has a @constructs tag with no value, and the object has a @lends, the property is documented as the lent class.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/constructstag5.js');
        const duck = docSet.getByLongname('Duck').filter(({undocumented}) => !(undocumented))[0];

        expect(duck.longname).toBe('Duck');
        expect(duck.kind).toBe('class');
        expect(duck.description).toBe('Constructs a duck.');
    });
});

describe('@returns tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/returnstag.js');

    it('When a symbol has a @returns tag with a type and description, the doclet has a "returns" property that includes that info.', () => {
        const find = docSet.getByLongname('find')[0];

        expect(find.returns).toBeArrayOfSize(1);
        expect(find.returns[0].type.names.join(', ')).toBe('string, Array.<string>');
        expect(find.returns[0].description).toBe('The names of the found item(s).');
    });

    it('When a symbol has a @returns tag with a non-nullable type, the doclet indicates that the type is non-nullable', () => {
        const getName = docSet.getByLongname('getName')[0];

        expect(getName.returns).toBeArrayOfSize(1);
        expect(getName.returns[0].nullable).toBeFalse();
    });

    it('When a symbol has a @returns tag with only a description, the doclet has a "returns" property that includes the description.', () => {
        const bind = docSet.getByLongname('bind')[0];

        expect(bind.returns).toBeArrayOfSize(1);
        expect(bind.returns[0].description).toBe('The binding id.');
    });

    it('When a symbol has a @returns tag without a type but with an inline tag, the inline tag is not mistaken for a type.', () => {
        const convert = docSet.getByLongname('convert')[0];

        expect(convert.returns).toBeArrayOfSize(1);
        expect(convert.returns[0].description).toBe('An object to be passed to {@link find}.');
    });
});

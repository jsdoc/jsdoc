describe('@mixin tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/mixintag.js');
    const Eventful = docSet.getByLongname('Eventful')[0];
    const Mixin = docSet.getByLongname('AnotherMixin')[0];

    it("When a symbol has a @mixin tag, the doclet's 'kind' property is set to 'mixin'", () => {
        expect(Eventful.kind).toBe('mixin');
    });

    it("When a symbol has a @mixin tag, its name is set to the tag's value (if present)", () => {
        expect(Mixin).toBeObject();
    });
});

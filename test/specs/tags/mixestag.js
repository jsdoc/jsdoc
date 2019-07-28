describe('@mixes tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/mixintag.js');
    const FormButton = docSet.getByLongname('FormButton')[0];
    const MyClass = docSet.getByLongname('MyClass')[0];

    it("When a symbol has a @mixes tag, it gets an array property 'mixes' with the name of the mixin", () => {
        expect(FormButton.mixes).toBeArrayOfSize(1);
        expect(FormButton.mixes[0]).toBe('Eventful');
    });

    it('When a symbol has more than one @mixes tag, all of the mixins are added', () => {
        expect(MyClass.mixes).toBeArrayOfSize(2);
        expect(MyClass.mixes).toContain('Eventful');
        expect(MyClass.mixes).toContain('AnotherMixin');
    });
});

describe('@classdesc tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/classdesctag.js');
    const foo = docSet.getByLongname('Foo')[0];
    const bar = docSet.getByLongname('Bar')[0];
    const baz = docSet.getByLongname('Baz')[0];

    it('should add a classdesc property to the doclet with the description', () => {
        expect(foo.classdesc).toBe('A description of the class.');
    });

    it('should work when the @class and @constructor tags are also present, and @class has a value', () => {
        expect(bar.classdesc).toBe('A description of the class.');
    });

    it('should infer that a description after the @class tag is a classdesc if no @classdesc tag is present', () => {
        expect(baz.classdesc).toBe('Description of the Baz class.');
    });
});

describe('scope tags', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/scopetags.js');

    // @inner, @instance, @static (@global has its own file)
    describe('@inner tag', () => {
        const doc = docSet.getByLongname('module:scopetags~myInner')[0];

        it("sets the doclet's 'scope' property to 'inner'", () => {
            expect(doc.scope).toBe('inner');
        });
    });

    describe('@instance tag', () => {
        const doc = docSet.getByLongname('module:scopetags#myInstance')[0];

        it("sets the doclet's 'scope' property to 'instance'", () => {
            expect(doc.scope).toBe('instance');
        });
    });

    describe('@static tag', () => {
        const doc = docSet.getByLongname('module:scopetags.myStatic')[0];

        it("sets the doclet's 'scope' property to 'static'", () => {
            expect(doc.scope).toBe('static');
        });
    });
});

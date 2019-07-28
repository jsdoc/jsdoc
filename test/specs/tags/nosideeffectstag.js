describe('@nosideeffects tag', () => {
    afterEach(() => {
        jsdoc.restoreTagDictionary();
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('closure');
        });

        it('should set the doclet\'s `modifies` property to an empty array', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/nosideeffectstag.js');
            const doNothing = docSet.getByLongname('doNothing')[0];

            expect(doNothing.modifies).toBeEmptyArray();
        });
    });
});

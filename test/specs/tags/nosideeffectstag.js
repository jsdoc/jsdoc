describe('@nosideeffects tag', () => {
    afterEach(() => {
        jasmine.restoreTagDictionary();
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jasmine.replaceTagDictionary('closure');
        });

        it('should set the doclet\'s `modifies` property to an empty array', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/nosideeffectstag.js');
            const doNothing = docSet.getByLongname('doNothing')[0];

            expect(Array.isArray(doNothing.modifies)).toBe(true);
            expect(doNothing.modifies.length).toBe(0);
        });
    });
});

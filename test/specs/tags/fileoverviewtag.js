describe('@fileoverview tag', () => {
    describe('JSDoc tags', () => {
        // @fileoverview is a synonym of @file, so this is covered by the @file tag tests
    });

    describe('Closure Compiler tags', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/fileoverviewtag.js');
        const fileDoc = docSet.getByLongname('[[string0]]')[0];

        it('should set the doclet\'s name and longname to the file name', () => {
            expect(fileDoc.name).toBe('[[string0]]');
        });

        it('should set the doclet\'s kind to `file`', () => {
            expect(fileDoc.kind).toBe('file');
        });

        it('should use the value as a description', () => {
            expect(fileDoc.description).toBe('Overview of this file.');
        });

        it('should set `preserveName` to `true`', () => {
            expect(fileDoc.preserveName).toBe(true);
        });
    });
});

describe('empty JSDoc comments', () => {
    it('should not report an error when a JSDoc comment contains only whitespace', () => {
        function getDocSet() {
            jsdoc.getDocSetFromFile('test/fixtures/emptycomments.js');
        }

        expect(jsdoc.didLog(getDocSet, 'error')).toBeFalse();
    });
});

describe('using existing Object properties as object literal keys', () => {
    function loadDocSet() {
        jsdoc.getDocSetFromFile('test/fixtures/objectpropertykeys.js');
    }

    it('should not crash', () => {
        expect(loadDocSet).not.toThrow();
    });
});

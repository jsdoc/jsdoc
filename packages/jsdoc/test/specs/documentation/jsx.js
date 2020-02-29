describe('JSX support', () => {
    it('should parse JSX files without errors', () => {
        function parseJsx() {
            return jsdoc.getDocSetFromFile('test/fixtures/jsx.js');
        }

        expect(parseJsx).not.toThrow();
        expect(jsdoc.didLog(parseJsx, 'error')).toBeFalse();
    });
});

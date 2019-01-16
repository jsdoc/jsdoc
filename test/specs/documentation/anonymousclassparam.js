describe('anonymous class passed as a parameter', () => {
    it('should not crash JSDoc', () => {
        function loadFile() {
            jasmine.getDocSetFromFile('test/fixtures/anonymousclassparam.js');
        }

        expect(loadFile).not.toThrow();
    });
});

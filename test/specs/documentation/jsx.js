describe('JSX support', () => {
    it('should parse JSX files without errors', () => {
        const logger = require('jsdoc/util/logger');

        function parseJsx() {
            return jasmine.getDocSetFromFile('test/fixtures/jsx.js');
        }

        spyOn(logger, 'error');
        expect(parseJsx).not.toThrow();
        expect(logger.error).not.toHaveBeenCalled();
    });
});

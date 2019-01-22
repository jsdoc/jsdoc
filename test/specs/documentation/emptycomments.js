/* global jsdoc */
const logger = require('@jsdoc/logger');

describe('empty JSDoc comments', () => {
    it('should not report an error when a JSDoc comment contains only whitespace', () => {
        spyOn(logger, 'error');
        jsdoc.getDocSetFromFile('test/fixtures/emptycomments.js');

        expect(logger.error).not.toHaveBeenCalled();
    });
});

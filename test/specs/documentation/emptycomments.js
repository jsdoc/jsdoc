const logger = require('jsdoc/util/logger');

describe('empty JSDoc comments', () => {
    it('should not report an error when a JSDoc comment contains only whitespace', () => {
        spyOn(logger, 'error');
        jasmine.getDocSetFromFile('test/fixtures/emptycomments.js');

        expect(logger.error).not.toHaveBeenCalled();
    });
});

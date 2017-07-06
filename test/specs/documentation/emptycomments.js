'use strict';

var logger = require('jsdoc/util/logger');

describe('empty JSDoc comments', function() {
    it('should not report an error when a JSDoc comment contains only whitespace', function() {
        spyOn(logger, 'error');
        jasmine.getDocSetFromFile('test/fixtures/emptycomments.js');

        expect(logger.error).not.toHaveBeenCalled();
    });
});

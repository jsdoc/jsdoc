'use strict';

describe('@struct tag', function() {
    var env = require('jsdoc/env');
    var logger = require('jsdoc/util/logger');

    var allowUnknownTags = Boolean(env.conf.tags.allowUnknownTags);

    beforeEach(function() {
        env.conf.tags.allowUnknownTags = false;
        spyOn(logger, 'error');
    });

    afterEach(function() {
        jasmine.restoreTagDictionary();
        env.conf.tags.allowUnknownTags = allowUnknownTags;
    });

    describe('JSDoc tags', function() {
        beforeEach(function() {
            jasmine.replaceTagDictionary('jsdoc');
        });

        it('should not recognize the @struct tag', function() {
            jasmine.getDocSetFromFile('test/fixtures/structtag.js');

            expect(logger.error).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', function() {
        beforeEach(function() {
            jasmine.replaceTagDictionary('closure');
        });

        it('should recognize the @struct tag', function() {
            jasmine.getDocSetFromFile('test/fixtures/structtag.js');

            expect(logger.error).not.toHaveBeenCalled();
        });
    });
});

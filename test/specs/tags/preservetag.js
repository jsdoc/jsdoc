'use strict';

describe('@preserve tag', function() {
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

        it('should not recognize the @preserve tag', function() {
            jasmine.getDocSetFromFile('test/fixtures/preservetag.js');

            expect(logger.error).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', function() {
        beforeEach(function() {
            jasmine.replaceTagDictionary('closure');
        });

        it('should set the doclet\'s `license` property to the tag value', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/preservetag.js');
            var x = docSet.getByLongname('x')[0];

            expect(x.license).toBe('My cool license goes here.');
        });
    });
});

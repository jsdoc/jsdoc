'use strict';

describe('@define tag', function() {
    var logger = require('jsdoc/util/logger');

    describe('JSDoc tags', function() {
        var env = require('jsdoc/env');

        var allowUnknownTags = Boolean(env.conf.tags.allowUnknownTags);

        afterEach(function() {
            jasmine.restoreTagDictionary();
            env.conf.tags.allowUnknownTags = allowUnknownTags;
        });

        it('should not recognize the @define tag', function() {
            env.conf.tags.allowUnknownTags = false;
            jasmine.replaceTagDictionary('jsdoc');
            spyOn(logger, 'error');

            jasmine.getDocSetFromFile('test/fixtures/definetag.js');

            expect(logger.error).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', function() {
        beforeEach(function() {
            jasmine.replaceTagDictionary('closure');
        });

        afterEach(function() {
            jasmine.restoreTagDictionary();
        });

        it('should recognize the @define tag', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/definetag.js');
            var enableDebug = docSet.getByLongname('ENABLE_DEBUG')[0];

            expect(enableDebug.kind).toBe('constant');
            expect(enableDebug.type).toBeDefined();
            expect(enableDebug.type.names[0]).toBe('boolean');
        });
    });
});

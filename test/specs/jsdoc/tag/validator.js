/*global afterEach, beforeEach, describe, env, expect, it, spyOn */
describe('jsdoc/tag/validator', function() {
    var validator = require('jsdoc/tag/validator'),
        doop = require('jsdoc/util/doop'),
        logger = require('jsdoc/util/logger'),
        tag = require('jsdoc/tag');

    it('should exist', function() {
        expect(validator).toBeDefined();
        expect(typeof validator).toBe('object');
    });

    it('should export a validate function', function() {
        expect(validator.validate).toBeDefined();
        expect(typeof validator.validate).toBe('function');
    });

    describe('validate', function() {
        var dictionary = require('jsdoc/tag/dictionary'),
            allowUnknown = !!env.conf.tags.allowUnknownTags,
            badTag = {title: 'lkjasdlkjfb'},
            meta = {filename: 'asdf.js', lineno: 1},
            goodTag = new tag.Tag('name', 'MyDocletName', meta), // mustHaveValue
            goodTag2 = new tag.Tag('ignore', '', meta); // mustNotHaveValue

        function validateTag(tag) {
            validator.validate(tag, dictionary.lookUp(tag.title), meta);
        }

        beforeEach(function() {
            spyOn(logger, 'error');
        });

        afterEach(function() {
            env.conf.tags.allowUnknownTags = allowUnknown;
        });

        it("logs an error if the tag is not in the dictionary and conf.tags.allowUnknownTags is false", function() {
            env.conf.tags.allowUnknownTags = false;
            validateTag(badTag);

            expect(logger.error).toHaveBeenCalled();
        });

        it("doesn't log an error if the tag is not in the dictionary and conf.tags.allowUnknownTags is true", function() {
            env.conf.tags.allowUnknownTags = true;
            validateTag(badTag);

            expect(logger.error).not.toHaveBeenCalled();
        });

        it("logs no error for valid tags", function() {
            validateTag(goodTag);
            validateTag(goodTag2);

            expect(logger.error).not.toHaveBeenCalled();
        });

        it("logs an error if the tag has no text but .mustHaveValue is true", function() {
            var missingName = doop(goodTag);
            missingName.text = null;
            validateTag(missingName);

            expect(logger.error).toHaveBeenCalled();
        });

        it("logs an error if the tag has text but .mustNotHaveValue is true", function() {
            var missingText = doop(goodTag2);
            missingText.mustNotHaveValue = true;
            missingText.text = missingText.text || 'asdf';
            validateTag(missingText);

            expect(logger.error).toHaveBeenCalled();
        });
    });
});

'use strict';

describe('jsdoc/tag/validator', function() {
    var doop = require('jsdoc/util/doop');
    var env = require('jsdoc/env');
    var logger = require('jsdoc/util/logger');
    var tag = require('jsdoc/tag');
    var validator = require('jsdoc/tag/validator');

    it('should exist', function() {
        expect(validator).toBeDefined();
        expect(typeof validator).toBe('object');
    });

    it('should export a validate function', function() {
        expect(validator.validate).toBeDefined();
        expect(typeof validator.validate).toBe('function');
    });

    describe('validate', function() {
        var dictionary = require('jsdoc/tag/dictionary');

        var allowUnknown = !!env.conf.tags.allowUnknownTags;
        var badTag = { title: 'lkjasdlkjfb' };
        var badTag2 = new tag.Tag('type', '{string} I am a string!');
        var meta = {
            filename: 'asdf.js',
            lineno: 1,
            comment: 'Better luck next time.'
        };
        var goodTag = new tag.Tag('name', 'MyDocletName', meta); // mustHaveValue
        var goodTag2 = new tag.Tag('ignore', '', meta); // mustNotHaveValue

        function validateTag(theTag) {
            validator.validate(theTag, dictionary.lookUp(theTag.title), meta);
        }

        beforeEach(function() {
            spyOn(logger, 'error');
            spyOn(logger, 'warn');
        });

        afterEach(function() {
            env.conf.tags.allowUnknownTags = allowUnknown;
        });

        it('logs an error if the tag is not in the dictionary and conf.tags.allowUnknownTags is false', function() {
            env.conf.tags.allowUnknownTags = false;
            validateTag(badTag);

            expect(logger.error).toHaveBeenCalled();
        });

        it('does not log an error if the tag is not in the dictionary and conf.tags.allowUnknownTags is true', function() {
            env.conf.tags.allowUnknownTags = true;
            validateTag(badTag);

            expect(logger.error).not.toHaveBeenCalled();
        });

        it('does not log an error for valid tags', function() {
            validateTag(goodTag);
            validateTag(goodTag2);

            expect(logger.error).not.toHaveBeenCalled();
        });

        it('logs an error if the tag has no text but mustHaveValue is true', function() {
            var missingName = doop(goodTag);
            missingName.text = null;
            validateTag(missingName);

            expect(logger.error).toHaveBeenCalled();
        });

        it('logs a warning if the tag has text but mustNotHaveValue is true', function() {
            var missingText = doop(goodTag2);
            missingText.mustNotHaveValue = true;
            missingText.text = missingText.text || 'asdf';
            validateTag(missingText);

            expect(logger.warn).toHaveBeenCalled();
        });

        it('logs a warning if the tag has a description but mustNotHaveDescription is true', function() {
            validateTag(badTag2);

            expect(logger.warn).toHaveBeenCalled();
        });

        it('logs meta.comment when present', function() {
            env.conf.tags.allowUnknownTags = false;
            validateTag(badTag);

            expect(logger.error.mostRecentCall.args[0]).toContain(meta.comment);
        });
    });
});

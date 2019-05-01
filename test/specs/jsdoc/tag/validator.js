describe('jsdoc/tag/validator', () => {
    const doop = require('../../../lib/jsdoc/util/doop');
    const env = require('../../../lib/jsdoc/env');
    const logger = require('../../../lib/jsdoc/util/logger');
    const tag = require('../../../lib/jsdoc/tag');
    const validator = require('../../../lib/jsdoc/tag/validator');

    it('should exist', () => {
        expect(validator).toBeDefined();
        expect(typeof validator).toBe('object');
    });

    it('should export a validate function', () => {
        expect(validator.validate).toBeDefined();
        expect(typeof validator.validate).toBe('function');
    });

    describe('validate', () => {
        const dictionary = require('../../../lib/jsdoc/tag/dictionary');

        const allowUnknown = Boolean(env.conf.tags.allowUnknownTags);
        const badTag = { title: 'lkjasdlkjfb' };
        const badTag2 = new tag.Tag('type', '{string} I am a string!');
        const meta = {
            filename: 'asdf.js',
            lineno: 1,
            comment: 'Better luck next time.'
        };
        const goodTag = new tag.Tag('name', 'MyDocletName', meta); // mustHaveValue
        const goodTag2 = new tag.Tag('ignore', '', meta); // mustNotHaveValue

        function validateTag(theTag) {
            validator.validate(theTag, dictionary.lookUp(theTag.title), meta);
        }

        beforeEach(() => {
            spyOn(logger, 'error');
            spyOn(logger, 'warn');
        });

        afterEach(() => {
            env.conf.tags.allowUnknownTags = allowUnknown;
        });

        it('logs an error if the tag is not in the dictionary and conf.tags.allowUnknownTags is false', () => {
            env.conf.tags.allowUnknownTags = false;
            validateTag(badTag);

            expect(logger.error).toHaveBeenCalled();
        });

        it('logs an error if the tag is not in the dictionary and conf.tags.allowUnknownTags is does not include it', () => {
            env.conf.tags.allowUnknownTags = [];
            validateTag(badTag);

            expect(logger.error).toHaveBeenCalled();
        });

        it('does not log an error if the tag is not in the dictionary and conf.tags.allowUnknownTags is true', () => {
            env.conf.tags.allowUnknownTags = true;
            validateTag(badTag);

            expect(logger.error).not.toHaveBeenCalled();
        });

        it('does not log an error if the tag is not in the dictionary and conf.tags.allowUnknownTags includes it', () => {
            env.conf.tags.allowUnknownTags = [badTag.title];
            validateTag(badTag);

            expect(logger.error).not.toHaveBeenCalled();
        });

        it('does not log an error for valid tags', () => {
            validateTag(goodTag);
            validateTag(goodTag2);

            expect(logger.error).not.toHaveBeenCalled();
        });

        it('logs an error if the tag has no text but mustHaveValue is true', () => {
            const missingName = doop(goodTag);

            missingName.text = null;
            validateTag(missingName);

            expect(logger.error).toHaveBeenCalled();
        });

        it('logs a warning if the tag has text but mustNotHaveValue is true', () => {
            const missingText = doop(goodTag2);

            missingText.mustNotHaveValue = true;
            missingText.text = missingText.text || 'asdf';
            validateTag(missingText);

            expect(logger.warn).toHaveBeenCalled();
        });

        it('logs a warning if the tag has a description but mustNotHaveDescription is true', () => {
            validateTag(badTag2);

            expect(logger.warn).toHaveBeenCalled();
        });

        it('logs meta.comment when present', () => {
            env.conf.tags.allowUnknownTags = false;
            validateTag(badTag);

            expect(logger.error.mostRecentCall.args[0]).toContain(meta.comment);
        });
    });
});

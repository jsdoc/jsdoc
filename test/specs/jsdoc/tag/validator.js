/*global afterEach: true, beforeEach: true, describe: true, env: true, expect: true, it: true, spyOn: true */
describe('jsdoc/tag/validator', function() {
    var validator = require('jsdoc/tag/validator'),
        tag = require('jsdoc/tag');

    it('should exist', function() {
        expect(validator).toBeDefined();
        expect(typeof validator).toBe('object');
    });

    it('should export a validate function', function() {
        expect(validator.validate).toBeDefined();
        expect(typeof validator.validate).toBe('function');
    });

    // Note: various Error classes are private so we just test whether *any*
    // error was thrown, not against particular types (e.g. UnknownTagError).
    describe('validate', function() {
        var dictionary = require('jsdoc/tag/dictionary'),
            lenient = !!env.opts.lenient,
            allowUnknown = !!env.conf.tags.allowUnknownTags,
            badTag = {title: 'lkjasdlkjfb'},
            meta = {filename: 'asdf.js', lineno: 1},
            goodTag = new tag.Tag('name', 'MyDocletName', meta), // mustHaveValue
            goodTag2 = new tag.Tag('ignore', '', meta); // mustNotHaveValue
       
        function validateTag(tag) {
           return function() { validator.validate(tag, dictionary.lookUp(tag.title), meta); };
        } 

        beforeEach(function() {
            spyOn(console, 'log');
        });

        afterEach(function() {
            env.opts.lenient = lenient;
            env.conf.tags.allowUnknownTags = allowUnknown;
        });

        it("throws an error if the tag is not in the dictionary, conf.tags.allowUnknownTags is false and lenient is false", function() {
            env.opts.lenient = false;
            env.conf.tags.allowUnknownTags = false;
            expect(validateTag(badTag)).toThrow();
        });

        it("throws NO error if the tag is not in the dictionary, conf.tags.allowUnknownTags is false and lenient is true", function() {
            env.opts.lenient = true;
            env.conf.tags.allowUnknownTags = false;
            expect(validateTag(badTag)).not.toThrow();
        });

        it("doesn't throw an error if the tag is not in the dictionary and conf.tags.allowUnknownTags is true, regardless of lenience", function() {
            // if it doesn't throw an error with lenient false, then it won't throw it with lenient true (we have
            // tested lenient already in util/error.js)
            env.opts.lenient = false;
            env.conf.tags.allowUnknownTags = true;
            expect(validateTag(badTag)).not.toThrow();
        });

        it("throws no error for valid tags", function() {
            env.opts.lenient = false;
            expect(validateTag(goodTag)).not.toThrow();
            expect(validateTag(goodTag2)).not.toThrow();
        });

        it("throws an error if the tag has no text but .mustHaveValue is true and lenient is false, or none if it's true", function() {
            // the name tag has .mustHaveValue.
            var oldText = goodTag.text;
            delete goodTag.text;

            env.opts.lenient = false;
            expect(validateTag(goodTag)).toThrow();

            env.opts.lenient = true;
            expect(validateTag(goodTag)).not.toThrow();

            goodTag.text = oldText;
        });

        it("throws an error if the tag has text but .mustNotHaveValue is true and lenient is false, or none if it's true", function() {
            var oldVal = goodTag2.mustNotHaveValue,
                text = goodTag2.text;
            goodTag2.mustNotHaveValue = true;
            goodTag2.text = goodTag2.text || 'asdf';

            env.opts.lenient = false;
            expect(validateTag(goodTag2)).toThrow();

            env.opts.lenient = true;
            expect(validateTag(goodTag2)).not.toThrow();

            goodTag2.mustNotHaveValue = oldVal;
            goodTag2.text = oldVal;
        });
    });
});

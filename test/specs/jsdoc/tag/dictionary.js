/*global describe, expect, it */
'use strict';

describe('jsdoc/tag/dictionary', function() {
    var dictionary = require('jsdoc/tag/dictionary');

    var tagOptions = {
        canHaveValue: true,
        isNamespace: true
    };
    var tagTitle = '!!!testTag!!!';
    var tagSynonym = '!!!testTagSynonym!!!';
    var tagDef = dictionary.defineTag(tagTitle, tagOptions).synonym(tagSynonym);

    it('should exist', function() {
        expect(dictionary).toBeDefined();
        expect(typeof dictionary).toBe('object');
    });

    it('should export a defineTag function', function() {
        expect(dictionary.defineTag).toBeDefined();
        expect(typeof dictionary.defineTag).toBe('function');
    });

    it('should export a lookUp function', function() {
        expect(dictionary.lookUp).toBeDefined();
        expect(typeof dictionary.lookUp).toBe('function');
    });

    it('should export a isNamespace function', function() {
        expect(dictionary.isNamespace).toBeDefined();
        expect(typeof dictionary.isNamespace).toBe('function');
    });

    it('should export a normalise function', function() {
        expect(dictionary.normalise).toBeDefined();
        expect(typeof dictionary.normalise).toBe('function');
    });

    describe('defineTag', function() {
        it('returns an object with the correct "title" property', function() {
            expect(typeof tagDef).toBe('object');
            expect(tagDef.title).toBeDefined();
            expect(typeof tagDef.title).toBe('string');
            expect(tagDef.title).toBe(dictionary.normalise(tagTitle));
        });

        it('returns an object that contains all of the tag properties', function() {
            Object.keys(tagOptions).forEach(function(opt) {
                expect(tagDef[opt]).toBe(tagOptions[opt]);
            });
        });

        it('works correctly without an options object', function() {
            var title = '!!!testTagNoOptions!!!';

            function makeTag() {
                return dictionary.defineTag(title);
            }

            expect(makeTag).not.toThrow();
            expect(makeTag().title).toBe(dictionary.normalise(title));
        });
    });

    describe('lookUp', function() {
        it("retrieves the definition using the tag's canonical name", function() {
            expect(dictionary.lookUp(tagTitle)).toBe(tagDef);
        });

        it('retrieves the definition using a synonym for the tag', function() {
            expect(dictionary.lookUp(tagSynonym)).toBe(tagDef);
        });

        it('returns `false` when a tag is not found', function() {
            expect(dictionary.lookUp('lkjas1l24jk')).toBe(false);
        });
    });

    describe('isNamespace', function() {
        it("returns whether a tag is a namespace using the tag's canonical name", function() {
            expect(dictionary.isNamespace(tagTitle)).toBe(true);
        });

        it('returns whether a tag is a namespace when using a synonym for the tag', function() {
            expect(dictionary.isNamespace(tagSynonym)).toBe(true);
        });

        it('returns `false` for nonexistent tags', function() {
            expect(dictionary.isNamespace('lkjasd90034')).toBe(false);
        });

        it('returns `false` for non-namespace tags', function() {
            expect(dictionary.isNamespace('see')).toBe(false);
        });
    });

    describe('normalise', function() {
        it("should return the tag's title if it is not a synonym", function() {
            expect(dictionary.normalise('FooBar')).toBe('foobar');
            expect(dictionary.normalise(tagTitle)).toBe(tagDef.title);
        });

        it('should return the canonical name of a tag if the synonym is normalised', function() {
            expect(dictionary.normalise(tagSynonym)).toBe(tagDef.title);
        });
    });
});

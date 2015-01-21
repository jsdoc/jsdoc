'use strict';

describe('jsdoc/tag/dictionary', function() {
    var dictionary = require('jsdoc/tag/dictionary');
    var testDictionary = new dictionary.Dictionary();

    var tagOptions = {
        canHaveValue: true,
        isNamespace: true
    };
    var tagTitle = '!!!testTag!!!';
    var tagSynonym = '!!!testTagSynonym!!!';
    var tagDef = testDictionary.defineTag(tagTitle, tagOptions).synonym(tagSynonym);

    it('should exist', function() {
        expect(dictionary).toBeDefined();
        expect(typeof dictionary).toBe('object');
    });

    it('should be an instance of dictionary.Dictionary', function() {
        expect(dictionary instanceof dictionary.Dictionary).toBe(true);
    });

    it('should export a defineSynonym method', function() {
        expect(dictionary.defineSynonym).toBeDefined();
        expect(typeof dictionary.defineSynonym).toBe('function');
    });

    it('should export a defineTag method', function() {
        expect(dictionary.defineTag).toBeDefined();
        expect(typeof dictionary.defineTag).toBe('function');
    });

    it('should export a lookUp method', function() {
        expect(dictionary.lookUp).toBeDefined();
        expect(typeof dictionary.lookUp).toBe('function');
    });

    it('should export an isNamespace method', function() {
        expect(dictionary.isNamespace).toBeDefined();
        expect(typeof dictionary.isNamespace).toBe('function');
    });

    it('should export a normalise method', function() {
        expect(dictionary.normalise).toBeDefined();
        expect(typeof dictionary.normalise).toBe('function');
    });

    it('should export a normalize method', function() {
        expect(typeof dictionary.normalize).toBe('function');
    });

    it('should export a Dictionary constructor', function() {
        expect(dictionary.Dictionary).toBeDefined();
        expect(typeof dictionary.Dictionary).toBe('function');
    });

    describe('defineSynonym', function() {
        it('adds a synonym for the specified tag', function() {
            var synonymDict = new dictionary.Dictionary();

            dictionary.defineTag('foo', {});
            dictionary.defineSynonym('foo', 'bar');

            expect(dictionary.normalise('bar')).toBe('foo');
        });
    });

    describe('defineTag', function() {
        it('returns an object with the correct "title" property', function() {
            expect(typeof tagDef).toBe('object');
            expect(tagDef.title).toBeDefined();
            expect(typeof tagDef.title).toBe('string');
            expect(tagDef.title).toBe(testDictionary.normalise(tagTitle));
        });

        it('returns an object that contains all of the tag properties', function() {
            Object.keys(tagOptions).forEach(function(opt) {
                expect(tagDef[opt]).toBe(tagOptions[opt]);
            });
        });

        it('works correctly without an options object', function() {
            var title = '!!!testTagNoOptions!!!';

            function makeTag() {
                return testDictionary.defineTag(title);
            }

            expect(makeTag).not.toThrow();
            expect(makeTag().title).toBe(testDictionary.normalise(title));
        });
    });

    describe('lookUp', function() {
        it("retrieves the definition using the tag's canonical name", function() {
            expect(testDictionary.lookUp(tagTitle)).toBe(tagDef);
        });

        it('retrieves the definition using a synonym for the tag', function() {
            expect(testDictionary.lookUp(tagSynonym)).toBe(tagDef);
        });

        it('returns `false` when a tag is not found', function() {
            expect(testDictionary.lookUp('lkjas1l24jk')).toBe(false);
        });
    });

    describe('isNamespace', function() {
        it("returns whether a tag is a namespace using the tag's canonical name", function() {
            expect(testDictionary.isNamespace(tagTitle)).toBe(true);
        });

        it('returns whether a tag is a namespace when using a synonym for the tag', function() {
            expect(testDictionary.isNamespace(tagSynonym)).toBe(true);
        });

        it('returns `false` for nonexistent tags', function() {
            expect(testDictionary.isNamespace('lkjasd90034')).toBe(false);
        });

        it('returns `false` for non-namespace tags', function() {
            expect(testDictionary.isNamespace('see')).toBe(false);
        });
    });

    describe('normalise', function() {
        it("should return the tag's title if it is not a synonym", function() {
            expect(testDictionary.normalise('FooBar')).toBe('foobar');
            expect(testDictionary.normalise(tagTitle)).toBe(tagDef.title);
        });

        it('should return the canonical name of a tag if the synonym is normalised', function() {
            expect(testDictionary.normalise(tagSynonym)).toBe(tagDef.title);
        });
    });

    describe('normalize', function() {
        it('should be identical to "normalise"', function() {
            expect(testDictionary.normalize).toBe(testDictionary.normalise);
        });
    });

    describe('Dictionary', function() {
        it('should be a constructor', function() {
            function newDictionary() {
                return new dictionary.Dictionary();
            }

            expect(newDictionary).not.toThrow();
        });
    });
});

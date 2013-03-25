describe('jsdoc/tag/dictionary', function() {
    var dictionary = require('jsdoc/tag/dictionary');

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

    // TODO: should really remove this tag from the dictionary after, but how?
    var tagOptions = {
        canHaveValue: true,
        isNamespace: true
    },
        tagTitle = 'testTag',
        tagSynonym = 'testTag2';
    var def = dictionary.defineTag(tagTitle, tagOptions).synonym(tagSynonym);
    // Should really test TagDefinition but they are private.
    // Instead, we'll just tests all the properties we expect of it.
    describe("defineTag", function() {

        // Since TagDefinition is private, I'll just test for its properties here.
        it("returns an object with 'title' property", function() {
            expect(typeof def).toBe('object');
            // how to test?
            expect(def.title).toBeDefined();
            expect(typeof def.title).toBe('string');
            expect(def.title).toBe(dictionary.normalise(tagTitle));
        });

        it("returned object has all the tag properties copied over", function() {
            for (var prop in tagOptions) {
                if (tagOptions.hasOwnProperty(prop)) {
                    expect(def[prop]).toBe(tagOptions[prop]);
                }
            }
        });
    });

    describe("lookUp", function() {
        it("retrieves definition when using the tag's canonical name", function() {
            expect(dictionary.lookUp(tagTitle)).toBe(def);
        });

        it("retrieves definition when using a synonym", function() {
            expect(dictionary.lookUp(tagSynonym)).toBe(def);
        });

        it("returns FALSE when a tag is not found", function() {
            expect(dictionary.lookUp('lkjas1l24jk')).toBe(false);
        });
    });

    describe("isNamespace", function() {
        it("returns whether a tag is a namespace when using its canonical name", function() {
            expect(dictionary.isNamespace(tagTitle)).toBe(true);
        });

        it("returns whether a tag is a namespace when using its synonym", function() {
            expect(dictionary.isNamespace(tagSynonym)).toBe(true);
        });

        it("non-existent tags or non-namespace tags should return false", function() {
            expect(dictionary.isNamespace('see')).toBe(false);
            expect(dictionary.isNamespace('lkjasd90034')).toBe(false);
        });
    });

    describe("normalise", function() {
        it("should return the tag's title if it is not a synonym", function() {
            expect(dictionary.normalise('FooBar')).toBe('foobar');
            expect(dictionary.normalise(tagTitle)).toBe(def.title);
        });

        it("should return the canonical name of a tag if the synonym is normalised", function() {
            expect(dictionary.normalise(tagSynonym)).toBe(def.title);
        });
    });
});

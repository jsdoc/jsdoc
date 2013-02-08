describe('jsdoc/tag/dictionary', function() {
    var dictionary = require('jsdoc/tag/dictionary');

    it('should exist', function() {
        expect(dictionary).toBeDefined();
        expect(typeof dictionary).toEqual('object');
    });

    it('should export a defineTag function', function() {
        expect(dictionary.defineTag).toBeDefined();
        expect(typeof dictionary.defineTag).toEqual('function');
    });

    it('should export a lookUp function', function() {
        expect(dictionary.lookUp).toBeDefined();
        expect(typeof dictionary.lookUp).toEqual('function');
    });

    it('should export a isNamespace function', function() {
        expect(dictionary.isNamespace).toBeDefined();
        expect(typeof dictionary.isNamespace).toEqual('function');
    });

    it('should export a normalise function', function() {
        expect(dictionary.normalise).toBeDefined();
        expect(typeof dictionary.normalise).toEqual('function');
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
            expect(typeof def).toEqual('object');
            // how to test?
            expect(def.title).toBeDefined();
            expect(typeof def.title).toEqual('string');
            expect(def.title).toEqual(dictionary.normalise(tagTitle));
        });

        it("returned object has all the tag properties copied over", function() {
            for (var prop in tagOptions) {
                if (tagOptions.hasOwnProperty(prop)) {
                    expect(def[prop]).toEqual(tagOptions[prop]);
                }
            }
        });
    });

    describe("lookUp", function() {
        it("retrieves definition when using the tag's canonical name", function() {
            expect(dictionary.lookUp(tagTitle)).toEqual(def);
        });

        it("retrieves definition when using a synonym", function() {
            expect(dictionary.lookUp(tagSynonym)).toEqual(def);
        });

        it("returns FALSE when a tag is not found", function() {
            expect(dictionary.lookUp('lkjas1l24jk')).toEqual(false);
        });
    });

    describe("isNamespace", function() {
        it("returns whether a tag is a namespace when using its canonical name", function() {
            expect(dictionary.isNamespace(tagTitle)).toEqual(true);
        });

        it("returns whether a tag is a namespace when using its synonym", function() {
            expect(dictionary.isNamespace(tagSynonym)).toEqual(true);
        });

        it("non-existent tags or non-namespace tags should return false", function() {
            expect(dictionary.isNamespace('see')).toEqual(false);
            expect(dictionary.isNamespace('lkjasd90034')).toEqual(false);
        });
    });

    describe("normalise", function() {
        it("should return the tag's title if it is not a synonym", function() {
            expect(dictionary.normalise('FooBar')).toEqual('foobar');
            expect(dictionary.normalise(tagTitle)).toEqual(def.title);
        });

        it("should return the canonical name of a tag if the synonym is normalised", function() {
            expect(dictionary.normalise(tagSynonym)).toEqual(def.title);
        });
    });
});

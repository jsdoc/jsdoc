describe('jsdoc/tag/dictionary', () => {
    const dictionary = require('jsdoc/tag/dictionary');
    const testDictionary = new dictionary.Dictionary();

    const tagOptions = {
        canHaveValue: true,
        isNamespace: true
    };
    const tagTitle = '!!!testTag!!!';
    const tagSynonym = '!!!testTagSynonym!!!';
    const tagDef = testDictionary.defineTag(tagTitle, tagOptions).synonym(tagSynonym);

    it('should exist', () => {
        expect(dictionary).toBeDefined();
        expect(typeof dictionary).toBe('object');
    });

    it('should be an instance of dictionary.Dictionary', () => {
        expect(dictionary instanceof dictionary.Dictionary).toBe(true);
    });

    it('should export a defineSynonym method', () => {
        expect(dictionary.defineSynonym).toBeDefined();
        expect(typeof dictionary.defineSynonym).toBe('function');
    });

    it('should export a defineTag method', () => {
        expect(dictionary.defineTag).toBeDefined();
        expect(typeof dictionary.defineTag).toBe('function');
    });

    it('should export a lookUp method', () => {
        expect(dictionary.lookUp).toBeDefined();
        expect(typeof dictionary.lookUp).toBe('function');
    });

    it('should export an isNamespace method', () => {
        expect(dictionary.isNamespace).toBeDefined();
        expect(typeof dictionary.isNamespace).toBe('function');
    });

    it('should export a normalize method', () => {
        expect(dictionary.normalize).toBeDefined();
        expect(typeof dictionary.normalize).toBe('function');
    });

    it('should export a Dictionary constructor', () => {
        expect(dictionary.Dictionary).toBeDefined();
        expect(typeof dictionary.Dictionary).toBe('function');
    });

    describe('defineSynonym', () => {
        it('adds a synonym for the specified tag', () => {
            dictionary.defineTag('foo', {});
            dictionary.defineSynonym('foo', 'bar');

            expect(dictionary.normalize('bar')).toBe('foo');
        });
    });

    describe('defineTag', () => {
        it('returns an object with the correct "title" property', () => {
            expect(typeof tagDef).toBe('object');
            expect(tagDef.title).toBeDefined();
            expect(typeof tagDef.title).toBe('string');
            expect(tagDef.title).toBe(testDictionary.normalize(tagTitle));
        });

        it('returns an object that contains all of the tag properties', () => {
            Object.keys(tagOptions).forEach(opt => {
                expect(tagDef[opt]).toBe(tagOptions[opt]);
            });
        });

        it('works correctly without an options object', () => {
            const title = '!!!testTagNoOptions!!!';

            function makeTag() {
                return testDictionary.defineTag(title);
            }

            expect(makeTag).not.toThrow();
            expect(makeTag().title).toBe(testDictionary.normalize(title));
        });
    });

    describe('lookUp', () => {
        it("retrieves the definition using the tag's canonical name", () => {
            expect(testDictionary.lookUp(tagTitle)).toBe(tagDef);
        });

        it('retrieves the definition using a synonym for the tag', () => {
            expect(testDictionary.lookUp(tagSynonym)).toBe(tagDef);
        });

        it('returns `false` when a tag is not found', () => {
            expect(testDictionary.lookUp('lkjas1l24jk')).toBe(false);
        });
    });

    describe('isNamespace', () => {
        it("returns whether a tag is a namespace using the tag's canonical name", () => {
            expect(testDictionary.isNamespace(tagTitle)).toBe(true);
        });

        it('returns whether a tag is a namespace when using a synonym for the tag', () => {
            expect(testDictionary.isNamespace(tagSynonym)).toBe(true);
        });

        it('returns `false` for nonexistent tags', () => {
            expect(testDictionary.isNamespace('lkjasd90034')).toBe(false);
        });

        it('returns `false` for non-namespace tags', () => {
            expect(testDictionary.isNamespace('see')).toBe(false);
        });
    });

    describe('normalize', () => {
        it("should return the tag's title if it is not a synonym", () => {
            expect(testDictionary.normalize('FooBar')).toBe('foobar');
            expect(testDictionary.normalize(tagTitle)).toBe(tagDef.title);
        });

        it('should return the canonical name of a tag if the synonym is normalized', () => {
            expect(testDictionary.normalize(tagSynonym)).toBe(tagDef.title);
        });
    });

    describe('Dictionary', () => {
        it('should be a constructor', () => {
            function newDictionary() {
                return new dictionary.Dictionary();
            }

            expect(newDictionary).not.toThrow();
        });
    });
});

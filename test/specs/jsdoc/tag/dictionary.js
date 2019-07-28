describe('jsdoc/tag/dictionary', () => {
    const dictionary = require('jsdoc/tag/dictionary');
    const testDictionary = new dictionary.Dictionary();

    const tagOptions = {
        canHaveValue: true,
        isNamespace: true
    };
    const TAG_TITLE = '!!!testTag!!!';
    const TAG_SYNONYM = '!!!testTagSynonym!!!';
    const TAG_DEF = testDictionary.defineTag(TAG_TITLE, tagOptions).synonym(TAG_SYNONYM);

    it('should exist', () => {
        expect(dictionary).toBeObject();
    });

    it('should be an instance of dictionary.Dictionary', () => {
        expect(dictionary instanceof dictionary.Dictionary).toBe(true);
    });

    it('should export a defineSynonym method', () => {
        expect(dictionary.defineSynonym).toBeFunction();
    });

    it('should export a defineTag method', () => {
        expect(dictionary.defineTag).toBeFunction();
    });

    it('should export a lookUp method', () => {
        expect(dictionary.lookUp).toBeFunction();
    });

    it('should export an isNamespace method', () => {
        expect(dictionary.isNamespace).toBeFunction();
    });

    it('should export a normalise method', () => {
        expect(dictionary.normalise).toBeFunction();
    });

    it('should export a normalize method', () => {
        expect(dictionary.normalize).toBeFunction();
    });

    it('should export a Dictionary constructor', () => {
        expect(dictionary.Dictionary).toBeFunction();
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
            expect(TAG_DEF).toBeObject();
            expect(TAG_DEF.title).toBe(testDictionary.normalize(TAG_TITLE));
        });

        it('returns an object that contains all of the tag properties', () => {
            Object.keys(tagOptions).forEach(opt => {
                expect(TAG_DEF[opt]).toBe(tagOptions[opt]);
            });
        });

        it('works correctly without an options object', () => {
            const NEW_TITLE = '!!!testTagNoOptions!!!';

            function makeTag() {
                return testDictionary.defineTag(NEW_TITLE);
            }

            expect(makeTag).not.toThrow();
            expect(makeTag().title).toBe(testDictionary.normalize(NEW_TITLE));
        });
    });

    describe('lookUp', () => {
        it("retrieves the definition using the tag's canonical name", () => {
            expect(testDictionary.lookUp(TAG_TITLE)).toBe(TAG_DEF);
        });

        it('retrieves the definition using a synonym for the tag', () => {
            expect(testDictionary.lookUp(TAG_SYNONYM)).toBe(TAG_DEF);
        });

        it('returns `false` when a tag is not found', () => {
            expect(testDictionary.lookUp('lkjas1l24jk')).toBeFalse();
        });
    });

    describe('isNamespace', () => {
        it("returns whether a tag is a namespace using the tag's canonical name", () => {
            expect(testDictionary.isNamespace(TAG_TITLE)).toBeTrue();
        });

        it('returns whether a tag is a namespace when using a synonym for the tag', () => {
            expect(testDictionary.isNamespace(TAG_SYNONYM)).toBeTrue();
        });

        it('returns `false` for nonexistent tags', () => {
            expect(testDictionary.isNamespace('lkjasd90034')).toBeFalse();
        });

        it('returns `false` for non-namespace tags', () => {
            expect(testDictionary.isNamespace('see')).toBeFalse();
        });
    });

    describe('normalise', () => {
        it("should return the tag's title if it is not a synonym", () => {
            expect(testDictionary.normalise('FooBar')).toBe('foobar');
            expect(testDictionary.normalise(TAG_TITLE)).toBe(TAG_DEF.title);
        });

        it('should return the canonical name of a tag if the synonym is normalized', () => {
            expect(testDictionary.normalise(TAG_SYNONYM)).toBe(TAG_DEF.title);
        });
    });

    describe('normalize', () => {
        // covered by tests for `normalise`
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

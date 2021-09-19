describe('jsdoc/tag/dictionary', () => {
  const dictionary = require('jsdoc/tag/dictionary');
  const Dictionary = dictionary.Dictionary;
  const env = require('jsdoc/env');

  let testDictionary;
  const tagOptions = {
    canHaveValue: true,
    isNamespace: true,
  };
  let TAG_DEF;
  const TAG_SYNONYM = '!!!testTagSynonym!!!';
  const TAG_TITLE = '!!!testTag!!!';

  beforeEach(() => {
    testDictionary = new Dictionary();
    TAG_DEF = testDictionary.defineTag(TAG_TITLE, tagOptions).synonym(TAG_SYNONYM);
  });

  it('is an instance of dictionary.Dictionary', () => {
    expect(dictionary instanceof dictionary.Dictionary).toBe(true);
  });

  it('has a defineSynonym method', () => {
    expect(dictionary.defineSynonym).toBeFunction();
  });

  it('has a defineTag method', () => {
    expect(dictionary.defineTag).toBeFunction();
  });

  it('has a defineTags method', () => {
    expect(dictionary.defineTags).toBeFunction();
  });

  it('has a fromConfig static method', () => {
    expect(dictionary.Dictionary.fromConfig).toBeFunction();
  });

  it('has a lookup method', () => {
    expect(dictionary.lookup).toBeFunction();
  });

  it('has a lookUp method', () => {
    expect(dictionary.lookUp).toBeFunction();
  });

  it('has an isNamespace method', () => {
    expect(dictionary.isNamespace).toBeFunction();
  });

  it('has a normalise method', () => {
    expect(dictionary.normalise).toBeFunction();
  });

  it('has a normalize method', () => {
    expect(dictionary.normalize).toBeFunction();
  });

  it('has a Dictionary constructor', () => {
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
      Object.keys(tagOptions).forEach((opt) => {
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

    it('adds synonyms', () => {
      const tagDef = {
        mustHaveValue: true,
        synonyms: ['bar'],
      };

      testDictionary.defineTag('foo', tagDef);

      expect(testDictionary.normalize('bar')).toBe('foo');
    });
  });

  describe('defineTags', () => {
    it('behaves the same as adding tags individually', () => {
      const dict1 = new Dictionary();
      const dict2 = new Dictionary();
      const fakeTag = {
        mustHaveValue: true,
        synonym: 'phony',
      };

      dict1.defineTag('fake', fakeTag);
      dict2.defineTags({ fake: fakeTag });

      expect(dict2.lookup('fake')).toEqual(dict1.lookup('fake'));
      expect(dict2.lookup('phony')).toEqual(dict1.lookup('phony'));
    });

    it('returns the tags it added', () => {
      const tags = {
        tag1: {
          tag1Attribute: 'foo',
        },
        tag2: {
          tag2Attribute: 'bar',
        },
      };
      const actualTags = testDictionary.defineTags(tags);

      for (const tag of Object.keys(tags)) {
        expect(actualTags[tag]).toBeObject();
        for (const attrib of Object.keys(tags[tag])) {
          expect(tags[tag][attrib]).toBe(actualTags[tag][attrib]);
        }
      }
    });
  });

  describe('fromConfig', () => {
    const CLOSURE_TAGNAME = 'final';
    const dictionaryConfig = env.conf.tags.dictionaries.slice();
    const JSDOC_TAGNAME = 'abstract';

    beforeEach(() => {
      env.conf.tags.dictionaries = [];
    });

    afterEach(() => {
      env.conf.tags.dictionaries = dictionaryConfig.slice();
    });

    it('logs an error if `env.conf.tags.dictionaries` is undefined', () => {
      function defineTags() {
        env.conf.tags.dictionaries = undefined;
        Dictionary.fromConfig(env);
      }

      expect(jsdoc.didLog(defineTags, 'error')).toBeTrue();
    });

    it('logs an error if an unknown dictionary is requested', () => {
      function defineTags() {
        env.conf.tags.dictionaries = ['jsmarmoset'];
        Dictionary.fromConfig(env);
      }

      expect(jsdoc.didLog(defineTags, 'error')).toBeTrue();
    });

    it('adds both JSDoc and Closure tags by default', () => {
      env.conf.tags.dictionaries = dictionaryConfig.slice();
      testDictionary = Dictionary.fromConfig(env);

      expect(testDictionary.lookup(JSDOC_TAGNAME)).toBeObject();
      expect(testDictionary.lookup(CLOSURE_TAGNAME)).toBeObject();
    });

    it('adds only the JSDoc tags if requested', () => {
      env.conf.tags.dictionaries = ['jsdoc'];
      testDictionary = Dictionary.fromConfig(env);

      expect(testDictionary.lookup(JSDOC_TAGNAME)).toBeObject();
      expect(testDictionary.lookup(CLOSURE_TAGNAME)).toBeFalse();
    });

    it('adds only the Closure tags if requested', () => {
      env.conf.tags.dictionaries = ['closure'];
      testDictionary = Dictionary.fromConfig(env);

      expect(testDictionary.lookup(JSDOC_TAGNAME)).toBeFalse();
      expect(testDictionary.lookup(CLOSURE_TAGNAME)).toBeObject();
    });

    it('prefers tagdefs from the first dictionary on the list', () => {
      env.conf.tags.dictionaries = ['closure', 'jsdoc'];
      testDictionary = Dictionary.fromConfig(env);

      expect(testDictionary.lookup('deprecated').synonyms).not.toBeDefined();
    });

    it('adds tag synonyms', () => {
      env.conf.tags.dictionaries = ['jsdoc'];
      testDictionary = Dictionary.fromConfig(env);

      expect(testDictionary.lookup('extends')).toBeObject();
      expect(testDictionary.normalize('extends')).toBe('augments');
    });
  });

  describe('lookup', () => {
    it("retrieves the definition using the tag's canonical name", () => {
      expect(testDictionary.lookup(TAG_TITLE)).toBe(TAG_DEF);
    });

    it('retrieves the definition using a synonym for the tag', () => {
      expect(testDictionary.lookup(TAG_SYNONYM)).toBe(TAG_DEF);
    });

    it('returns `false` when a tag is not found', () => {
      expect(testDictionary.lookup('lkjas1l24jk')).toBeFalse();
    });
  });

  describe('lookUp', () => {
    it('calls `lookup`', () => {
      const lookupSpy = spyOn(testDictionary, 'lookup');

      testDictionary.lookUp('foo');

      expect(lookupSpy).toHaveBeenCalled();
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
    it('calls `normalize`', () => {
      const normalizeSpy = spyOn(testDictionary, 'normalize');

      testDictionary.normalise('foo');

      expect(normalizeSpy).toHaveBeenCalled();
    });
  });

  describe('normalize', () => {
    it('returns the title if it is not a synonym', () => {
      expect(testDictionary.normalize('FooBar')).toBe('foobar');
      expect(testDictionary.normalize(TAG_TITLE)).toBe(TAG_DEF.title);
    });

    it('returns the canonical name if the synonym is normalized', () => {
      expect(testDictionary.normalize(TAG_SYNONYM)).toBe(TAG_DEF.title);
    });
  });

  describe('Dictionary', () => {
    it('is a constructor', () => {
      function newDictionary() {
        return new dictionary.Dictionary();
      }

      expect(newDictionary).not.toThrow();
    });
  });
});

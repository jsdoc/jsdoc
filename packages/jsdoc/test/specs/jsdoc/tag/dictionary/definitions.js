describe('jsdoc/tag/dictionary/definitions', () => {
    const env = require('jsdoc/env');
    const definitions = require('jsdoc/tag/dictionary/definitions');
    const Dictionary = require('jsdoc/tag/dictionary').Dictionary;

    it('should exist', () => {
        expect(definitions).toBeObject();
    });

    it('should export a baseTags object', () => {
        expect(definitions.baseTags).toBeObject();
    });

    it('should export a closureTags object', () => {
        expect(definitions.closureTags).toBeObject();
    });

    it('should export a defineTags method', () => {
        expect(definitions.defineTags).toBeFunction();
    });

    it('should export a jsdocTags object', () => {
        expect(definitions.jsdocTags).toBeObject();
    });

    describe('baseTags', () => {
        // nothing to test except which tags are on the list, which would duplicate the code
    });

    describe('closureTags', () => {
        // nothing to test except which tags are on the list, which would duplicate the code
    });

    describe('defineTags', () => {
        const CLOSURE_TAGNAME = 'final';
        const dictionaryConfig = env.conf.tags.dictionaries.slice(0);
        const JSDOC_TAGNAME = 'abstract';
        let tagDict;

        beforeEach(() => {
            env.conf.tags.dictionaries = [];
            tagDict = new Dictionary();
        });

        afterEach(() => {
            env.conf.tags.dictionaries = dictionaryConfig.slice(0);
        });

        it('should log an error if `env.conf.tags.dictionaries` is undefined', () => {
            function defineTags() {
                env.conf.tags.dictionaries = undefined;
                definitions.defineTags(tagDict);
            }

            expect(jsdoc.didLog(defineTags, 'error')).toBeTrue();
        });

        it('should log an error if an unknown dictionary is requested', () => {
            function defineTags() {
                env.conf.tags.dictionaries = ['jsmarmoset'];
                definitions.defineTags(tagDict);
            }

            expect(jsdoc.didLog(defineTags, 'error')).toBeTrue();
        });

        it('should add both JSDoc and Closure tags by default', () => {
            env.conf.tags.dictionaries = dictionaryConfig.slice(0);
            definitions.defineTags(tagDict);

            expect(tagDict.lookUp(JSDOC_TAGNAME)).toBeObject();
            expect(tagDict.lookUp(CLOSURE_TAGNAME)).toBeObject();
        });

        it('should add only the JSDoc tags if requested', () => {
            env.conf.tags.dictionaries = ['jsdoc'];
            definitions.defineTags(tagDict);

            expect(tagDict.lookUp(JSDOC_TAGNAME)).toBeObject();
            expect(tagDict.lookUp(CLOSURE_TAGNAME)).toBeFalse();
        });

        it('should add only the Closure tags if requested', () => {
            env.conf.tags.dictionaries = ['closure'];
            definitions.defineTags(tagDict);

            expect(tagDict.lookUp(JSDOC_TAGNAME)).toBeFalse();
            expect(tagDict.lookUp(CLOSURE_TAGNAME)).toBeObject();
        });

        it('should prefer tagdefs from the first dictionary on the list', () => {
            env.conf.tags.dictionaries = ['closure', 'jsdoc'];
            definitions.defineTags(tagDict);

            expect(tagDict.lookUp('deprecated').synonyms).not.toBeDefined();
        });

        it('should add tag synonyms', () => {
            env.conf.tags.dictionaries = ['jsdoc'];
            definitions.defineTags(tagDict);

            expect(tagDict.lookUp('extends')).toBeObject();
            expect(tagDict.normalize('extends')).toBe('augments');
        });

        it('should ignore the config settings if tagdefs are passed in', () => {
            const tagDefs = {
                foo: {
                    mustHaveValue: false
                }
            };

            env.conf.tags.dictionaries = ['jsdoc'];
            definitions.defineTags(tagDict, tagDefs);

            expect(tagDict.lookUp('foo')).toBeObject();
            expect(tagDict.lookUp('abstract')).toBeFalse();
        });
    });

    describe('jsdocTags', () => {
        // nothing to test except which tags are on the list, which would duplicate the code
    });
});

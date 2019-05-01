describe('jsdoc/tag/dictionary/definitions', () => {
    const env = require('../../../lib/jsdoc/env');
    const definitions = require('../../../lib/jsdoc/tag/dictionary/definitions');
    const Dictionary = require('../../../lib/jsdoc/tag/dictionary').Dictionary;
    const logger = require('../../../lib/jsdoc/util/logger');

    it('should exist', () => {
        expect(definitions).toBeDefined();
        expect(typeof definitions).toBe('object');
    });

    it('should export a baseTags object', () => {
        expect(definitions.baseTags).toBeDefined();
        expect(typeof definitions.baseTags).toBe('object');
    });

    it('should export a closureTags object', () => {
        expect(definitions.closureTags).toBeDefined();
        expect(typeof definitions.closureTags).toBe('object');
    });

    it('should export a defineTags method', () => {
        expect(definitions.defineTags).toBeDefined();
        expect(typeof definitions.defineTags).toBe('function');
    });

    it('should export a jsdocTags object', () => {
        expect(definitions.jsdocTags).toBeDefined();
        expect(typeof definitions.jsdocTags).toBe('object');
    });

    describe('baseTags', () => {
        // nothing to test except which tags are on the list, which would duplicate the code
    });

    describe('closureTags', () => {
        // nothing to test except which tags are on the list, which would duplicate the code
    });

    describe('defineTags', () => {
        const dictionaryConfig = env.conf.tags.dictionaries.slice(0);
        let tagDict;

        beforeEach(() => {
            env.conf.tags.dictionaries = [];
            tagDict = new Dictionary();
        });

        afterEach(() => {
            env.conf.tags.dictionaries = dictionaryConfig.slice(0);
        });

        it('should log an error if `env.conf.tags.dictionaries` is undefined', () => {
            env.conf.tags.dictionaries = undefined;
            spyOn(logger, 'error');
            definitions.defineTags(tagDict);

            expect(logger.error).toHaveBeenCalled();
        });

        it('should log an error if an unknown dictionary is requested', () => {
            env.conf.tags.dictionaries = ['jsmarmoset'];
            spyOn(logger, 'error');
            definitions.defineTags(tagDict);

            expect(logger.error).toHaveBeenCalled();
        });

        it('should add both JSDoc and Closure tags by default', () => {
            env.conf.tags.dictionaries = dictionaryConfig.slice(0);
            definitions.defineTags(tagDict);

            // Check for one tag from the JSDoc tagdefs and another tag from the Closure tagdefs.
            // Not thorough, but probably good enough.
            expect(tagDict.lookUp('abstract')).not.toBe(false);
            expect(tagDict.lookUp('final')).not.toBe(false);
        });

        it('should add only the JSDoc tags if requested', () => {
            env.conf.tags.dictionaries = ['jsdoc'];
            definitions.defineTags(tagDict);

            // Check for one tag from the JSDoc tagdefs and another tag from another set of tagdefs.
            // Not thorough, but probably good enough.
            expect(tagDict.lookUp('abstract')).not.toBe(false);
            expect(tagDict.lookUp('final')).toBe(false);
        });

        it('should add only the Closure tags if requested', () => {
            env.conf.tags.dictionaries = ['closure'];
            definitions.defineTags(tagDict);

            // Check for one tag from the Closure tagdefs and another tag from another set of
            // tagdefs. Not thorough, but probably good enough.
            expect(tagDict.lookUp('final')).not.toBe(false);
            expect(tagDict.lookUp('abstract')).toBe(false);
        });

        it('should prefer tagdefs from the first dictionary on the list', () => {
            env.conf.tags.dictionaries = ['closure', 'jsdoc'];
            definitions.defineTags(tagDict);

            expect(tagDict.lookUp('deprecated').synonyms).not.toBeDefined();
        });

        it('should add tag synonyms', () => {
            env.conf.tags.dictionaries = ['jsdoc'];
            definitions.defineTags(tagDict);

            expect(tagDict.lookUp('extends')).not.toBe(false);
            expect(tagDict.normalise('extends')).toBe('augments');
        });

        it('should ignore the config settings if tagdefs are passed in', () => {
            const tagDefs = {
                foo: {
                    mustHaveValue: false
                }
            };

            env.conf.tags.dictionaries = ['jsdoc'];
            definitions.defineTags(tagDict, tagDefs);

            expect(tagDict.lookUp('foo')).not.toBe(false);
            expect(tagDict.lookUp('abstract')).toBe(false);
        });
    });

    describe('jsdocTags', () => {
        // nothing to test except which tags are on the list, which would duplicate the code
    });
});

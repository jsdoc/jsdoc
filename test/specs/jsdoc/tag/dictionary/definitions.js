'use strict';

describe('jsdoc/tag/dictionary/definitions', function() {
    var definitions = require('jsdoc/tag/dictionary/definitions');
    var Dictionary = require('jsdoc/tag/dictionary').Dictionary;
    var logger = require('jsdoc/util/logger');

    it('should exist', function() {
        expect(definitions).toBeDefined();
        expect(typeof definitions).toBe('object');
    });

    it('should export a baseTags object', function() {
        expect(definitions.baseTags).toBeDefined();
        expect(typeof definitions.baseTags).toBe('object');
    });

    it('should export a closureTags object', function() {
        expect(definitions.closureTags).toBeDefined();
        expect(typeof definitions.closureTags).toBe('object');
    });

    it('should export a defineTags method', function() {
        expect(definitions.defineTags).toBeDefined();
        expect(typeof definitions.defineTags).toBe('function');
    });

    it('should export a jsdocTags object', function() {
        expect(definitions.jsdocTags).toBeDefined();
        expect(typeof definitions.jsdocTags).toBe('object');
    });

    describe('baseTags', function() {
        it('should be identical to jsdocTags', function() {
            expect(definitions.baseTags).toBe(definitions.jsdocTags);
        });
    });

    describe('closureTags', function() {
        // this test just makes sure all the definitions are here; we have other tests for tag
        // behavior
        it('should contain the expected tag definitions', function() {
            var expectedTagNames = [
                'const',
                'constructor',
                'deprecated',
                'enum',
                'extends',
                'final',
                'implements',
                'interface',
                'lends',
                'license',
                'param',
                'private',
                'protected',
                'return',
                'this',
                'throws',
                'type',
                'typedef'
            ].sort();
            var actualTagNames = Object.keys(definitions.closureTags).sort();

            expect(expectedTagNames).toEqual(actualTagNames);
        });
    });

    describe('defineTags', function() {
        var dictionaryConfig = global.env.conf.tags.dictionaries.slice(0);
        var tagDict;

        beforeEach(function() {
            global.env.conf.tags.dictionaries = [];
            tagDict = new Dictionary();
        });

        afterEach(function() {
            global.env.conf.tags.dictionaries = dictionaryConfig.slice(0);
        });

        it('should log an error if `env.conf.tags.dictionaries` is undefined', function() {
            global.env.conf.tags.dictionaries = undefined;
            spyOn(logger, 'error');
            definitions.defineTags(tagDict);

            expect(logger.error).toHaveBeenCalled();
        });

        it('should log an error if an unknown dictionary is requested', function() {
            global.env.conf.tags.dictionaries = ['jsmarmoset'];
            spyOn(logger, 'error');
            definitions.defineTags(tagDict);

            expect(logger.error).toHaveBeenCalled();
        });

        it('should add both JSDoc and Closure tags by default', function() {
            global.env.conf.tags.dictionaries = dictionaryConfig.slice(0);
            definitions.defineTags(tagDict);

            // Check for one tag from the JSDoc tagdefs and another tag from the Closure tagdefs.
            // Not thorough, but probably good enough.
            expect(tagDict.lookUp('abstract')).not.toBe(false);
            expect(tagDict.lookUp('final')).not.toBe(false);
        });

        it('should add only the JSDoc tags if requested', function() {
            global.env.conf.tags.dictionaries = ['jsdoc'];
            definitions.defineTags(tagDict);

            // Check for one tag from the JSDoc tagdefs and another tag from another set of tagdefs.
            // Not thorough, but probably good enough.
            expect(tagDict.lookUp('abstract')).not.toBe(false);
            expect(tagDict.lookUp('final')).toBe(false);
        });

        it('should add only the Closure tags if requested', function() {
            global.env.conf.tags.dictionaries = ['closure'];
            definitions.defineTags(tagDict);

            // Check for one tag from the Closure tagdefs and another tag from another set of
            // tagdefs. Not thorough, but probably good enough.
            expect(tagDict.lookUp('final')).not.toBe(false);
            expect(tagDict.lookUp('abstract')).toBe(false);
        });

        it('should prefer tagdefs from the first dictionary on the list', function() {
            global.env.conf.tags.dictionaries = ['closure', 'jsdoc'];
            definitions.defineTags(tagDict);

            expect(tagDict.lookUp('deprecated').synonyms).not.toBeDefined();
        });

        it('should add tag synonyms', function() {
            global.env.conf.tags.dictionaries = ['jsdoc'];
            definitions.defineTags(tagDict);

            expect(tagDict.lookUp('extends')).not.toBe(false);
            expect(tagDict.normalise('extends')).toBe('augments');
        });

        it('should ignore the config settings if tagdefs are passed in', function() {
            var tagDefs = {
                foo: {
                    mustHaveValue: false
                }
            };

            global.env.conf.tags.dictionaries = ['jsdoc'];
            definitions.defineTags(tagDict, tagDefs);

            expect(tagDict.lookUp('foo')).not.toBe(false);
            expect(tagDict.lookUp('abstract')).toBe(false);
        });
    });

    describe('jsdocTags', function() {
        // this test just makes sure all the definitions are here; we have other tests for tag
        // behavior
        it('should contain the expected tag definitions', function() {
            var expectedTagNames = [
                'abstract',
                'access',
                'alias',
                'also',
                'augments',
                'author',
                'borrows',
                'class',
                'classdesc',
                'constant',
                'constructs',
                'copyright',
                'default',
                'deprecated',
                'description',
                'enum',
                'event',
                'example',
                'exports',
                'external',
                'file',
                'fires',
                'function',
                'global',
                'ignore',
                'inner',
                'instance',
                'implements',
                'interface',
                'kind',
                'lends',
                'license',
                'listens',
                'member',
                'memberof',
                'mixes',
                'mixin',
                'module',
                'name',
                'namespace',
                'param',
                'private',
                'property',
                'protected',
                'public',
                'readonly',
                'requires',
                'returns',
                'see',
                'since',
                'static',
                'summary',
                'this',
                'throws',
                'todo',
                'tutorial',
                'type',
                'typedef',
                'undocumented',
                'variation',
                'version'
            ].sort();
            var actualTagNames = Object.keys(definitions.jsdocTags).sort();

            expect(expectedTagNames).toEqual(actualTagNames);
        });
    });
});

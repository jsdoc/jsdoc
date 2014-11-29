'use strict';

var definitions = require('jsdoc/tag/dictionary/definitions');
var dictionary = require('jsdoc/tag/dictionary');
var Dictionary = dictionary.Dictionary;
var doclet = require('jsdoc/doclet');
var logger = require('jsdoc/util/logger');

var originalDictionary = dictionary;

describe('@protected tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/protectedtag.js');
    var uidCounter = docSet.getByLongname('module:uid~uidCounter')[0];
    var uidRoot = docSet.getByLongname('module:uid~uidObjects.root')[0];

    it('When a symbol has a @protected tag, the doclet has an `access` property set to ' +
        '`protected`.', function() {
        expect(uidCounter.access).toBe('protected');
    });

    it('When a symbol tagged with @protected has members, the members do not inherit the ' +
        '@protected tag.', function() {
        expect(uidRoot.access).not.toBeDefined();
    });

    describe('JSDoc tags', function() {
        afterEach(function() {
            doclet._replaceDictionary(originalDictionary);
        });

        it('When JSDoc tags are enabled, the @protected tag does not accept a value.', function() {
            var dict = new Dictionary();
            var protectedDocs;

            definitions.defineTags(dict, definitions.jsdocTags);
            doclet._replaceDictionary(dict);
            spyOn(logger, 'warn');

            protectedDocs = jasmine.getDocSetFromFile('test/fixtures/protectedtag2.js');

            expect(logger.warn).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', function() {
        afterEach(function() {
            doclet._replaceDictionary(originalDictionary);
        });

        it('When Closure Compiler tags are enabled, the @private tag accepts a type expression.',
            function() {
            var dict = new Dictionary();
            var protectedDocs;
            var counter;

            definitions.defineTags(dict, definitions.closureTags);
            doclet._replaceDictionary(dict);
            spyOn(logger, 'warn');

            protectedDocs = jasmine.getDocSetFromFile('test/fixtures/protectedtag2.js');
            counter = protectedDocs.getByLongname('uidCounter')[0];

            expect(logger.warn).not.toHaveBeenCalled();

            expect(counter).toBeDefined();
            expect(counter.access).toBe('protected');

            expect(counter.type).toBeDefined();
            expect(counter.type.names).toBeDefined();
            expect(counter.type.names.length).toBe(1);
            expect(counter.type.names[0]).toBe('number');
        });
    });
});

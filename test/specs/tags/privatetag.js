'use strict';

var definitions = require('jsdoc/tag/dictionary/definitions');
var dictionary = require('jsdoc/tag/dictionary');
var Dictionary = dictionary.Dictionary;
var doclet = require('jsdoc/doclet');
var logger = require('jsdoc/util/logger');

var originalDictionary = dictionary;

describe('@private tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/privatetag.js');
    var foo = docSet.getByLongname('Foo')[0];
    var bar = docSet.getByLongname('Foo#bar')[0];

    it('When a symbol has a @private tag, the doclet has an `access` property set to `private`.',
        function() {
        expect(foo.access).toBe('private');
    });

    it('When a symbol tagged with @private has members, the members do not inherit the @private ' +
        'tag.', function() {
        expect(bar.access).not.toBeDefined();
    });

    describe('JSDoc tags', function() {
        afterEach(function() {
            doclet._replaceDictionary(originalDictionary);
        });

        it('When JSDoc tags are enabled, the @private tag does not accept a value.', function() {
            var dict = new Dictionary();
            var privateDocs;

            definitions.defineTags(dict, definitions.jsdocTags);
            doclet._replaceDictionary(dict);
            spyOn(logger, 'warn');

            privateDocs = jasmine.getDocSetFromFile('test/fixtures/privatetag2.js');

            expect(logger.warn).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', function() {
        afterEach(function() {
            doclet._replaceDictionary(originalDictionary);
        });

        it('When Closure Compiler tags are enabled, the @private tag accepts a type expression.',
            function() {
            var connectionPorts;
            var dict = new Dictionary();
            var privateDocs;

            definitions.defineTags(dict, definitions.closureTags);
            doclet._replaceDictionary(dict);
            spyOn(logger, 'warn');

            privateDocs = jasmine.getDocSetFromFile('test/fixtures/privatetag2.js');
            connectionPorts = privateDocs.getByLongname('connectionPorts')[0];

            expect(logger.warn).not.toHaveBeenCalled();

            expect(connectionPorts).toBeDefined();
            expect(connectionPorts.access).toBe('private');

            expect(connectionPorts.type).toBeDefined();
            expect(connectionPorts.type.names).toBeDefined();
            expect(connectionPorts.type.names.length).toBe(1);
            expect(connectionPorts.type.names[0]).toBe('Object.<string, number>');
        });
    });
});

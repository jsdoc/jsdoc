'use strict';

var definitions = require('jsdoc/tag/dictionary/definitions');
var dictionary = require('jsdoc/tag/dictionary');
var Dictionary = dictionary.Dictionary;
var doclet = require('jsdoc/doclet');
var logger = require('jsdoc/util/logger');

var originalDictionary = dictionary;

describe('@type tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/typetag.js');

    it('When a symbol has a @type tag, the doclet has a type property set to that value\'s type.', function() {
        var foo = docSet.getByLongname('foo')[0];

        expect(typeof foo.type).toBe('object');
        expect(typeof foo.type.names).toBe('object');
        expect(foo.type.names.join(', ')).toBe('string, Array.<string>');
    });

    it('When a symbol has a @type tag set to a plain string, the doclet has a type property set to that value\'s type.', function() {
        var bar = docSet.getByLongname('bar')[0];

        expect(bar.type.names.join(', ')).toBe('integer');
    });

    it('When a symbol has a @type tag for a non-nullable type, the doclet indicates that the type is non-nullable', function() {
        var baz = docSet.getByLongname('baz')[0];

        expect(baz.nullable).toBe(false);
    });

    describe('JSDoc tags', function() {
        afterEach(function() {
            doclet._replaceDictionary(originalDictionary);
        });

        it('When JSDoc tags are enabled, the @type tag does not accept a description.', function() {
            var dict = new Dictionary();
            var typeDocs;

            definitions.defineTags(dict, definitions.jsdocTags);
            doclet._replaceDictionary(dict);
            spyOn(logger, 'warn');

            typeDocs = jasmine.getDocSetFromFile('test/fixtures/typetag2.js');

            expect(logger.warn).toHaveBeenCalled();
        });
    });

    describe('Closure tags', function() {
        afterEach(function() {
            doclet._replaceDictionary(originalDictionary);
        });

        it('When Closure tags are enabled, the @type tag accepts a description.', function() {
            var dict = new Dictionary();
            var stringOrNumber;
            var typeDocs;

            definitions.defineTags(dict, definitions.closureTags);
            doclet._replaceDictionary(dict);
            spyOn(logger, 'warn');

            typeDocs = jasmine.getDocSetFromFile('test/fixtures/typetag2.js');
            stringOrNumber = typeDocs.getByLongname('stringOrNumber')[0];

            expect(logger.warn).not.toHaveBeenCalled();

            expect(stringOrNumber).toBeDefined();
            expect(stringOrNumber.description).toBe('A string or a number.');
        });
    });
});

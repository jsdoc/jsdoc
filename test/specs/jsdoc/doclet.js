'use strict';

describe('jsdoc/doclet', function() {
    // TODO: more tests
    var _ = require('underscore');
    var jsdoc = {
        doclet: require('jsdoc/doclet')
    };
    var Doclet = jsdoc.doclet.Doclet;

    var docSet = jasmine.getDocSetFromFile('test/fixtures/doclet.js');
    var test1 = docSet.getByLongname('test1')[0];
    var test2 = docSet.getByLongname('test2')[0];

    var expectList = '* List item 1';
    var expectStrong = '**Strong** is strong';

    it('does not mangle Markdown in a description that uses leading asterisks', function() {
        expect(test2.description.indexOf(expectList)).toBeGreaterThan(-1);
        expect(test2.description.indexOf(expectStrong)).toBeGreaterThan(-1);
    });

    it('adds the AST node as a non-enumerable property', function() {
        var descriptor = Object.getOwnPropertyDescriptor(test1.meta.code, 'node');

        expect(descriptor.enumerable).toBe(false);
    });

    describe('setScope', function() {
        it('should accept the correct scope names', function() {
            function setScope(scopeName) {
                var doclet = new Doclet('/** Huzzah, a doclet! */');

                doclet.setScope(scopeName);
            }

            _.values(require('jsdoc/name').SCOPE.NAMES).forEach(function(scopeName) {
                expect( setScope.bind(null, scopeName) ).not.toThrow();
            });
        });

        it('should throw an error for invalid scope names', function() {
            function setScope() {
                var doclet = new Doclet('/** Woe betide this doclet. */');

                doclet.setScope('fiddlesticks');
            }

            expect(setScope).toThrow();
        });
    });

    describe('combine', function() {
        it('should override most properties of the secondary doclet', function() {
            var primaryDoclet = new Doclet('/** New and improved!\n@version 2.0.0 */');
            var secondaryDoclet = new Doclet('/** Hello!\n@version 1.0.0 */');
            var newDoclet = jsdoc.doclet.combine(primaryDoclet, secondaryDoclet);

            Object.getOwnPropertyNames(newDoclet).forEach(function(property) {
                expect(newDoclet[property]).toEqual(primaryDoclet[property]);
            });
        });

        it('should add properties that are missing from the secondary doclet', function() {
            var primaryDoclet = new Doclet('/** Hello!\n@version 2.0.0 */');
            var secondaryDoclet = new Doclet('/** Hello! */');
            var newDoclet = jsdoc.doclet.combine(primaryDoclet, secondaryDoclet);

            expect(newDoclet.version).toBe('2.0.0');
        });

        describe('params and properties', function() {
            var properties = [
                'params',
                'properties'
            ];

            it('should use the secondary doclet\'s params and properties if the primary doclet ' +
                'had none', function() {
                var primaryDoclet = new Doclet('/** Hello! */');
                var secondaryComment = [
                    '/**',
                    ' * @param {string} foo - The foo.',
                    ' * @property {number} bar - The bar.',
                    ' */'
                ].join('\n');
                var secondaryDoclet = new Doclet(secondaryComment);
                var newDoclet = jsdoc.doclet.combine(primaryDoclet, secondaryDoclet);

                properties.forEach(function(property) {
                    expect(newDoclet[property]).toEqual(secondaryDoclet[property]);
                });
            });

            it('should use the primary doclet\'s params and properties if the primary doclet has ' +
                'some', function() {
                var primaryComment = [
                    '/**',
                    ' * @param {number} baz - The baz.',
                    ' * @property {string} qux - The qux.',
                    ' */'
                ].join('\n');
                var primaryDoclet = new Doclet(primaryComment);
                var secondaryComment = [
                    '/**',
                    ' * @param {string} foo - The foo.',
                    ' * @property {number} bar - The bar.',
                    ' */'
                ].join('\n');
                var secondaryDoclet = new Doclet(secondaryComment);
                var newDoclet = jsdoc.doclet.combine(primaryDoclet, secondaryDoclet);

                properties.forEach(function(property) {
                    expect(newDoclet[property]).toEqual(primaryDoclet[property]);
                });
            });
        });
    });
});

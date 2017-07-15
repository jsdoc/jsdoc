'use strict';

describe('jsdoc/doclet', function() {
    // TODO: more tests
    var _ = require('underscore');
    var Doclet = require('jsdoc/doclet').Doclet;

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

    describe('merge', function() {
        it('should override most properties of the original doclet', function() {
            var originalDoclet = new Doclet('/** Hello!\n@version 1.0.0 */');
            var newDoclet = new Doclet('/** New and improved!\n@version 2.0.0 */');

            originalDoclet.merge(newDoclet);

            Object.getOwnPropertyNames(originalDoclet).forEach(function(property) {
                expect(originalDoclet[property]).toEqual(newDoclet[property]);
            });
        });

        it('should add properties that are missing from the original doclet', function() {
            var originalDoclet = new Doclet('/** Hello! */');
            var newDoclet = new Doclet('/** Hello!\n@version 2.0.0 */');

            originalDoclet.merge(newDoclet);

            expect(originalDoclet.version).toBe('2.0.0');
        });

        describe('params and properties', function() {
            var properties = [
                'params',
                'properties'
            ];

            it('should use the new doclet\'s params and properties if the original doclet had none',
                function() {
                    var originalDoclet = new Doclet('/** Hello! */');
                    var newComment = [
                        '/**',
                        ' * @param {string} foo - The foo.',
                        ' * @property {number} bar - The bar.',
                        ' */'
                    ].join('\n');
                    var newDoclet = new Doclet(newComment);

                    originalDoclet.merge(newDoclet);

                    properties.forEach(function(property) {
                        expect(originalDoclet[property]).toEqual(newDoclet[property]);
                    });
                });

            it('should use the new doclet\'s params and properties if the new doclet has at ' +
                'least as many of them as the old doclet', function() {
                var originalComment = [
                    '/**',
                    ' * @param {string} foo - The foo.',
                    ' * @property {number} bar - The bar.',
                    ' */'
                ].join('\n');
                var originalDoclet = new Doclet(originalComment);
                var newComment = [
                    '/**',
                    ' * @param {number} baz - The baz.',
                    ' * @property {string} qux - The qux.',
                    ' */'
                ].join('\n');
                var newDoclet = new Doclet(newComment);

                originalDoclet.merge(newDoclet);

                properties.forEach(function(property) {
                    expect(originalDoclet[property]).toEqual(newDoclet[property]);
                });
            });

            it('should use the old doclet\'s params and properties if the new doclet has fewer ' +
                'of them', function() {
                var originalComment = [
                    '/**',
                    ' * @param {string} foo - The foo.',
                    ' * @property {number} bar - The bar.',
                    ' */'
                ].join('\n');
                var originalDoclet = new Doclet(originalComment);
                var newDoclet = new Doclet('/** Hello! */');

                originalDoclet.merge(newDoclet);

                properties.forEach(function(property) {
                    expect(originalDoclet[property]).not.toEqual(newDoclet[property]);
                });
            });
        });
    });
});

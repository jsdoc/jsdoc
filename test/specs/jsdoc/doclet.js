/*global afterEach, describe, env, expect, it, jasmine */
'use strict';

describe('jsdoc/doclet', function() {
    // TODO: more tests
    var _ = require('underscore');
    var Doclet = require('jsdoc/doclet').Doclet;

    var debug = !!env.opts.debug;
    var docSet = jasmine.getDocSetFromFile('test/fixtures/doclet.js');
    var test1 = docSet.getByLongname('test1')[0];
    var test2 = docSet.getByLongname('test2')[0];

    var expectList = '* List item 1';
    var expectStrong = '**Strong** is strong';

    afterEach(function() {
        env.opts.debug = debug;
    });

    it('does not mangle Markdown in a description that uses leading asterisks', function() {
        expect(test2.description.indexOf(expectList)).toBeGreaterThan(-1);
        expect(test2.description.indexOf(expectStrong)).toBeGreaterThan(-1);
    });

    it('adds the AST node as a non-enumerable property by default', function() {
        var descriptor = Object.getOwnPropertyDescriptor(test1.meta.code, 'node');

        expect(descriptor.enumerable).toBe(false);
    });

    it('adds the AST node as an enumerable property in debug mode', function() {
        var descriptor;
        var doclet;

        env.opts.debug = true;
        doclet = jasmine.getDocSetFromFile('test/fixtures/doclet.js').getByLongname('test1')[0];
        descriptor = Object.getOwnPropertyDescriptor(doclet.meta.code, 'node');

        expect(descriptor.enumerable).toBe(true);
    });

    describe('setScope', function() {
        it('should accept the correct scope names', function() {
            function setScope(scopeName) {
                var doclet = new Doclet('/** Huzzah, a doclet! */', {});
                doclet.setScope(scopeName);
            }

            _.values(require('jsdoc/name').SCOPE.NAMES).forEach(function(scopeName) {
                expect( setScope.bind(null, scopeName) ).not.toThrow();
            });
        });

        it('should throw an error for invalid scope names', function() {
            function setScope() {
                var doclet = new Doclet('/** Woe betide this doclet. */', {});
                doclet.setScope('fiddlesticks');
            }

            expect(setScope).toThrow();
        });
    });
});

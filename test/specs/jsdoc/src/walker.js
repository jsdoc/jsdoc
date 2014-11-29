'use strict';

describe('jsdoc/src/walker', function() {
    var walker = require('jsdoc/src/walker');

    it('should exist', function() {
        expect(walker).toBeDefined();
        expect(typeof walker).toBe('object');
    });

    it('should export a "walkers" object', function() {
        expect(walker.walkers).toBeDefined();
        expect(typeof walker.walkers).toBe('object');
    });

    it('should export a "Walker" class', function() {
        expect(walker.Walker).toBeDefined();
        expect(typeof walker.Walker).toBe('function');
    });

    describe('walkers', function() {
        var Syntax = require('jsdoc/src/syntax').Syntax;

        // TODO: tests for default functions

        it('should contain a function for each known node type', function() {
            Object.keys(Syntax).forEach(function(nodeType) {
                expect(walker.walkers[nodeType]).toBeDefined();
                expect(typeof walker.walkers[nodeType]).toBe('function');
            });
        });
    });

    xdescribe('Walker', function() {
        // TODO
    });
});

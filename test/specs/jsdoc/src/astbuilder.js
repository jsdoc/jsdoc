'use strict';

describe('jsdoc/src/astbuilder', function() {
    var astbuilder = require('jsdoc/src/astbuilder');

    it('should exist', function() {
        expect(astbuilder).toBeDefined();
        expect(typeof astbuilder).toBe('object');
    });

    it('should export an AstBuilder class', function() {
        expect(astbuilder.AstBuilder).toBeDefined();
        expect(typeof astbuilder.AstBuilder).toBe('function');
    });

    describe('AstBuilder', function() {
        // TODO: more tests
        var builder;

        beforeEach(function() {
            builder = new astbuilder.AstBuilder();
        });

        it('should provide a "build" method', function() {
            expect(builder.build).toBeDefined();
            expect(typeof builder.build).toBe('function');
        });

        describe('build', function() {
            // TODO: more tests
            var logger = require('jsdoc/util/logger');

            beforeEach(function() {
                spyOn(logger, 'error');
            });

            it('should log (not throw) an error when a file cannot be parsed', function() {
                function parse() {
                    builder.build('qwerty!!!!!', 'bad.js');
                }

                expect(parse).not.toThrow();
                expect(logger.error).toHaveBeenCalled();
            });
        });
    });
});

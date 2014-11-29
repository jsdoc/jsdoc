'use strict';

describe('jsdoc/util/error', function() {
    var error = require('jsdoc/util/error');
    var handle = error.handle;
    var logger = require('jsdoc/util/logger');

    it('should exist', function() {
        expect(error).toBeDefined();
        expect(typeof error).toBe('object');
    });

    it('should export a "handle" function', function() {
        expect(handle).toBeDefined();
        expect(typeof handle).toBe('function');
    });

    describe('handle', function() {
        it('should not throw', function() {
            expect(handle).not.toThrow();
        });

        it('should log messages with logger.error()', function() {
            spyOn(logger, 'error');
            handle('test');

            expect(logger.error).toHaveBeenCalled();
        });

        it('should use special formatting for Error instances', function() {
            spyOn(logger, 'error');
            handle( new Error('Oh no!') );

            expect(logger.error).toHaveBeenCalledWith('Error: Oh no!');
        });
    });
});

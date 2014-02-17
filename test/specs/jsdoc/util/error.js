/*global beforeEach, describe, expect, it, spyOn */
describe("jsdoc/util/error", function() {
    var error = require('jsdoc/util/error');
    var handle = error.handle;
    var logger = require('jsdoc/util/logger');

    it("should exist", function() {
        expect(error).toBeDefined();
        expect(typeof error).toEqual("object");
    });

    it("should export a 'handle' function", function() {
        expect(handle).toBeDefined();
        expect(typeof handle).toEqual("function");
    });

    describe("handle", function() {
        it('should not throw', function() {
            expect(handle).not.toThrow();
        });

        it('should log messages with logger.error()', function() {
            spyOn(logger, 'error');
            handle('test');

            expect(logger.error).toHaveBeenCalled();
        });
    });
});

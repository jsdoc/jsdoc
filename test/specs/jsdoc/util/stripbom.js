'use strict';

describe('jsdoc/util/stripbom', function() {
    var stripBom = require('jsdoc/util/stripbom');

    it('should exist', function() {
        expect(typeof stripBom).toBe('object');
    });

    it('should export a "strip" method', function() {
        expect(typeof stripBom.strip).toBe('function');
    });

    describe('strip', function() {
        it('should strip the leading BOM when present', function() {
            var result = stripBom.strip('\uFEFFHello there!');

            expect(result).toBe('Hello there!');
        });

        it('should not change the text when no leading BOM is present', function() {
            var result = stripBom.strip('Hello there!');

            expect(result).toBe('Hello there!');
        });

        it('should return an empty string when the text is null or undefined', function() {
            expect(stripBom.strip()).toBe('');
        });
    });
});

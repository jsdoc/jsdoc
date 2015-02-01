'use strict';

describe('jsdoc/util/cast', function() {
    var cast = require('jsdoc/util/cast');

    it('should exist', function() {
        expect(typeof cast).toBe('object');
    });

    it('should export a "cast" method', function() {
        expect(typeof cast.cast).toBe('function');
    });

    describe('cast', function() {
        it('should not modify values that are not strings, objects, or arrays', function() {
            var result = cast.cast(8);

            expect(result).toBe(8);
        });

        it('should not modify strings that are not boolean-ish or number-ish', function() {
            var result = cast.cast('hello world');

            expect(result).toBe('hello world');
        });

        it('should cast boolean-ish values to booleans', function() {
            var truthish = cast.cast('true');
            var falsish = cast.cast('false');

            expect(truthish).toBe(true);
            expect(falsish).toBe(false);
        });

        it('should cast null-ish values to null', function() {
            var nullish = cast.cast('null');

            expect(nullish).toBe(null);
        });

        it('should cast undefined-ish values to undefined', function() {
            var undefinedish = cast.cast('undefined');

            expect(undefinedish).toBeUndefined();
        });

        it('should cast positive number-ish values to numbers', function() {
            var positive = cast.cast('17.35');

            expect(positive).toBe(17.35);
        });

        it('should cast negative number-ish values to numbers', function() {
            var negative = cast.cast('-17.35');

            expect(negative).toBe(-17.35);
        });

        it('should cast NaN-ish values to NaN', function() {
            var nan = cast.cast('NaN');

            expect(typeof nan).toBe('number');
            expect(isNaN(nan)).toBe(true);
        });

        it('should convert values in an object', function() {
            var result = cast.cast({ foo: 'true' });

            expect(result).toEqual({ foo: true });
        });

        it('should convert values in nested objects', function() {
            var result = cast.cast({
                foo: {
                    bar: 'true'
                }
            });

            expect(result).toEqual({
                foo: {
                    bar: true
                }
            });
        });

        it('should convert values in an array', function() {
            var result = cast.cast(['true', '17.35']);

            expect(result).toEqual([true, 17.35]);
        });

        it('should convert values in a nested array', function() {
            var result = cast.cast(['true', ['17.35']]);

            expect(result).toEqual([true, [17.35]]);
        });
    });
});

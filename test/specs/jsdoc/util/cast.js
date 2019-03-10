describe('jsdoc/util/cast', () => {
    const cast = require('jsdoc/util/cast');

    it('should exist', () => {
        expect(typeof cast).toBe('object');
    });

    it('should export a "cast" method', () => {
        expect(typeof cast.cast).toBe('function');
    });

    describe('cast', () => {
        it('should not modify values that are not strings, objects, or arrays', () => {
            const result = cast.cast(8);

            expect(result).toBe(8);
        });

        it('should not modify strings that are not boolean-ish or number-ish', () => {
            const result = cast.cast('hello world');

            expect(result).toBe('hello world');
        });

        it('should cast boolean-ish values to booleans', () => {
            const truthish = cast.cast('true');
            const falsish = cast.cast('false');

            expect(truthish).toBe(true);
            expect(falsish).toBe(false);
        });

        it('should cast null-ish values to null', () => {
            const nullish = cast.cast('null');

            expect(nullish).toBe(null);
        });

        it('should cast undefined-ish values to undefined', () => {
            const undefinedish = cast.cast('undefined');

            expect(undefinedish).toBeUndefined();
        });

        it('should cast positive number-ish values to numbers', () => {
            const positive = cast.cast('17.35');

            expect(positive).toBe(17.35);
        });

        it('should cast negative number-ish values to numbers', () => {
            const negative = cast.cast('-17.35');

            expect(negative).toBe(-17.35);
        });

        it('should cast NaN-ish values to NaN', () => {
            const nan = cast.cast('NaN');

            expect(typeof nan).toBe('number');
            expect(isNaN(nan)).toBe(true);
        });

        it('should convert values in an object', () => {
            const result = cast.cast({ foo: 'true' });

            expect(result).toEqual({ foo: true });
        });

        it('should convert values in nested objects', () => {
            const result = cast.cast({
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

        it('should convert values in an array', () => {
            const result = cast.cast(['true', '17.35']);

            expect(result).toEqual([true, 17.35]);
        });

        it('should convert values in a nested array', () => {
            const result = cast.cast(['true', ['17.35']]);

            expect(result).toEqual([true, [17.35]]);
        });
    });
});

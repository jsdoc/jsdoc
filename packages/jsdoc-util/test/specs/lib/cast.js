describe('@jsdoc/util/lib/cast', () => {
    const cast = require('../../../lib/cast');

    it('exists', () => {
        expect(cast).toBeFunction();
    });

    it('does not modify values that are not strings, objects, or arrays', () => {
        const result = cast(8);

        expect(result).toBe(8);
    });

    it('does not modify strings that are not boolean-ish or number-ish', () => {
        const result = cast('hello world');

        expect(result).toBe('hello world');
    });

    it('casts boolean-ish values to booleans', () => {
        const truthish = cast('true');
        const falsish = cast('false');

        expect(truthish).toBeTrue();
        expect(falsish).toBeFalse();
    });

    it('casts null-ish values to null', () => {
        const nullish = cast('null');

        expect(nullish).toBeNull();
    });

    it('casts undefined-ish values to undefined', () => {
        const undefinedish = cast('undefined');

        expect(undefinedish).toBeUndefined();
    });

    it('casts positive number-ish values to numbers', () => {
        const positive = cast('17.35');

        expect(positive).toBe(17.35);
    });

    it('casts negative number-ish values to numbers', () => {
        const negative = cast('-17.35');

        expect(negative).toBe(-17.35);
    });

    it('casts NaN-ish values to NaN', () => {
        const nan = cast('NaN');

        expect(nan).toBeNaN();
    });

    it('converts values in an object', () => {
        const result = cast({ foo: 'true' });

        expect(result).toEqual({ foo: true });
    });

    it('converts values in nested objects', () => {
        const result = cast({
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

    it('converts values in an array', () => {
        const result = cast(['true', '17.35']);

        expect(result).toEqual([true, 17.35]);
    });

    it('converts values in a nested array', () => {
        const result = cast(['true', ['17.35']]);

        expect(result).toEqual([true, [17.35]]);
    });
});

describe('@jsdoc/util/lib/cast', () => {
    const cast = require('../../../lib/cast');

    it('is a function', () => {
        expect(cast).toBeFunction();
    });

    it('does not modify values that are not strings, objects, or arrays', () => {
        expect(cast(8)).toBe(8);
    });

    it('does not modify strings that are neither boolean-ish nor number-ish', () => {
        expect(cast('hello world')).toBe('hello world');
    });

    it('casts "true" and "false" to booleans', () => {
        expect(cast('true')).toBeTrue();
        expect(cast('false')).toBeFalse();
    });

    it('casts "null" to null', () => {
        expect(cast('null')).toBeNull();
    });

    it('casts "undefined" to undefined', () => {
        expect(cast('undefined')).toBeUndefined();
    });

    it('casts positive number-ish strings to numbers', () => {
        expect(cast('17.35')).toBe(17.35);
    });

    it('casts negative number-ish strings to numbers', () => {
        expect(cast('-17.35')).toBe(-17.35);
    });

    it('casts "NaN" to NaN', () => {
        expect(cast('NaN')).toBeNaN();
    });

    it('casts values of object properties', () => {
        expect(cast({ foo: 'true' })).toEqual({ foo: true });
    });

    it('casts values of properties in nested objects', () => {
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

    it('casts values in an array', () => {
        expect(cast(['true', '17.35'])).toEqual([true, 17.35]);
    });

    it('casts values in a nested array', () => {
        expect(cast(['true', ['17.35']])).toEqual([true, [17.35]]);
    });
});

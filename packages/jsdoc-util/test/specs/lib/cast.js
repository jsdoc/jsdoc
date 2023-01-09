/*
  Copyright 2019 the JSDoc Authors.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
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
        bar: 'true',
      },
    });

    expect(result).toEqual({
      foo: {
        bar: true,
      },
    });
  });

  it('casts values in an array', () => {
    expect(cast(['true', '17.35'])).toEqual([true, 17.35]);
  });

  it('casts values in a nested array', () => {
    expect(cast(['true', ['17.35']])).toEqual([true, [17.35]]);
  });
});

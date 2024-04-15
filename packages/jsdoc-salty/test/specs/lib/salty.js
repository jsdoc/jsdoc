/*
  Copyright 2022 the JSDoc Authors.

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
describe('@jsdoc/salty/lib/salty', () => {
  const _ = require('lodash');
  const Salty = require('../../../lib/salty');

  let data;
  let db;

  beforeEach(() => {
    data = [
      { a: 2, b: undefined, c: true },
      { a: 47, b: null, c: true },
      { a: 100, b: 'hello', c: true },
      { a: 7, b: 'goodbye', c: false },
      { a: 42, b: 8, c: null },
      { a: 35, b: undefined, c: true },
      { a: 22, b: null, c: true },
      { a: 17, b: 0, c: false },
      { a: 66, c: true },
    ];
    db = new Salty(_.cloneDeep(data));
  });

  it('is a constructor that returns a function', () => {
    expect(new Salty()).toBeFunction();
  });

  it('has a `sort` method', () => {
    expect(new Salty().sort).toBeFunction();
  });

  describe('pre-query methods', () => {
    describe('sort', () => {
      it('sorts by a single key', () => {
        // TaffyDB sorts things strangely when null or undefined values are present. Salty doesn't
        // attempt to match that behavior, so we just verify that Salty does what it's supposed to.
        db.sort('b');

        expect(db().get()).toMatchArrayOfObjects([
          { a: 7, b: 'goodbye', c: false },
          { a: 100, b: 'hello', c: true },
          { a: 17, b: 0, c: false },
          { a: 42, b: 8, c: null },
          { a: 47, b: null, c: true },
          { a: 22, b: null, c: true },
          { a: 35, b: undefined, c: true },
          { a: 2, b: undefined, c: true },
          { a: 66, c: true },
        ]);
      });

      it('sorts by multiple keys', () => {
        db.sort('a, b');

        expect(db().get()).toMatchArrayOfObjects([
          { a: 2, b: undefined, c: true },
          { a: 7, b: 'goodbye', c: false },
          { a: 17, b: 0, c: false },
          { a: 22, b: null, c: true },
          { a: 35, b: undefined, c: true },
          { a: 42, b: 8, c: null },
          { a: 47, b: null, c: true },
          { a: 66, c: true },
          { a: 100, b: 'hello', c: true },
        ]);
      });

      it('has no effect when called with a nonexistent key', () => {
        db.sort('q');

        expect(db().get()).toMatchArrayOfObjects(data);
      });

      it('returns true', () => {
        expect(db.sort('a')).toBeTrue();
      });
    });
  });

  describe('queries', () => {
    it('returns an object with the expected methods after a query', () => {
      const query = db();

      expect(query.each).toBeFunction();
      expect(query.get).toBeFunction();
      expect(query.remove).toBeFunction();
    });

    describe('each', () => {
      it('calls the function on each item if there is no selection', () => {
        const result = [];

        db().each((item) => result.push(item.a));

        expect(result).toEqual([2, 47, 100, 7, 42, 35, 22, 17, 66]);
      });

      it('calls the function on selected items if there is a selection', () => {
        const result = [];

        db({ c: false }).each((item) => result.push(item.a));

        expect(result).toEqual([7, 17]);
      });

      it('does not call the function if the selection is empty', () => {
        const fn = jasmine.createSpy();

        db({ a: 1000000000 }).each(fn);

        expect(fn).not.toHaveBeenCalled();
      });

      it('returns an object with the expected methods', () => {
        const query = db().each(() => true);

        expect(query.each).toBeFunction();
        expect(query.get).toBeFunction();
        expect(query.remove).toBeFunction();
      });
    });

    describe('get', () => {
      it('returns all items if there is no selection', () => {
        expect(db().get()).toMatchArrayOfObjects(data);
      });

      it('returns the selected items when one matcher is provided', () => {
        const result = db({ c: false }).get();

        expect(result).toMatchArrayOfObjects([
          { a: 7, b: 'goodbye', c: false },
          { a: 17, b: 0, c: false },
        ]);
      });

      it('returns the selected items when multiple matchers are provided', () => {
        const result = db({ c: false }, { b: 0 }).get();

        expect(result).toMatchArrayOfObjects([{ a: 17, b: 0, c: false }]);
      });

      it('returns the selected items when the matcher contains an array of values', () => {
        const result = db({ a: [2, 47] }).get();

        expect(result).toMatchArrayOfObjects([
          { a: 2, b: undefined, c: true },
          { a: 47, b: null, c: true },
        ]);
      });

      it('returns no items if the selection is empty', () => {
        expect(db({ a: 1000000000 }).get()).toBeEmptyArray();
      });

      it('returns the correct items with a custom matcher function', () => {
        function matcher() {
          return this.a > 20; // eslint-disable-line
        }

        expect(db(matcher).get()).toMatchArrayOfObjects([
          { a: 47, b: null, c: true },
          { a: 100, b: 'hello', c: true },
          { a: 42, b: 8, c: null },
          { a: 35, b: undefined, c: true },
          { a: 22, b: null, c: true },
          { a: 66, c: true },
        ]);
      });

      describe('matcher objects', () => {
        it('returns the correct items for `isUndefined: true`', () => {
          const result = db({ b: { isUndefined: true } }).get();

          expect(result).toMatchArrayOfObjects([
            { a: 2, b: undefined, c: true },
            { a: 35, b: undefined, c: true },
            { a: 66, c: true },
          ]);
        });

        it('returns the correct items for `isUndefined: false`', () => {
          const result = db({ b: { isUndefined: false } }).get();

          expect(result).toMatchArrayOfObjects([
            { a: 47, b: null, c: true },
            { a: 100, b: 'hello', c: true },
            { a: 7, b: 'goodbye', c: false },
            { a: 42, b: 8, c: null },
            { a: 22, b: null, c: true },
            { a: 17, b: 0, c: false },
          ]);
        });

        it('returns the correct items for `left`', () => {
          const result = db({ b: { left: 'good' } }).get();

          expect(result).toMatchArrayOfObjects([{ a: 7, b: 'goodbye', c: false }]);
        });

        it('returns the correct items for `right`', () => {
          const result = db({ b: { right: 'bye' } }).get();

          expect(result).toMatchArrayOfObjects([{ a: 7, b: 'goodbye', c: false }]);
        });
      });
    });

    describe('remove', () => {
      it('deletes everything if there is no selection', () => {
        db().remove();

        expect(db().get()).toBeEmptyArray();
      });

      it('deletes the selected items if there is a selection', () => {
        db({ c: true }).remove();

        expect(db().get()).toMatchArrayOfObjects([
          { a: 7, b: 'goodbye', c: false },
          { a: 42, b: 8, c: null },
          { a: 17, b: 0, c: false },
        ]);
      });

      it('deletes nothing if the selection is empty', () => {
        db({ a: 846 }).remove();

        expect(db().get()).toMatchArrayOfObjects(data);
      });

      it('removes the selected items from the active selection', () => {
        const db2 = db({ a: 7 });

        db2.remove();

        expect(db2.get()).toBeEmptyArray();
      });

      it('returns the number of removed items', () => {
        expect(db({ c: true }).remove()).toBe(6);
      });
    });
  });
});

describe('@jsdoc/salty/lib/salty', () => {
  const _ = require('lodash');
  const Salty = require('../../../lib/salty');
  const { taffy } = require('taffydb');

  const data = [
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
  let saltyDB;
  let taffyDB;

  beforeEach(() => {
    saltyDB = new Salty(_.cloneDeep(data));
    taffyDB = taffy(_.cloneDeep(data));
  });

  // To confirm that TaffyDB and Salty have equivalent behavior, run the same test for both.
  function validate(f) {
    f(saltyDB);
    f(taffyDB);
  }

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
        saltyDB.sort('b');

        expect(saltyDB().get()).toMatchArrayOfObjects([
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
        validate((db) => {
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
      });

      it('has no effect when called with a nonexistent key', () => {
        validate((db) => {
          db.sort('q');

          expect(db().get()).toMatchArrayOfObjects(data);
        });
      });

      it('returns true', () => {
        validate((db) => {
          expect(db.sort('a')).toBeTrue();
        });
      });
    });
  });

  describe('queries', () => {
    it('returns an object with the expected methods after a query', () => {
      validate((db) => {
        const query = db();

        expect(query.each).toBeFunction();
        expect(query.get).toBeFunction();
        expect(query.remove).toBeFunction();
      });
    });

    describe('each', () => {
      it('calls the function on each item if there is no selection', () => {
        validate((db) => {
          const result = [];

          db().each((item) => result.push(item.a));

          expect(result).toEqual([2, 47, 100, 7, 42, 35, 22, 17, 66]);
        });
      });

      it('calls the function on selected items if there is a selection', () => {
        validate((db) => {
          const result = [];

          db({ c: false }).each((item) => result.push(item.a));

          expect(result).toEqual([7, 17]);
        });
      });

      it('does not call the function if the selection is empty', () => {
        validate((db) => {
          const fn = jasmine.createSpy();

          db({ a: 1000000000 }).each(fn);

          expect(fn).not.toHaveBeenCalled();
        });
      });

      it('returns an object with the expected methods', () => {
        validate((db) => {
          const query = db().each(() => true);

          expect(query.each).toBeFunction();
          expect(query.get).toBeFunction();
          expect(query.remove).toBeFunction();
        });
      });
    });

    describe('get', () => {
      it('returns all items if there is no selection', () => {
        validate((db) => {
          expect(db().get()).toMatchArrayOfObjects(data);
        });
      });

      it('returns the selected items when one matcher is provided', () => {
        validate((db) => {
          const result = db({ c: false }).get();

          expect(result).toMatchArrayOfObjects([
            { a: 7, b: 'goodbye', c: false },
            { a: 17, b: 0, c: false },
          ]);
        });
      });

      it('returns the selected items when multiple matchers are provided', () => {
        validate((db) => {
          const result = db({ c: false }, { b: 0 }).get();

          expect(result).toMatchArrayOfObjects([{ a: 17, b: 0, c: false }]);
        });
      });

      it('returns the selected items when the matcher contains an array of values', () => {
        validate((db) => {
          const result = db({ a: [2, 47] }).get();

          expect(result).toMatchArrayOfObjects([
            { a: 2, b: undefined, c: true },
            { a: 47, b: null, c: true },
          ]);
        });
      });

      it('returns the correct items with the special matcher for undefined values', () => {
        validate((db) => {
          const result = db({ b: { isUndefined: true } }).get();

          expect(result).toMatchArrayOfObjects([
            { a: 2, b: undefined, c: true },
            { a: 35, b: undefined, c: true },
            { a: 66, c: true },
          ]);
        });
      });

      it('returns no items if the selection is empty', () => {
        validate((db) => {
          expect(db({ a: 1000000000 }).get()).toBeEmptyArray();
        });
      });

      it('returns the correct items with a custom matcher function', () => {
        validate((db) => {
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
      });
    });

    describe('remove', () => {
      it('deletes everything if there is no selection', () => {
        validate((db) => {
          db().remove();

          expect(db().get()).toBeEmptyArray();
        });
      });

      it('deletes the selected items if there is a selection', () => {
        validate((db) => {
          db({ c: true }).remove();

          expect(db().get()).toMatchArrayOfObjects([
            { a: 7, b: 'goodbye', c: false },
            { a: 42, b: 8, c: null },
            { a: 17, b: 0, c: false },
          ]);
        });
      });

      it('deletes nothing if the selection is empty', () => {
        validate((db) => {
          db({ a: 846 }).remove();

          expect(db().get()).toMatchArrayOfObjects(data);
        });
      });

      it('removes the selected items from the active selection', () => {
        validate((db) => {
          const db2 = db({ a: 7 });

          db2.remove();

          expect(db2.get()).toBeEmptyArray();
        });
      });

      it('returns the number of removed items', () => {
        validate((db) => {
          expect(db({ c: true }).remove()).toBe(6);
        });
      });
    });
  });
});

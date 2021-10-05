const Dependencies = require('../../../lib/dependencies');

describe('@jsdoc/core/lib/dependencies', () => {
  let container;

  beforeEach(() => {
    container = new Dependencies();
  });

  it('is a constructor', () => {
    expect(Dependencies).toBeFunction();
  });

  describe('get', () => {
    it('throws an error if the name is missing', () => {
      expect(() => container.get()).toThrowError();
    });

    it('throws an error if the name is unrecognized', () => {
      expect(() => container.get('foo')).toThrowError();
    });

    it('returns an instance of classes', () => {
      class Foo {}

      let instance;

      container.registerClass('Foo', Foo);
      instance = container.get('Foo');

      expect(instance).toBeInstanceOf(Foo);
    });

    it('passes dependencies to instance constructors', () => {
      class Foo {
        constructor(bar) {
          this.bar = bar;
        }
      }

      class Bar {}

      let instance;

      container.registerClass('Foo', Foo, 'Bar');
      container.registerClass('Bar', Bar);
      instance = container.get('Foo');

      expect(instance.bar).toBeInstanceOf(Bar);
    });

    it('returns the same instance every time', () => {
      class Foo {}

      let instance1;
      let instance2;

      container.registerClass('Foo', Foo);
      instance1 = container.get('Foo');
      instance2 = container.get('Foo');

      expect(instance2).toBe(instance1);
    });

    it('returns static values', () => {
      const value = new Set();

      container.registerValue('foo', value);

      expect(container.get('foo')).toBe(value);
    });
  });

  describe('registerClass', () => {
    // The tests for `get()` also test the behavior of this method more extensively.
    it('accepts a name and constructor', () => {
      class Foo {}

      expect(() => container.registerClass('Foo', Foo)).not.toThrow();
    });
  });

  describe('registerValue', () => {
    // The tests for `get()` also test the behavior of this method more extensively.
    it('accepts a name and value', () => {
      expect(() => container.registerValue('name', new Set())).not.toThrow();
    });
  });
});

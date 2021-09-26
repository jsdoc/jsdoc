const dependencies = require('../../../lib/dependencies');

describe('@jsdoc/core/lib/dependencies', () => {
  let container;

  beforeEach(() => {
    container = new dependencies.Dependencies();
  });

  it('is an object', () => {
    expect(dependencies).toBeObject();
  });

  describe('Dependencies', () => {
    it('is the constructor of the dependencies object', () => {
      expect(dependencies.Dependencies).toBe(dependencies.constructor);
    });
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

      container.registerClass(Foo);
      instance = container.get('foo');

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

      container.registerClass(Foo);
      container.registerClass(Bar);
      instance = container.get('foo');

      expect(instance.bar).toBeInstanceOf(Bar);
    });

    it('returns the same instance every time for singletons', () => {
      class Foo {}

      let instance1;
      let instance2;

      container.registerClass(Foo, { singleton: true });
      instance1 = container.get('foo');
      instance2 = container.get('foo');

      expect(instance2).toBe(instance1);
    });

    it('returns static values', () => {
      const value = new Set();

      container.registerValue('foo', value);

      expect(container.get('foo')).toBe(value);
    });
  });

  describe('registerClass', () => {
    // The tests for `get()` also test the behavior of these methods more extensively.
    it('accepts a constructor', () => {
      class Foo {}

      expect(() => container.registerClass(Foo)).not.toThrow();
    });

    it('accepts a `singleton` option', () => {
      class Foo {}

      expect(() => container.registerClass(Foo, { singleton: true })).not.toThrow();
    });
  });

  describe('registerValue', () => {
    it('accepts a name and value', () => {
      expect(() => container.registerValue('name', new Set())).not.toThrow();
    });
  });
});

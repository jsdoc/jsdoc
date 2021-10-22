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

    it('returns a new instance every time, for normal classes', () => {
      class Foo {}

      let instance1;
      let instance2;

      container.registerClass('Foo', Foo);
      instance1 = container.get('Foo');
      instance2 = container.get('Foo');

      expect(instance2).not.toBe(instance1);
    });

    it('returns a new result every time, for factories', () => {
      const factory = () => new Set();
      let set1;
      let set2;

      container.registerFactory('setFactory', factory);
      set1 = container.get('setFactory');
      set2 = container.get('setFactory');

      expect(set2).not.toBe(set1);
    });

    it('returns the same instance every time, for singletons', () => {
      class Foo {}

      let instance1;
      let instance2;

      container.registerSingleton('Foo', Foo);
      instance1 = container.get('Foo');
      instance2 = container.get('Foo');

      expect(instance2).toBe(instance1);
    });

    it('returns the same instance every time, for singleton factories', () => {
      class Foo {}

      const factory = () => new Foo();
      let instance1;
      let instance2;

      container.registerSingletonFactory('Foo', factory);
      instance1 = container.get('Foo');
      instance2 = container.get('Foo');

      expect(instance2).toBe(instance1);
    });

    it('returns values', () => {
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

  describe('registerFactory', () => {
    // The tests for `get()` also test the behavior of this method more extensively.
    it('accepts a name and function', () => {
      expect(() => container.registerFactory('foo', () => null)).not.toThrow();
    });
  });

  describe('registerSingleton', () => {
    // The tests for `get()` also test the behavior of this method more extensively.
    it('accepts a name and constructor', () => {
      class Foo {}

      expect(() => container.registerSingleton('Foo', Foo)).not.toThrow();
    });
  });

  describe('registerSingletonFactory', () => {
    // The tests for `get()` also test the behavior of this method more extensively.
    it('accepts a name and function', () => {
      expect(() => container.registerSingletonFactory('foo', () => null)).not.toThrow();
    });
  });

  describe('registerValue', () => {
    // The tests for `get()` also test the behavior of this method more extensively.
    it('accepts a name and value', () => {
      expect(() => container.registerValue('name', new Set())).not.toThrow();
    });
  });

  describe('reset', () => {
    it('accepts a string', () => {
      class Foo {}

      container.registerClass('Foo', Foo);

      expect(() => container.reset('Foo')).not.toThrow();
    });

    it('accepts an array of strings', () => {
      class Foo {}
      class Bar {}

      container.registerClass('Foo', Foo);
      container.registerClass('Bar', Bar);

      expect(() => container.reset(['Foo', 'Bar'])).not.toThrow();
    });

    it('throws on non-array, non-string input', () => {
      expect(() => container.reset()).toThrowError();
    });

    it('removes cached singletons', () => {
      class Foo {}

      let instance1;
      let instance2;

      container.registerSingleton('Foo', Foo);
      instance1 = container.get('Foo');
      container.reset(['Foo']);
      instance2 = container.get('Foo');

      expect(instance2).not.toBe(instance1);
    });
  });
});

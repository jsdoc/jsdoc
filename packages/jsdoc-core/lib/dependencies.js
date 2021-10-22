const Bottle = require('bottlejs');

/**
 * Container for JSDoc classes, objects, and values that can be injected into other modules.
 *
 * @alias module:@jsdoc/core.deps
 */
class Dependencies {
  constructor() {
    // This class provides a lightweight facade for the `bottlejs` package.
    this._bottle = new Bottle();
    this._container = this._bottle.container;
  }

  get(name) {
    const dep = this._container[name];

    if (dep === undefined) {
      throw new Error(`No dependency registered for the name "${name}"`);
    }

    return dep;
  }

  registerClass(name, constructor, ...deps) {
    this._bottle.service(name, constructor, ...deps);
    // Remove the cached provider.
    this._bottle.middleware(name, (_, next) => {
      this._bottle.resetProviders([name]);
      next();
    });
  }

  registerFactory(name, factory, ...deps) {
    const realFactory = () => {
      const args = deps.map((dep) => this.get(dep));

      return factory(...args);
    };

    this._bottle.serviceFactory(name, realFactory, ...deps);
    // Remove the cached provider.
    this._bottle.middleware(name, (_, next) => {
      this._bottle.resetProviders([name]);
      next();
    });
  }

  registerSingleton(name, constructor, ...deps) {
    this._bottle.service(name, constructor, ...deps);
  }

  registerSingletonFactory(name, factory, ...deps) {
    const realFactory = () => {
      const args = deps.map((dep) => this.get(dep));

      return factory(...args);
    };

    this._bottle.factory(name, realFactory);
  }

  registerValue(name, value) {
    this._bottle.value(name, value);
  }

  reset(names) {
    if (!Array.isArray(names)) {
      throw new Error('Must provide an array of provider names');
    }

    this._bottle.resetProviders(names);
  }
}

module.exports = Dependencies;

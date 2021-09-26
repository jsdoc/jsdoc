const yaioc = require('yaioc');

let dependencies;

/**
 * Container for JSDoc classes, objects, and values that can be injected into other modules.
 *
 * @alias module:@jsdoc/core.deps
 */
class Dependencies {
  constructor() {
    // This class provides a lightweight facade for the `yaioc` package.
    this._container = yaioc.container();
  }

  get(name) {
    const dep = this._container.get(name);

    if (dep === undefined) {
      throw new Error(`No dependency registered for the name "${name}"`);
    }

    return dep;
  }

  registerClass(klass, opts = {}) {
    if (opts.singleton) {
      this._container.cache().register(klass);
    } else {
      this._container.register(klass);
    }
  }

  registerValue(name, value) {
    this._container.register(name, value);
  }
}

dependencies = new Dependencies();
dependencies.Dependencies = Dependencies;

module.exports = dependencies;

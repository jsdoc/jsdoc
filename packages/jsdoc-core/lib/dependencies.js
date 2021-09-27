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
  }

  registerValue(name, value) {
    this._bottle.constant(name, value);
  }
}

module.exports = Dependencies;

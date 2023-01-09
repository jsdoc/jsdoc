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
const _ = require('lodash');
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
    this._bottle.middleware(name, (provider, next) => {
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
    this._bottle.middleware(name, (provider, next) => {
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
    if (_.isString(names)) {
      names = [names];
    } else if (!Array.isArray(names)) {
      throw new Error('Must provide an array of provider names');
    }

    this._bottle.resetProviders(names);
  }
}

module.exports = Dependencies;

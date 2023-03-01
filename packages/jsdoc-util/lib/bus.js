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
import EventEmitter from 'node:events';

import _ from 'lodash';
import ow from 'ow';

let cache = {};

/**
 * An event bus that works the same way as a standard Node.js event emitter, with a few key
 * differences:
 *
 * + When you create an event bus, you must specify its name. Consider using your package's name.
 * + Event buses are cached and shared by default. If module A and module B both create an event bus
 * called `foo`, both modules get the same event bus. This behavior makes it easier to share one
 * event bus among all of the modules in your package.
 *
 *     To prevent a new event bus from being cached and shared, set the `opts.cache` property to
 *     `false` when you create the event bus. Setting this property to `false` also forces a new
 *     event bus to be created, even if there's a cached event bus with the same name.
 *
 * @alias module:@jsdoc/util.EventBus
 * @extends module:events.EventEmitter
 */
export default class EventBus extends EventEmitter {
  /**
   * Create a new event bus, or retrieve the cached event bus for the ID you specify.
   *
   * @param {(string|Symbol)} id - The ID for the event bus.
   * @param {Object} opts - Options for the event bus.
   * @param {boolean} [opts.cache=true] - Set to `false` to prevent the event bus from being
   * cached, and to return a new event bus even if there is already an event bus with the same ID.
   */
  constructor(id, opts = {}) {
    super();

    ow(id, ow.any(ow.string, ow.symbol));

    const shouldCache = _.isBoolean(opts.cache) ? opts.cache : true;

    if (Object.hasOwn(cache, id) && shouldCache) {
      return cache[id];
    }

    this._id = id;

    if (shouldCache) {
      cache[id] = this;
    }
  }
}

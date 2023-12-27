/*
  Copyright 2023 the JSDoc Authors.

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

/**
 * The API for programmatically generating documentation with JSDoc.
 */
export default class Api {
  /**
   * Creates an instance of the API.
   *
   * @param {?Object} opts - Options for the API instance.
   * @param {?node:events.EventEmitter} opts.eventEmitter - The event emitter to use as a message
   * bus for JSDoc.
   */
  constructor(opts) {
    this.emitter = opts?.emitter ?? new EventEmitter();
  }
}

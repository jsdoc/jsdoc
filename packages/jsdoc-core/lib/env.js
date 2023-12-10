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

import { getLogFunctions } from '@jsdoc/util';

/**
 * Data about the environment in which JSDoc is running, including the configuration settings that
 * were used to run JSDoc.
 *
 * @alias @jsdoc/core.Env
 */
export default class Env {
  constructor() {
    /**
     * The command-line arguments passed to JSDoc.
     *
     * @type {Array<*>}
     */
    this.args = process.argv.slice(2);

    /**
     * The data parsed from JSDoc's configuration file.
     *
     * @type Object<string, *>
     */
    this.conf = {};

    /**
     * The event emitter shared across JSDoc.
     *
     * @type {Object}
     */
    this.emitter = new EventEmitter();

    /**
     * Logging functions shared across JSDoc.
     *
     * @type {Object<string, function>}
     */
    this.log = getLogFunctions(this.emitter);

    /**
     * The command-line arguments, parsed into a key/value hash.
     *
     * @type {Object}
     * @example if (global.env.opts.help) { console.log('Helpful message.'); }
     */
    this.opts = {};

    /**
     * The times at which JSDoc started and finished.
     *
     * @type {Object}
     * @property {Date} start - The time at which JSDoc started running.
     * @property {Date} finish - The time at which JSDoc finished running.
     */
    this.run = {
      start: new Date(),
      finish: null,
    };

    /**
     * The source files that JSDoc will parse.
     *
     * @type {Array<string>}
     */
    this.sourceFiles = [];

    /**
     * The dictionary of tags recognized by JSDoc.
     *
     * @type {module:@jsdoc/tags.Dictionary}
     */
    this.tags = null;

    /**
     * The JSDoc version number and revision date.
     *
     * @type {Object<string, string>}
     * @property {string} number - The JSDoc version number.
     * @property {string} revision - The JSDoc revision number, expressed as a UTC date string.
     */
    this.version = {
      number: null,
      revision: null,
    };
  }

  get config() {
    return this.conf;
  }

  get env() {
    return this;
  }

  get(key) {
    return this[key];
  }

  get options() {
    return this.opts;
  }
}

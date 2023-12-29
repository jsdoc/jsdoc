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
import path from 'node:path';

import { Env } from '@jsdoc/core';
import glob from 'fast-glob';

/**
 * The API for programmatically generating documentation with JSDoc.
 *
 * @alias module:@jsdoc/core.Api
 */
export default class Api {
  /**
   * Creates an instance of the API.
   *
   * @param {?Object} opts - Options for the API instance.
   * @param {?module:@jsdoc/core.Env} opts.env - The JSDoc environment and configuration settings to
   * use.
   * @param {?node:events.EventEmitter} opts.eventEmitter - The event emitter to use as a message
   * bus for JSDoc.
   */
  constructor(opts) {
    /**
     * An event emitter that acts as a message bus for all JSDoc modules.
     */
    this.emitter = opts?.emitter ?? new EventEmitter();
    /**
     * The JSDoc environment, including configuration settings, for this API instance.
     */
    this.env = opts?.env ?? new Env();
  }

  #buildSourceFileList() {
    const { config, options } = this.env;
    let sourceFiles = options._?.slice() ?? [];

    if (config.sourceFiles) {
      sourceFiles = sourceFiles.concat(config.sourceFiles);
    }

    return sourceFiles;
  }

  /**
   * Finds the absolute paths to source files that JSDoc should parse, based on an array of glob
   * patterns, and adds the list of paths to the JSDoc environment.
   *
   * This method also resolves the paths in `this.env.options.package` and `this.env.options.readme`
   * if they are present.
   *
   * There are a few ways to specify the array of glob patterns:
   *
   * + **Pass the array to this method.** Values in `this.env.options` are ignored.
   * + **Assign the array to `this.env.options._` or `this.env.config.sourceFiles`,** then call this
   *   method.
   *
   * @instance
   * @memberof module:@jsdoc/core.Api
   * @param {Array<string>} globPatterns - Glob patterns that match the source files to parse. You
   * can use any glob syntax allowed by the
   * [`fast-glob` package](https://www.npmjs.com/package/fast-glob).
   * @returns {Array<string>} The absolute paths to the source files.
   */
  async findSourceFiles(globPatterns) {
    const { options } = this.env;

    options._ = globPatterns?.slice() ?? this.#buildSourceFileList();
    if (options._.length) {
      this.env.sourceFiles = await glob(options._, {
        absolute: true,
        onlyFiles: true,
      });
    }

    if (options.package) {
      options.package = path.resolve(options.package);
    }
    if (options.readme) {
      options.readme = path.resolve(options.readme);
    }

    return this.env.sourceFiles?.slice() ?? [];
  }
}

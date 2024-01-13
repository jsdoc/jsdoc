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
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { augment, Package, resolveBorrows } from '@jsdoc/doclet';
import { createParser, handlers } from '@jsdoc/parse';
import glob from 'fast-glob';
import stripJsonComments from 'strip-json-comments';

import Env from './env.js';
import { installPlugins } from './plugins.js';

const DEFAULT_TEMPLATE = '@jsdoc/template-legacy';

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
     *
     * @type {node:events.EventEmitter}
     */
    this.emitter = opts?.emitter ?? new EventEmitter();
    /**
     * The JSDoc environment, including configuration settings, for this API instance.
     *
     * @type {module:@jsdoc/core.Env}
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

  async #createParser() {
    const parser = createParser(this.env);

    if (this.env.config.plugins) {
      await installPlugins(this.env.config.plugins, parser, this.env);
    }

    handlers.attachTo(parser);

    return parser;
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

  /**
   * Generates documentation with the template specified in the JSDoc environment, or with
   * `@jsdoc/template-legacy` if no template is specified.
   *
   * The template must export a `publish` function that generates output when called and returns a
   * `Promise`.
   *
   * @param {module:@jsdoc/doclet.DocletStore} docletStore - The doclet store obtained by parsing
   * the source files.
   * @returns {Promise<*>} A promise that is fulfilled after the template runs.
   */
  async generateDocs(docletStore) {
    let message;
    const { log, options } = this.env;
    let template;

    options.template ??= DEFAULT_TEMPLATE;

    try {
      template = await import(options.template);
    } catch (e) {
      if (options.template === DEFAULT_TEMPLATE) {
        message =
          `Unable to load the default template, \`${DEFAULT_TEMPLATE}\`. You can install ` +
          'the default template, or you can install a different template and configure JSDoc to ' +
          'use that template.';
      } else {
        message = `Unable to load the template \`${options.template}\`: ${e.message ?? e}`;
      }

      log.fatal(message);

      return Promise.reject(new Error(message));
    }

    // Templates must export a `publish` function.
    if (template.publish && typeof template.publish === 'function') {
      log.info('Generating output files...');

      return template.publish(docletStore, this.env);
    } else {
      message = `\`${options.template}\` does not export a \`publish\` function.`;
      log.fatal(message);

      return Promise.reject(new Error(message));
    }
  }

  // TODO: docs; mention that filepaths overrides env.sourceFiles
  async parseSourceFiles(filepaths) {
    const { log, options } = this.env;
    const parser = await this.#createParser();
    let packageData = '';
    let packageDocs;
    let docletStore;

    docletStore = parser.parse(filepaths ?? this.env.sourceFiles, options.encoding);

    if (options.package) {
      packageData = await this.#readPackageJson(options.package);
    }
    packageDocs = new Package(packageData, this.env);
    packageDocs.files = this.env.sourceFiles || [];
    docletStore.add(packageDocs);

    log.debug('Adding inherited symbols, mixins, and interface implementations...');
    augment.augmentAll(docletStore);
    log.debug('Adding borrowed doclets...');
    resolveBorrows(docletStore);
    log.debug('Post-processing complete.');
    if (parser.listenerCount('processingComplete')) {
      parser.fireProcessingComplete(Array.from(docletStore.doclets));
    }

    return docletStore;
  }

  async #readPackageJson(filepath) {
    let data;

    try {
      data = await readFile(filepath, 'utf8');

      return stripJsonComments(data);
    } catch (e) {
      this.env.log.error(`Unable to read the package file ${filepath}`);

      return null;
    }
  }
}

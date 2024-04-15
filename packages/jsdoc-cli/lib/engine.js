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

import { Api, config as jsdocConfig } from '@jsdoc/core';
import { getLogFunctions } from '@jsdoc/util';
import _ from 'lodash';
import ow from 'ow';

import { flags, parseFlags } from './flags.js';
import help from './help.js';
import { LEVELS, Logger } from './logger.js';

const FATAL_ERROR_MESSAGE =
  'Exiting JSDoc because an error occurred. See the previous log messages for details.';

/**
 * CLI engine for JSDoc.
 *
 * @alias module:@jsdoc/cli
 */
export default class Engine {
  /**
   * The log levels that JSDoc's logger accepts. The key is an identifier, like `ERROR` or `WARN`.
   * The value is an integer, with higher numbers denoting more important messages.
   *
   * @type {Object<string, number>}
   */
  static LOG_LEVELS = LEVELS;
  #logger;

  /**
   * Create an instance of the CLI engine.
   *
   * @param {Object} opts - Options for the CLI engine.
   * @param {number} [opts.logLevel] - The maximum logging level to print to the console. Must be
   * an enumerated value of `module:@jsdoc/cli.LOG_LEVELS`. The default value is
   * `module:@jsdoc/cli.LOG_LEVELS.WARN`.
   * @param {string} [opts.version] - The version of JSDoc that is running.
   * @param {Date} [opts.revision] - A timestamp for the version of JSDoc that is running.
   */
  constructor(opts = {}) {
    ow(opts, ow.object);
    ow(opts.emitter, ow.optional.object);
    // The `Logger` class validates `opts.level`, so no need to validate it here.
    ow(opts.revision, ow.optional.date);
    ow(opts.version, ow.any(ow.optional.string, ow.optional.object));

    this.api = opts.api ?? new Api({ emitter: opts.emitter });
    this.emitter = this.api.emitter;
    this.env = this.api.env;
    this.flags = [];
    this.log = opts.log ?? getLogFunctions(this.emitter);
    this.#logger = new Logger({
      emitter: this.emitter,
      level: opts.logLevel,
    });
    // TODO: Make these private when `cli.js` no longer needs them.
    this.shouldExitWithError = false;
    this.shouldPrintHelp = false;
    // Support the format used by `Env`.
    // TODO: Make the formats consistent.
    if (_.isObject(opts.version)) {
      this.env.version = opts.version;
      this.version = opts.version.number;
      this.revision = new Date(opts.version.revision);
      this.env.version.revision = opts.version.revision;
    } else {
      this.env.version = {};
      this.version = this.env.version.number = opts.version;
      this.revision = opts.revision;
      this.env.version.revision = opts.revision?.toUTCString();
    }
  }

  configureLogger() {
    const fatalError = () => {
      this.exit(1);
    };
    const { LOG_LEVELS } = Engine;
    const { options } = this.env;
    const recoverableError = () => {
      this.shouldExitWithError = true;
    };

    if (options.test) {
      this.logLevel = LOG_LEVELS.SILENT;
    } else {
      if (options.debug) {
        this.logLevel = LOG_LEVELS.DEBUG;
      } else if (options.verbose) {
        this.logLevel = LOG_LEVELS.INFO;
      }

      if (options.pedantic) {
        this.emitter.once('logger:warn', recoverableError);
        this.emitter.once('logger:error', fatalError);
      } else {
        this.emitter.once('logger:error', recoverableError);
      }

      this.emitter.once('logger:fatal', fatalError);
    }
  }

  dumpParseResults(docletStore) {
    let doclets;
    const { options } = this.env;

    if (options.debug || options.verbose) {
      doclets = docletStore.allDoclets;
    } else {
      doclets = docletStore.doclets;
    }

    console.log(JSON.stringify(Array.from(doclets), null, 2));
  }

  exit(exitCode, message) {
    ow(exitCode, ow.number);
    ow(message, ow.optional.string);

    if (exitCode > 0) {
      this.shouldExitWithError = true;

      process.on('exit', () => {
        if (message) {
          console.error(message);
        }
      });
    }

    process.on('exit', () => {
      if (this.shouldPrintHelp) {
        this.printHelp();
      }
      // eslint-disable-next-line no-process-exit
      process.exit(exitCode);
    });
  }

  async generate() {
    let docletStore;
    const { api, env } = this;

    await api.findSourceFiles();
    if (env.sourceFiles.length === 0) {
      console.log('There are no input files to process.');
    } else {
      docletStore = await api.parseSourceFiles();

      if (env.options.explain) {
        this.dumpParseResults(docletStore);
      } else {
        await api.generateDocs(docletStore);
      }
    }

    env.run.finish = new Date();

    return 0;
  }

  /**
   * Get help text for JSDoc.
   *
   * You can specify the maximum line length for the help text. This method attempts to fit each
   * line within the maximum length, but it only splits on word boundaries. If you specify a small
   * length, such as `10`, some lines will exceed that length.
   *
   * @param {Object} [opts] - Options for formatting the help text.
   * @param {number} [opts.maxLength=Infinity] - The desired maximum length of each line in the
   * formatted text.
   * @return {string} The formatted help text.
   */
  help(opts = {}) {
    ow(opts, ow.object);
    ow(opts.maxLength, ow.optional.number);

    const maxLength = opts.maxLength ?? Infinity;

    return `Options:\n${help({ maxLength })}\n\nVisit https://jsdoc.app/ for more information.`;
  }

  // TODO: Add a typedef for this.
  /**
   * Details about the command-line flags that JSDoc recognizes.
   */
  get knownFlags() {
    return flags;
  }

  // TODO: Add details about the directory and filenames that this method looks for.
  /**
   * Parses command-line flags; loads the JSDoc configuration file; and adds configuration details
   * to the JSDoc environment.
   *
   * For details about supported command-line flags, see the value of the
   * {@link module:@jsdoc/cli#knownFlags} property.
   *
   * @returns {Promise<undefined>} A promise that is fulfilled after the configuration is loaded.
   */
  loadConfig() {
    const { env } = this;

    try {
      env.opts = _.defaults({}, this.parseFlags(env.args), env.opts);
    } catch (e) {
      this.shouldPrintHelp = true;
      this.exit(1, `${e.message}\n`);

      return Promise.reject(e);
    }

    // TODO: Await the promise and use try-catch.
    return jsdocConfig.load(env.opts.configure).then(
      (conf) => {
        env.conf = conf.config;
        // Look for options on the command line, then in the config.
        env.opts = _.defaults(env.opts, env.conf.opts);
      },
      (e) => {
        this.exit(1, `Cannot parse the config file: ${e}\n${FATAL_ERROR_MESSAGE}`);
      }
    );
  }

  /**
   * The log level to use. Messages are logged only if they are at or above this level.
   * Must be an enumerated value of {@link module:@jsdoc/cli.LOG_LEVELS}.
   *
   * The default value is `module:@jsdoc/cli.LOG_LEVELS.WARN`.
   */
  get logLevel() {
    return this.#logger.level;
  }

  set logLevel(level) {
    this.#logger.level = level;
  }

  /**
   * Parse an array of command-line flags (also known as "options").
   *
   * Use the instance's `flags` property to retrieve the parsed flags later.
   *
   * @param {Array<string>} cliFlags - The command-line flags to parse.
   * @returns {Object<string, *>} The long name and value for each flag. The `_` property contains
   * all arguments other than flags and flag values.
   */
  parseFlags(cliFlags) {
    this.flags = parseFlags(cliFlags);

    return this.flags;
  }

  printHelp() {
    this.printVersion();
    console.log(this.help({ maxLength: process.stdout.columns }));

    return Promise.resolve(0);
  }

  printVersion() {
    console.log(this.versionDetails);

    return Promise.resolve(0);
  }

  /**
   * A string that describes the current JSDoc version.
   */
  get versionDetails() {
    let revision = '';

    if (!this.version) {
      return '';
    }

    if (this.revision) {
      revision = `(${this.revision.toUTCString()})`;
    }

    return `JSDoc ${this.version} ${revision}`.trim();
  }
}

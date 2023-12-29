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

/* eslint-disable no-process-exit */
import { Api } from '@jsdoc/core';
import { getLogFunctions } from '@jsdoc/util';
import _ from 'lodash';
import ow from 'ow';
import yargs from 'yargs-parser';

import flags from './flags.js';
import help from './help.js';
import { LEVELS, Logger } from './logger.js';

function validateChoice(flagInfo, choices, values) {
  let flagNames = flagInfo.alias ? `-${flagInfo.alias}/` : '';

  flagNames += `--${flagInfo.name}`;

  for (let value of values) {
    if (!choices.includes(value)) {
      throw new TypeError(`The flag ${flagNames} accepts only these values: ${choices.join(', ')}`);
    }
  }
}

/**
 * `KNOWN_FLAGS` is a set of all known flag names, including the long and short forms.
 *
 * `YARGS_FLAGS` is details about the known command-line flags, but in a form that `yargs-parser`
 * understands. (That form is relatively hard to read, so we build this object from the more
 * readable `flags` object.)
 *
 * @private
 */
const { KNOWN_FLAGS, YARGS_FLAGS } = (() => {
  const names = new Set();
  const opts = {
    alias: {},
    array: [],
    boolean: [],
    coerce: {},
    narg: {},
    normalize: [],
  };

  // `_` contains unparsed arguments.
  names.add('_');

  Object.keys(flags).forEach((flag) => {
    const value = flags[flag];

    names.add(flag);

    if (value.alias) {
      names.add(value.alias);
      opts.alias[flag] = [value.alias];
    }

    if (value.array) {
      opts.array.push(flag);
    }

    if (value.boolean) {
      opts.boolean.push(flag);
    }

    if (value.coerce) {
      opts.coerce[flag] = value.coerce;
    }

    if (value.normalize) {
      opts.normalize.push(flag);
    }

    if (value.requiresArg) {
      opts.narg[flag] = 1;
    }
  });

  return {
    KNOWN_FLAGS: names,
    YARGS_FLAGS: opts,
  };
})();

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
      this.version = opts.version.number;
      this.revision = new Date(opts.version.revision);
    } else {
      this.version = opts.version;
      this.revision = opts.revision;
    }
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
      process.exit(exitCode);
    });
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

  /**
   * Details about the command-line flags that JSDoc recognizes.
   */
  get knownFlags() {
    return flags;
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
   * @returns {Object} The name and value for each flag. The `_` property contains all arguments
   * other than flags and flag values.
   */
  parseFlags(cliFlags) {
    ow(cliFlags, ow.array);

    let normalizedFlags;
    let parsed;
    let parsedFlags;
    let parsedFlagNames;

    normalizedFlags = Object.keys(flags);
    parsed = yargs.detailed(cliFlags, YARGS_FLAGS);
    if (parsed.error) {
      throw parsed.error;
    }
    parsedFlags = parsed.argv;
    parsedFlagNames = new Set(Object.keys(parsedFlags));

    // Check all parsed flags for unknown flag names.
    for (let flag of parsedFlagNames) {
      if (!KNOWN_FLAGS.has(flag)) {
        throw new TypeError(
          'Unknown command-line option: ' + (flag.length === 1 ? `-${flag}` : `--${flag}`)
        );
      }
    }

    // Validate the values of known flags.
    for (let flag of normalizedFlags) {
      if (parsedFlags[flag] && flags[flag].choices) {
        let flagInfo = {
          name: flag,
          alias: flags[flag].alias,
        };

        validateChoice(flagInfo, flags[flag].choices, parsedFlags[flag]);
      }
    }

    // Only keep the long name of each flag.
    this.flags = _.pick(parsedFlags, normalizedFlags.concat(['_']));

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

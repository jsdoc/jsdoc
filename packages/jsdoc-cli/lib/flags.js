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
import querystring from 'node:querystring';

import { cast } from '@jsdoc/util';
import _ from 'lodash';
import ow from 'ow';
import yargs from 'yargs-parser';

// TODO: Document the format of this object, then update the docs for `Engine`.
/**
 * Command-line flags recognized by JSDoc.
 *
 * @alias module:@jsdoc/cli/lib/flags
 */
export const flags = {
  access: {
    alias: 'a',
    array: true,
    choices: ['all', 'package', 'private', 'protected', 'public', 'undefined'],
    defaultDescription: 'All except `private`',
    description: 'Document only symbols with the specified access level.',
    requiresArg: true,
  },
  configure: {
    alias: 'c',
    description: 'The configuration file to use.',
    normalize: true,
    requiresArg: true,
  },
  debug: {
    boolean: true,
    description: 'Log information to help with debugging.',
  },
  destination: {
    alias: 'd',
    default: './out',
    description: 'The output directory.',
    normalize: true,
    requiresArg: true,
  },
  encoding: {
    alias: 'e',
    default: 'utf8',
    description: 'The encoding to assume when reading source files.',
    requiresArg: true,
  },
  explain: {
    alias: 'X',
    boolean: true,
    description: 'Print the parse results to the console and exit.',
  },
  help: {
    alias: 'h',
    boolean: true,
    description: 'Print help information and exit.',
  },
  match: {
    description: 'Run only tests whose names contain this value.',
    requiresArg: true,
  },
  package: {
    alias: 'P',
    description: 'The path to the `package.json` file to use.',
    normalize: true,
    requiresArg: true,
  },
  pedantic: {
    boolean: true,
    description: 'Treat errors as fatal errors, and treat warnings as errors.',
  },
  private: {
    alias: 'p',
    boolean: true,
    description: 'Document private symbols (equivalent to `--access all`).',
  },
  query: {
    alias: 'q',
    coerce: (str) => cast(querystring.parse(str)),
    description: 'A query string to parse and store (for example, `foo=bar&baz=true`).',
    requiresArg: true,
  },
  readme: {
    alias: 'R',
    description: 'The `README` file to include in the documentation.',
    normalize: true,
    requiresArg: true,
  },
  template: {
    alias: 't',
    description: 'The template package to use.',
    requiresArg: true,
  },
  test: {
    alias: 'T',
    boolean: true,
    description: 'Run all tests and exit.',
  },
  verbose: {
    boolean: true,
    description: 'Log detailed information to the console.',
  },
  version: {
    alias: 'v',
    boolean: true,
    description: 'Display the version number and exit.',
  },
};

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
 * Parse an array of command-line flags (also known as "options").
 *
 * Use the instance's `flags` property to retrieve the parsed flags later.
 *
 * @param {Array<string>} cliFlags - The command-line flags to parse.
 * @returns {Object<string, *>} The long name and value for each flag. The `_` property contains
 * all arguments other than flags and flag values.
 */
export function parseFlags(cliFlags) {
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
  return _.pick(parsedFlags, normalizedFlags.concat(['_']));
}

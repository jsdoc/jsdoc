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
import ow from 'ow';

import { flags, parseFlags } from '../../../lib/flags.js';

function validate(name, opts) {
  name = `--${name}`;

  if (!opts.description) {
    throw new TypeError(`${name} is missing its description`);
  }

  if (opts.array && opts.boolean) {
    throw new TypeError(`${name} can be an array or a boolean, but not both`);
  }

  if (opts.requiresArg && opts.boolean) {
    throw new TypeError(`${name} can require an argument or be a boolean, but not both`);
  }

  try {
    ow(opts.coerce, ow.optional.function);
  } catch (e) {
    throw new TypeError(`The coerce value for ${name} is not a function`);
  }

  if (opts.choices && !opts.requiresArg) {
    throw new TypeError(`${name} specifies choices, but not requiresArg`);
  }
}

describe('@jsdoc/cli/lib/flags', () => {
  describe('`flags`', () => {
    it('is an object', () => {
      expect(flags).toBeObject();
    });

    it('has reasonable settings for each flag', () => {
      for (let flag of Object.keys(flags)) {
        expect(() => validate(flag, flags[flag])).not.toThrow();
      }
    });
  });
  describe('`parseFlags`', () => {
    // The tests for `Engine#parseFlags` also test this method.

    it('is a function', () => {
      expect(parseFlags).toBeFunction();
    });
  });
});

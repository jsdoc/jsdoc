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

import core from '../../index.js';
import * as config from '../../lib/config.js';
import Env from '../../lib/env.js';
import * as name from '../../lib/name.js';
import * as plugins from '../../lib/plugins.js';

describe('@jsdoc/core', () => {
  describe('config', () => {
    it('is lib/config', () => {
      expect(core.config).toEqual(config);
    });
  });

  describe('Env', () => {
    it('is lib/env', () => {
      expect(core.Env).toEqual(Env);
    });
  });

  describe('name', () => {
    it('is lib/name', () => {
      expect(core.name).toEqual(name);
    });
  });

  describe('plugins', () => {
    it('is lib/plugins', () => {
      expect(core.plugins).toEqual(plugins);
    });
  });
});

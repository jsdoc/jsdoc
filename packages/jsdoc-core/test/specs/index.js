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
const core = require('../../index');

describe('@jsdoc/core', () => {
  it('is an object', () => {
    expect(core).toBeObject();
  });

  describe('config', () => {
    it('is lib/config', () => {
      const config = require('../../lib/config');

      expect(core.config).toBe(config);
    });
  });

  describe('Dependencies', () => {
    it('is lib/dependencies', () => {
      const Dependencies = require('../../lib/dependencies');

      expect(core.Dependencies).toBe(Dependencies);
    });
  });

  describe('env', () => {
    it('is lib/env', () => {
      const env = require('../../lib/env');

      expect(core.env).toBe(env);
    });
  });

  describe('name', () => {
    it('is lib/name', () => {
      const name = require('../../lib/name');

      expect(core.name).toBe(name);
    });
  });

  describe('plugins', () => {
    it('is lib/plugins', () => {
      const plugins = require('../../lib/plugins');

      expect(core.plugins).toBe(plugins);
    });
  });
});

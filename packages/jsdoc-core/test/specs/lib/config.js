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
import { defaultLoaders } from 'cosmiconfig';
import mockFs from 'mock-fs';

import * as config from '../../../lib/config.js'; // eslint-disable-line sort-imports

describe('@jsdoc/core/lib/config', () => {
  // Ensure that YAML parser is loaded before we run any tests. `cosmiconfig` tries to load it
  // lazily, but that doesn't work when the file system is mocked.
  beforeAll(() => {
    defaultLoaders['.yaml']('fakefile.yaml', 'file: []');
  });

  afterEach(() => mockFs.restore());

  it('is an object', () => {
    expect(config).toBeObject();
  });

  describe('loadSync', () => {
    it('is a function', () => {
      expect(config.loadSync).toBeFunction();
    });

    it('returns an object with `config` and `filepath` properties', () => {
      mockFs({
        'conf.json': '{}',
      });

      const conf = config.loadSync('conf.json');

      expect(conf.config).toBeObject();
      expect(conf.filepath).toEndWith('conf.json');
    });

    it('loads settings from the specified filepath if there is one', () => {
      mockFs({
        'conf.json': '{"foo":"bar"}',
      });

      const conf = config.loadSync('conf.json');

      expect(conf.config.foo).toBe('bar');
    });

    it('finds the config file when no filepath is specified', () => {
      mockFs({
        'package.json': '{"jsdoc":{"foo":"bar"}}',
      });

      const conf = config.loadSync();

      expect(conf.config.foo).toBe('bar');
    });

    it('parses JSON config files that have an extension and contain comments', () => {
      mockFs({
        '.jsdocrc.json': '// comment\n{"foo":"bar"}',
      });

      const conf = config.loadSync();

      expect(conf.config.foo).toBe('bar');
    });

    it('parses JSON files that start with a BOM', () => {
      mockFs({
        '.jsdocrc.json': '\uFEFF{"foo":"bar"}',
      });

      const conf = config.loadSync();

      expect(conf.config.foo).toBe('bar');
    });

    it('parses YAML files that start with a BOM', () => {
      mockFs({
        '.jsdocrc.yaml': '\uFEFF{"foo":"bar"}',
      });

      const conf = config.loadSync();

      expect(conf.config.foo).toBe('bar');
    });

    it('provides the default config if the user config is an empty object', () => {
      mockFs({
        '.jsdocrc.json': '{}',
      });

      const conf = config.loadSync();

      expect(conf.config).toEqual(config.defaults);
    });

    it('provides the default config if there is no user config', () => {
      const conf = config.loadSync();

      expect(conf.config).toEqual(config.defaults);
    });

    it('merges nested defaults with nested user settings as expected', () => {
      mockFs({
        '.jsdocrc.json': '{"tags":{"foo":"bar"}}',
      });

      const conf = config.loadSync();

      expect(conf.config.tags.allowUnknownTags).toBe(config.defaults.tags.allowUnknownTags);
      expect(conf.config.tags.foo).toBe('bar');
    });
  });

  describe('defaults', () => {
    const { defaults } = config;

    it('is an object', () => {
      expect(defaults).toBeObject();
    });

    describe('plugins', () => {
      it('is an array', () => {
        expect(defaults.plugins).toBeArray();
      });
    });

    describe('sourceFiles', () => {
      it('is an empty array', () => {
        expect(defaults.sourceFiles).toBeEmptyArray();
      });
    });

    describe('sourceType', () => {
      it('is a string', () => {
        expect(defaults.sourceType).toBeString();
      });
    });

    describe('tags', () => {
      it('is an object', () => {
        expect(defaults.tags).toBeObject();
      });

      describe('allowUnknownTags', () => {
        it('is a boolean', () => {
          expect(defaults.tags.allowUnknownTags).toBeBoolean();
        });
      });

      describe('dictionaries', () => {
        it('is an array of strings', () => {
          expect(defaults.tags.dictionaries).toBeArrayOfStrings();
        });
      });
    });

    describe('templates', () => {
      it('is an object', () => {
        expect(defaults.templates).toBeObject();
      });

      describe('cleverLinks', () => {
        it('is a boolean', () => {
          expect(defaults.templates.cleverLinks).toBeBoolean();
        });
      });

      describe('monospaceLinks', () => {
        it('is a boolean', () => {
          expect(defaults.templates.monospaceLinks).toBeBoolean();
        });
      });
    });
  });
});

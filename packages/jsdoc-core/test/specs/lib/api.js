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

/* global jsdoc */

import EventEmitter from 'node:events';
import path from 'node:path';

import Api from '../../../lib/api.js';
import Env from '../../../lib/env.js';

const __dirname = jsdoc.dirname(import.meta.url);

describe('Api', () => {
  let instance;

  beforeEach(() => {
    instance = new Api();
  });

  it('is a constructor', () => {
    function factory() {
      return new Api();
    }

    expect(factory).not.toThrow();
  });

  it('has an `emitter` property that contains an `EventEmitter` instance', () => {
    expect(instance.emitter).toBeInstanceOf(EventEmitter);
  });

  it('has an `env` property that contains an `Env` instance', () => {
    expect(instance.env).toBeInstanceOf(Env);
  });

  it('has a `findSourceFiles` method', () => {
    expect(instance.findSourceFiles).toBeFunction();
  });

  describe('emitter', () => {
    it('lets you provide your own emitter', () => {
      const fakeEmitter = {};

      instance = new Api({ emitter: fakeEmitter });

      expect(instance.emitter).toBe(fakeEmitter);
    });
  });

  describe('env', () => {
    it('lets you provide your own JSDoc environment', () => {
      const fakeEnv = {};

      instance = new Api({ env: fakeEnv });

      expect(instance.env).toBe(fakeEnv);
    });
  });

  describe('findSourceFiles', () => {
    it('returns an empty array if no patterns are specified', async () => {
      const sourceFiles = await instance.findSourceFiles();

      expect(sourceFiles).toBeEmptyArray();
    });

    it('stores a copy of the return value in `env.sourceFiles`', async () => {
      const actual = await instance.findSourceFiles([
        path.join(__dirname, '../../fixtures/source-files/**/*.cjs'),
      ]);
      const expected = [path.resolve(path.join(__dirname, '../../fixtures/source-files/baz.cjs'))];

      expect(actual).toEqual(expected);
      expect(instance.env.sourceFiles).toEqual(actual);
    });

    it('resolves the path in `env.options.package`', async () => {
      const filepath = path.join(__dirname, '../../fixtures/source-files/package.json');
      const expected = path.resolve(filepath);

      instance.env.options.package = filepath;
      await instance.findSourceFiles();

      expect(instance.env.options.package).toEqual(expected);
    });

    it('resolves the path in `env.options.readme`', async () => {
      const filepath = path.join(__dirname, '../../fixtures/source-files/README.md');
      const expected = path.resolve(filepath);

      instance.env.options.readme = filepath;
      await instance.findSourceFiles();

      expect(instance.env.options.readme).toEqual(expected);
    });

    describe('with `globPatterns` param', () => {
      it('uses the glob patterns to return absolute paths to files', async () => {
        const actual = await instance.findSourceFiles([
          path.join(__dirname, '../../fixtures/source-files/**/*.js'),
        ]);
        const expected = [
          path.resolve(path.join(__dirname, '../../fixtures/source-files/bar.js')),
          path.resolve(path.join(__dirname, '../../fixtures/source-files/foo.js')),
          path.resolve(path.join(__dirname, '../../fixtures/source-files/subdir/qux.js')),
        ];

        expect(actual).toEqual(expected);
      });

      it('ignores `env.options._` if glob patterns are passed in', async () => {
        let actual;
        const expected = [
          path.resolve(path.join(__dirname, '../../fixtures/source-files/baz.cjs')),
        ];

        instance.env.options._ = [path.join(__dirname, '../../fixtures/source-files/**/*.js')];

        actual = await instance.findSourceFiles([
          path.join(__dirname, '../../fixtures/source-files/*.cjs'),
        ]);

        expect(actual).toEqual(expected);
      });
    });

    describe('without `globPatterns` param', () => {
      it('uses `env.options._` if glob patterns are not passed in', async () => {
        let actual;
        const expected = [
          path.resolve(path.join(__dirname, '../../fixtures/source-files/bar.js')),
          path.resolve(path.join(__dirname, '../../fixtures/source-files/foo.js')),
          path.resolve(path.join(__dirname, '../../fixtures/source-files/subdir/qux.js')),
        ];

        instance.env.options._ = [path.join(__dirname, '../../fixtures/source-files/**/*.js')];

        actual = await instance.findSourceFiles();

        expect(actual).toEqual(expected);
      });

      it('folds `env.options._` into `env.config.sourceFiles`', async () => {
        let actual;
        const expected = [
          path.resolve(path.join(__dirname, '../../fixtures/source-files/bar.js')),
          path.resolve(path.join(__dirname, '../../fixtures/source-files/foo.js')),
          path.resolve(path.join(__dirname, '../../fixtures/source-files/subdir/qux.js')),
        ];

        instance.env.config.sourceFiles = [
          path.join(__dirname, '../../fixtures/source-files/subdir/*.js'),
        ];
        instance.env.options._ = [path.join(__dirname, '../../fixtures/source-files/*.js')];

        actual = await instance.findSourceFiles();

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('generateDocs', () => {
    let env;
    let options;

    beforeEach(() => {
      env = instance.env;
      options = env.options;
      options.template = path.resolve(
        path.join(__dirname, '../../fixtures/templates/fake-template.js')
      );
    });

    it('calls the `publish` function from the specified template', async () => {
      await instance.generateDocs();

      expect(env.foo).toBe('bar');
    });

    it('passes the `DocletStore` and `Env` to the template', async () => {
      const fakeDocletStore = {};

      await instance.generateDocs(fakeDocletStore);

      expect(env.docletStore).toBe(fakeDocletStore);
    });

    it('rejects the promise and logs a fatal error if the template cannot be found', async () => {
      spyOn(env.log, 'fatal');
      options.template = 'fleeble';

      try {
        await instance.generateDocs();

        // We shouldn't get here.
        expect(false).toBeTrue();
      } catch (e) {
        expect(e.message).toContain('fleeble');
      }

      expect(env.log.fatal).toHaveBeenCalled();
      expect(env.log.fatal.calls.first().args[0]).toContain('fleeble');
    });

    it('rejects the promise and logs a fatal error if `publish` is undefined', async () => {
      spyOn(env.log, 'fatal');
      options.template = path.resolve(
        path.join(__dirname, '../../fixtures/templates/no-publish-template.js')
      );

      try {
        await instance.generateDocs();

        // We shouldn't get here.
        expect(false).toBeTrue();
      } catch (e) {
        expect(e.message).toContain('no-publish-template.js');
      }

      expect(env.log.fatal).toHaveBeenCalled();
      expect(env.log.fatal.calls.first().args[0]).toContain('no-publish-template.js');
    });

    it('rejects the promise and logs a fatal error if `publish` is not a function', async () => {
      spyOn(env.log, 'fatal');
      options.template = path.resolve(
        path.join(__dirname, '../../fixtures/templates/bad-publish-template.js')
      );

      try {
        await instance.generateDocs();

        // We shouldn't get here.
        expect(false).toBeTrue();
      } catch (e) {
        expect(e.message).toContain('bad-publish-template.js');
      }

      expect(env.log.fatal).toHaveBeenCalled();
      expect(env.log.fatal.calls.first().args[0]).toContain('bad-publish-template.js');
    });
  });
});

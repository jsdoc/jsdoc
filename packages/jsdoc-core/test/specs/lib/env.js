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

import EventEmitter from 'node:events';

import Env from '../../../lib/env.js';

describe('@jsdoc/core.Env', () => {
  it('is a constructor', () => {
    function factory() {
      return new Env();
    }

    expect(factory).not.toThrow();
  });

  describe('properties', () => {
    const env = new Env();

    it('has an `args` property', () => {
      expect(env.args).toBeArray();
    });

    it('has a `conf` property', () => {
      expect(env.conf).toBeObject();
    });

    it('has a `config` getter', () => {
      expect(env.config).toBe(env.conf);
    });

    it('has an `emitter` property that contains an event emitter', () => {
      expect(env.emitter).toBeInstanceOf(EventEmitter);
    });

    it('has a `log` property that contains logging functions', () => {
      expect(env.log).toBeObject();

      for (const key of Object.keys(env.log)) {
        expect(env.log[key]).toBeFunction();
      }
    });

    it('has an `options` getter', () => {
      expect(env.options).toBe(env.opts);
    });

    it('has an `opts` property', () => {
      expect(env.opts).toBeObject();
    });

    it('has a `run` object with `start` and `finish` properties', () => {
      expect(env.run).toBeObject();
      expect(env.run.finish).toBeNull();
      expect(env.run.start).toBeInstanceOf(Date);
    });

    it('has a `sourceFiles` property', () => {
      expect(env.sourceFiles).toBeArray();
    });

    it('has a `tags` property', () => {
      expect(env.tags).toBeNull();
    });

    it('has a `version` object with `number` and `revision` properties', () => {
      expect(env.version).toBeObject();
      expect(Object.hasOwn(env.version, 'number')).toBeTrue();
      expect(Object.hasOwn(env.version, 'revision')).toBeTrue();
    });
  });
});

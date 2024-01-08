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

/* global jsdoc */

import EventEmitter from 'node:events';
import path from 'node:path';

import Engine from '../../../lib/engine.js';
import flags from '../../../lib/flags.js';
import { LEVELS } from '../../../lib/logger.js';

const TYPE_ERROR = 'TypeError';

describe('@jsdoc/cli/lib/engine', () => {
  it('exists', () => {
    expect(Engine).toBeFunction();
  });

  it('works with no input', () => {
    expect(() => new Engine()).not.toThrow();
  });

  it('has a static LOG_LEVELS property', () => {
    expect(Engine.LOG_LEVELS).toBeObject();
  });

  it('has an `api` property that contains the API instance', () => {
    expect(new Engine().api).toBeObject();
  });

  it('has an `emitter` property that contains a shared event emitter', () => {
    expect(new Engine().emitter).toBeObject();
  });

  it('has an empty array of flags by default', () => {
    expect(new Engine().flags).toBeEmptyArray();
  });

  it('has a property that contains the known flags', () => {
    expect(new Engine().knownFlags).toBe(flags);
  });

  it('has a logLevel property that defaults to LEVELS.WARN', () => {
    expect(new Engine().logLevel).toBe(LEVELS.WARN);
  });

  it('has a shouldExitWithError property that defaults to false', () => {
    expect(new Engine().shouldExitWithError).toBeFalse();
  });

  it('has an undefined revision property by default', () => {
    expect(new Engine().revision).toBeUndefined();
  });

  it('has an undefined version property by default', () => {
    expect(new Engine().version).toBeUndefined();
  });

  it('has a versionDetails property that is an empty string by default', () => {
    expect(new Engine().versionDetails).toBeEmptyString();
  });

  it('throws if the input is not an object', () => {
    expect(() => new Engine('hi')).toThrow();
  });

  it('sets the logLevel if provided', () => {
    const logLevel = LEVELS.VERBOSE;
    const instance = new Engine({ logLevel });

    expect(instance.logLevel).toBe(logLevel);
  });

  it('throws if the logLevel is invalid', () => {
    const logLevel = LEVELS.VERBOSE + 1;

    expect(() => new Engine({ logLevel })).toThrowErrorOfType(TYPE_ERROR);
  });

  it('sets the revision if provided', () => {
    const revision = new Date();
    const instance = new Engine({ revision });

    expect(instance.revision).toBe(revision);
  });

  it('throws if the revision is not a date', () => {
    expect(() => new Engine({ revision: '1' })).toThrow();
  });

  it('sets the version if provided', () => {
    expect(new Engine({ version: '1.2.3' }).version).toBe('1.2.3');
  });

  it('throws if the version is not a string', () => {
    expect(() => new Engine({ version: 1 })).toThrow();
  });

  describe('configureLogger', () => {
    let instance;
    const { LOG_LEVELS } = Engine;

    beforeEach(() => {
      instance = new Engine();
    });

    it('changes the log level to `DEBUG` if the `debug` option is enabled', () => {
      const { options } = instance.env;

      options.debug = true;
      instance.configureLogger();

      expect(instance.logLevel).toBe(LOG_LEVELS.DEBUG);
    });

    it('changes the log level to `INFO` if the `verbose` option is enabled', () => {
      const { options } = instance.env;

      options.verbose = true;
      instance.configureLogger();

      expect(instance.logLevel).toBe(LOG_LEVELS.INFO);
    });

    it('changes the log level to `SILENT` while running tests', () => {
      const { options } = instance.env;

      options.test = true;
      instance.configureLogger();

      expect(instance.logLevel).toBe(LOG_LEVELS.SILENT);
    });

    it('tells the engine to exit later, with an error, if an `ERROR` log entry is emitted', () => {
      const emitter = instance.emitter;

      instance.configureLogger();
      instance.logLevel = LOG_LEVELS.SILENT;
      emitter.emit('logger:error', 'oh no!');

      expect(instance.shouldExitWithError).toBeTrue();
    });

    it('tells the engine to exit now, with an error, if a `FATAL` log entry is emitted', () => {
      const emitter = instance.emitter;

      instance.configureLogger();
      instance.logLevel = LOG_LEVELS.SILENT;
      spyOn(instance, 'exit');
      emitter.emit('logger:fatal', 'oh no!');

      expect(instance.exit).toHaveBeenCalledOnceWith(1);
    });

    describe('pedantic', () => {
      beforeEach(() => {
        const { options } = instance.env;

        options.pedantic = true;
      });

      it('tells the engine to exit later, with an error, if a `WARN` log entry is emitted', () => {
        const emitter = instance.emitter;

        instance.configureLogger();
        instance.logLevel = LOG_LEVELS.SILENT;
        emitter.emit('logger:warn', 'oh no!');

        expect(instance.shouldExitWithError).toBeTrue();
      });

      it('tells the engine to exit now, with an error, if an `ERROR` log entry is emitted', () => {
        const emitter = instance.emitter;

        instance.configureLogger();
        instance.logLevel = LOG_LEVELS.SILENT;
        spyOn(instance, 'exit');
        emitter.emit('logger:error', 'oh no!');

        expect(instance.exit).toHaveBeenCalledOnceWith(1);
      });
    });
  });

  describe('emitter', () => {
    it('creates an `EventEmitter` instance by default', () => {
      expect(new Engine().emitter).toBeInstanceOf(EventEmitter);
    });

    it('lets you provide the emitter', () => {
      const fakeEmitter = {
        off: () => null,
        on: () => null,
        once: () => null,
      };
      const instance = new Engine({ emitter: fakeEmitter });

      expect(instance.emitter).toBe(fakeEmitter);
    });

    it('shares one emitter between the `Api` instance and the `Engine` instance', () => {
      const instance = new Engine();

      expect(instance.emitter).toBe(instance.api.emitter);
    });
  });

  describe('exit', () => {
    // TODO: This is testing implementation details, not behavior. Refactor the method, then rewrite
    // this test to test the behavior.
    it('adds one listener for `exit` events if the exit code is 0', () => {
      spyOn(process, 'on');

      new Engine().exit(0);

      expect(process.on).toHaveBeenCalledTimes(1);
    });

    it('adds two listeners for `exit` events if the exit code is >0', () => {
      spyOn(process, 'on');

      new Engine().exit(1);

      expect(process.on).toHaveBeenCalledTimes(2);
    });
  });

  describe('help', () => {
    const instance = new Engine();

    it('works with no input', () => {
      expect(() => instance.help()).not.toThrow();
    });

    it('throws on bad input', () => {
      expect(() => instance.help('hi')).toThrow();
    });

    it('returns a string', () => {
      expect(instance.help()).toBeNonEmptyString();
    });

    it('honors a reasonable maxLength option', () => {
      const max = 70;
      const help = instance.help({ maxLength: max }).split('\n');

      for (let line of help) {
        expect(line.length).toBeLessThanOrEqualTo(max);
      }
    });

    it('throws on a bad maxLength option', () => {
      expect(() => instance.help({ maxLength: 'long' })).toThrow();
    });
  });

  describe('loadConfig', () => {
    const configPath = path.resolve(
      path.join(jsdoc.dirname(import.meta.url), '../../fixtures/configs/conf.json')
    );
    let instance;

    beforeEach(() => {
      instance = new Engine();
      instance.env.options.configure = configPath;
    });

    it('parses the command-line flags', async () => {
      instance.env.args = ['-p', '-v'];

      await instance.loadConfig();

      expect(instance.env.options.private).toBeTrue();
      expect(instance.env.options.version).toBeTrue();
    });

    it('exits if the command-line flags cannot be parsed', async () => {
      instance.env.args = ['--not-a-real-flag'];

      spyOn(instance, 'exit');
      try {
        await instance.loadConfig();

        // We shouldn't get here.
        expect(false).toBeTrue();
      } catch (e) {
        // Expected exit code.
        expect(instance.exit.calls.argsFor(0)[0]).toBe(1);
        // Expected error message.
        expect(instance.exit.calls.argsFor(0)[1]).toContain(
          'Unknown command-line option: --not-a-real-flag'
        );
      }
    });

    it('adds the config info to the JSDoc environment', async () => {
      await instance.loadConfig();

      expect(instance.env.config.sourceType).toBe('script');
    });

    it('merges the command-line flags from the config file with the real flags', async () => {
      instance.env.args = ['-p'];

      await instance.loadConfig();

      expect(instance.env.options.private).toBeTrue();
      expect(instance.env.options.version).toBeTrue();
    });
  });

  describe('LOG_LEVELS', () => {
    it('is lib/logger.LEVELS', () => {
      expect(Engine.LOG_LEVELS).toBe(LEVELS);
    });
  });

  describe('parseFlags', () => {
    it('throws with no input', () => {
      expect(() => new Engine().parseFlags()).toThrow();
    });

    it('throws if the input is not an array', () => {
      expect(() => new Engine().parseFlags({ foo: 'bar' })).toThrow();
    });

    it('parses flags with no values', () => {
      expect(new Engine().parseFlags(['--help']).help).toBeTrue();
    });

    it('parses flags with values', () => {
      const parsed = new Engine().parseFlags(['--configure', 'conf.json']);

      expect(parsed.configure).toBe('conf.json');
    });

    it('stores the flags in the `flags` property', () => {
      const instance = new Engine();

      instance.parseFlags(['--help']);

      expect(instance.flags.help).toBeTrue();
    });

    it('throws on unrecognized flags', () => {
      expect(() => new Engine().parseFlags(['--notarealflag'])).toThrow();
    });

    it('throws on invalid flag values', () => {
      expect(() => new Engine().parseFlags(['--access', 'maybe'])).toThrow();
    });

    it('includes the long and short name in the error if a value is invalid', () => {
      let error;

      try {
        new Engine().parseFlags(['--access', 'just-this-once']);
      } catch (e) {
        error = e;
      }

      expect(error.message).toContain('-a/--access');
    });

    it('includes the allowed values in the error if a value is invalid', () => {
      let error;

      try {
        new Engine().parseFlags(['--access', 'maybe-later']);
      } catch (e) {
        error = e;
      }

      expect(error.message).toContain(flags.access.choices.join(', '));
    });

    it('throws if a required value is missing', () => {
      expect(() => new Engine().parseFlags(['--template'])).toThrow();
    });

    it('always uses the long flag name in the parsed flags', () => {
      expect(new Engine().parseFlags(['-h']).help).toBeTrue();
    });

    it('coerces values to other types when appropriate', () => {
      const parsed = new Engine().parseFlags(['--query', 'foo=bar&baz=true']);

      expect(parsed.query).toEqual({
        foo: 'bar',
        baz: true,
      });
    });
  });

  describe('printHelp', () => {
    beforeEach(() => {
      spyOn(console, 'log');
    });

    it('returns a promise that resolves to 0', async () => {
      const instance = new Engine({ version: '1.2.3' });
      const returnValue = await instance.printHelp();

      expect(returnValue).toBe(0);
    });

    it('prints the version number, then the help text', () => {
      const instance = new Engine({ version: '1.2.3' });

      instance.printHelp();

      expect(console.log.calls.argsFor(0)[0]).toContain('JSDoc 1.2.3');
      expect(console.log.calls.argsFor(1)[0]).not.toContain('JSDoc 1.2.3');
      expect(console.log.calls.argsFor(1)[0]).toContain('-v, --version');
    });
  });

  describe('printVersion', () => {
    beforeEach(() => {
      spyOn(console, 'log');
    });

    it('returns a promise that resolves to 0', async () => {
      const instance = new Engine({ version: '1.2.3' });
      const returnValue = await instance.printVersion();

      expect(returnValue).toBe(0);
    });

    it('prints the version number', () => {
      const instance = new Engine({ version: '1.2.3' });

      instance.printVersion();

      expect(console.log).toHaveBeenCalledOnceWith('JSDoc 1.2.3');
    });

    it('prints the revision if present', () => {
      const date = new Date(1700000000000);
      const instance = new Engine({ version: '1.2.3', revision: date });

      instance.printVersion();

      expect(console.log).toHaveBeenCalledOnceWith('JSDoc 1.2.3 (Tue, 14 Nov 2023 22:13:20 GMT)');
    });
  });

  describe('versionDetails', () => {
    it('works with a version but no revision', () => {
      const instance = new Engine({ version: '1.2.3' });

      expect(instance.versionDetails).toBe('JSDoc 1.2.3');
    });

    it('contains an empty string with a revision but no version', () => {
      const revision = new Date();
      const instance = new Engine({ revision });

      expect(instance.versionDetails).toBeEmptyString();
    });

    it('works with a version and a revision', () => {
      const revision = new Date();
      const instance = new Engine({
        version: '1.2.3',
        revision,
      });

      expect(instance.versionDetails).toBe(`JSDoc 1.2.3 (${revision.toUTCString()})`);
    });

    it('works when `opts.version` is an object', () => {
      const revision = new Date();
      const instance = new Engine({
        version: { number: '1.2.3', revision: revision.toUTCString() },
      });

      expect(instance.versionDetails).toBe(`JSDoc 1.2.3 (${revision.toUTCString()})`);
    });
  });
});

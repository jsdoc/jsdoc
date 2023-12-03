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

import { LEVELS, Logger } from '../../../lib/logger.js';

const ARGUMENT_ERROR = 'ArgumentError';
const TYPE_ERROR = 'TypeError';

describe('@jsdoc/cli/lib/logger', () => {
  describe('Logger', () => {
    let emitter;
    let logger;

    beforeEach(() => {
      emitter = new EventEmitter();
      logger = new Logger({ emitter });

      ['debug', 'error', 'info', 'warn'].forEach((func) => spyOn(console, func));
    });

    it('exports a Logger constructor', () => {
      expect(() => new Logger({ emitter })).not.toThrow();
    });

    it('exports a LEVELS enum', () => {
      expect(LEVELS).toBeNonEmptyObject();
    });

    describe('constructor', () => {
      it('throws on invalid input', () => {
        expect(() => new Logger()).toThrowErrorOfType(ARGUMENT_ERROR);
      });

      it('accepts a valid emitter', () => {
        expect(() => new Logger({ emitter })).not.toThrow();
      });

      it('throws on an invalid emitter', () => {
        expect(() => new Logger({ emitter: {} })).toThrowErrorOfType(ARGUMENT_ERROR);
      });

      it('accepts a valid level', () => {
        expect(
          () =>
            new Logger({
              emitter,
              level: LEVELS.VERBOSE,
            })
        ).not.toThrow();
      });

      it('throws on an invalid level', () => {
        expect(
          () =>
            new Logger({
              emitter,
              level: LEVELS.VERBOSE + 1,
            })
        ).toThrowErrorOfType(TYPE_ERROR);
      });
    });

    describe('events', () => {
      it('passes all event arguments through', () => {
        const args = ['My name is %s %s %s', 'foo', 'bar', 'baz'];
        const eventType = 'logger:info';

        logger.level = LEVELS.VERBOSE;
        emitter.emit(eventType, ...args);

        expect(console.info).toHaveBeenCalledWith(...args);
      });

      it('logs logger:fatal events by default', () => {
        emitter.emit('logger:fatal');

        expect(console.error).toHaveBeenCalled();
      });

      it('does not log logger:fatal events when level is SILENT', () => {
        logger.level = LEVELS.SILENT;
        emitter.emit('logger:fatal');

        expect(console.error).not.toHaveBeenCalled();
      });

      it('logs logger:error events by default', () => {
        emitter.emit('logger:error');

        expect(console.error).toHaveBeenCalled();
      });

      it('does not log logger:error events when level is FATAL', () => {
        logger.level = LEVELS.FATAL;
        emitter.emit('logger:error');

        expect(console.error).not.toHaveBeenCalled();
      });

      it('logs logger:warn events by default', () => {
        emitter.emit('logger:warn');

        expect(console.warn).toHaveBeenCalled();
      });

      it('does not log logger:warn events when level is ERROR', () => {
        logger.level = LEVELS.ERROR;
        emitter.emit('logger:warn');

        expect(console.warn).not.toHaveBeenCalled();
      });

      it('does not log logger:info events by default', () => {
        emitter.emit('logger:info');

        expect(console.info).not.toHaveBeenCalled();
      });

      it('logs logger:info events when level is INFO', () => {
        logger.level = LEVELS.INFO;
        emitter.emit('logger:info');

        expect(console.info).toHaveBeenCalled();
      });

      it('does not log logger:debug events by default', () => {
        emitter.emit('logger:debug');

        expect(console.debug).not.toHaveBeenCalled();
      });

      it('logs logger:debug events when level is DEBUG', () => {
        logger.level = LEVELS.DEBUG;
        emitter.emit('logger:debug');

        expect(console.debug).toHaveBeenCalled();
      });

      it('does not log logger:verbose events by default', () => {
        emitter.emit('logger:verbose');

        expect(console.debug).not.toHaveBeenCalled();
      });

      it('logs logger:verbose events when level is VERBOSE', () => {
        logger.level = LEVELS.VERBOSE;
        emitter.emit('logger:verbose');

        expect(console.debug).toHaveBeenCalled();
      });
    });

    describe('level', () => {
      it('contains the current log level', () => {
        expect(logger.level).toBe(LEVELS.WARN);
      });

      it('throws when set to an invalid value', () => {
        expect(() => {
          logger.level = LEVELS.VERBOSE + 1;
        }).toThrowErrorOfType(TYPE_ERROR);
      });

      // The `events` tests set this property to valid values, so no need to test that
      // behavior again here.
    });
  });

  describe('LEVELS', () => {
    it('has a numeric SILENT property', () => {
      expect(LEVELS.SILENT).toBeWholeNumber();
    });

    it('has a numeric FATAL property', () => {
      expect(LEVELS.FATAL).toBeWholeNumber();
    });

    it('has a numeric ERROR property', () => {
      expect(LEVELS.ERROR).toBeWholeNumber();
    });

    it('has a numeric WARN property', () => {
      expect(LEVELS.WARN).toBeWholeNumber();
    });

    it('has a numeric INFO property', () => {
      expect(LEVELS.INFO).toBeWholeNumber();
    });

    it('has a numeric DEBUG property', () => {
      expect(LEVELS.DEBUG).toBeWholeNumber();
    });

    it('has a numeric VERBOSE property', () => {
      expect(LEVELS.VERBOSE).toBeWholeNumber();
    });

    it('orders the log levels correctly', () => {
      expect(LEVELS.SILENT).toBeLessThan(LEVELS.FATAL);
      expect(LEVELS.FATAL).toBeLessThan(LEVELS.ERROR);
      expect(LEVELS.ERROR).toBeLessThan(LEVELS.WARN);
      expect(LEVELS.WARN).toBeLessThan(LEVELS.INFO);
      expect(LEVELS.INFO).toBeLessThan(LEVELS.DEBUG);
      expect(LEVELS.DEBUG).toBeLessThan(LEVELS.VERBOSE);
    });
  });
});

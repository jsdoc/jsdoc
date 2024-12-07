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

import getLogFunctions from '../../../lib/log.js';

describe('@jsdoc/util/lib/log', () => {
  let emitter;
  const fns = ['debug', 'error', 'info', 'fatal', 'verbose', 'warn'];
  let log;

  beforeEach(() => {
    emitter = jsdoc.env.emitter;
    log = getLogFunctions(emitter);
  });

  it('is a function', () => {
    expect(getLogFunctions).toBeFunction();
  });

  it('provides the expected functions', () => {
    fns.forEach((fn) => {
      expect(log[fn]).toBeFunction();
    });
  });

  describe('functions', () => {
    it('sends events to the emitter', () => {
      fns.forEach((fn) => {
        let event;

        emitter.once(`logger:${fn}`, (e) => {
          event = e;
        });
        log[fn]('testing');

        expect(event).toBe('testing');
      });
    });
  });
});

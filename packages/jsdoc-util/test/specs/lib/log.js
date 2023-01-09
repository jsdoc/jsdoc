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
describe('@jsdoc/util/lib/log', () => {
  const EventBus = require('../../../lib/bus');
  const log = require('../../../lib/log');

  const fns = ['debug', 'error', 'info', 'fatal', 'verbose', 'warn'];

  it('is an object', () => {
    expect(log).toBeObject();
  });

  it('provides the expected functions', () => {
    fns.forEach((fn) => {
      expect(log[fn]).toBeFunction();
    });
  });

  describe('functions', () => {
    const bus = new EventBus('jsdoc');

    it('sends events to the event bus', () => {
      fns.forEach((fn) => {
        let event;

        bus.once(`logger:${fn}`, (e) => {
          event = e;
        });
        log[fn]('testing');

        expect(event).toBe('testing');
      });
    });
  });
});

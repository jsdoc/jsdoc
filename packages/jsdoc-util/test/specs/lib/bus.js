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

import EventBus from '../../../lib/bus.js';

describe('@jsdoc/util/lib/bus', () => {
  const ignoreCache = { cache: false };

  it('inherits from EventEmitter', () => {
    expect(new EventBus('foo', ignoreCache) instanceof EventEmitter).toBeTrue();
  });

  it('accepts a string for the ID', () => {
    function makeBus() {
      return new EventBus('foo', ignoreCache);
    }

    expect(makeBus).not.toThrow();
  });

  it('accepts a Symbol for the ID', () => {
    function makeBus() {
      return new EventBus(Symbol('foo'), ignoreCache);
    }

    expect(makeBus).not.toThrow();
  });

  it('throws on bad IDs', () => {
    function crashBus() {
      return new EventBus(true, ignoreCache);
    }

    expect(crashBus).toThrowError();
  });

  it('uses a cache by default', () => {
    let fired = false;
    const id = Symbol('cache-test');
    const bus1 = new EventBus(id);
    const bus2 = new EventBus(id);

    bus1.once('foo', () => {
      fired = true;
    });

    bus2.emit('foo');

    expect(bus1).toBe(bus2);
    expect(fired).toBeTrue();
  });

  it('ignores the cache when asked', () => {
    let fired = false;
    const id = Symbol('cache-test');
    const bus1 = new EventBus(id, ignoreCache);
    const bus2 = new EventBus(id, ignoreCache);

    bus1.once('foo', () => {
      fired = true;
    });

    bus2.emit('foo');

    expect(bus1).not.toBe(bus2);
    expect(fired).toBeFalse();
  });
});

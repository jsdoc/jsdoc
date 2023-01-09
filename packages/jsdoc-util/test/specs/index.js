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
const util = require('../../index');

describe('@jsdoc/util', () => {
  it('is an object', () => {
    expect(util).toBeObject();
  });

  describe('cast', () => {
    it('is lib/cast', () => {
      const cast = require('../../lib/cast');

      expect(util.cast).toBe(cast);
    });
  });

  describe('EventBus', () => {
    it('is lib/bus', () => {
      const bus = require('../../lib/bus');

      expect(util.EventBus).toBe(bus);
    });
  });

  describe('fs', () => {
    it('is lib/fs', () => {
      const fs = require('../../lib/fs');

      expect(util.fs).toBe(fs);
    });
  });
});

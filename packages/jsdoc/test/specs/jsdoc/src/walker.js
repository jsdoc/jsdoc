/*
  Copyright 2013 the JSDoc Authors.

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
describe('jsdoc/src/walker', () => {
  const walker = require('jsdoc/src/walker');

  it('should exist', () => {
    expect(walker).toBeObject();
  });

  it('should export a "walkers" object', () => {
    expect(walker.walkers).toBeObject();
  });

  it('should export a "Walker" class', () => {
    expect(walker.Walker).toBeFunction();
  });

  describe('walkers', () => {
    const { Syntax } = require('@jsdoc/parse');

    // TODO: tests for default functions

    it('should contain a function for each known node type', () => {
      Object.keys(Syntax).forEach((nodeType) => {
        expect(walker.walkers[nodeType]).toBeFunction();
      });
    });
  });

  xdescribe('Walker', () => {
    // TODO
  });
});

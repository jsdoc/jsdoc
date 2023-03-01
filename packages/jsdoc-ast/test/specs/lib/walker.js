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
import { Syntax } from '../../../lib/syntax.js';
import * as walker from '../../../lib/walker.js';

describe('@jsdoc/ast/lib/walker', () => {
  it('is an object', () => {
    expect(walker).toBeObject();
  });

  it('has a `walkers` object', () => {
    expect(walker.walkers).toBeObject();
  });

  it('has a `Walker` class', () => {
    expect(walker.Walker).toBeFunction();
  });

  describe('walkers', () => {
    // TODO: tests for default functions

    it('has a function for each known node type', () => {
      Object.keys(Syntax).forEach((nodeType) => {
        expect(walker.walkers[nodeType]).toBeFunction();
      });
    });
  });

  // TODO: Walker tests
});

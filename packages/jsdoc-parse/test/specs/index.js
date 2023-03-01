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
import parse from '../../index.js';
import * as handlers from '../../lib/handlers.js';
import { createParser, Parser } from '../../lib/parser.js';
import { Visitor } from '../../lib/visitor.js';

describe('@jsdoc/parse', () => {
  it('is an object', () => {
    expect(parse).toBeObject();
  });

  describe('createParser', () => {
    it('is lib/parser.createParser', () => {
      expect(parse.createParser).toEqual(createParser);
    });
  });

  describe('handlers', () => {
    it('is lib/handlers', () => {
      expect(parse.handlers).toEqual(handlers);
    });
  });

  describe('Parser', () => {
    it('is lib/parser.Parser', () => {
      expect(parse.Parser).toEqual(Parser);
    });
  });

  describe('Visitor', () => {
    it('is lib/visitor.Visitor', () => {
      expect(parse.Visitor).toEqual(Visitor);
    });
  });
});

/*
  Copyright 2020 the JSDoc Authors.

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

import tag from '../../index.js';
import definitions from '../../lib/definitions/index.js';
import { Dictionary } from '../../lib/dictionary.js';
import * as inline from '../../lib/inline.js';
import { Tag } from '../../lib/tag.js';
import * as type from '../../lib/type.js';
import { validate } from '../../lib/validator.js';

describe('@jsdoc/tag', () => {
  it('is an object', () => {
    expect(tag).toBeObject();
  });

  describe('definitions', () => {
    it('is lib/definitions', () => {
      expect(tag.definitions).toEqual(definitions);
    });
  });

  describe('Dictionary', () => {
    it('is lib/dictionary.Dictionary', () => {
      expect(tag.Dictionary).toEqual(Dictionary);
    });
  });

  describe('inline', () => {
    it('is lib/inline', () => {
      expect(tag.inline).toEqual(inline);
    });
  });

  describe('Tag', () => {
    it('is lib/tag.Tag', () => {
      expect(tag.Tag).toEqual(Tag);
    });
  });

  describe('type', () => {
    it('is lib/type', () => {
      expect(tag.type).toEqual(type);
    });
  });

  describe('validate', () => {
    it('is lib/validator.validate', () => {
      expect(tag.validate).toEqual(validate);
    });
  });
});

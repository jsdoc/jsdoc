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

import doclet from '../../index.js';
import * as augment from '../../lib/augment.js';
import { resolveBorrows } from '../../lib/borrow.js';
import { Doclet } from '../../lib/doclet.js';
import { DocletStore } from '../../lib/doclet-store.js';
import { Package } from '../../lib/package.js';
import * as schema from '../../lib/schema.js';

describe('@jsdoc/doclet', () => {
  it('is an object', () => {
    expect(doclet).toBeObject();
  });

  describe('augment', () => {
    it('is lib/augment', () => {
      expect(doclet.augment).toEqual(augment);
    });
  });

  describe('Doclet', () => {
    it('is lib/doclet.Doclet', () => {
      expect(doclet.Doclet).toEqual(Doclet);
    });
  });

  describe('DocletStore', () => {
    it('is lib/doclet.DocletStore', () => {
      expect(doclet.DocletStore).toEqual(DocletStore);
    });
  });

  describe('Package', () => {
    it('is lib/package.Package', () => {
      expect(doclet.Package).toEqual(Package);
    });
  });

  describe('resolveBorrows', () => {
    it('is lib/borrow.resolveBorrows', () => {
      expect(doclet.resolveBorrows).toEqual(resolveBorrows);
    });
  });

  describe('schema', () => {
    it('is lib/schema', () => {
      expect(doclet.schema).toEqual(schema);
    });
  });
});

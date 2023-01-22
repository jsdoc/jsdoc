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
const doclet = require('../../index');

describe('@jsdoc/doclet', () => {
  it('is an object', () => {
    expect(doclet).toBeObject();
  });

  describe('augment', () => {
    it('is lib/augment', () => {
      const augment = require('../../lib/augment');

      expect(doclet.augment).toBe(augment);
    });
  });

  describe('combineDoclets', () => {
    it('is lib/doclet.combine', () => {
      const { combine } = require('../../lib/doclet');

      expect(doclet.combineDoclets).toBe(combine);
    });
  });

  describe('Doclet', () => {
    it('is lib/doclet.Doclet', () => {
      const { Doclet } = require('../../lib/doclet');

      expect(doclet.Doclet).toBe(Doclet);
    });
  });

  describe('Package', () => {
    it('is lib/package.Package', () => {
      const { Package } = require('../../lib/package');

      expect(doclet.Package).toBe(Package);
    });
  });

  describe('resolveBorrows', () => {
    it('is lib/borrow.resolveBorrows', () => {
      const { resolveBorrows } = require('../../lib/borrow');

      expect(doclet.resolveBorrows).toBe(resolveBorrows);
    });
  });

  describe('schema', () => {
    it('is lib/schema', () => {
      const schema = require('../../lib/schema');

      expect(doclet.schema).toBe(schema);
    });
  });
});

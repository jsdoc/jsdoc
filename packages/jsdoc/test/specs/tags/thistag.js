/*
  Copyright 2011 the JSDoc Authors.

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
describe('@this tag', () => {
  afterEach(() => {
    jsdoc.restoreTagDictionary();
  });

  describe('JSDoc tags', () => {
    beforeEach(() => {
      jsdoc.replaceTagDictionary('jsdoc');
    });

    it("should add a `this` property set to the @this tag's value", () => {
      const docSet = jsdoc.getDocSetFromFile('test/fixtures/thistag.js');
      const setName = docSet.getByLongname('setName')[0];

      expect(setName.this).toBe('Foo');
    });

    it('should change the memberof for symbols like `this.foo`', () => {
      const docSet = jsdoc.getDocSetFromFile('test/fixtures/thistag.js');
      const fooName = docSet.getByLongname('Foo#name')[0];

      expect(fooName).toBeObject();
      expect(fooName.name).toBe('name');
      expect(fooName.memberof).toBe('Foo');
      expect(fooName.scope).toBe('instance');
    });
  });

  describe('Closure Compiler tags', () => {
    beforeEach(() => {
      jsdoc.replaceTagDictionary('closure');
    });

    it("should add a `this` property set to the @this tag's type expression", () => {
      const docSet = jsdoc.getDocSetFromFile('test/fixtures/thistag2.js');
      const setName = docSet.getByLongname('setName')[0];

      expect(setName.this).toBe('Foo');
    });

    it('should change the memberof for symbols like `this.foo`', () => {
      const docSet = jsdoc.getDocSetFromFile('test/fixtures/thistag2.js');
      const fooName = docSet.getByLongname('Foo#name')[0];

      expect(fooName).toBeObject();
      expect(fooName.name).toBe('name');
      expect(fooName.memberof).toBe('Foo');
      expect(fooName.scope).toBe('instance');
    });

    it('should work with type unions', () => {
      const docSet = jsdoc.getDocSetFromFile('test/fixtures/thistag2.js');
      const getName = docSet.getByLongname('getName')[0];

      expect(getName.this).toBe('(Foo|Bar)');
    });
  });
});

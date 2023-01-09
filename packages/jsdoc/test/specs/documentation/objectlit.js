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
describe('object literals', () => {
  describe('When a child of an objlit has no @name or @memberof tags', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/objectlit.js');
    const found = docSet.getByLongname('tools.serialiser.value');

    it('should have a doclet with the correct longname', () => {
      expect(found).toBeArrayOfSize(1);
    });

    it('should have a doclet with the correct name', () => {
      expect(found[0].name).toBe('value');
    });

    it('should have the correct memberof', () => {
      expect(found[0].memberof).toBe('tools.serialiser');
    });

    it('should have a static scope', () => {
      expect(found[0].scope).toBe('static');
    });
  });

  describe('When a parent of an objlit has no documentation', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/objectlit2.js');
    const found = docSet.getByLongname('position.axis.x');

    it('should have a doclet with the correct longname', () => {
      expect(found).toBeArrayOfSize(1);
    });

    it('should have a doclet with the correct name', () => {
      expect(found[0].name).toBe('x');
    });

    it('should have the correct memberof', () => {
      expect(found[0].memberof).toBe('position.axis');
    });

    it('should have a static scope', () => {
      expect(found[0].scope).toBe('static');
    });
  });

  describe("When an object literal's property names must be escaped in a regexp", () => {
    function loadDocSet() {
      const docSet = jsdoc.getDocSetFromFile('test/fixtures/objectlit3.js');

      return docSet.getByLongname('tokens."(".before');
    }

    it('should not throw an error when creating a doclet', () => {
      expect(loadDocSet).not.toThrow();
    });

    it('should have a doclet with the correct name', () => {
      const found = loadDocSet();

      expect(found[0].name).toBe('before');
    });

    it('should have a doclet with the correct memberof', () => {
      const found = loadDocSet();

      expect(found[0].memberof).toBe('tokens."("');
    });
  });
});

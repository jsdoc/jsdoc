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
describe('scope tags', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/scopetags.js');

  // @inner, @instance, @static (@global has its own file)
  describe('@inner tag', () => {
    const doc = docSet.getByLongname('module:scopetags~myInner')[0];

    it("sets the doclet's 'scope' property to 'inner'", () => {
      expect(doc.scope).toBe('inner');
    });
  });

  describe('@instance tag', () => {
    const doc = docSet.getByLongname('module:scopetags#myInstance')[0];

    it("sets the doclet's 'scope' property to 'instance'", () => {
      expect(doc.scope).toBe('instance');
    });
  });

  describe('@static tag', () => {
    const doc = docSet.getByLongname('module:scopetags.myStatic')[0];

    it("sets the doclet's 'scope' property to 'static'", () => {
      expect(doc.scope).toBe('static');
    });
  });
});

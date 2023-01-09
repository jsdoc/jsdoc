/*
  Copyright 2017 the JSDoc Authors.

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
function filter({ undocumented }) {
  return !undocumented;
}

describe('module classes', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduleclasses.js');
  const bar = docSet.getByLongname('module:foo~Bar').filter(filter)[0];
  const barBar = docSet.getByLongname('module:foo~Bar#bar')[0];
  const baz = docSet.getByLongname('module:foo.Baz').filter(filter)[0];
  const bazBaz = docSet.getByLongname('module:foo.Baz#baz')[0];

  describe('inner classes', () => {
    it('should merge the constructor doclet with the class doclet', () => {
      expect(bar.description).toBe('Construct a Bar.');
      expect(bar.classdesc).toBe('Bar class.');
    });

    it('should correctly mark the scope of instance properties', () => {
      expect(barBar.scope).toBe('instance');
    });
  });

  describe('exported classes', () => {
    it('should merge the constructor doclet with the class doclet', () => {
      expect(baz.description).toBe('Construct a Baz.');
      expect(baz.classdesc).toBe('Baz class.');
    });

    it('should correctly mark the scope of instance properties', () => {
      expect(bazBaz.scope).toBe('instance');
    });
  });
});

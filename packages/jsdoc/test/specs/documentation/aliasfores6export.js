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

describe('aliased default export for ES6 module', () => {
  describe('no `@module` tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/aliasfores6export.js');

    it('uses the alias for the class to create longnames for its methods', () => {
      const empty = docSet.getByLongname('module:fruits.Basket#empty')[0];

      expect(empty).toBeObject();
      expect(empty.memberof).toBe('module:fruits.Basket');
      expect(empty.name).toBe('empty');
    });

    it('uses the alias for the class to create longnames for its other members', () => {
      const material = docSet.getByLongname('module:fruits.Basket#material')[0];

      expect(material).toBeObject();
      expect(material.memberof).toBe('module:fruits.Basket');
      expect(material.name).toBe('material');
    });
  });

  describe('`@module` tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/aliasfores6export2.js');

    it('uses the alias for the class to create longnames for its methods', () => {
      const empty = docSet.getByLongname('module:fruits.Basket#empty')[0];

      expect(empty).toBeObject();
      expect(empty.memberof).toBe('module:fruits.Basket');
      expect(empty.name).toBe('empty');
    });

    it('uses the alias for the class to create longnames for its other members', () => {
      const material = docSet.getByLongname('module:fruits.Basket#material')[0];

      expect(material).toBeObject();
      expect(material.memberof).toBe('module:fruits.Basket');
      expect(material.name).toBe('material');
    });

    it('uses the correct longname if there is a nested alias', () => {
      const addSock = docSet.getByLongname('module:laundry.Basket#addSock')[0];

      expect(addSock).toBeObject();
      expect(addSock.memberof).toBe('module:laundry.Basket');
      expect(addSock.name).toBe('addSock');
    });

    it('uses the correct longname if a method with no alias follows a method with an alias', () => {
      const fill = docSet.getByLongname('module:fruits.Basket#fill')[0];

      expect(fill).toBeObject();
      expect(fill.memberof).toBe('module:fruits.Basket');
      expect(fill.name).toBe('fill');
    });
  });
});

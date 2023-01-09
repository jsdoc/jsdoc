/*
  Copyright 2012 the JSDoc Authors.

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
describe('When a getter or setter is part of a class', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/getset.js');

  describe('in an object literal', () => {
    const name = docSet.getByLongname('Person#name');
    const age = docSet.getByLongname('Person#age');

    it('should have a doclet with the correct longname', () => {
      expect(name).toBeArrayOfSize(2);
      expect(age).toBeArrayOfSize(1);
    });

    it('should have a doclet with the correct name', () => {
      expect(name[0].name).toBe('name');
      expect(name[1].name).toBe('name');
      expect(age[0].name).toBe('age');
    });

    it('should have a doclet with the correct kind', () => {
      expect(name[0].kind).toBe('member');
      expect(name[1].kind).toBe('member');
      expect(age[0].kind).toBe('member');
    });

    it('should have a doclet with the correct memberof', () => {
      expect(name[0].memberof).toBe('Person');
      expect(name[1].memberof).toBe('Person');
      expect(age[0].memberof).toBe('Person');
    });
  });

  describe('in an ES 2015 class', () => {
    const docSet2 = jsdoc.getDocSetFromFile('test/fixtures/getset2.js');
    const location = docSet2.getByLongname('Employee#location');

    it('should have a doclet with the correct longname', () => {
      expect(location).toBeArrayOfSize(2);
    });

    it('should have a doclet with the correct name', () => {
      expect(location[0].name).toBe('location');
      expect(location[1].name).toBe('location');
    });

    it('should have a doclet with the correct kind', () => {
      expect(location[0].kind).toBe('member');
      expect(location[1].kind).toBe('member');
    });

    it('should have a doclet with the correct memberof', () => {
      expect(location[0].memberof).toBe('Employee');
      expect(location[1].memberof).toBe('Employee');
    });
  });
});

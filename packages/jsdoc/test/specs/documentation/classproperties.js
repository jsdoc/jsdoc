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
describe('class properties', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/classproperties.js');
  const b = docSet.getByLongname('A#b')[0];
  const c = docSet.getByLongname('A##c')[0];
  const d = docSet.getByLongname('A#d')[0];

  it('should assign the correct name, memberof, and scope to class properties', () => {
    expect(b.name).toBe('b');
    expect(b.memberof).toBe('A');
    expect(b.scope).toBe('instance');
  });

  it(
    'should assign the correct name, memberof, scope, and access type to class private ' +
      'properties',
    () => {
      expect(c.name).toBe('#c');
      expect(c.memberof).toBe('A');
      expect(c.scope).toBe('instance');
      expect(c.access).toBe('private');
    }
  );

  it(
    'should assign the correct name, memberof, and scope to class properties with no value ' +
      'assigned',
    () => {
      expect(d.name).toBe('d');
      expect(d.memberof).toBe('A');
      expect(d.scope).toBe('instance');
    }
  );
});

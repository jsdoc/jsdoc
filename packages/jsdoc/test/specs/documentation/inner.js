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
describe('when a documented var memeber is inside a named function', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/inner.js');
  const found1 = docSet.getByLongname('sendMessage~encoding');
  const found2 = docSet.getByLongname('sendMessage~encrypt');

  it('A doclet with the correct longname should be found', () => {
    expect(found1).toBeArrayOfSize(1);
    expect(found2).toBeArrayOfSize(1);
  });

  it('The short name should be correct', () => {
    expect(found1[0].name).toBe('encoding');
    expect(found2[0].name).toBe('encrypt');
  });

  it('The memberof should be correct', () => {
    expect(found1[0].memberof).toBe('sendMessage');
    expect(found2[0].memberof).toBe('sendMessage');
  });
  it('The scope should default to "inner"', () => {
    expect(found1[0].scope).toBe('inner');
    expect(found2[0].scope).toBe('inner');
  });
});

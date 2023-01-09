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
describe('generator functions', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/generators.js');
  const startsAt0 = docSet.getByLongname('startsAt0')[0];
  const startsAt1 = docSet.getByLongname('startsAt1')[0];
  const startsAt2 = docSet.getByLongname('Generator#startsAt2')[0];

  it('should flag generator functions', () => {
    expect(startsAt0.generator).toBeTrue();
  });

  it('should flag generator functions assigned to variables', () => {
    expect(startsAt1.generator).toBeTrue();
  });

  it('should flag generator functions that are method definitions', () => {
    expect(startsAt2.generator).toBeTrue();
  });
});

/*
  Copyright 2025 the JSDoc Authors.

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

describe('symbols exported by an ES2015 module', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduleexport.js');

  it('uses the correct scopes when exported objects have properties', () => {
    const chocolate = docSet.getByLongname('module:icecream.FLAVORS.CHOCOLATE')[0];
    const vanilla = docSet.getByLongname('module:icecream.FLAVORS.VANILLA')[0];

    expect(chocolate).toBeObject();
    expect(vanilla).toBeObject();
  });
});

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
describe('inner scope for modules', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduleinner.js');
  const fooIn = docSet.getByLongname('module:my/module~fooIn')[0];
  const fooOut = docSet.getByLongname('module:my/module~fooOut')[0];

  it('When a function appears in the topscope of a module, the symbol is documented as an inner member of that module.', () => {
    expect(typeof fooOut).toBe('object');
    expect(fooOut.longname).toBe('module:my/module~fooOut');

    expect(typeof fooIn).toBe('object');
    expect(fooIn.longname).toBe('module:my/module~fooIn');
  });
});

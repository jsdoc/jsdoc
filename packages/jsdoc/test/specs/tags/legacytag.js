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
describe('@legacy tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/legacytag.js');
  const foo = docSet.getByLongname('foo')[0];
  const bar = docSet.getByLongname('bar')[0];

  it('When a symbol has a @legacy tag with no value, the doclet has a legacy property set to true.', () => {
    expect(foo.legacy).toBeTrue();
  });

  it('When a symbol has a @legacy tag with a value, the doclet has a legacy property set to that value.', () => {
    expect(bar.legacy).toBe('use bar-v2 instead');
  });
});

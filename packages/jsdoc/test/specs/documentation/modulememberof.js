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

describe('memberof a module', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/modulememberof.js');

  it('uses the correct name and longname for an exported symbol with a @memberof tag', () => {
    const bar = docSet.getByLongname('module:foo.bar').filter((d) => !d.undocumented)[0];

    expect(bar).toBeObject();
    expect(bar.name).toBe('bar');
  });
});

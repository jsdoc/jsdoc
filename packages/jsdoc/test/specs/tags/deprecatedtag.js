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
describe('@deprecated tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/deprecatedtag.js');
  const foo = docSet.getByLongname('foo')[0];
  const bar = docSet.getByLongname('bar')[0];

  it('When a symbol has a @deprecated tag with no value, the doclet has a deprecated property set to true.', () => {
    expect(foo.deprecated).toBeTrue();
  });

  it('When a symbol has a @deprecated tag with a value, the doclet has a deprecated property set to that value.', () => {
    expect(bar.deprecated).toBe('since version 2.0');
  });
});

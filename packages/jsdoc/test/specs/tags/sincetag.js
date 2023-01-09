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
describe('@since tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/sincetag.js');
  const foo = docSet.getByLongname('foo')[0];

  it('When a symbol has an @since tag, the doclet has a since property set to true.', () => {
    expect(foo.since).toBe('1.2.3');
  });
});

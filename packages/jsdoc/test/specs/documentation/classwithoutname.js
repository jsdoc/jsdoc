/*
  Copyright 2014 the JSDoc Authors.

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
describe('class without a name', () => {
  const docSet = jsdoc
    .getDocSetFromFile('test/fixtures/classwithoutname.js')
    .doclets.filter(({ name }) => name === '');

  it('When the doclet for a class has an empty name, it should also have an empty longname', () => {
    expect(docSet).toBeArray();
    expect(docSet.length).toBe(1);
    expect(docSet[0].description).toBe('Create an instance of MyClass.');
    expect(docSet[0].longname).toBe('');
  });
});

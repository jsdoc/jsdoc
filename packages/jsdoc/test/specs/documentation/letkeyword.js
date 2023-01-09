/*
  Copyright 2013 the JSDoc Authors.

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
describe('let keyword', () => {
  function getDocSet() {
    return jsdoc.getDocSetFromFile('test/fixtures/letkeyword.js');
  }

  it('should be able to compile JS files that contain the "let" keyword', () => {
    expect(getDocSet).not.toThrow();
  });

  it('should correctly recognize a module defined with the "let" keyword', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/letkeyword.js');
    const exampleModule = docSet.getByLongname('module:exampleModule');

    expect(exampleModule).toBeArrayOfSize(1);
  });

  it('should correctly recognize members of a module defined with the "let" keyword', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/letkeyword.js');
    const exampleMethod = docSet.getByLongname('module:exampleModule.exampleMethod');

    expect(exampleMethod).toBeArrayOfSize(1);
  });
});

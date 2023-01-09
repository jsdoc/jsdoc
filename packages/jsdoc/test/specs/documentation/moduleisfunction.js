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
describe('module that exports a function that is not a constructor', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduleisfunction.js');
  const functions = docSet.doclets.filter(({ kind }) => kind === 'function');

  it('should include one doclet whose kind is "function"', () => {
    expect(functions).toBeArrayOfSize(1);
    expect(functions[0].kind).toBe('function');
  });

  describe('function doclet', () => {
    it('should not include a "scope" property', () => {
      expect(functions[0].scope).not.toBeDefined();
    });

    it('should not include a "memberof" property', () => {
      expect(functions[0].memberof).not.toBeDefined();
    });
  });
});

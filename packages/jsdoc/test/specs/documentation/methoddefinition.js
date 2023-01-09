/*
  Copyright 2015 the JSDoc Authors.

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
describe('method definition inside a class declaration', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/methoddefinition.js');
  const runMethod = docSet.getByLongname('Test#run')[0];
  const staticRunMethod = docSet.getByLongname('Test.run')[0];

  it('methods should have documentation comments', () => {
    expect(runMethod).toBeObject();
    expect(runMethod.description).toBe('Document me.');
    expect(runMethod.kind).toBe('function');

    expect(staticRunMethod).toBeObject();
    expect(staticRunMethod.description).toBe('Static document me.');
    expect(staticRunMethod.kind).toBe('function');
  });
});

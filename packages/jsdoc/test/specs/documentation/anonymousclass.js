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
describe('anonymous class', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/anonymousclass.js');
  const klass = docSet.getByLongname('module:test').filter(({ undocumented }) => !undocumented)[1];
  const foo = docSet.getByLongname('module:test#foo')[0];
  const klassTest = docSet.getByLongname('module:test#test')[0];
  const klassStaticTest = docSet.getByLongname('module:test.staticTest')[0];

  it('should merge the constructor docs with the class docs', () => {
    expect(klass.description).toBe('Test constructor');
  });

  it('should use the correct longname for instance properties', () => {
    expect(foo.description).toBe('Test member');
  });

  it('should use the correct longname for instance methods', () => {
    expect(klassTest.description).toBe('Test method');
  });

  it('should use the correct longname for static methods', () => {
    expect(klassStaticTest.description).toBe('Test static method');
  });
});

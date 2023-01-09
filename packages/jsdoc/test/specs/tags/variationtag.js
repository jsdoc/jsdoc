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
describe('@variation tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/variationtag.js');
  const someObject2 = docSet.getByLongname('someObject(2)')[0];
  const someObject2Method = docSet.getByLongname('someObject(2).someMethod')[0];
  const someObject3 = docSet.getByLongname('someObject(3)')[0];

  it('When a symbol has a variation tag, the longname includes that variation.', () => {
    expect(someObject2.longname).toBe('someObject(2)');
  });

  it('When a symbol is a member of a variation, the longname includes the variation.', () => {
    expect(someObject2Method.longname).toBe('someObject(2).someMethod');
  });

  it("When the variation tag's value is enclosed in parentheses, the parentheses are removed", () => {
    expect(someObject3).toBeObject();
    expect(someObject3.variation).toBe('3');
  });
});

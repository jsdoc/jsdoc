/*
  Copyright 2017 the JSDoc Authors.

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
describe('@yields tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/yieldstag.js');
  const fibonacci = docSet.getByLongname('fibonacci')[0];
  const fibonacci2 = docSet.getByLongname('fibonacci2')[0];
  const fibonacci3 = docSet.getByLongname('fibonacci3')[0];

  it("should add the type and description to the doclet's `yields` property", () => {
    expect(fibonacci.yields).toBeArrayOfSize(1);
    expect(fibonacci.yields[0].type.names.join(', ')).toBe('number');
    expect(fibonacci.yields[0].description).toBe('The next number in the Fibonacci sequence.');
  });

  it('should work when only a description is present', () => {
    expect(fibonacci2.yields).toBeArrayOfSize(1);
    expect(fibonacci2.yields[0].type).toBeUndefined();
    expect(fibonacci2.yields[0].description).toBe('The next number in the Fibonacci sequence.');
  });

  it('should work when only a type is present', () => {
    expect(fibonacci3.yields).toBeArrayOfSize(1);
    expect(fibonacci3.yields[0].type.names.join(', ')).toBe('number');
    expect(fibonacci3.yields[0].description).toBeUndefined();
  });
});

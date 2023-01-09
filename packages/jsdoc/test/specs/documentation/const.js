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
describe('const declarations', () => {
  it('should automatically set the doclet.kind to "constant" for const declarations', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/constanttag.js');
    const myPocket = docSet.getByLongname('myPocket')[0];

    expect(myPocket.kind).toBe('constant');
  });

  describe('ES 2015 only', () => {
    it('should not override kind="class" when a const is autodetected', () => {
      const docSet = jsdoc.getDocSetFromFile('test/fixtures/constanttag2.js');
      const foo = docSet.getByLongname('Foo')[0];

      expect(foo.kind).toBe('class');
    });
  });
});

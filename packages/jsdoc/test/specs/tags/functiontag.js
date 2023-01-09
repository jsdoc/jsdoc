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
describe('@function tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/functiontag.js');
  const doc = docSet.getByLongname('Foo')[0];
  const doc2 = docSet.getByLongname('Bar')[0];

  it('sets the doclet\'s kind to "function"', () => {
    expect(doc.kind).toBe('function');
    expect(doc2.kind).toBe('function');
  });

  it("sets the doclet's name to the tag value, if provided", () => {
    expect(doc.name).toBe('Foo');
    expect(doc2.name).toBe('Bar');
  });

  // parameter etc tests take place elsewhere: on its own, all @func does is
  // set doclet.kind to function and sets the doclet's name.
});

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
describe('@exception tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/exceptiontag.js');
  const foo = docSet.getByLongname('foo')[0];
  const bar = docSet.getByLongname('bar')[0];
  const pez = docSet.getByLongname('pez')[0];
  const cos = docSet.getByLongname('cos')[0];

  it('When a symbol has an @exception tag, the doclet has a exception property set to that value.', () => {
    expect(foo.exceptions).toBeArrayOfSize(1);
    expect(bar.exceptions).toBeArrayOfSize(1);
    expect(pez.exceptions).toBeArrayOfSize(1);
  });

  it('The description and type for the @exception tag are not added to the parent doclet.', () => {
    expect(pez.description).not.toBeDefined();
    expect(pez.type).toBeUndefined();
  });

  it('When a symbol has a description, plus an @exception tag with a description, neither description overwrites the other.', () => {
    expect(cos.description).toBe('A description of the function.');
    expect(cos.exceptions).toBeArrayOfSize(1);
    expect(cos.exceptions[0].description).toBe('A description of the exception.');
  });
});

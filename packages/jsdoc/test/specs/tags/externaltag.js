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
describe('@external tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/externaltag.js');
  // TODO: why don't we test anything from docSet2?
  // var docSet2 = jsdoc.getDocSetFromFile('test/fixtures/externaltag2.js');
  const docSet3 = jsdoc.getDocSetFromFile('test/fixtures/externaltag3.js');

  const fooBarBazExternal = docSet3.getByLongname('external:"foo.bar.baz"')[0];
  const jQueryExternal = docSet.getByLongname('external:"jQuery.fn"')[0];
  const stringExternal = docSet.getByLongname('external:String')[0];

  it('An @external should have its own doclet', () => {
    expect(stringExternal).toBeObject();
  });

  it("An @external's name should be the same as its longname, minus 'external:'", () => {
    expect(stringExternal.name).toBe('String');
  });

  it('An @external should have its kind set to "external"', () => {
    expect(stringExternal.kind).toBe('external');
  });

  it('An @external with a quoted name should get the correct name', () => {
    expect(jQueryExternal).toBeObject();
    expect(jQueryExternal.name).toBe('"jQuery.fn"');
  });

  // TODO: enable after jsdoc3/jsdoc#652 is fixed
  xit('An @external should work correctly when the type is in curly braces', () => {
    expect(fooBarBazExternal).toBeObject();
    expect(fooBarBazExternal.name).toBe('"foo.bar.baz"');
  });
});

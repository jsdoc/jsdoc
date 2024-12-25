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

describe('@type tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/typetag.js');

  it("When a symbol has a @type tag, the doclet has a type property set to that value's type.", () => {
    const foo = docSet.getByLongname('foo')[0];

    expect(foo.type).toBeObject();
    expect(foo.type.names).toBeArrayOfStrings();
    expect(foo.type.names.join(', ')).toBe('string, Array<string>');
  });

  it("When a symbol has a @type tag set to a plain string, the doclet has a type property set to that value's type.", () => {
    const bar = docSet.getByLongname('bar')[0];

    expect(bar.type.names.join(', ')).toBe('integer');
  });

  it('When a symbol has a @type tag for a non-nullable type, the doclet indicates that the type is non-nullable', () => {
    const baz = docSet.getByLongname('baz')[0];

    expect(baz.nullable).toBeFalse();
  });

  describe('JSDoc tags', () => {
    afterEach(() => {
      jsdoc.restoreTagDictionary();
    });

    it('When JSDoc tags are enabled, the @type tag does not accept a description.', () => {
      function getDocSet() {
        jsdoc.replaceTagDictionary('jsdoc');
        jsdoc.getDocSetFromFile('test/fixtures/typetag2.js');
      }

      expect(jsdoc.didLog(getDocSet, 'warn')).toBeTrue();
    });
  });

  describe('Closure tags', () => {
    afterEach(() => {
      jsdoc.restoreTagDictionary();
    });

    it('When Closure tags are enabled, the @type tag accepts a description.', () => {
      function getDocSet() {
        jsdoc.replaceTagDictionary('closure');
        jsdoc.getDocSetFromFile('test/fixtures/typetag2.js');
      }

      expect(jsdoc.didLog(getDocSet, 'warn')).toBeFalse();
    });

    it('When Closure tags are enabled, the @type tag captures the description.', () => {
      let stringOrNumber;
      let typeDocs;

      jsdoc.replaceTagDictionary('closure');

      typeDocs = jsdoc.getDocSetFromFile('test/fixtures/typetag2.js');
      stringOrNumber = typeDocs.getByLongname('stringOrNumber')[0];

      expect(stringOrNumber).toBeObject();
      expect(stringOrNumber.description).toBe('A string or a number.');
    });
  });
});

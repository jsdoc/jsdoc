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
describe('@private tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/privatetag.js');
  const foo = docSet.getByLongname('Foo')[0];
  const bar = docSet.getByLongname('Foo#bar')[0];

  it('When a symbol has a @private tag, the doclet has an `access` property set to `private`.', () => {
    expect(foo.access).toBe('private');
  });

  it(
    'When a symbol tagged with @private has members, the members do not inherit the @private ' +
      'tag.',
    () => {
      expect(bar.access).toBeUndefined();
    }
  );

  describe('JSDoc tags', () => {
    afterEach(() => {
      jsdoc.restoreTagDictionary();
    });

    it('When JSDoc tags are enabled, the @private tag does not accept a value.', () => {
      function getDocSet() {
        jsdoc.replaceTagDictionary('jsdoc');
        jsdoc.getDocSetFromFile('test/fixtures/privatetag2.js');
      }

      expect(jsdoc.didLog(getDocSet, 'warn')).toBeTrue();
    });
  });

  describe('Closure Compiler tags', () => {
    beforeEach(() => {
      jsdoc.replaceTagDictionary('closure');
    });

    afterEach(() => {
      jsdoc.restoreTagDictionary();
    });

    it('When Closure Compiler tags are enabled, the @private tag accepts a type expression.', () => {
      function getDocSet() {
        jsdoc.getDocSetFromFile('test/fixtures/privatetag2.js');
      }

      expect(jsdoc.didLog(getDocSet, 'warn')).toBeFalse();
    });

    it('When Closure Compiler tags are enabled, the @private tag parses the type expression.', () => {
      let connectionPorts;
      let privateDocs;

      privateDocs = jsdoc.getDocSetFromFile('test/fixtures/privatetag2.js');
      connectionPorts = privateDocs.getByLongname('connectionPorts')[0];

      expect(connectionPorts).toBeObject();
      expect(connectionPorts.access).toBe('private');

      expect(connectionPorts.type).toBeObject();
      expect(connectionPorts.type.names).toBeArrayOfSize(1);
      expect(connectionPorts.type.names[0]).toBe('Object.<string, number>');
    });
  });
});

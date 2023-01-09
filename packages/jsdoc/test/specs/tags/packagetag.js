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
describe('@package tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/packagetag.js');
  const foo = docSet.getByLongname('foo')[0];

  it('When a symbol has a @package tag, the doclet has an `access` property set to `package`.', () => {
    expect(foo.access).toBe('package');
  });

  describe('JSDoc tags', () => {
    afterEach(() => {
      jsdoc.restoreTagDictionary();
    });

    it('When JSDoc tags are enabled, the @package tag does not accept a value.', () => {
      function getDocSet() {
        jsdoc.replaceTagDictionary('jsdoc');
        jsdoc.getDocSetFromFile('test/fixtures/packagetag2.js');
      }

      expect(jsdoc.didLog(getDocSet, 'warn')).toBeTrue();
    });
  });

  describe('Closure Compiler tags', () => {
    afterEach(() => {
      jsdoc.restoreTagDictionary();
    });

    it('When Closure Compiler tags are enabled, the @package tag accepts a type expression.', () => {
      function getDocSet() {
        jsdoc.replaceTagDictionary('closure');
        jsdoc.getDocSetFromFile('test/fixtures/packagetag2.js');
      }

      expect(jsdoc.didLog(getDocSet, 'warn')).toBeFalse();
    });

    it('When Closure Compiler tags are enabled, the @package tag parses the type expression.', () => {
      let connectionPorts;
      let privateDocs;

      jsdoc.replaceTagDictionary('closure');

      privateDocs = jsdoc.getDocSetFromFile('test/fixtures/packagetag2.js');
      connectionPorts = privateDocs.getByLongname('connectionPorts')[0];

      expect(connectionPorts).toBeObject();
      expect(connectionPorts.access).toBe('package');

      expect(connectionPorts.type).toBeObject();
      expect(connectionPorts.type.names).toBeArrayOfSize(1);
      expect(connectionPorts.type.names[0]).toBe('Object.<string, number>');
    });
  });
});

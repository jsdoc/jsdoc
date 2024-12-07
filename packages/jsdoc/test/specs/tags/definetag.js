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

describe('@define tag', () => {
  describe('JSDoc tags', () => {
    const { config } = jsdoc.env;

    const allowUnknownTags = Boolean(config.tags.allowUnknownTags);

    afterEach(() => {
      jsdoc.restoreTagDictionary();
      config.tags.allowUnknownTags = allowUnknownTags;
    });

    it('should not recognize the @define tag', () => {
      function getDocSet() {
        config.tags.allowUnknownTags = false;
        jsdoc.replaceTagDictionary('jsdoc');
        jsdoc.getDocSetFromFile('test/fixtures/definetag.js');
      }

      expect(jsdoc.didLog(getDocSet, 'error')).toBeTrue();
    });
  });

  describe('Closure Compiler tags', () => {
    beforeEach(() => {
      jsdoc.replaceTagDictionary('closure');
    });

    afterEach(() => {
      jsdoc.restoreTagDictionary();
    });

    it('should recognize the @define tag', () => {
      const docSet = jsdoc.getDocSetFromFile('test/fixtures/definetag.js');
      const enableDebug = docSet.getByLongname('ENABLE_DEBUG')[0];

      expect(enableDebug.kind).toBe('constant');
      expect(enableDebug.type).toBeObject();
      expect(enableDebug.type.names[0]).toBe('boolean');
    });
  });
});

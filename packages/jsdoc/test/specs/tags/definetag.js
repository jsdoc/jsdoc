describe('@define tag', () => {
  describe('JSDoc tags', () => {
    const config = jsdoc.deps.get('config');

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

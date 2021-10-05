describe('jsdoc/tag/dictionary/definitions', () => {
  const definitions = require('jsdoc/tag/dictionary/definitions');

  it('has a baseTags object', () => {
    expect(definitions.baseTags).toBeObject();
  });

  it('has a closureTags object', () => {
    expect(definitions.closureTags).toBeObject();
  });

  it('has an internalTags object', () => {
    expect(definitions.internalTags).toBeObject();
  });

  it('has a jsdocTags object', () => {
    expect(definitions.jsdocTags).toBeObject();
  });

  describe('baseTags', () => {
    // Nothing to test except which tags are on the list, which would duplicate the code.
  });

  describe('closureTags', () => {
    // Nothing to test except which tags are on the list, which would duplicate the code.
  });

  describe('internalTags', () => {
    // Nothing to test except which tags are on the list, which would duplicate the code.
  });

  describe('jsdocTags', () => {
    // Nothing to test except which tags are on the list, which would duplicate the code.
  });
});

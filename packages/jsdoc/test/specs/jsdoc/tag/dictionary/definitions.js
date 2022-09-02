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

  // Nothing to test in these objects except which tags are listed, which would duplicate the code.
});

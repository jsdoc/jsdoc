const salty = require('../../index');

describe('@jsdoc/salty', () => {
  it('is an object', () => {
    expect(salty).toBeObject();
  });

  describe('taffy', () => {
    it('is a function', () => {
      expect(salty.taffy).toBeFunction();
    });

    // The tests for lib/salty test the function's behavior.
    it('returns a function', () => {
      expect(salty.taffy()).toBeFunction();
    });
  });
});

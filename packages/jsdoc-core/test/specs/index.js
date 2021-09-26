const core = require('../../index');

describe('@jsdoc/core', () => {
  it('is an object', () => {
    expect(core).toBeObject();
  });

  describe('config', () => {
    it('is lib/config', () => {
      const config = require('../../lib/config');

      expect(core.config).toBe(config);
    });
  });

  describe('dependencies', () => {
    it('is lib/dependencies', () => {
      const dependencies = require('../../lib/dependencies');

      expect(core.dependencies).toBe(dependencies);
    });
  });

  describe('name', () => {
    it('is lib/name', () => {
      const name = require('../../lib/name');

      expect(core.name).toBe(name);
    });
  });
});

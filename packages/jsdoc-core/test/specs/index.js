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

  describe('Dependencies', () => {
    it('is lib/dependencies', () => {
      const Dependencies = require('../../lib/dependencies');

      expect(core.Dependencies).toBe(Dependencies);
    });
  });

  describe('env', () => {
    it('is lib/env', () => {
      const env = require('../../lib/env');

      expect(core.env).toBe(env);
    });
  });

  describe('name', () => {
    it('is lib/name', () => {
      const name = require('../../lib/name');

      expect(core.name).toBe(name);
    });
  });
});

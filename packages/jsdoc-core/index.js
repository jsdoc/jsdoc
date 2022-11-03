/**
 * Core functionality for JSDoc.
 *
 * @module @jsdoc/core
 */

const config = require('./lib/config');
const Dependencies = require('./lib/dependencies');
const env = require('./lib/env');
const name = require('./lib/name');

module.exports = {
  config,
  Dependencies,
  env,
  name,
};

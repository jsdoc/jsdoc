/**
 * Core functionality for JSDoc.
 *
 * @module @jsdoc/core
 */

const config = require('./lib/config');
const Dependencies = require('./lib/dependencies');
const name = require('./lib/name');

module.exports = {
  config,
  Dependencies,
  name,
};

/**
 * Core functionality for JSDoc.
 *
 * @module @jsdoc/core
 */

const config = require('./lib/config');
const Engine = require('./lib/engine');
const util = require('./lib/util');

module.exports = {
    config,
    Engine,
    util
};

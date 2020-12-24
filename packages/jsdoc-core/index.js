/**
 * Core functionality for JSDoc.
 *
 * @module @jsdoc/core
 */

const config = require('./lib/config');
const name = require('./lib/name');
const { Syntax } = require('./lib/syntax');

module.exports = {
    config,
    name,
    Syntax
};

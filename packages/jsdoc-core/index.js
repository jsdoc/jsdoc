/**
 * Core functionality for JSDoc.
 *
 * @module @jsdoc/core
 */

const cast = require('./lib/cast');
const config = require('./lib/config');
const fs = require('./lib/fs');

module.exports = {
    cast,
    config,
    fs
};

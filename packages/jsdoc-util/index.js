/**
 * Utility modules for JSDoc.
 *
 * @module @jsdoc/util
 */

const cast = require('./lib/cast');
const EventBus = require('./lib/bus');
const fs = require('./lib/fs');
const log = require('./lib/log');

module.exports = {
    cast,
    EventBus,
    fs,
    log
};

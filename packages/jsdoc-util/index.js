/**
 * Utility modules for JSDoc.
 *
 * @module @jsdoc/util
 */

const cast = require('./lib/cast');
const EventBus = require('./lib/bus');
const fs = require('./lib/fs');

module.exports = {
    cast,
    EventBus,
    fs
};

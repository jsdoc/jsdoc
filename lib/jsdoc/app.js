'use strict';

/**
 * Objects that are shared across the entire application.
 *
 * @deprecated As of JSDoc 3.4.0. Do not use this module. It will be removed in a future release.
 * @module jsdoc/app
 */
module.exports = {
    /**
     * Namespace for shared objects.
     *
     * @namespace
     * @type {Object}
     */
    jsdoc: {
        name: require('jsdoc/name'),
        parser: null,
        scanner: new (require('jsdoc/src/scanner').Scanner)()
    }
};

/*global Packages: true */
/**
 * Helper functions to enable JSDoc to run on multiple JavaScript virtual machines.
 * @module jsdoc/util/vm
 */

// These strings represent directory names; do not modify them!
/** @private */
const RHINO = exports.RHINO = 'rhino';
/** @private */
const NODEJS = exports.NODEJS = 'nodejs';

/**
 * The JavaScript VM that is executing JSDoc:
 *
 * + `module:jsdoc/util/vm.RHINO`: Mozilla Rhino.
 * + `module:jsdoc/util/vm.NODEJS`: Node.js (not currently supported).
 */
var vm = exports.vm = (function() {
    if (Packages && typeof Packages === 'object' &&
        Object.prototype.toString.call(Packages) === '[object JavaPackage]') {
        return RHINO;
    } else if ( require && require.main && module && (require.main === module) ) {
        return NODEJS;
    } else {
        // unknown VM
        throw new Error('Unable to identify the current JavaScript VM.');
    }
})();

/**
 * Load the VM-specific implementation of a module.
 *
 * @param {string} modulePath - The relative path to the module. Use the same format as when calling
 * `require()`.
 * @return {object} An object containing VM-specific functions for the requested module.
 */
exports.getModule = function(modulePath) {
    return require( [__dirname, vm, modulePath].join('/') );
};

/**
 * Check whether Mozilla Rhino is running JSDoc.
 * @return {boolean} Set to `true` if the current VM is Mozilla Rhino.
 */
exports.isRhino = function() {
    return vm === RHINO;
};

/**
 * Check whether Node.js is running JSDoc. (Node.js is not currently supported.)
 * @return {boolean} Set to `true` if the current VM is Node.js.
 */
exports.isNodejs = function() {
    return vm === NODEJS;
};

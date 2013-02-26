/*global Packages: true */
/**
 * Helper functions to enable JSDoc to run on multiple JavaScript virtual machines.
 * @module jsdoc/util/vm
 */

 var os = require('os');

// These strings represent directory names; do not modify them!
/** @private */
const RHINO = exports.RHINO = 'rhino';
/** @private */
const NODEJS = exports.NODEJS = 'nodejs';

// hacky conversion from Windows path to URI
function pathToUri(filepath) {
    var uri = filepath;

    // get drive
    var drive = uri.match(/^[A-Za-z]/)[0] || '';
    // strip drive/colon (if present; UNC paths won't have either)
    uri = uri.replace(/^:?([A-Za-z]\:)?/, '');
    // replace spaces with %20
    uri = uri.replace(/\s/g, '%20');
    // prepend drive (if present)
    if (drive) {
        uri = drive + ':' + uri;
    }
    // prepend URI scheme
    uri = 'file:/' + uri;

    return uri;
}

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
    modulePath = [__dirname, vm, modulePath].join('/').replace(/ /g, '%20');
    if (os.platform() === 'win32') {
        modulePath = pathToUri(modulePath);
    }
    
    return require(modulePath);
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

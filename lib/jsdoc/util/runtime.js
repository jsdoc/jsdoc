/*global Packages: true */
/**
 * Helper functions to enable JSDoc to run on multiple JavaScript runtimes.
 * 
 * @module jsdoc/util/runtime
 * @private
 */

 var os = require('os');

// These strings represent directory names; do not modify them!
/** @private */
var RHINO = exports.RHINO = 'rhino';
/** @private */
var NODE = exports.NODE = 'node';

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
 * The JavaScript runtime that is executing JSDoc:
 *
 * + `module:jsdoc/util/runtime~RHINO`: Mozilla Rhino.
 * + `module:jsdoc/util/runtime~NODE`: Node.js (not currently supported).
 *
 * @private
 */
var runtime = (function() {
    if (Packages && typeof Packages === 'object' &&
        Object.prototype.toString.call(Packages) === '[object JavaPackage]') {
        return RHINO;
    } else if ( require && require.main && module && (require.main === module) ) {
        return NODE;
    } else {
        // unknown runtime
        throw new Error('Unable to identify the current JavaScript runtime.');
    }
})();

/**
 * Get the require path for the runtime-specific implementation of a module.
 *
 * @param {string} partialPath - The partial path to the module. Use the same format as when calling
 * `require()`.
 * @return {object} The require path for the runtime-specific implementation of the module.
 */
exports.getModulePath = function(partialPath) {
    var modulePath = [__dirname, runtime, partialPath].join('/').replace(/ /g, '%20');
    if (os.platform() === 'win32') {
        modulePath = pathToUri(modulePath);
    }
    
    return modulePath;
};

/**
 * Retrieve the identifier for the current JavaScript runtime.
 *
 * @private
 * @return {string} The runtime identifier.
 */
exports.getRuntime = function() {
    return runtime;
};

/**
 * Check whether Mozilla Rhino is running JSDoc.
 * @return {boolean} Set to `true` if the current runtime is Mozilla Rhino.
 */
exports.isRhino = function() {
    return runtime === RHINO;
};

/**
 * Check whether Node.js is running JSDoc. (Node.js is not currently supported.)
 * @return {boolean} Set to `true` if the current runtime is Node.js.
 */
exports.isNode = function() {
    return runtime === NODE;
};

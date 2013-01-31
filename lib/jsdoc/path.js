/**
 * Extended version of the standard `path` module.
 * @module jsdoc/path
 */

var fs = require('fs');
var path = require('path');
var vm = require('jsdoc/util/vm');


function prefixReducer(previousPath, current) {
    var currentPath = [];

    // if previousPath is defined, but has zero length, there's no common prefix; move along
    if (previousPath && !previousPath.length) {
        return currentPath;
    }

    currentPath = path.resolve( process.cwd(), path.dirname(current) ).split(path.sep) || [];

    if (previousPath && currentPath.length) {
        // remove chunks that exceed the previous path's length
        currentPath = currentPath.slice(0, previousPath.length);

        // if a chunk doesn't match the previous path, remove everything from that chunk on
        for (var i = 0, l = currentPath.length; i < l; i++) {
            if (currentPath[i] !== previousPath[i]) {
                currentPath.splice(i, currentPath.length - i);
                break;
            }
        }
    }

    return currentPath;
}

/**
 * Find the common prefix for an array of paths. If there is a common prefix, a trailing separator
 * is appended to the prefix. Relative paths are resolved relative to the current working directory.
 *
 * For example, assuming that the current working directory is `/Users/jsdoc`:
 *
 * + For paths `foo/bar/baz/qux.js`, `foo/bar/baz/quux.js`, and `foo/bar/baz.js`, the common prefix
 * is `/Users/jsdoc/foo/bar/`.
 * + For paths `../jsdoc/foo/bar/baz/qux/quux/test.js`, `/Users/jsdoc/foo/bar/bazzy.js`, and
 * `../../Users/jsdoc/foo/bar/foobar.js`, the common prefix is `/Users/jsdoc/foo/bar/`.
 * + For paths `foo/bar/baz/qux.js` and `../../Library/foo/bar/baz.js`, there is no common prefix,
 * and an empty string is returned.
 *
 * @param {Array.<string>} paths - The paths to search for a common prefix.
 * @return {string} The common prefix, or an empty string if there is no common prefix.
 */
exports.commonPrefix = function(paths) {
    var common = paths.reduce(prefixReducer, undefined);

    // if there's anything left (other than a placeholder for a leading slash), add a placeholder
    // for a trailing slash
    if ( common.length && (common.length > 1 || common[0] !== '') ) {
        common.push('');
    }

    return common.join(path.sep);
};

// TODO: do we need this?
/**
 * If required by the current VM, convert a path to a URI that meets the operating system's
 * requirements. Otherwise, return the original path.
 * @function
 * @private
 * @param {string} path The path to convert.
 * @return {string} A URI that meets the operating system's requirements, or the original path.
 */
var pathToUri = vm.getModule('jsdoc').pathToUri;

// TODO: do we need this? if so, any way to stop exporting it?
/**
 * If required by the current VM, convert a URI to a path that meets the operating system's
 * requirements. Otherwise, assume the "URI" is really a path, and return the original path.
 * @function
 * @private
 * @param {string} uri The URI to convert.
 * @return {string} A path that meets the operating system's requirements.
 */
exports._uriToPath = vm.getModule('jsdoc').uriToPath;

/**
 * Retrieve the fully qualified path to the requested resource.
 *
 * If the resource path is specified as a relative path, JSDoc searches for the path in the current
 * working directory, then in the JSDoc directory.
 *
 * If the resource path is specified as a fully qualified path, JSDoc uses the path as-is.
 *
 * @param {string} filepath - The path to the requested resource. May be an absolute path; a path
 * relative to the JSDoc directory; or a path relative to the current working directory.
 * @param {string} [filename] - The filename of the requested resource.
 * @return {string} The fully qualified path (or, on Rhino, a URI) to the requested resource.
 * Includes the filename if one was provided.
 */
exports.getResourcePath = function(filepath, filename) {
    var result;

    function pathExists(_path) {
        try {
            fs.readdirSync(_path);
        }
        catch(e) {
            return false;
        }

        return true;
    }

    // first, try resolving it relative to the current working directory (or just normalize it
    // if it's an absolute path)
    result = path.resolve(filepath);
    if ( !pathExists(result) ) {
        // next, try resolving it relative to the JSDoc directory
        result = path.resolve(__dirname, filepath);
        if ( !pathExists(result) ) {
            result = null;
        }
    }

    if (result) {
        result = filename ? path.join(result, filename) : result;
        result = pathToUri(result);
    }

    return result;
};

Object.keys(path).forEach(function(member) {
    exports[member] = path[member];
});

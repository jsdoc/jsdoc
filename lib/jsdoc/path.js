/**
 * Extended version of the standard `path` module.
 * @module jsdoc/path
 */

var path = require('path');


function prefixReducer(previousPath, current) {
    var currentPath = [];

    // if previousPath is defined, but has zero length, there's no common prefix; move along
    if (previousPath && !previousPath.length) {
        return currentPath;
    }

    currentPath = path.resolve( process.cwd(), path.dirname(current) ).split(path.sep);

    if (previousPath) {
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

Object.keys(path).forEach(function(member) {
    exports[member] = path[member];
});

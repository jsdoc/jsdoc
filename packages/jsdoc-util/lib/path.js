/**
 * @module @jsdoc/util/lib/path
 */

const path = require('path');

function prefixReducer({cwd, previousPath}, current) {
    let currentPath;

    // if previousPath is a zero-length array, there's no common prefix; move along
    if (Array.isArray(previousPath) && !previousPath.length) {
        return previousPath;
    }

    currentPath = path.resolve(cwd, current).split(path.sep) || [];

    if (previousPath && currentPath.length) {
        // remove chunks that exceed the previous path's length
        currentPath = currentPath.slice(0, previousPath.length);

        // if a chunk doesn't match the previous path, remove everything from that chunk on
        for (let i = 0, l = currentPath.length; i < l; i++) {
            if (currentPath[i] !== previousPath[i]) {
                currentPath.splice(i, currentPath.length - i);
                break;
            }
        }
    }

    return {
        cwd: cwd,
        previousPath: currentPath
    };
}

/**
 * Find the common prefix for an array of paths. Relative paths are resolved relative to the current
 * working directory.
 *
 * For example, assuming that the current working directory is `/Users/jsdoc`:
 *
 * + For the single path `foo/bar/baz/qux.js`, the common prefix is `foo/bar/baz`.
 * + For the paths `foo/bar/baz/qux.js`, `foo/bar/baz/quux.js`, and `foo/bar/baz.js`, the common
 * prefix is `/Users/jsdoc/foo/bar`.
 * + For the paths `../jsdoc/foo/bar/baz/qux/quux/test.js`, `/Users/jsdoc/foo/bar/bazzy.js`, and
 * `../../Users/jsdoc/foo/bar/foobar.js`, the common prefix is `/Users/jsdoc/foo/bar`.
 * + For the paths `foo/bar/baz/qux.js` and `../../Library/foo/bar/baz.js`, there is no common
 * prefix, and an empty string is returned.
 *
 * @param {Array<string>} paths - The paths to search for a common prefix.
 * @return {string} The common prefix, or an empty string if there is no common prefix.
 */
exports.commonPrefix = (paths = []) => {
    const cwd = process.cwd();
    let prefix;
    let segments;

    // If there's only one path, its resolved dirname is the common prefix.
    if (paths.length === 1) {
        prefix = path.resolve(cwd, paths[0]);

        if (path.extname(prefix)) {
            prefix = path.dirname(prefix);
        }

        segments = [prefix];
    } else {
        segments = paths.reduce(prefixReducer, { cwd: cwd }).previousPath || [];
    }

    return segments.join(path.sep);
};

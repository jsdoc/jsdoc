/**
 * Extended version of the standard `path` module.
 * @module jsdoc/path
 */
const env = require('jsdoc/env');
const fs = require('fs');
const path = require('path');

function prefixReducer(previousPath, current) {
    let currentPath = [];

    // if previousPath is defined, but has zero length, there's no common prefix; move along
    if (previousPath && !previousPath.length) {
        return currentPath;
    }

    currentPath = path.resolve(env.pwd, current).split(path.sep) || [];

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

    return currentPath;
}

/**
 * Find the common prefix for an array of paths. If there is a common prefix, a trailing separator
 * is appended to the prefix. Relative paths are resolved relative to the current working directory.
 *
 * For example, assuming that the current working directory is `/Users/jsdoc`:
 *
 * + For the single path `foo/bar/baz/qux.js`, the common prefix is `foo/bar/baz/`.
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
exports.commonPrefix = (paths = []) => {
    let prefix = '';
    let segments;

    // if there's only one path, its resolved dirname (plus a trailing slash) is the common prefix
    if (paths.length === 1) {
        prefix = path.resolve(env.pwd, paths[0]);
        if ( path.extname(prefix) ) {
            prefix = path.dirname(prefix);
        }

        prefix += path.sep;
    }
    else {
        segments = paths.reduce(prefixReducer, undefined) || [];

        // if there's anything left (other than a placeholder for a leading slash), add a
        // placeholder for a trailing slash
        if ( segments.length && (segments.length > 1 || segments[0] !== '') ) {
            segments.push('');
        }

        prefix = segments.join(path.sep);
    }

    return prefix;
};

/**
 * Retrieve the fully qualified path to the requested resource.
 *
 * If the resource path is specified as a relative path, JSDoc searches for the resource in the
 * following locations, in this order:
 *
 * 1. The current working directory
 * 2. The directory where the JSDoc configuration file is located
 * 3. The JSDoc directory
 * 4. Anyplace where `require()` can find the resource (for example, in your project's
 * `node_modules` directory)
 *
 * If the resource path is specified as a fully qualified path, JSDoc searches for the resource in
 * the following locations, in this order:
 *
 * 1. The resource path
 * 2. Anyplace where `require()` can find the resource (for example, in your project's
 * `node_modules` directory)
 *
 * @param {string} filepath - The path to the requested resource. May be an absolute path; a path
 * relative to the JSDoc directory; or a path relative to the current working directory.
 * @param {string} [filename] - The filename of the requested resource.
 * @return {string} The fully qualified path to the requested resource. Includes the filename if one
 * was provided.
 */
exports.getResourcePath = (filepath, filename) => {
    let result = null;
    const searchDirs = [env.pwd, path.dirname(env.opts.configure || ''), env.dirname];

    function exists(p) {
        try {
            fs.statSync(p);

            return true;
        }
        catch (e) {
            return false;
        }
    }

    function resolve(p) {
        try {
            return require.resolve(p);
        }
        catch (e) {
            return null;
        }
    }

    function find(p) {
        // does the requested path exist?
        if ( exists(p) ) {
            result = p;
        }
        else {
            // can `require()` find the requested path?
            result = resolve(p);
        }

        return Boolean(result);
    }

    filepath = path.join(filepath, filename || '');

    // is the filepath absolute? if so, just use it
    if ( path.isAbsolute(filepath) ) {
        find(filepath);
    }
    else {
        searchDirs.some(searchDir => {
            if (searchDir) {
                return find( path.resolve(path.join(searchDir, filepath)) );
            }
            else {
                return false;
            }
        });
    }

    // if we still haven't found the resource, maybe it's an installed module
    if (!result) {
        result = resolve(filepath);
    }

    return result;
};

Object.keys(path).forEach(member => {
    exports[member] = path[member];
});

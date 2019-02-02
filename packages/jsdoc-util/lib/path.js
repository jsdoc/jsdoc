/**
 * Utility methods for working with filepaths.
 *
 * @module @jsdoc/util/lib/path
 */

const path = require('path');

function prefixReducer({cwd, previousPath}, current) {
    let currentPath;

    // If previousPath is a zero-length array, there's no common prefix.
    if (Array.isArray(previousPath) && !previousPath.length) {
        return previousPath;
    }

    currentPath = path.resolve(cwd, current).split(path.sep) || [];

    if (previousPath && currentPath.length) {
        // Remove chunks that exceed the previous path's length.
        currentPath = currentPath.slice(0, previousPath.length);

        // If a chunk doesn't match the previous path, remove that chunk and the following chunks.
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

/**
 * A filter function that is compatible with `Array#map` and similar functions.
 *
 * @typedef module:@jsdoc/util/lib/path~filter
 * @type {function}
 * @param {string} filepath - The filepath to test. The filter function resolves the filepath,
 * relative to the current working directory, before testing it.
 * @returns {boolean} `true` if the filepath meets the conditions of the filter, or `false` if the
 * filepath does not meet the conditions.
 */

function makeRegExp(value) {
    let regExp = null;

    if (typeof value === 'string') {
        regExp = new RegExp(value);
    } else if (value instanceof RegExp) {
        regExp = value;
    } else if (value !== undefined) {
        throw new TypeError(`Expected string or RegExp, got ${typeof value}`);
    }

    return regExp;
}

/**
 * Create a function that filters filepaths and is suitable for use with methods such as
 * {@link Array#filter}. The filter is based on the following inputs:
 *
 * + An include pattern (a regular expression that matches filepaths that should pass the filter)
 * + An exclude pattern (a regular expression that matches filepaths that should not pass the
 * filter)
 * + An exclude list (an array of values that, if present at the end of a filepath, will always
 * cause that filepath to be excluded)
 *
 * The filter function resolves the filepath, relative to the current working directory, before
 * testing it.
 *
 * @param {Object} opts - Options for the filter function.
 * @param {(Array<string>|string)} [opts.exclude] - An array of values (or a single value) that, if
 * present at the end of a filepath, will always cause that filepath to be excluded.
 * @param {(string|RegExp)} [opts.excludePattern] - A regular expression that matches filepaths to
 * exclude, or a string that represents a valid regular expression.
 * @param {(string|RegExp)} [opts.includePattern] - A regular expression that matches filepaths to
 * include, or a string that represents a valid regular expression.
 * @returns {module:@jsdoc/util/lib/path~filter} The filter function.
 */
exports.makeFilter = (({exclude, excludePattern, includePattern}) => {
    const cwd = process.cwd();
    const excludeRegExp = makeRegExp(excludePattern);
    const includeRegExp = makeRegExp(includePattern);

    if (typeof exclude === 'string') {
        exclude = [exclude];
    } else if (exclude !== undefined && exclude !== null && !Array.isArray(exclude)) {
        throw new TypeError(`Expected array or string for opts.exclude, got ${typeof exclude}`);
    }

    return (filepath => {
        let included = true;

        filepath = path.resolve(cwd, filepath);

        if (includeRegExp && !includeRegExp.test(filepath)) {
            included = false;
        }

        if (excludeRegExp && excludeRegExp.test(filepath)) {
            included = false;
        }

        if (exclude && included) {
            exclude.forEach(value => {
                if (included && filepath.endsWith(value)) {
                    included = false;
                }
            });
        }

        return included;
    });
});

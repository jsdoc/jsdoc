/**
 * Extended version of the standard `path` module.
 * @module jsdoc/path
 */
'use strict';

var env = require('jsdoc/env');
var fs = require('fs');
var path = require('path');

function prefixReducer(previousPath, current) {
    var currentPath = [];

    // if previousPath is defined, but has zero length, there's no common prefix; move along
    if (previousPath && !previousPath.length) {
        return currentPath;
    }

    currentPath = path.resolve(env.pwd, current).split(path.sep) || [];

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
exports.commonPrefix = function(paths) {
    var segments;

    var prefix = '';

    paths = paths || [];

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
 * Plugins and templates will be found somewhat similar to how `require()` works, except that the
 * directory in which the JSDoc configuration file is will be considered, too; the JSDoc package's
 * directory will be considered as a fallback; and a globally installed resource won't be found
 * unless it comes with JSDoc.
 *
 * If the resource path is specified as a path relative to module or package (starting with `.` or
 * `..``), JSDoc searches for the path first in the current working directory, then where the JSDoc
 * configuration file is located, and finally as a fall-back under the JSDoc directory. Otherwise,
 * if the resource path is relative (not starting with a path separator), JSDoc searches first under
 * the `node_modules` directory in the current working directory and where the JSDoc configuration
 * file is located, and then where JSDoc is installed.
 *
 * If the resource path is specified as a fully qualified path, JSDoc uses the path as-is.
 *
 * @param {string} filepath - The path to the requested resource. May be an absolute path; a path
 * relative to the JSDoc directory; or a path relative to the current working directory.
 * @param {string} [filename] - The filename of the requested resource.
 * @return {string} The fully qualified path to the requested resource.
 * Includes the filename if one was provided.
 */
exports.getResourcePath = function(filepath, filename) {
    var result = null;
    var searchDirs = [];

    function directoryExists(dir) {
        var stats;

        try {
            stats = fs.statSync(dir);

            return stats.isDirectory();
        }
        catch (e) {
            return false;
        }
    }

    // resources that are installed modules may not have been specified with a filepath
    if (!filepath) {
        filepath = filename;
        filename = undefined;
    }

    // Special case `node_modules/foo`, to accommodate this legacy workaround advertised by
    // third-party plugin and template authors.
    if ( /^node_modules\//.test(filepath) ) {
        filepath = path.join('.', filepath);
    }

    // search in different sets of directories depending on whether filepath is expressly relative
    // to "current" directory or not
    searchDirs = /^\./.test(filepath) ?
        // look first in "current" (where JSDoc was executed), then in directory of config, and
        // _only then_ in JSDoc's directory
        [env.pwd, path.dirname(env.opts.configure || ''), env.dirname] :
        // otherwise, treat as relative to where plugins/templates are found, either as a
        // dependency, or under JSDoc itself
        [path.join(env.pwd, 'node_modules'),
            path.join(path.dirname(env.opts.configure || ''), 'node_modules'),
            env.dirname];

    searchDirs.some(function(dir) {
        if (dir) {
            dir = path.resolve(dir, filepath);
            if ( directoryExists(dir) ) {
                result = dir;

                return true;
            }
        }

        return false;
    });

    if (result) {
        result = filename ? path.join(result, filename) : result;
    }

    return result;
};

Object.keys(path).forEach(function(member) {
    exports[member] = path[member];
});

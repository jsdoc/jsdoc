/**
 * @module jsdoc/src/filter
 */
'use strict';

var env = require('jsdoc/env');
var path = require('jsdoc/path');

function makeRegExp(config) {
    var regExp = null;

    if (config) {
        regExp = (typeof config === 'string') ? new RegExp(config) : config;
    }

    return regExp;
}

/**
 * @constructor
 * @param {Object} opts
 * @param {string[]} opts.exclude - Specific files to exclude.
 * @param {(string|RegExp)} opts.includePattern
 * @param {(string|RegExp)} opts.excludePattern
 */
exports.Filter = function(opts) {
    this.exclude = opts.exclude && Array.isArray(opts.exclude) ?
        opts.exclude.map(function($) {
            return path.resolve(env.pwd, $);
        }) :
        null;
    this.includePattern = makeRegExp(opts.includePattern);
    this.excludePattern = makeRegExp(opts.excludePattern);
};

/**
 * @param {string} filepath - The filepath to check.
 * @returns {boolean} Should the given file/dir be excluded?
 */
exports.Filter.prototype.isExcluded = function(filepath) {
    var excluded = false;

    filepath = path.resolve(env.pwd, filepath);

    if ( this.excludePattern && this.excludePattern.test(filepath) ) {
        excluded = true;
    }

    if (this.exclude) {
        this.exclude.forEach(function(exclude) {
            if ( filepath.indexOf(exclude) === 0 ) {
                excluded = true;
            }
        });
    }

    return excluded;
};

/**
 * @param {string} filepath - The filepath to check.
 * @returns {boolean} Should the given file be included?
 */
exports.Filter.prototype.isIncluded = function(filepath) {
    var included = true;

    filepath = path.resolve(env.pwd, filepath);

    if ( this.includePattern && !this.includePattern.test(filepath) ) {
        included = false;
    }

    return included && !this.isExcluded(filepath);
};

/**
	@module jsdoc/src/filter
	
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

var path = require('jsdoc/path');

var pwd = process.env.PWD;

/**
    @constructor
    @param {object} opts
    @param {string[]} opts.exclude - Specific files to exclude.
    @param {string|RegExp} opts.includePattern
    @param {string|RegExp} opts.excludePattern
 */
exports.Filter = function(opts) {
    this.exclude = opts.exclude && Array.isArray(opts.exclude) ?
        opts.exclude.map(function($) {
            return path.resolve(pwd, $);
        }) :
        null;
    this.includePattern = opts.includePattern?
                            typeof opts.includePattern === 'string'? new RegExp(opts.includePattern) : opts.includePattern
                            : null;
    this.excludePattern = opts.excludePattern?
                            typeof opts.excludePattern === 'string'? new RegExp(opts.excludePattern) : opts.excludePattern
                            : null;
};

/**
    @param {string} filepath - The filepath to check.
    @returns {boolean} Should the given file be included?
 */
exports.Filter.prototype.isIncluded = function(filepath) {
    filepath = path.resolve(pwd, filepath);

    if ( this.includePattern && !this.includePattern.test(filepath) ) {
        return false;
    }
    
    if ( this.excludePattern && this.excludePattern.test(filepath) ) {
        return false;
    }
    
    if ( this.exclude && this.exclude.indexOf(filepath) > -1 ) {
        return false;
    }
    
    return true;
};

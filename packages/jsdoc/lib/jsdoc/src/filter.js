/**
 * @module jsdoc/src/filter
 */
const path = require('path');

function makeRegExp(config) {
    let regExp = null;

    if (config) {
        regExp = (typeof config === 'string') ? new RegExp(config) : config;
    }

    return regExp;
}

/**
 * @alias module:jsdoc/src/filter.Filter
 */
class Filter {
    /**
     * @param {Object} opts
     * @param {string[]} opts.exclude - Specific files to exclude.
     * @param {(string|RegExp)} opts.includePattern
     * @param {(string|RegExp)} opts.excludePattern
     */
    constructor({exclude, includePattern, excludePattern}) {
        this._cwd = process.cwd();
        this.exclude = exclude && Array.isArray(exclude) ?
            exclude.map($ => path.resolve(this._cwd, $)) :
            null;
        this.includePattern = makeRegExp(includePattern);
        this.excludePattern = makeRegExp(excludePattern);
    }

    /**
     * @param {string} filepath - The filepath to check.
     * @returns {boolean} Should the given file be included?
     */
    isIncluded(filepath) {
        let included = true;

        filepath = path.resolve(this._cwd, filepath);

        if ( this.includePattern && !this.includePattern.test(filepath) ) {
            included = false;
        }

        if ( this.excludePattern && this.excludePattern.test(filepath) ) {
            included = false;
        }

        if (this.exclude) {
            this.exclude.forEach(exclude => {
                if ( filepath.indexOf(exclude) === 0 ) {
                    included = false;
                }
            });
        }

        return included;
    }
}
exports.Filter = Filter;

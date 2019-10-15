/**
 * @module jsdoc/src/filter
 */
const env = require('jsdoc/env');
const path = require('jsdoc/path');

/**
 * @param {object} config - FIXME
 * @returns {RegExp} A regular expression built from `config`.
 */
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
     * @param {object} opts - Options for the `Filter`.
     * @param {string[]} opts.exclude - Specific files to exclude.
     * @param {(string|RegExp)} opts.includePattern - Which files to include.
     * @param {(string|RegExp)} opts.excludePattern - Which files to exclude.
     */
    constructor({exclude, includePattern, excludePattern}) {
        this.exclude = exclude && Array.isArray(exclude) ?
            exclude.map($ => path.resolve(env.pwd, $)) :
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

        filepath = path.resolve(env.pwd, filepath);

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

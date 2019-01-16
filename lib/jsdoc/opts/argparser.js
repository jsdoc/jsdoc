/**
 * Parse the command line arguments.
 * @module jsdoc/opts/argparser
 */
const _ = require('underscore');
const util = require('util');

const hasOwnProp = Object.prototype.hasOwnProperty;

function padding(length) {
    return new Array(length + 1).join(' ');
}

function padLeft(str, length) {
    return padding(length) + str;
}

function padRight(str, length) {
    return str + padding(length);
}

function findMaxLength(arr) {
    let max = 0;

    arr.forEach(({length}) => {
        if (length > max) {
            max = length;
        }
    });

    return max;
}

function concatWithMaxLength(items, maxLength) {
    let result = '';

    // to prevent endless loops, always use the first item, regardless of length
    result += items.shift();

    while ( items.length && (result.length + items[0].length < maxLength) ) {
        result += ` ${items.shift()}`;
    }

    return result;
}

// we want to format names and descriptions like this:
// |    -f, --foo    Very long description very long description very long    |
// |                 description very long description.                       |
function formatHelpInfo({names, descriptions}) {
    const MARGIN_LENGTH = 4;
    const results = [];

    const maxLength = process.stdout.columns;
    const maxNameLength = findMaxLength(names);
    const wrapDescriptionAt = maxLength - (MARGIN_LENGTH * 3) - maxNameLength;

    // build the string for each option
    names.forEach((name, i) => {
        let result;
        let partialDescription;
        let words;

        // add a left margin to the name
        result = padLeft(names[i], MARGIN_LENGTH);
        // and a right margin, with extra padding so the descriptions line up with one another
        result = padRight(result, maxNameLength - names[i].length + MARGIN_LENGTH);

        // split the description on spaces
        words = descriptions[i].split(' ');
        // add as much of the description as we can fit on the first line
        result += concatWithMaxLength(words, wrapDescriptionAt);
        // if there's anything left, keep going until we've consumed the description
        while (words.length) {
            partialDescription = padding( maxNameLength + (MARGIN_LENGTH * 2) );
            partialDescription += concatWithMaxLength(words, wrapDescriptionAt);
            result += `\n${partialDescription}`;
        }

        results.push(result);
    });

    return results;
}

/**
 * A parser to interpret the key-value pairs entered on the command line.
 *
 * @alias module:jsdoc/opts/argparser
 */
class ArgParser {
    /**
     * Create an instance of the parser.
     */
    constructor() {
        this._options = [];
        this._shortNameIndex = {};
        this._longNameIndex = {};
    }

    _getOptionByShortName(name) {
        if (hasOwnProp.call(this._shortNameIndex, name)) {
            return this._options[this._shortNameIndex[name]];
        }

        return null;
    }

    _getOptionByLongName(name) {
        if (hasOwnProp.call(this._longNameIndex, name)) {
            return this._options[this._longNameIndex[name]];
        }

        return null;
    }

    _addOption(option) {
        let currentIndex;

        const longName = option.longName;
        const shortName = option.shortName;

        this._options.push(option);
        currentIndex = this._options.length - 1;

        if (shortName) {
            this._shortNameIndex[shortName] = currentIndex;
        }
        if (longName) {
            this._longNameIndex[longName] = currentIndex;
        }

        return this;
    }

    /**
     * Provide information about a legal option.
     *
     * @param {character} shortName - The short name of the option, entered like: -T.
     * @param {string} longName - The equivalent long name of the option, entered like: --test.
     * @param {boolean} hasValue - Does this option require a value? Like: -t templatename
     * @param {string} helpText - A brief description of the option.
     * @param {boolean} [canHaveMultiple=false] - Set to `true` if the option can be provided more
     * than once.
     * @param {function} [coercer] - A function to coerce the given value to a specific type.
     * @return {this}
     * @example
     * myParser.addOption('t', 'template', true, 'The path to the template.');
     * myParser.addOption('h', 'help', false, 'Show the help message.');
     */
    addOption(shortName, longName, hasValue, helpText, canHaveMultiple = false, coercer) {
        return this._addOption({
            shortName: shortName,
            longName: longName,
            hasValue: hasValue,
            helpText: helpText,
            canHaveMultiple: canHaveMultiple,
            coercer: coercer
        });
    }

    // TODO: refactor addOption to accept objects, then get rid of this method
    /**
     * Provide information about an option that should not cause an error if present, but that is always
     * ignored (for example, an option that was used in previous versions but is no longer supported).
     *
     * @private
     * @param {string} shortName - The short name of the option with a leading hyphen (for example,
     * `-v`).
     * @param {string} longName - The long name of the option with two leading hyphens (for example,
     * `--version`).
     */
    addIgnoredOption(shortName, longName) {
        return this._addOption({
            shortName: shortName,
            longName: longName,
            ignore: true
        });
    }

    /**
     * Generate a summary of all the options with corresponding help text.
     * @returns {string}
     */
    help() {
        const options = {
            names: [],
            descriptions: []
        };

        this._options.forEach(option => {
            let name = '';

            // don't show ignored options
            if (option.ignore) {
                return;
            }

            if (option.shortName) {
                name += `-${option.shortName}${option.longName ? ', ' : ''}`;
            }

            if (option.longName) {
                name += `--${option.longName}`;
            }

            if (option.hasValue) {
                name += ' <value>';
            }

            options.names.push(name);
            options.descriptions.push(option.helpText);
        });

        return `Options:\n${formatHelpInfo(options).join('\n')}`;
    }

    /**
     * Get the options.
     * @param {Array.<string>} args An array, like ['-x', 'hello']
     * @param {Object} [defaults={}] An optional collection of default values.
     * @returns {Object} The keys will be the longNames, or the shortName if no longName is defined for
     * that option. The values will be the values provided, or `true` if the option accepts no value.
     */
    parse(args, defaults) {
        let arg;
        let next;
        let option;
        const result = ( defaults && _.defaults({}, defaults) ) || {};
        let shortName;
        let longName;
        let name;
        let value;

        result._ = [];
        for (let i = 0, l = args.length; i < l; i++) {
            arg = String(args[i]);
            next = (i < l - 1) ? String(args[i + 1]) : null;
            shortName = null;
            value = null;

            // like -t
            if (arg.charAt(0) === '-') {
                // like --template
                if (arg.charAt(1) === '-') {
                    name = longName = arg.slice(2);
                    option = this._getOptionByLongName(longName);
                }
                else {
                    name = shortName = arg.slice(1);
                    option = this._getOptionByShortName(shortName);
                }

                if (option === null) {
                    throw new Error( util.format('Unknown command-line option "%s".', name) );
                }

                if (option.hasValue) {
                    value = next;
                    i++;

                    if (value === null || value.charAt(0) === '-') {
                        throw new Error( util.format('The command-line option "%s" requires a value.', name) );
                    }
                }
                else {
                    value = true;
                }

                // skip ignored options now that we've consumed the option text
                if (option.ignore) {
                    continue;
                }

                if (option.longName && shortName) {
                    name = option.longName;
                }

                if (typeof option.coercer === 'function') {
                    value = option.coercer(value);
                }

                // Allow for multiple options of the same type to be present
                if (option.canHaveMultiple && hasOwnProp.call(result, name)) {
                    const val = result[name];

                    if (val instanceof Array) {
                        val.push(value);
                    } else {
                        result[name] = [val, value];
                    }
                }
                else {
                    result[name] = value;
                }
            }
            else {
                result._.push(arg);
            }
        }

        return result;
    }
}

module.exports = ArgParser;

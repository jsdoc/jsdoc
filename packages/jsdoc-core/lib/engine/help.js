const flags = require('./flags');

/**
 * Pads the start of `str` with `length` spaces.
 *
 * @param {string} str    - The string to pad.
 * @param {number} length - The number of spaces to add to the start of `str`.
 * @returns {string} The padded string.
 */
function padLeft(str, length) {
    return str.padStart(str.length + length);
}

/**
 * Pads the end of `str` with `length` spaces.
 *
 * @param {string} str    - The string to pad.
 * @param {number} length - The number of spaces to add to the end of `str`.
 * @returns {string} The padded string.
 */
function padRight(str, length) {
    return str.padEnd(str.length + length);
}

/**
 * Finds the highest `length` value of every object in `arr`.
 *
 * @param {Array} arr - The array to search.
 * @returns {number} The highest value found from each object’s `length` property within `arr`.
 */
function findMaxLength(arr) {
    let max = 0;

    arr.forEach(({length}) => {
        max = Math.max(max, length);
    });

    return max;
}

/**
 * Concatenates (in order) the values of `items`. If any value exceeds `maxLength`,
 * concatenation stops and the result is returned.
 *
 * @param {Array} items      - The list of values to concatenate.
 * @param {number} maxLength - The maximum length allowed for concatenation to continue.
 * @returns {string} The concatenated result.
 */
function concatWithMaxLength(items, maxLength) {
    let result = '';

    // to prevent endless loops, always use the first item, regardless of length
    result += items.shift();

    while (items.length && (result.length + items[0].length < maxLength)) {
        result += ` ${items.shift()}`;
    }

    return result;
}

/**
 * Format the name and description of each flag into columns, similar to the following example,
 * where the pipe (`|`) characters represent the start and end of the line:
 *
 * ```
 * |    -f, --foo    Very long description very long description very long    |
 * |                 description very long description.                       |
 * |    --bar        This description is not as long.                         |
 * ```
 *
 * @param {object} flagInfo - Information about each known flag.
 * @param {Array.<string>} flagInfo.names - An array of known flag names.
 * @param {Array.<string>} flagInfo.descriptions - An array of descriptions for each known flag, in
 * the same order as `flagInfo.names`.
 * @param {object} opts - Options for formatting the text.
 * @param {number} opts.maxLength - The maximum length of each line.
 * @returns {Array.<string>} The list of formatted strings.
 */
function formatHelpInfo({names, descriptions}, {maxLength}) {
    const MARGIN_SIZE = 4;
    const GUTTER_SIZE = MARGIN_SIZE;
    const results = [];

    const maxNameLength = findMaxLength(names);
    const wrapDescriptionAt = maxLength - (MARGIN_SIZE * 2) - GUTTER_SIZE - maxNameLength;

    // Build the string for each flag.
    names.forEach((name, i) => {
        let result;
        let partialDescription;
        let words;

        // Add some whitespace before the name.
        result = padLeft(name, MARGIN_SIZE);
        // Make the descriptions left-justified, with a gutter between the names and descriptions.
        result = padRight(result, maxNameLength - name.length + GUTTER_SIZE);

        // Split the description on spaces.
        words = descriptions[i].split(' ');
        // Add as much of the description as we can fit on the first line.
        result += concatWithMaxLength(words, wrapDescriptionAt);
        // If there's anything left, keep going until we've consumed the entire description.
        while (words.length) {
            // Add whitespace for the name column and the gutter.
            partialDescription = padLeft('', MARGIN_SIZE + maxNameLength + GUTTER_SIZE);
            partialDescription += concatWithMaxLength(words, wrapDescriptionAt);
            result += `\n${partialDescription}`;
        }

        results.push(result);
    });

    return results;
}

/**
 * Get a formatted version of the help text for JSDoc.
 *
 * @alias module:'@jsdoc/core/lib/engine/help'
 * @param {object} opts - Options for formatting the help text.
 * @param {number} opts.maxLength - The maximum length of each line in the formatted text.
 * @returns {string} The formatted help text.
 * @private
 */
module.exports = ({ maxLength }) => {
    const flagInfo = {
        names: [],
        descriptions: []
    };

    Object.keys(flags)
        .sort()
        .forEach(flagName => {
            const flagDetail = flags[flagName];
            let description = '';
            let name = '';

            if (flagDetail.alias) {
                name += `-${flagDetail.alias}, `;
            }

            name += `--${flagName}`;

            if (flagDetail.requiresArg) {
                name += ' <value>';
            }

            description += flagDetail.description;

            if (flagDetail.array) {
                description += ' Can be specified more than once.';
            }

            if (flagDetail.choices) {
                description += ` Accepts these values: ${flagDetail.choices.join(', ')}`;
            }

            flagInfo.names.push(name);
            flagInfo.descriptions.push(description);
        });

    return `${formatHelpInfo(flagInfo, {maxLength}).join('\n')}`;
};

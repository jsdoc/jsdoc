const flags = require('./flags');

function padLeft(str, length) {
    return str.padStart(str.length + length);
}

function padRight(str, length) {
    return str.padEnd(str.length + length);
}

function findMaxLength(arr) {
    let max = 0;

    arr.forEach(({length}) => {
        max = Math.max(max, length);
    });

    return max;
}

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
 * @param {Object} flagInfo - Information about each known flag.
 * @param {Array<string>} flagInfo.names - An array of known flag names.
 * @param {Array<string>} flagInfo.descriptions - An array of descriptions for each known flag, in
 * the same order as `flagInfo.names`.
 * @param {Object} opts - Options for formatting the text.
 * @param {number} opts.maxLength - The maximum length of each line.
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
 * @alias module:@jsdoc/cli/lib/help
 * @param {Object} opts - Options for formatting the help text.
 * @param {number} opts.maxLength - The maximum length of each line in the formatted text.
 * @return {string} The formatted help text.
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

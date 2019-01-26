/**
 * @module @jsdoc/cli/lib/help
 */

const ARGS = require('./args').ARGS;

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

// We want to format names and descriptions like this:
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
            partialDescription = padLeft('', maxNameLength + (MARGIN_LENGTH * 2));
            partialDescription += concatWithMaxLength(words, wrapDescriptionAt);
            result += `\n${partialDescription}`;
        }

        results.push(result);
    });

    return results;
}

module.exports = (() => {
    const options = {
        names: [],
        descriptions: []
    };

    Object.keys(ARGS)
        .sort()
        .forEach(arg => {
            const opts = ARGS[arg];
            let description = '';
            let name = '';

            if (opts.alias) {
                name += `-${opts.alias}, `;
            }

            name += `--${arg}`;

            if (opts.requiresArg) {
                name += ' <value>';
            }

            description += opts.description;

            if (opts.array) {
                description += ' Can be specified more than once.';
            }

            if (opts.choices) {
                description += ` Accepts these values: ${opts.choices.join(', ')}`;
            }

            options.names.push(name);
            options.descriptions.push(description);
        });

    return `Options:\n${formatHelpInfo(options).join('\n')}`;
})();

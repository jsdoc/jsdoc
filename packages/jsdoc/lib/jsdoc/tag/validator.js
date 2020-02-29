/**
 * @module jsdoc/tag/validator
 * @requires jsdoc/tag/dictionary
 */
const env = require('jsdoc/env');
const { log } = require('@jsdoc/util');

function buildMessage(tagName, {filename, lineno, comment}, desc) {
    let result = `The @${tagName} tag ${desc}. File: ${filename}, line: ${lineno}`;

    if (comment) {
        result += `\n${comment}`;
    }

    return result;
}

/**
 * Validate the given tag.
 */
exports.validate = ({title, text, value}, tagDef, meta) => {
    const allowUnknownTags = env.conf.tags.allowUnknownTags;

    // handle cases where the tag definition does not exist
    if (!tagDef) {
        // log an error if unknown tags are not allowed
        if (!allowUnknownTags ||
            (Array.isArray(allowUnknownTags) &&
             !allowUnknownTags.includes(title))) {
            log.error(buildMessage(title, meta, 'is not a known tag'));
        }

        // stop validation, since there's nothing to validate against
        return;
    }

    // check for errors that make the tag useless
    if (!text && tagDef.mustHaveValue) {
        log.error(buildMessage(title, meta, 'requires a value'));
    }

    // check for minor issues that are usually harmless
    else if (text && tagDef.mustNotHaveValue) {
        log.warn(buildMessage(title, meta,
            'does not permit a value; the value will be ignored'));
    }
    else if (value && value.description && tagDef.mustNotHaveDescription) {
        log.warn(buildMessage(title, meta,
            'does not permit a description; the description will be ignored'));
    }
};

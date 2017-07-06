/**
 * @module jsdoc/tag/validator
 * @requires jsdoc/tag/dictionary
 */
'use strict';

var env = require('jsdoc/env');
var format = require('util').format;
var logger = require('jsdoc/util/logger');

function buildMessage(tagName, meta, desc) {
    var result = format('The @%s tag %s. File: %s, line: %s', tagName, desc, meta.filename,
        meta.lineno);

    if (meta.comment) {
        result += '\n' + meta.comment;
    }

    return result;
}

/**
 * Validate the given tag.
 */
exports.validate = function(tag, tagDef, meta) {
    var allowUnknownTags = env.conf.tags.allowUnknownTags;

    // handle cases where the tag definition does not exist
    if (!tagDef) {
        // log an error if unknown tags are not allowed
        if (!allowUnknownTags ||
            (Array.isArray(allowUnknownTags) &&
             allowUnknownTags.indexOf(tag.title) < 0)) {
            logger.error( buildMessage(tag.title, meta, 'is not a known tag') );
        }

        // stop validation, since there's nothing to validate against
        return;
    }

    // check for errors that make the tag useless
    if (!tag.text && tagDef.mustHaveValue) {
        logger.error( buildMessage(tag.title, meta, 'requires a value') );
    }

    // check for minor issues that are usually harmless
    else if (tag.text && tagDef.mustNotHaveValue) {
        logger.warn( buildMessage(tag.title, meta,
            'does not permit a value; the value will be ignored') );
    }
    else if (tag.value && tag.value.description && tagDef.mustNotHaveDescription) {
        logger.warn( buildMessage(tag.title, meta,
            'does not permit a description; the description will be ignored') );
    }
};

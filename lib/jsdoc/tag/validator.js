/*global env: true */
/**
    @module jsdoc/tag/validator
    @requires jsdoc/tag/dictionary

    @author Michael Mathews <micmath@gmail.com>
    @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
'use strict';

var dictionary = require('jsdoc/tag/dictionary');
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
    if (!tagDef && !env.conf.tags.allowUnknownTags) {
        logger.error( buildMessage(tag.title, meta, 'is not a known tag') );
    }
    else if (!tag.text) {
        if (tagDef.mustHaveValue) {
            logger.error( buildMessage(tag.title, meta, 'requires a value') );
        }
    }
    else {
        if (tagDef.mustNotHaveValue) {
            logger.error( buildMessage(tag.title, meta, 'does not permit a value') );
        }
    }
};

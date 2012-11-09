/*global env: true */
/**
	@module jsdoc/tag/validator
	@requires jsdoc/tag/dictionary

	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */


var dictionary = require('jsdoc/tag/dictionary');
var format = require('util').format;

function buildMessage(tagName, meta, desc) {
    var result = format('The @%s tag %s. File: %s, line: %s', tagName, desc, meta.filename,
        meta.lineno);
    if (meta.comment) {
        result += '\n' + meta.comment;
    }
    return result;
}

function UnknownTagError(tagName, meta) {
    this.name = 'UnknownTagError';
    this.message = buildMessage(tagName, meta, 'is not a known tag');
}
UnknownTagError.prototype = new Error();
UnknownTagError.prototype.constructor = UnknownTagError;

function TagValueRequiredError(tagName, meta) {
    this.name = 'TagValueRequiredError';
    this.message = buildMessage(tagName, meta, 'requires a value');
}
TagValueRequiredError.prototype = new Error();
TagValueRequiredError.prototype.constructor = TagValueRequiredError;

function TagValueNotPermittedError(tagName, meta) {
    this.name = 'TagValueNotPermittedError';
    this.message = buildMessage(tagName, meta, 'does not permit a value');
}
TagValueNotPermittedError.prototype = new Error();
TagValueNotPermittedError.prototype.constructor = TagValueNotPermittedError;

/**
    Validate the given tag.
 */
exports.validate = function(tag, meta) {
    var tagDef = dictionary.lookUp(tag.title);
    
    if (!tagDef && !env.conf.tags.allowUnknownTags) {
        require('jsdoc/util/error').handle( new UnknownTagError(tag.title, meta) );
    }
    
    if (!tag.text) {
        if (tagDef.mustHaveValue) {
            require('jsdoc/util/error').handle( new TagValueRequiredError(tag.title, meta) );
        }
    }
    else {
        if (tagDef.mustNotHaveValue) {
            require('jsdoc/util/error').handle( new TagValueNotPermittedError(tag.title, meta) );
        }
    }
};

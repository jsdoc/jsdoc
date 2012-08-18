/*global env: true */
/**
	@module jsdoc/tag/validator
	@requires jsdoc/tag/dictionary

	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */


var dictionary = require('jsdoc/tag/dictionary');

function UnknownTagError(tagName, meta) {
    this.name = 'UnknownTagError';
    this.message = 'The @' + tagName + ' tag is not a known tag. File: ' + meta.filename + ', Line: ' + meta.lineno + '\n' + meta.comment;
}
UnknownTagError.prototype = Error.prototype;

function TagValueRequiredError(tagName, meta) {
    this.name = 'TagValueRequiredError';
    this.message = 'The @' + tagName + ' tag requires a value. File: ' + meta.filename + ', Line: ' + meta.lineno + '\n' + meta.comment;
}
TagValueRequiredError.prototype = Error.prototype;

function TagValueNotPermittedError(tagName, meta) {
    this.name = 'TagValueNotPermittedError';
    this.message = 'The @' + tagName + ' tag does not permit a value. File: ' + meta.filename + ', Line: ' + meta.lineno + '\n' + meta.comment;
}
TagValueNotPermittedError.prototype = Error.prototype;

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

/**
	@module jsdoc/tag/validator
	@requires jsdoc/tag/dictionary

	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
(function() {
	
	var dictionary = require('jsdoc/tag/dictionary');
	
	/**
	    @constructor
	 */
	exports.validate = function(tag, meta) {
	    var tagDef = dictionary.lookUp(tag.title);
	    
	    if (!tagDef && !env.conf.tags.allowUnknownTags) {
	        throw new UnknownTagError(tag.title, meta);
	    }
	    
	    if (!tag.text) {
	        if (tagDef.mustHaveValue) {
	            throw new TagValueRequiredError(tag.title, tag.text, meta);
	        }
	    }
	    else {
	        if (tagDef.mustNotHaveValue) {
	            throw new TagValueNotPermittedError(tag.title, tag.text, meta);
	        }
	    }
	}
	
	function UnknownTagError(tagName, meta) {
        this.name = 'UnknownTagError';
        this.message = '@' + tagName + ' is not a known tag. In file: ' + meta.file;
    }
    UnknownTagError.prototype = Error.prototype;
	
	function TagValueRequiredError(tagName, meta) {
        this.name = 'TagValueRequiredError';
        this.message = '@' + tagName + ' requires a value. In file: ' + meta.file;
    }
    TagValueRequiredError.prototype = Error.prototype;
	
	function TagValueNotPermittedError(tagName, message, meta) {
        this.name = 'TagValueNotPermittedError';
        this.message = '@' + tagName + ' does not permit a value: "' + message + '". In file: ' + meta.file;
    }
    TagValueNotPermittedError.prototype = Error.prototype;
    	
})();
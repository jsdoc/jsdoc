/**
	Define tags that are known in JSDoc.
	@module jsdoc/tag/dictionary/definitions

	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
(function() {
    exports.defineTags = function(dictionary) {
    
        dictionary.defineTag('class', {
            onTagged: function(doclet, tag) { // @class implies @constructor
                doclet.addTag('kind', 'constructor');
            }
        });
        
        dictionary.defineTag('constructor', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineSynonym('description', 'desc');
        dictionary.defineTag('description', {
            mustHaveValue: true
        });
        
        dictionary.defineTag('event', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('example', {
            keepsWhitespace: true,
            mustHaveValue: true
        });
        
        dictionary.defineTag('fires', {
            mustHaveValue: true
        });
        
        dictionary.defineSynonym('function', 'method');
        dictionary.defineTag('function', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('kind', {
            mustHaveValue: true
        });
        
        dictionary.defineTag('name', {
            mustHaveValue: true
        });
        
        dictionary.defineTag('param', {
            mustHaveValue: true,
            canHaveType: true,
            canHaveName: true
        });
        
        dictionary.defineTag('private', {
            mustNotHaveValue: true
        });
        
        dictionary.defineSynonym('returns', 'return');
        dictionary.defineTag('returns', {
            mustHaveValue: true,
            canHaveType: true
        });
        
        dictionary.defineTag('uri', {
            mustHaveValue: true
        });
        
        dictionary.defineTag('var', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        });
    }
    
    /** @private */
	function setDocletKindToTitle(doclet, tag) {
	    doclet.addTag( 'kind', tag.title );
	}
	
	function setDocletNameToValue(doclet, tag) {
	    doclet.addTag( 'name', tag.text );
	}
	
})();
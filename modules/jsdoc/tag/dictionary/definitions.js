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
        
        dictionary.defineTag('constant', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        })
        .synonym('const');
        
        dictionary.defineTag('constructor', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('description', {
            mustHaveValue: true
        })
        .synonym('desc');
        
        dictionary.defineTag('event', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                applyNamespace(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('example', {
            keepsWhitespace: true,
            mustHaveValue: true
        });
        
        dictionary.defineTag('file', {
            keepsWhitespace: true,
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                setNameToFile(doclet, tag);
                setDocletKindToTitle(doclet, tag);
                applyNamespace(doclet, tag);
                
                return false;
            }
        })
        .synonym('fileoverview')
        .synonym('overview');
        
        dictionary.defineTag('fires', {
            mustHaveValue: true
        });
        
        dictionary.defineTag('function', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        })
        .synonym('method');
        
        dictionary.defineTag('kind', {
            mustHaveValue: true
        });
        
        dictionary.defineTag('module', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                applyNamespace(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('name', {
            mustHaveValue: true
        });
        
        dictionary.defineTag('namespace', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('param', {
            mustHaveValue: true,
            canHaveType: true,
            canHaveName: true
        });
        
        dictionary.defineTag('private', {
            mustNotHaveValue: true
        });
        
        dictionary.defineTag('property', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        })
        .synonym('field')
        .synonym('var');
        
        dictionary.defineTag('returns', {
            mustHaveValue: true,
            canHaveType: true
        })
        .synonym('return');
    }
    
    /** @private */
	function setDocletKindToTitle(doclet, tag) {
	    doclet.addTag( 'kind', tag.title );
	}
	
	function setDocletNameToValue(doclet, tag) {
	    if (tag.text) {
	        doclet.addTag( 'name', tag.text );
	    }
	}
	
	function setNameToFile(doclet, tag) {
	    if (doclet.meta.filename) { doclet.addTag( 'name', 'file:'+doclet.meta.filename ); }
	}
	
	function applyNamespace(doclet, tag) {
	    if (!doclet.name) return; // error?
	    
	    var m = /^([a-zA-Z]+)\:.+/.exec(doclet.name);
	    if (!(m && m[1] == tag.title)) {
	        doclet.name = tag.title + ':'+doclet.name;

	    }
	}
	
})();
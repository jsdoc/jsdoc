/**
	@module jsdoc/tag/dictionary

	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
(function() {
    var _synonyms = {},
        _definitions = {};
    
    /** @constructor */
    function TagDefinition(title, etc) {
        etc = etc || {};
        
        this.title = exports.normalise(title);
        
        for (var p in etc) {
            if (etc.hasOwnProperty(p)) {
                this[p] = etc[p];
            }
        }
    }
    
    exports.defineTag = function(title, opts) {
        _definitions[title] = new TagDefinition(title, opts);
    }
    
    exports.lookUp = function(title) {
	    title = exports.normalise(title);
	    
	    if ( _definitions.hasOwnProperty(title) ) {
	       return _definitions[title];
	    }
	    
	    return false;
	}
    
    exports.defineSynonym = function(canonicalName, synonymName /*...*/) {
        var canonicalName = canonicalName.toLowerCase()
        for (var i = 1, leni = arguments.length; i < leni; i++) {
            _synonyms[arguments[i].toLowerCase()] = canonicalName;
        }
    }
    
    exports.normalise = function(title) {
	    canonicalName = title.toLowerCase();
	        
	    if ( _synonyms.hasOwnProperty(canonicalName) ) {
	        return _synonyms[canonicalName];
	    }
	    
	    return canonicalName;
	}

    require('jsdoc/tag/dictionary/definitions').defineTags(exports)
	
})();
/**
	@overview
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

var _synonyms = {},
    _definitions = {},
    _namespaces = [],
    hasOwnProperty = Object.prototype.hasOwnProperty;

function _TagDefinition(title, etc) {
    etc = etc || {};
    
    this.title = dictionary.normalise(title);
    
    for (var p in etc) {
        if ( hasOwnProperty.call(etc, p) ) {
            this[p] = etc[p];
        }
    }
}

_TagDefinition.prototype.synonym = function(synonymName) {
    _synonyms[synonymName.toLowerCase()] = this.title;
    return this; // chainable
}

/** @exports jsdoc/tag/dictionary */
var dictionary = {
    /** @function */
    defineTag: function(title, opts) {
        _definitions[title] = new _TagDefinition(title, opts);
        
        if (opts.isNamespace) {
            _namespaces.push(title);
        }
        
        return _definitions[title];
    },

    /** @function */
    lookUp: function(title) {
        title = dictionary.normalise(title);
        
        if ( hasOwnProperty.call(_definitions, title) ) {
           return _definitions[title];
        }
        
        return false;
    },
    
    /** @function */
    isNamespace: function(kind) {
        return ( ~ _namespaces.indexOf(kind) );
    },
    
    /** @function */
    normalise: function(title) {
        canonicalName = title.toLowerCase();
            
        if ( hasOwnProperty.call(_synonyms, canonicalName) ) {
            return _synonyms[canonicalName];
        }
        
        return canonicalName;
    }
};

require('jsdoc/tag/dictionary/definitions').defineTags(dictionary);

for (var prop in dictionary) {
    if ( hasOwnProperty.call(dictionary, prop) ) {
        exports[prop] = dictionary[prop];
    }
}


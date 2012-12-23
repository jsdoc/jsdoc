/**
	@overview
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

var _synonyms = {},
    _definitions = {},
    _namespaces = [],
    dictionary,
    hasOwnProp = Object.prototype.hasOwnProperty;

/** @private */
function TagDefinition(title, etc) {
    etc = etc || {};
    
    this.title = dictionary.normalise(title);
    
    for (var p in etc) {
        if ( hasOwnProp.call(etc, p) ) {
            this[p] = etc[p];
        }
    }
}

/** @private */
TagDefinition.prototype.synonym = function(synonymName) {
    _synonyms[synonymName.toLowerCase()] = this.title;
    return this; // chainable
};

/** @exports jsdoc/tag/dictionary */
dictionary = {
    /** @function */
    defineTag: function(title, opts) {
        _definitions[title] = new TagDefinition(title, opts);
        
        if (opts.isNamespace) {
            _namespaces.push(title);
        }
        
        return _definitions[title];
    },

    /** @function */
    lookUp: function(title) {
        title = dictionary.normalise(title);
        
        if ( hasOwnProp.call(_definitions, title) ) {
           return _definitions[title];
        }
        
        return false;
    },
    
    /** @function */
    isNamespace: function(kind) {
        if ( _namespaces.indexOf(kind) !== -1) {
            return true;
        }
        
        return false;
    },
    
    /** @function */
    normalise: function(title) {
        var canonicalName = title.toLowerCase();
            
        if ( hasOwnProp.call(_synonyms, canonicalName) ) {
            return _synonyms[canonicalName];
        }
        
        return canonicalName;
    }
};

require('jsdoc/tag/dictionary/definitions').defineTags(dictionary);

for (var prop in dictionary) {
    if ( hasOwnProp.call(dictionary, prop) ) {
        exports[prop] = dictionary[prop];
    }
}


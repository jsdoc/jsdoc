/**
    @overview
    @author Michael Mathews <micmath@gmail.com>
    @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

var _synonyms = {},
    _definitions = {},
    _namespaces = [],
    hasOwnProp = Object.prototype.hasOwnProperty;

function normalise(title) {
    var canonicalName = title.toLowerCase();
        
    if ( hasOwnProp.call(_synonyms, canonicalName) ) {
        return _synonyms[canonicalName];
    }
    
    return canonicalName;
}

/** @private */
function TagDefinition(title, etc) {
    etc = etc || {};

    this.title = normalise(title);

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
var dictionary = {
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
        if (_namespaces.indexOf(kind) !== -1) {
            return true;
        } else {
            return false;
        }
    },
    
    /** @function */
    normalise: normalise
};

require('jsdoc/tag/dictionary/definitions').defineTags(dictionary);

for (var prop in dictionary) {
    if ( hasOwnProp.call(dictionary, prop) ) {
        exports[prop] = dictionary[prop];
    }
}


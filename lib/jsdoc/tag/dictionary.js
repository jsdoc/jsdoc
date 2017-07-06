/** @module jsdoc/tag/dictionary */
'use strict';

var definitions = require('jsdoc/tag/dictionary/definitions');

var hasOwnProp = Object.prototype.hasOwnProperty;

var dictionary;

/** @private */
function TagDefinition(dict, title, etc) {
    var self = this;

    etc = etc || {};

    this.title = dict.normalise(title);

    Object.defineProperty(this, '_dictionary', {
        value: dict
    });

    Object.keys(etc).forEach(function(p) {
        self[p] = etc[p];
    });
}

/** @private */
TagDefinition.prototype.synonym = function(synonymName) {
    this._dictionary.defineSynonym(this.title, synonymName);

    return this; // chainable
};

/**
 * @class
 * @alias module:jsdoc/tag/dictionary.Dictionary
 */
function Dictionary() {
    this._tags = {};
    this._tagSynonyms = {};
    // The longnames for `Package` objects include a `package` namespace. There's no `package` tag,
    // though, so we declare the namespace here.
    this._namespaces = ['package'];
}

/** @function */
Dictionary.prototype._defineNamespace = function(title) {
    title = this.normalise(title || '');

    if (title && this._namespaces.indexOf(title) === -1) {
        this._namespaces.push(title);
    }

    return this;
};

/** @function */
Dictionary.prototype.defineTag = function(title, opts) {
    var tagDef = new TagDefinition(this, title, opts);

    this._tags[tagDef.title] = tagDef;

    if (opts && opts.isNamespace) {
        this._defineNamespace(tagDef.title);
    }

    return this._tags[tagDef.title];
};

/** @function */
Dictionary.prototype.defineSynonym = function(title, synonym) {
    this._tagSynonyms[synonym.toLowerCase()] = this.normalise(title);
};

/** @function */
Dictionary.prototype.getNamespaces = function() {
    return this._namespaces.slice(0);
};

/** @function */
Dictionary.prototype.lookUp = function(title) {
    title = this.normalise(title);

    if ( hasOwnProp.call(this._tags, title) ) {
        return this._tags[title];
    }

    return false;
};

/** @function */
Dictionary.prototype.isNamespace = function(kind) {
    if (kind) {
        kind = this.normalise(kind);
        if (this._namespaces.indexOf(kind) !== -1) {
            return true;
        }
    }

    return false;
};

/** @function */
Dictionary.prototype.normalise = function(title) {
    var canonicalName = title.toLowerCase();

    if ( hasOwnProp.call(this._tagSynonyms, canonicalName) ) {
        return this._tagSynonyms[canonicalName];
    }

    return canonicalName;
};

/** @function */
Dictionary.prototype.normalize = Dictionary.prototype.normalise;

// initialize the default dictionary
dictionary = new Dictionary();
definitions.defineTags(dictionary);

// make the constructor available for unit-testing purposes
dictionary.Dictionary = Dictionary;

/** @type {module:jsdoc/tag/dictionary.Dictionary} */
module.exports = dictionary;

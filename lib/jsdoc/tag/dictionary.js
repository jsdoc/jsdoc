/** @module jsdoc/tag/dictionary */
'use strict';

var definitions = require('jsdoc/tag/dictionary/definitions');

var hasOwnProp = Object.prototype.hasOwnProperty;

var dictionary;

/** @private */
function TagDefinition(dictionary, title, etc) {
    var self = this;
    etc = etc || {};

    this.title = dictionary.normalise(title);

    Object.defineProperty(this, '_dictionary', {
        value: dictionary
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
    this._namespaces = [];
}

/** @function */
Dictionary.prototype.defineTag = function defineTag(title, opts) {
    var tagDef = new TagDefinition(this, title, opts);
    this._tags[tagDef.title] = tagDef;

    if (opts && opts.isNamespace) {
        this._namespaces.push(tagDef.title);
    }

    return this._tags[tagDef.title];
};

/** @function */
Dictionary.prototype.defineSynonym = function defineSynonym(title, synonym) {
    this._tagSynonyms[synonym.toLowerCase()] = this.normalise(title);
};

/** @function */
Dictionary.prototype.lookUp = function lookUp(title) {
    title = this.normalise(title);

    if ( hasOwnProp.call(this._tags, title) ) {
       return this._tags[title];
    }

    return false;
};

/** @function */
Dictionary.prototype.isNamespace = function isNamespace(kind) {
    if (kind) {
        kind = this.normalise(kind);
        if (this._namespaces.indexOf(kind) !== -1) {
            return true;
        }
    }

    return false;
};

/** @function */
Dictionary.prototype.normalise = function normalise(title) {
    var canonicalName = title.toLowerCase();

    if ( hasOwnProp.call(this._tagSynonyms, canonicalName) ) {
        return this._tagSynonyms[canonicalName];
    }

    return canonicalName;
};

// initialize the default dictionary
dictionary = new Dictionary();
dictionary.Dictionary = Dictionary;
definitions.defineTags(dictionary);

/** @type {module:jsdoc/tag/dictionary.Dictionary} */
module.exports = dictionary;

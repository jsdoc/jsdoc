/** @module jsdoc/tag/dictionary */

const definitions = require('jsdoc/tag/dictionary/definitions');

let dictionary;
const hasOwnProp = Object.prototype.hasOwnProperty;

/** @private */
class TagDefinition {
    constructor(dict, title, etc = {}) {
        this.title = dict.normalize(title);

        Object.defineProperty(this, '_dictionary', {
            value: dict
        });

        Object.keys(etc).forEach(p => {
            this[p] = etc[p];
        });
    }

    /** @private */
    synonym(synonymName) {
        this._dictionary.defineSynonym(this.title, synonymName);

        return this;
    }
}

/**
 * @alias module:jsdoc/tag/dictionary.Dictionary
 */
class Dictionary {
    constructor() {
        this._tags = {};
        this._tagSynonyms = {};
        // The longnames for `Package` objects include a `package` namespace. There's no `package` tag,
        // though, so we declare the namespace here.
        this._namespaces = ['package'];
    }

    _defineNamespace(title) {
        title = this.normalize(title || '');

        if (title && !this._namespaces.includes(title)) {
            this._namespaces.push(title);
        }

        return this;
    }

    defineTag(title, opts) {
        const tagDef = new TagDefinition(this, title, opts);

        this._tags[tagDef.title] = tagDef;

        if (opts && opts.isNamespace) {
            this._defineNamespace(tagDef.title);
        }

        return this._tags[tagDef.title];
    }

    defineSynonym(title, synonym) {
        this._tagSynonyms[synonym.toLowerCase()] = this.normalize(title);
    }

    getNamespaces() {
        return this._namespaces.slice(0);
    }

    lookUp(title) {
        title = this.normalize(title);

        if (hasOwnProp.call(this._tags, title)) {
            return this._tags[title];
        }

        return false;
    }

    isNamespace(kind) {
        if (kind) {
            kind = this.normalize(kind);
            if (this._namespaces.includes(kind)) {
                return true;
            }
        }

        return false;
    }

    normalize(title) {
        const canonicalName = title.toLowerCase();

        if (hasOwnProp.call(this._tagSynonyms, canonicalName)) {
            return this._tagSynonyms[canonicalName];
        }

        return canonicalName;
    }
}

// initialize the default dictionary
dictionary = new Dictionary();
definitions.defineTags(dictionary);

// make the constructor available for unit-testing purposes
dictionary.Dictionary = Dictionary;

/** @type {module:jsdoc/tag/dictionary.Dictionary} */
module.exports = dictionary;

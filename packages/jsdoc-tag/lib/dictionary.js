/*
  Copyright 2010 the JSDoc Authors.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
/** @module @jsdoc/tag/lib/dictionary */
import { log } from '@jsdoc/util';

import definitions from './definitions/index.js';

const DEFINITIONS = {
  closure: 'closure',
  jsdoc: 'jsdoc',
};

/** @private */
class TagDefinition {
  constructor(dict, title, etc) {
    const self = this;

    etc = etc || {};

    this.title = dict.normalize(title);

    Object.defineProperty(this, '_dictionary', {
      value: dict,
    });

    Object.keys(etc).forEach((p) => {
      self[p] = etc[p];
    });
  }

  /** @private */
  synonym(synonymName) {
    this._dictionary.defineSynonym(this.title, synonymName);

    return this;
  }
}

export class Dictionary {
  constructor() {
    // TODO: Consider adding internal tags in the constructor, ideally as fallbacks that aren't
    // used to confirm whether a tag is defined/valid, rather than requiring every set of tag
    // definitions to contain the internal tags.
    this._tags = {};
    this._tagSynonyms = {};
    // The longnames for `Package` objects include a `package` namespace. There's no `package`
    // tag, though, so we declare the namespace here.
    // TODO: Consider making this a fallback as suggested above for internal tags.
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

    if (tagDef.isNamespace) {
      this._defineNamespace(tagDef.title);
    }
    if (tagDef.synonyms) {
      tagDef.synonyms.forEach((synonym) => {
        this.defineSynonym(title, synonym);
      });
    }

    return this._tags[tagDef.title];
  }

  defineTags(tagDefs) {
    const tags = {};

    for (const title of Object.keys(tagDefs)) {
      tags[title] = this.defineTag(title, tagDefs[title]);
    }

    return tags;
  }

  defineSynonym(title, synonym) {
    this._tagSynonyms[synonym.toLowerCase()] = this.normalize(title);
  }

  static fromConfig(env) {
    let dictionaries = env.conf.tags.dictionaries;
    const dict = new Dictionary();

    if (!dictionaries) {
      log.error(
        'The configuration setting "tags.dictionaries" is undefined. ' +
          'Unable to load tag definitions.'
      );
    } else {
      dictionaries
        .slice()
        .reverse()
        .forEach((dictName) => {
          const tagDefs = definitions[DEFINITIONS[dictName]];

          if (!tagDefs) {
            log.error(
              'The configuration setting "tags.dictionaries" contains ' +
                `the unknown dictionary name ${dictName}. Ignoring the dictionary.`
            );

            return;
          }

          dict.defineTags(tagDefs);
        });

      dict.defineTags(definitions.internal);
    }

    return dict;
  }

  getNamespaces() {
    return this._namespaces.slice();
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

  lookup(title) {
    title = this.normalize(title);

    if (Object.hasOwn(this._tags, title)) {
      return this._tags[title];
    }

    return false;
  }

  lookUp(title) {
    return this.lookup(title);
  }

  normalise(title) {
    return this.normalize(title);
  }

  normalize(title) {
    const canonicalName = title.toLowerCase();

    if (Object.hasOwn(this._tagSynonyms, canonicalName)) {
      return this._tagSynonyms[canonicalName];
    }

    return canonicalName;
  }
}

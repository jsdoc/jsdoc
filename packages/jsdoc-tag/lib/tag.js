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

/**
 * Functionality related to JSDoc tags.
 */

import path from 'node:path';

import _ from 'lodash';

import * as type from './type.js';
import * as tagValidator from './validator.js';

// Check whether the text is the same as a symbol name with leading or trailing whitespace. If so,
// the whitespace must be preserved, and the text cannot be trimmed.
function mustPreserveWhitespace(text, meta) {
  return meta && meta.code && meta.code.name === text && text.match(/(?:^\s+)|(?:\s+$)/);
}

function trim(text, opts, meta) {
  let indentMatcher;
  let match;

  opts = opts || {};
  text = String(_.isNull(text) || _.isUndefined(text) ? '' : text);

  if (mustPreserveWhitespace(text, meta)) {
    text = `"${text}"`;
  } else if (opts.keepsWhitespace) {
    text = text.replace(/^[\n\r\f]+|[\n\r\f]+$/g, '');
    if (opts.removesIndent) {
      match = text.match(/^([ \t]+)/);
      if (match && match[1]) {
        indentMatcher = new RegExp(`^${match[1]}`, 'gm');
        text = text.replace(indentMatcher, '');
      }
    }
  } else {
    text = text.replace(/^\s+|\s+$/g, '');
  }

  return text;
}

function addHiddenProperty(obj, propName, propValue, env) {
  const { options } = env;

  Object.defineProperty(obj, propName, {
    value: propValue,
    writable: true,
    enumerable: Boolean(options.debug),
    configurable: true,
  });
}

function parseType({ env, text, originalTitle }, { canHaveName, canHaveType }, meta) {
  let log;

  try {
    return type.parse(text, canHaveName, canHaveType);
  } catch (e) {
    log = env.log;
    log.error(
      'Unable to parse a tag\'s type expression%s with tag title "%s" and text "%s": %s',
      meta.path && meta.filename
        ? ` for source file ${path.join(meta.path, meta.filename)}${
            meta.lineno ? ` in line ${meta.lineno}` : ''
          }`
        : '',
      originalTitle,
      text,
      e.message
    );

    return {};
  }
}

function processTagText(tagInstance, tagDef, meta, env) {
  let tagType;

  if (tagDef.onTagText) {
    tagInstance.text = tagDef.onTagText(tagInstance.text);
  }

  if (tagDef.canHaveType || tagDef.canHaveName) {
    /** The value property represents the result of parsing the tag text. */
    tagInstance.value = {};

    tagType = parseType(tagInstance, tagDef, meta);
    if (tagType.type) {
      if (tagType.type.length) {
        tagInstance.value.type = {
          names: tagType.type,
        };
        addHiddenProperty(tagInstance.value.type, 'parsedType', tagType.parsedType, env);
      }

      ['optional', 'nullable', 'variable', 'defaultvalue'].forEach((prop) => {
        if (typeof tagType[prop] !== 'undefined') {
          tagInstance.value[prop] = tagType[prop];
        }
      });
    }

    if (tagType.text && tagType.text.length) {
      tagInstance.value.description = tagType.text;
    }

    if (tagDef.canHaveName) {
      // note the dash is a special case: as a param name it means "no name"
      if (tagType.name && tagType.name !== '-') {
        tagInstance.value.name = tagType.name;
      }
    }
  } else {
    tagInstance.value = tagInstance.text;
  }
}

/**
 * Represents a single doclet tag.
 */
export class Tag {
  /**
   * Constructs a new tag object. Calls the tag validator.
   *
   * @param {string} tagTitle
   * @param {string} tagBody
   * @param {object} meta
   * @param {object} env
   */
  constructor(tagTitle, tagBody, meta, env) {
    const dictionary = env.tags;
    let tagDef;
    let trimOpts;

    meta = meta || {};

    Object.defineProperty(this, 'env', {
      enumerable: false,
      value: env,
    });
    this.originalTitle = trim(tagTitle);

    /** The title of the tag (for example, `title` in `@title text`). */
    this.title = dictionary.normalize(this.originalTitle);

    tagDef = dictionary.lookUp(this.title);
    trimOpts = {
      keepsWhitespace: tagDef.keepsWhitespace,
      removesIndent: tagDef.removesIndent,
    };

    /**
     * The text following the tag (for example, `text` in `@title text`).
     *
     * Whitespace is trimmed from the tag text as follows:
     *
     * + If the tag's `keepsWhitespace` option is falsy, all leading and trailing whitespace are
     * removed.
     * + If the tag's `keepsWhitespace` option is set to `true`, leading and trailing whitespace are
     * not trimmed, unless the `removesIndent` option is also enabled.
     * + If the tag's `removesIndent` option is set to `true`, any indentation that is shared by
     * every line in the string is removed. This option is ignored unless `keepsWhitespace` is set
     * to `true`.
     *
     * **Note**: If the tag text is the name of a symbol, and the symbol's name includes leading or
     * trailing whitespace (for example, the property names in `{ ' ': true, ' foo ': false }`),
     * the tag text is not trimmed. Instead, the tag text is wrapped in double quotes to prevent the
     * whitespace from being trimmed.
     */
    this.text = trim(tagBody, trimOpts, meta);

    if (this.text) {
      processTagText(this, tagDef, meta, env);
    }

    tagValidator.validate(this, tagDef, meta);
  }
}

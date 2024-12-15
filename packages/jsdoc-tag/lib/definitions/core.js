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

import { astNode, Syntax } from '@jsdoc/ast';
import * as name from '@jsdoc/name';

import { isInlineTag } from '../inline.js';
import * as util from './util.js';

const { LONGNAMES, SCOPE } = name;
const MODULE_NAMESPACE = 'module:';
const MODULE_NAMESPACE_REGEXP = new RegExp('^' + MODULE_NAMESPACE);
const VARIATION_VALUE_REGEXP = /^\((.+)\)$/;

function stripModuleNamespace(docletName) {
  return docletName.replace(MODULE_NAMESPACE_REGEXP, '');
}

// Core JSDoc tags that are shared with other tag dictionaries.
export const getTags = (env) => ({
  abstract: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      // we call this `virtual` because `abstract` is a reserved word
      doclet.virtual = true;
    },
    synonyms: ['virtual'],
  },
  access: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      // only valid values are package, private, protected and public
      if (/^(package|private|protected|public)$/i.test(value)) {
        doclet.access = value.toLowerCase();
      } else {
        doclet.access = undefined;
      }
    },
  },
  alias: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      doclet.alias = value;
    },
  },
  async: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      doclet.async = true;
    },
  },
  augments: {
    mustHaveValue: true,
    // Allow augments value to be specified as a normal type, e.g. {Type}
    onTagText: util.parseTypeText,
    onTagged(doclet, { value }) {
      doclet.augment(util.firstWordOf(value));
    },
    synonyms: ['extends'],
  },
  author: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      doclet.author ??= [];
      doclet.author.push(value);
    },
  },
  // This symbol has a member that should use the same docs as another symbol.
  borrows: {
    mustHaveValue: true,
    onTagged(doclet, tag) {
      const parsed = util.parseBorrows(doclet, tag);

      doclet.borrow(parsed.target, parsed.source);
    },
  },
  class: {
    onTagged(doclet, tag) {
      let looksLikeDesc;

      doclet.addTag('kind', 'class');

      // handle special case where both @class and @constructor tags exist in same doclet
      if (tag.originalTitle === 'class') {
        // multiple words after @class?
        looksLikeDesc = (tag.value || '').match(/\S+\s+\S+/);
        if (
          (looksLikeDesc || /@construct(s|or)\b/i.test(doclet.comment)) &&
          !/@classdesc\b/i.test(doclet.comment)
        ) {
          // treat the @class tag as a @classdesc tag instead
          doclet.classdesc = tag.value;

          return;
        }
      }

      util.setDocletNameToValue(doclet, tag);
    },
    synonyms: ['constructor'],
  },
  classdesc: {
    onTagged(doclet, { value }) {
      doclet.classdesc = value;
    },
  },
  constant: {
    canHaveType: true,
    canHaveName: true,
    onTagged(doclet, tag) {
      util.setDocletKindToTitle(doclet, tag);
      util.setDocletNameToValueName(doclet, tag);
      util.setDocletTypeToValueType(doclet, tag);
    },
    synonyms: ['const'],
  },
  constructs: {
    onTagged(doclet, { value }) {
      let ownerClassName;

      if (!value) {
        // this can be resolved later in the handlers
        ownerClassName = '{@thisClass}';
      } else {
        ownerClassName = util.firstWordOf(value);
      }
      doclet.addTag('alias', ownerClassName);
      doclet.addTag('kind', 'class');
    },
  },
  copyright: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      doclet.copyright = value;
    },
  },
  default: {
    onTagged(doclet, { value }) {
      if (value) {
        doclet.defaultvalue = value;
      } else if (doclet.meta && doclet.meta.code && typeof doclet.meta.code.value !== 'undefined') {
        switch (doclet.meta.code.type) {
          case Syntax.ArrayExpression:
            doclet.defaultvalue = astNode.nodeToValue(doclet.meta.code.node);
            doclet.defaultvaluetype = 'array';
            break;

          case Syntax.Literal:
            doclet.defaultvalue = doclet.meta.code.value;
            break;

          case Syntax.ObjectExpression:
            doclet.defaultvalue = astNode.nodeToValue(doclet.meta.code.node);
            doclet.defaultvaluetype = 'object';
            break;

          default:
            // do nothing
            break;
        }
      }
    },
    synonyms: ['defaultvalue'],
  },
  deprecated: {
    // value is optional
    onTagged(doclet, { value }) {
      doclet.deprecated = value ?? true;
    },
  },
  enum: {
    canHaveType: true,
    onTagged(doclet, tag) {
      doclet.kind ??= 'member';
      doclet.isEnum = true;
      util.setDocletTypeToValueType(doclet, tag);
    },
  },
  event: {
    isNamespace: true,
    onTagged(doclet, tag) {
      util.setDocletKindToTitle(doclet, tag);
      util.setDocletNameToValue(doclet, tag);
    },
  },
  example: {
    keepsWhitespace: true,
    removesIndent: true,
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      doclet.examples ??= [];
      doclet.examples.push(value);
    },
  },
  exports: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      const modName = util.firstWordOf(value);

      // in case the user wrote something like `/** @exports module:foo */`:
      doclet.addTag('alias', stripModuleNamespace(modName));
      doclet.addTag('kind', 'module');
    },
  },
  external: {
    canHaveType: true,
    isNamespace: true,
    onTagged(doclet, tag) {
      util.setDocletKindToTitle(doclet, tag);
      if (tag.value && tag.value.type) {
        util.setDocletTypeToValueType(doclet, tag);
        doclet.addTag('name', doclet.type.names[0]);
      } else {
        util.setDocletNameToValue(doclet, tag);
      }
    },
    synonyms: ['host'],
  },
  file: {
    onTagged(doclet, tag) {
      util.setNameToFile(doclet);
      util.setDocletKindToTitle(doclet, tag);
      util.setDocletDescriptionToValue(doclet, tag);

      doclet.preserveName = true;
    },
    synonyms: ['fileoverview', 'overview'],
  },
  fires: {
    mustHaveValue: true,
    onTagged(doclet, tag) {
      doclet.fires ??= [];
      util.applyNamespaceToTag('event', tag);
      doclet.fires.push(tag.value);
    },
    synonyms: ['emits'],
  },
  function: {
    onTagged(doclet, tag) {
      util.setDocletKindToTitle(doclet, tag);
      util.setDocletNameToValue(doclet, tag);
    },
    synonyms: ['func', 'method'],
  },
  generator: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      doclet.generator = true;
    },
  },
  global: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      doclet.scope = SCOPE.NAMES.GLOBAL;
      doclet.memberof = undefined;
    },
  },
  hideconstructor: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      doclet.hideconstructor = true;
    },
  },
  ignore: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      doclet.ignore = true;
    },
  },
  implements: {
    mustHaveValue: true,
    onTagText: util.parseTypeText,
    onTagged(doclet, { value }) {
      doclet.implements ??= [];
      doclet.implements.push(value);
    },
  },
  inheritdoc: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      // Use an empty string so JSDoc can support `@inheritdoc Foo#bar` in the future.
      doclet.inheritdoc = '';
    },
  },
  inner: {
    onTagged(doclet, tag) {
      util.setDocletScopeToTitle(doclet, tag, env);
    },
  },
  instance: {
    onTagged(doclet, tag) {
      util.setDocletScopeToTitle(doclet, tag, env);
    },
  },
  interface: {
    canHaveName: true,
    onTagged(doclet, tag) {
      doclet.addTag('kind', 'interface');
      if (tag.value) {
        util.setDocletNameToValueName(doclet, tag);
      }
    },
  },
  lends: {
    onTagged(doclet, { value }) {
      doclet.alias = value ?? LONGNAMES.GLOBAL;
      doclet.addTag('undocumented');
    },
  },
  license: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      doclet.license = value;
    },
  },
  listens: {
    mustHaveValue: true,
    onTagged(doclet, tag) {
      doclet.listens ??= [];
      util.applyNamespaceToTag('event', tag);
      doclet.listens.push(tag.value);
    },
  },
  member: {
    canHaveType: true,
    canHaveName: true,
    onTagged(doclet, tag) {
      util.setDocletKindToTitle(doclet, tag);
      util.setDocletNameToValueName(doclet, tag);
      util.setDocletTypeToValueType(doclet, tag);
    },
    synonyms: ['var'],
  },
  memberof: {
    mustHaveValue: true,
    onTagged(doclet, tag) {
      if (tag.originalTitle === 'memberof!') {
        doclet.forceMemberof = true;
        if (tag.value === LONGNAMES.GLOBAL) {
          doclet.addTag('global');
          doclet.memberof = undefined;
        }
      }
      util.setDocletMemberof(doclet, tag);
    },
    synonyms: ['memberof!'],
  },
  mixes: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      const source = util.firstWordOf(value);

      doclet.mix(source);
    },
  },
  mixin: {
    onTagged(doclet, tag) {
      util.setDocletKindToTitle(doclet, tag);
      util.setDocletNameToValue(doclet, tag);
    },
  },
  modifies: {
    canHaveType: true,
    onTagged(doclet, { value }) {
      doclet.modifies ??= [];
      doclet.modifies.push(value);
    },
  },
  module: {
    canHaveType: true,
    isNamespace: true,
    onTagged(doclet, tag) {
      util.setDocletKindToTitle(doclet, tag);
      util.setDocletNameToValue(doclet, tag);
      if (!doclet.name) {
        util.setDocletNameToFilename(doclet);
      }
      // in case the user wrote something like `/** @module module:foo */`:
      doclet.name = stripModuleNamespace(doclet.name);

      util.setDocletTypeToValueType(doclet, tag);
    },
  },
  namespace: {
    canHaveType: true,
    onTagged(doclet, tag) {
      util.setDocletKindToTitle(doclet, tag);
      util.setDocletNameToValue(doclet, tag);
      util.setDocletTypeToValueType(doclet, tag);
    },
  },
  package: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      doclet.access = 'package';
    },
  },
  param: {
    canHaveType: true,
    canHaveName: true,
    onTagged(doclet, { value }) {
      doclet.params ??= [];
      doclet.params.push(value ?? {});
    },
    synonyms: ['arg', 'argument'],
  },
  private: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      doclet.access = 'private';
    },
  },
  property: {
    mustHaveValue: true,
    canHaveType: true,
    canHaveName: true,
    onTagged(doclet, { value }) {
      doclet.properties ??= [];
      doclet.properties.push(value);
    },
    synonyms: ['prop'],
  },
  protected: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      doclet.access = 'protected';
    },
  },
  public: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      doclet.access = 'public';
    },
  },
  readonly: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      doclet.readonly = true;
    },
  },
  requires: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      let requiresName;

      // Inline link tags are passed through as-is so that `@requires {@link foo}` works.
      if (isInlineTag(value, 'link\\S*')) {
        requiresName = value;
      }
      // Otherwise, assume it's a module.
      else {
        requiresName = util.firstWordOf(value);
        if (!requiresName.match(MODULE_NAMESPACE_REGEXP)) {
          requiresName = MODULE_NAMESPACE + requiresName;
        }
      }

      doclet.requires ??= [];
      doclet.requires.push(requiresName);
    },
  },
  returns: {
    mustHaveValue: true,
    canHaveType: true,
    onTagged(doclet, { value }) {
      doclet.returns ??= [];
      doclet.returns.push(value);
    },
    synonyms: ['return'],
  },
  see: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      doclet.see ??= [];
      doclet.see.push(value);
    },
  },
  since: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      doclet.since = value;
    },
  },
  static: {
    onTagged(doclet, tag) {
      util.setDocletScopeToTitle(doclet, tag, env);
    },
  },
  summary: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      doclet.summary = value;
    },
  },
  this: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      doclet.this = util.firstWordOf(value);
    },
  },
  throws: {
    mustHaveValue: true,
    canHaveType: true,
    onTagged(doclet, { value }) {
      doclet.exceptions ??= [];
      doclet.exceptions.push(value);
    },
    synonyms: ['exception'],
  },
  todo: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      doclet.todo ??= [];
      doclet.todo.push(value);
    },
  },
  type: {
    mustHaveValue: true,
    mustNotHaveDescription: true,
    canHaveType: true,
    onTagText(text) {
      let closeIdx;
      let openIdx;

      const OPEN_BRACE = '{';
      const CLOSE_BRACE = '}';

      // Remove line breaks.
      text = text.replace(/[\f\n\r]/g, '');

      // Text must be a type expression; for backwards compatibility, we add braces if they're
      // missing. But do NOT add braces to things like `@type {string} some pointless text`.
      openIdx = text.indexOf(OPEN_BRACE);
      closeIdx = text.indexOf(CLOSE_BRACE);

      // A type expression is at least one character long.
      if (openIdx !== 0 || closeIdx <= openIdx + 1) {
        text = OPEN_BRACE + text + CLOSE_BRACE;
      }

      return text;
    },
    onTagged(doclet, tag) {
      if (tag.value && tag.value.type) {
        util.setDocletTypeToValueType(doclet, tag);

        // For backwards compatibility, we interpret `@type` for functions as the return type.
        if (doclet.kind === 'function') {
          doclet.addTag('returns', tag.text);
        }
      }
    },
  },
  typedef: {
    canHaveType: true,
    canHaveName: true,
    onTagged(doclet, tag) {
      util.setDocletKindToTitle(doclet, tag);

      if (tag.value) {
        util.setDocletNameToValueName(doclet, tag);

        // Callbacks are always type {function}.
        if (tag.originalTitle === 'callback') {
          doclet.type = {
            names: ['function'],
          };
        } else {
          util.setDocletTypeToValueType(doclet, tag);
        }
      }
    },
    synonyms: ['callback'],
  },
  variation: {
    mustHaveValue: true,
    onTagged(doclet, tag) {
      let value = tag.value;
      const match = value.match(VARIATION_VALUE_REGEXP);

      if (match) {
        value = match[1];
      }

      doclet.variation = value;
    },
  },
  version: {
    mustHaveValue: true,
    onTagged(doclet, { value }) {
      doclet.version = value;
    },
  },
  yields: {
    mustHaveValue: true,
    canHaveType: true,
    onTagged(doclet, { value }) {
      doclet.yields ??= [];
      doclet.yields.push(value);
    },
    synonyms: ['yield'],
  },
});

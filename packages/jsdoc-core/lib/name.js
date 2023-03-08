/*
  Copyright 2019 the JSDoc Authors.

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
 * Methods for manipulating symbol names in JSDoc.
 *
 * @alias @jsdoc/core.name
 */
import escape from 'escape-string-regexp';
import _ from 'lodash';

/**
 * Longnames that have a special meaning in JSDoc.
 *
 * @enum {string}
 * @static
 * @memberof module:jsdoc/name
 */
export const LONGNAMES = {
  /** Longname used for doclets that do not have a longname, such as anonymous functions. */
  ANONYMOUS: '<anonymous>',
  /** Longname that represents global scope. */
  GLOBAL: '<global>',
};

// Module namespace prefix.
export const MODULE_NAMESPACE = 'module:';

/**
 * Names and punctuation marks that identify doclet scopes.
 *
 * @enum {string}
 * @static
 * @memberof module:jsdoc/name
 */
export const SCOPE = {
  NAMES: {
    GLOBAL: 'global',
    INNER: 'inner',
    INSTANCE: 'instance',
    STATIC: 'static',
  },
  PUNC: {
    INNER: '~',
    INSTANCE: '#',
    STATIC: '.',
  },
};

// Keys must be lowercase.
export const SCOPE_TO_PUNC = {
  inner: SCOPE.PUNC.INNER,
  instance: SCOPE.PUNC.INSTANCE,
  static: SCOPE.PUNC.STATIC,
};

export const PUNC_TO_SCOPE = _.invert(SCOPE_TO_PUNC);

const SCOPE_PUNC = _.values(SCOPE.PUNC);
const SCOPE_PUNC_STRING = `[${SCOPE_PUNC.join()}]`;
const REGEXP_LEADING_SCOPE = new RegExp(`^(${SCOPE_PUNC_STRING})`);
const REGEXP_TRAILING_SCOPE = new RegExp(`(${SCOPE_PUNC_STRING})$`);

const DESCRIPTION = '(?:(?:[ \\t]*\\-\\s*|\\s+)(\\S[\\s\\S]*))?$';
const REGEXP_DESCRIPTION = new RegExp(DESCRIPTION);
const REGEXP_NAME_DESCRIPTION = new RegExp(`^(\\[[^\\]]+\\]|\\S+)${DESCRIPTION}`);

/**
 * Check whether a name appears to represent a complete longname that is a member of the specified
 * parent.
 *
 * @example
 * nameIsLongname('foo.bar', 'foo');  // true
 * nameIsLongname('foo.bar', 'baz');  // false
 * nameIsLongname('bar', 'foo');      // false
 * @param {string} name - The name to check.
 * @param {string} memberof - The parent of the name.
 * @returns {boolean} `true` if the name represents a complete longname that is a member of the
 * parent; otherwise, `false`.
 */
export function nameIsLongname(name, memberof) {
  const regexp = new RegExp(`^${escape(memberof)}${SCOPE_PUNC_STRING}`);

  return regexp.test(name);
}

/**
 * For names that identify a property of a prototype, replace the `prototype` portion of the name
 * with `#`, which indicates instance-level scope. For example, `Foo.prototype.bar` becomes
 * `Foo#bar`.
 *
 * @param {string} name - The name in which to change `prototype` to `#`.
 * @returns {string} The updated name.
 */
export function prototypeToPunc(name) {
  // Don't mangle symbols named `prototype`.
  if (name === 'prototype') {
    return name;
  }

  return name.replace(/(?:^|\.)prototype\.?/g, SCOPE.PUNC.INSTANCE);
}

/**
 * Check whether a name begins with a character that identifies a scope.
 *
 * @param {string} name - The name to check.
 * @returns {boolean} `true` if the name begins with a scope character; otherwise, `false`.
 */
export const hasLeadingScope = (name) => REGEXP_LEADING_SCOPE.test(name);

/**
 * Check whether a name ends with a character that identifies a scope.
 *
 * @param {string} name - The name to check.
 * @returns {boolean} `true` if the name ends with a scope character; otherwise, `false`.
 */
export const hasTrailingScope = (name) => REGEXP_TRAILING_SCOPE.test(name);

/**
 * Get a symbol's basename, which is the first part of its full name before any punctuation (other
 * than an underscore). For example, all of the following names have the basename `Foo`:
 *
 * + `Foo`
 * + `Foo.bar`
 * + `Foo.prototype.bar`
 * + `Foo#bar`
 *
 * @param {?string} [name] - The symbol's full name.
 * @returns {?string} The symbol's basename.
 */
export function getBasename(name) {
  if (!name) {
    return null;
  }

  return name.replace(/^([$a-z_][$a-z_0-9]*).*?$/i, '$1');
}

// TODO: docs
export const stripNamespace = (longname) => longname.replace(/^[a-zA-Z]+:/, '');

// TODO: docs
function slice(longname, sliceChars, forcedMemberof) {
  let i;
  let memberof = '';
  let name = '';
  let parts;
  let partsRegExp;
  let scopePunc = '';
  let token;
  const tokens = [];
  let variation;

  sliceChars = sliceChars || SCOPE_PUNC;

  // Quoted strings in a longname are atomic, so we convert them to tokens:
  // foo["bar"] => foo.@{1}@
  // Foo.prototype["bar"] => Foo#@{1}
  longname = longname.replace(/(prototype|#)?(\[?["'].+?["']\]?)/g, ($, p1, p2) => {
    let punc = '';

    // Is there a leading bracket?
    if (/^\[/.test(p2)) {
      // Is it a static or instance member?
      punc = p1 ? SCOPE.PUNC.INSTANCE : SCOPE.PUNC.STATIC;
      p2 = p2.replace(/^\[/g, '').replace(/\]$/g, '');
    }

    token = `@{${tokens.length}}@`;
    tokens.push(p2);

    return punc + token;
  });

  longname = prototypeToPunc(longname);

  if (typeof forcedMemberof !== 'undefined') {
    partsRegExp = new RegExp(`^(.*?)([${sliceChars.join()}]?)$`);
    name = longname.substr(forcedMemberof.length);
    parts = forcedMemberof.match(partsRegExp);

    if (parts[1]) {
      memberof = parts[1] || forcedMemberof;
    }
    if (parts[2]) {
      scopePunc = parts[2];
    }
  } else if (longname) {
    parts = longname.match(new RegExp(`^(:?(.+)([${sliceChars.join()}]))?(.+?)$`)) || [];
    name = parts.pop() || '';
    scopePunc = parts.pop() || '';
    memberof = parts.pop() || '';
  }

  // Like `@name foo.bar(2)`.
  if (/(.+)\(([^)]+)\)$/.test(name)) {
    name = RegExp.$1;
    variation = RegExp.$2;
  }

  // Restore quoted strings.
  i = tokens.length;
  while (i--) {
    longname = longname.replace(`@{${i}}@`, tokens[i]);
    memberof = memberof.replace(`@{${i}}@`, tokens[i]);
    scopePunc = scopePunc.replace(`@{${i}}@`, tokens[i]);
    name = name.replace(`@{${i}}@`, tokens[i]);
  }

  return {
    longname: longname,
    memberof: memberof,
    scope: scopePunc,
    name: name,
    variation: variation,
  };
}

/**
 * Given a longname like `a.b#c(2)`, split it into the following parts:
 *
 * + `longname`
 * + `memberof`
 * + `scope`
 * + `name`
 * + `variation`
 *
 * @param {string} longname - The longname to divide into parts.
 * @param {string} forcedMemberof
 * @returns {object} Representing the properties of the given name.
 */
export const toParts = (longname, forcedMemberof) => slice(longname, null, forcedMemberof);

// TODO: docs
/**
 * @param {string} longname The full longname of the symbol.
 * @param {string} ns The namespace to be applied.
 * @returns {string} The longname with the namespace applied.
 */
export function applyNamespace(longname, ns) {
  const nameParts = slice(longname);
  const name = nameParts.name;

  longname = nameParts.longname;

  if (!/^[a-zA-Z]+?:.+$/i.test(name)) {
    longname = longname.replace(new RegExp(`${escape(name)}$`), `${ns}:${name}`);
  }

  return longname;
}

/**
 * Check whether a parent longname is an ancestor of a child longname.
 *
 * @param {string} parent - The parent longname.
 * @param {string} child - The child longname.
 * @return {boolean} `true` if the parent is an ancestor of the child; otherwise, `false`.
 */
export function hasAncestor(parent, child) {
  let parentIsAncestor = false;
  let memberof = child;

  if (!parent || !child) {
    return parentIsAncestor;
  }

  // Fast path for obvious non-ancestors.
  if (child.indexOf(parent) !== 0) {
    return parentIsAncestor;
  }

  do {
    memberof = slice(memberof).memberof;

    if (memberof === parent) {
      parentIsAncestor = true;
    }
  } while (!parentIsAncestor && memberof);

  return parentIsAncestor;
}

// TODO: docs
export function fromParts({ memberof, scope, name, variation }) {
  return [memberof || '', scope || '', name || '', variation ? `(${variation})` : ''].join('');
}

// TODO: docs
export function stripVariation(name) {
  const parts = slice(name);

  parts.variation = '';

  return fromParts(parts);
}

function splitLongname(longname, options) {
  const chunks = [];
  let currentNameInfo;
  const nameInfo = {};
  let previousName = longname;
  const splitters = SCOPE_PUNC.concat('/');

  options = _.defaults(options || {}, {
    includeVariation: true,
  });

  do {
    if (!options.includeVariation) {
      previousName = stripVariation(previousName);
    }
    currentNameInfo = nameInfo[previousName] = slice(previousName, splitters);
    previousName = currentNameInfo.memberof;
    chunks.push(currentNameInfo.scope + currentNameInfo.name);
  } while (previousName);

  return {
    chunks: chunks.reverse(),
    nameInfo: nameInfo,
  };
}

/**
 * Convert an array of doclet longnames into a tree structure, optionally attaching doclets to the
 * tree.
 *
 * Each level of the tree is an object with the following properties:
 *
 * + `longname {string}`: The longname.
 * + `memberof {string?}`: The memberof.
 * + `scope {string?}`: The longname's scope, represented as a punctuation mark (for example, `#`
 * for instance and `.` for static).
 * + `name {string}`: The short name.
 * + `doclet {Object?}`: The doclet associated with the longname, or `null` if the doclet was not
 * provided.
 * + `children {Object?}`: The children of the current longname. Not present if there are no
 * children.
 *
 * For example, suppose you have the following array of doclet longnames:
 *
 * ```js
 * [
 *   "module:a",
 *   "module:a/b",
 *   "myNamespace",
 *   "myNamespace.Foo",
 *   "myNamespace.Foo#bar"
 * ]
 * ```
 *
 * This method converts these longnames to the following tree:
 *
 * ```js
 * {
 *   "module:a": {
 *     "longname": "module:a",
 *     "memberof": "",
 *     "scope": "",
 *     "name": "module:a",
 *     "doclet": null,
 *     "children": {
 *       "/b": {
 *         "longname": "module:a/b",
 *         "memberof": "module:a",
 *         "scope": "/",
 *         "name": "b",
 *         "doclet": null
 *       }
 *     }
 *   },
 *   "myNamespace": {
 *     "longname": "myNamespace",
 *     "memberof": "",
 *     "scope": "",
 *     "name": "myNamespace",
 *     "doclet": null,
 *     "children": {
 *       ".Foo": {
 *         "longname": "myNamespace.Foo",
 *         "memberof": "myNamespace",
 *         "scope": ".",
 *         "name": "Foo",
 *         "doclet": null,
 *         "children": {
 *           "#bar": {
 *             "longname": "myNamespace.Foo#bar",
 *             "memberof": "myNamespace.Foo",
 *             "scope": "#",
 *             "name": "bar",
 *             "doclet": null
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @param {Array<string>} longnames - The longnames to convert into a tree.
 * @param {Object<string, module:@jsdoc/doclet.Doclet>} doclets - The doclets to attach to a tree.
 * Each property should be the longname of a doclet, and each value should be the doclet for that
 * longname.
 * @return {Object} A tree with information about each longname in the format shown above.
 */
export function longnamesToTree(longnames, doclets) {
  const splitOptions = { includeVariation: false };
  const tree = {};

  longnames.forEach((longname) => {
    let currentLongname = '';
    let currentParent = tree;
    let nameInfo;
    let processed;

    // Don't try to add empty longnames to the tree.
    if (!longname) {
      return;
    }

    processed = splitLongname(longname, splitOptions);
    nameInfo = processed.nameInfo;

    processed.chunks.forEach((chunk) => {
      currentLongname += chunk;

      if (currentParent !== tree) {
        currentParent.children = currentParent.children || {};
        currentParent = currentParent.children;
      }

      if (!Object.hasOwn(currentParent, chunk)) {
        currentParent[chunk] = nameInfo[currentLongname];
      }

      if (currentParent[chunk]) {
        currentParent[chunk].doclet = doclets ? doclets[currentLongname] : null;
        currentParent = currentParent[chunk];
      }
    });
  });

  return tree;
}

/**
 * Split a string that starts with a name and ends with a description into its parts. Allows the
 * default value (if present) to contain brackets. Returns `null` if the name contains mismatched
 * brackets.
 *
 * @param {string} nameDesc
 * @returns {?Object} Hash with "name" and "description" properties.
 */
function splitNameMatchingBrackets(nameDesc) {
  const buffer = [];
  let c;
  let stack = 0;
  let stringEnd = null;

  for (var i = 0; i < nameDesc.length; ++i) {
    c = nameDesc[i];
    buffer.push(c);

    if (stringEnd) {
      if (c === '\\' && i + 1 < nameDesc.length) {
        buffer.push(nameDesc[++i]);
      } else if (c === stringEnd) {
        stringEnd = null;
      }
    } else if (c === '"' || c === "'") {
      stringEnd = c;
    } else if (c === '[') {
      ++stack;
    } else if (c === ']') {
      if (--stack === 0) {
        break;
      }
    }
  }

  if (stack || stringEnd) {
    return null;
  }

  nameDesc.substring(i).match(REGEXP_DESCRIPTION);

  return {
    name: buffer.join(''),
    // TODO: Don't use global RegExp properties.
    description: RegExp.$1,
  };
}

/**
 * Split a string that starts with a name and ends with a description into separate parts.
 * @param {string} str - The string that contains the name and description.
 * @returns {object} An object with `name` and `description` properties.
 */
export function splitNameAndDescription(str) {
  // Like: `name`, `[name]`, `name text`, `[name] text`, `name - text`, or `[name] - text`.
  // To ensure that we don't get confused by leading dashes in Markdown list items, the hyphen
  // must be on the same line as the name.

  // Optional values get special treatment,
  let result = null;

  if (str[0] === '[') {
    result = splitNameMatchingBrackets(str);
    if (result !== null) {
      return result;
    }
  }

  str.match(REGEXP_NAME_DESCRIPTION);

  return {
    // TODO: Don't use global RegExp properties.
    name: RegExp.$1,
    description: RegExp.$2,
  };
}

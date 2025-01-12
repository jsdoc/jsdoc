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

import path from 'node:path';

import { astNode, Syntax } from '@jsdoc/ast';
import {
  applyNamespace,
  getLeadingScope,
  getTrailingScope,
  LONGNAMES,
  MODULE_NAMESPACE,
  nameIsLongname,
  prototypeToPunc,
  PUNC_TO_SCOPE,
  SCOPE,
  SCOPE_TO_PUNC,
  toParts,
} from '@jsdoc/name';
import { Tag } from '@jsdoc/tag';
import _ from 'lodash';
import onChange from 'on-change';

const { isFunction } = astNode;

// Forward-declare Doclet class.
export let Doclet;

const ACCESS_LEVELS = ['package', 'private', 'protected', 'public'];
const ALL_SCOPE_NAMES = _.values(SCOPE.NAMES);
const CLASSDESC_TAG = '@classdesc';
const DEFAULT_SCOPE = SCOPE.NAMES.STATIC;
const DESCRIPTION_TAG = '@description';
// TODO: `class` should be on this list, right? What are the implications of adding it?
const GLOBAL_KINDS = ['constant', 'enum', 'function', 'member', 'typedef'];
const ON_CHANGE_OPTIONS = {
  ignoreDetached: true,
  pathAsArray: true,
};
const REGEXP_COMMENT_STARTS_WITH_TAG = /^\s*@/;
const REGEXP_GLOBAL = new RegExp(`^${LONGNAMES.GLOBAL}\\.?`);
const REGEXP_ONLY_WHITESPACE = /^\s*$/;

export const WATCHABLE_PROPS = [
  'access',
  'augments',
  'borrowed',
  'ignore',
  'implements',
  'kind',
  'listens',
  'longname',
  'memberof',
  'mixes',
  'scope',
  'undocumented',
];

WATCHABLE_PROPS.sort();

function fakeMeta(node) {
  return {
    type: node?.type,
    node: node,
  };
}

// use the meta info about the source code to guess what the doclet kind should be
// TODO: set this elsewhere (maybe @jsdoc/ast.astNode.getInfo)
function codeToKind(code) {
  let kind = 'member';
  const node = code.node;

  if (isFunction(code.type) && code.type !== Syntax.MethodDefinition) {
    kind = 'function';
  } else if (code.type === Syntax.MethodDefinition && node) {
    if (node.kind === 'constructor') {
      kind = 'class';
    } else if (node.kind !== 'get' && node.kind !== 'set') {
      kind = 'function';
    }
  } else if (code.type === Syntax.ClassDeclaration || code.type === Syntax.ClassExpression) {
    kind = 'class';
  } else if (code.type === Syntax.ExportAllDeclaration) {
    // this value will often be an Identifier for a variable, which isn't very useful
    kind = codeToKind(fakeMeta(node.source));
  } else if (
    code.type === Syntax.ExportDefaultDeclaration ||
    code.type === Syntax.ExportNamedDeclaration
  ) {
    kind = codeToKind(fakeMeta(node.declaration));
  } else if (code.type === Syntax.ExportSpecifier) {
    // this value will often be an Identifier for a variable, which isn't very useful
    kind = codeToKind(fakeMeta(node.local));
  } else if (isFunction(node?.parent)) {
    kind = 'param';
  }

  return kind;
}

function unwrap(docletSrc) {
  if (!docletSrc) {
    return '';
  }

  // note: keep trailing whitespace for @examples
  // extra opening/closing stars are ignored
  // left margin is considered a star and a space
  // use the /m flag on regex to avoid having to guess what this platform's newline is
  docletSrc =
    // remove opening slash+stars
    docletSrc
      .replace(/^\/\*\*+/, '')
      // replace closing star slash with end-marker
      .replace(/\**\*\/$/, '\\Z')
      // remove left margin like: spaces+star or spaces+end-marker
      .replace(/^\s*(\* ?|\\Z)/gm, '')
      // remove end-marker
      .replace(/\s*\\Z$/g, '');

  return docletSrc;
}

/**
 * Convert the raw source of the doclet comment into an array of pseudo-Tag objects.
 * @private
 */
function toTags(docletSrc) {
  let parsedTag;
  const tagData = [];
  let tagText;
  let tagTitle;

  // split out the basic tags, keep surrounding whitespace
  // like: @tagTitle tagBody
  docletSrc
    // replace splitter ats with an arbitrary sequence
    .replace(/^(\s*)@(\S)/gm, '$1\\@$2')
    // then split on that arbitrary sequence
    .split('\\@')
    .forEach(($) => {
      if ($) {
        parsedTag = $.match(/^(\S+)(?:\s+(\S[\s\S]*))?/);

        if (parsedTag) {
          tagTitle = parsedTag[1];
          tagText = parsedTag[2];

          if (tagTitle) {
            tagData.push({
              title: tagTitle,
              text: tagText,
            });
          }
        }
      }
    });

  return tagData;
}

// If no tag is present at the start of the doclet source, then add a JSDoc tag, so that the initial
// text is treated as a description.
function fixDescription(docletSrc, { code }) {
  let newTag;

  if (!REGEXP_COMMENT_STARTS_WITH_TAG.test(docletSrc) && !REGEXP_ONLY_WHITESPACE.test(docletSrc)) {
    newTag =
      code?.type === Syntax.ClassDeclaration || code?.type === Syntax.ClassExpression
        ? CLASSDESC_TAG
        : DESCRIPTION_TAG;

    docletSrc = newTag + ' ' + docletSrc;
  }

  return docletSrc;
}

/**
 * Resolves the following properties of a doclet:
 *
 * + `name`
 * + `longname`
 * + `memberof`
 * + `variation`
 *
 * @private
 */
function resolve(doclet) {
  let about = {};
  let leadingScope;
  let memberof = doclet.memberof ?? '';
  let forcedMemberof;
  let metaName;
  let name = doclet.name ?? '';
  let puncAndName;
  let puncAndNameIndex;

  if (doclet.forceMemberof) {
    forcedMemberof = memberof;
  }

  // Change `MyClass.prototype.instanceMethod` to `MyClass#instanceMethod`
  // (but not in function params, which lack `doclet.kind`).
  // TODO: Check for specific `doclet.kind` values (probably `function`, `class`, and `module`).
  if (name && doclet.kind) {
    name = prototypeToPunc(name);
  }
  doclet.name = name;

  // Does the doclet have an alias that identifies the memberof? If so, use it
  if (doclet.alias) {
    about = toParts(name);

    if (about.memberof) {
      memberof = about.memberof;
    }
  }
  // Member of a var in an outer scope?
  else if (name && !memberof && doclet.meta.code?.funcscope) {
    name = doclet.longname = doclet.meta.code.funcscope + SCOPE.PUNC.INNER + name;
  }

  if (memberof || doclet.forceMemberof) {
    // @memberof tag given
    memberof = prototypeToPunc(memberof);

    // The name is a complete longname, like `@name foo.bar` with `@memberof foo`.
    if (name && nameIsLongname(name, memberof) && name !== memberof) {
      about = toParts(name, forcedMemberof);
    }
    // The name and memberof are identical and refer to a module, like `@name module:foo` with
    // `@memberof module:foo`.
    else if (name && name === memberof && name.startsWith(MODULE_NAMESPACE)) {
      about = toParts(name, forcedMemberof);
    }
    // The name and memberof are identical, like `@name foo` with `@memberof foo`.
    else if (name && name === memberof) {
      doclet.scope = doclet.scope || DEFAULT_SCOPE;
      name = memberof + SCOPE_TO_PUNC[doclet.scope] + name;
      about = toParts(name, forcedMemberof);
    }
    // Like `@memberof foo#` or `@memberof foo~`.
    else if (name && getTrailingScope(memberof)) {
      about = toParts(memberof + name, forcedMemberof);
    } else if (name && doclet.scope) {
      about = toParts(memberof + (SCOPE_TO_PUNC[doclet.scope] ?? '') + name, forcedMemberof);
    }
  } else {
    // No memberof.
    about = toParts(name);
  }

  if (about.name) {
    doclet.name = about.name;
  }

  if (about.memberof) {
    doclet.setMemberof(about.memberof);
  }

  if (about.longname && (!doclet.longname || doclet.longname === doclet.name)) {
    doclet.setLongname(about.longname);
  }

  if (doclet.scope === SCOPE.NAMES.GLOBAL) {
    // via @global tag?
    doclet.setLongname(doclet.name);
    doclet.memberof = undefined;
  } else if (about.scope) {
    if (about.memberof === LONGNAMES.GLOBAL) {
      // via @memberof <global> ?
      doclet.scope = SCOPE.NAMES.GLOBAL;
    } else {
      doclet.scope = PUNC_TO_SCOPE[about.scope];
    }
  } else if (doclet.name && doclet.memberof && !doclet.longname) {
    leadingScope = getLeadingScope(doclet.name);
    if (leadingScope) {
      doclet.scope = PUNC_TO_SCOPE[leadingScope];
      doclet.name = doclet.name.substr(1);
    } else if (doclet.meta.code?.name) {
      // HACK: Handle cases where an ES 2015 class is a static memberof something else, and
      // the class has instance members. In these cases, we have to detect the instance
      // members' scope by looking at the meta info. There's almost certainly a better way to
      // do this...
      metaName = String(doclet.meta.code.name);
      puncAndName = SCOPE.PUNC.INSTANCE + doclet.name;
      puncAndNameIndex = metaName.indexOf(puncAndName);
      if (puncAndNameIndex !== -1 && puncAndNameIndex === metaName.length - puncAndName.length) {
        doclet.scope = SCOPE.NAMES.INSTANCE;
      }
    }

    doclet.scope ??= DEFAULT_SCOPE;
    doclet.setLongname(doclet.memberof + SCOPE_TO_PUNC[doclet.scope] + doclet.name);
  }

  if (about.variation) {
    doclet.variation = about.variation;
  }

  // If we never found a longname, just use an empty string.
  if (!doclet.longname) {
    doclet.longname = '';
  }
}

function removeGlobal(longname) {
  return longname.replace(REGEXP_GLOBAL, '');
}

/**
 * Get the full path to the source file that is associated with a doclet.
 *
 * @private
 * @param {module:@jsdoc/doclet.Doclet} The doclet to check for a filepath.
 * @return {string} The path to the doclet's source file, or an empty string if the path is not
 * available.
 */
function getFilepath(doclet) {
  if (!doclet?.meta?.filename) {
    return '';
  }

  return path.join(doclet.meta.path ?? '', doclet.meta.filename);
}

function emitDocletChanged(emitter, doclet, property, oldValue, newValue) {
  emitter.emit('docletChanged', { doclet, property, oldValue, newValue });
}

function clone(source, target, properties) {
  properties.forEach((property) => {
    const sourceProperty = source[property];

    if (_.isFunction(sourceProperty)) {
      // Do nothing.
    } else if (_.isArray(sourceProperty)) {
      target[property] = sourceProperty.slice();
    } else if (_.isObject(sourceProperty)) {
      target[property] = _.cloneDeep(sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
}

/**
 * Copy all but a list of excluded properties from one of two doclets onto a target doclet. Prefers
 * the primary doclet over the secondary doclet.
 *
 * @private
 * @param {module:@jsdoc/doclet.Doclet} primary - The primary doclet.
 * @param {module:@jsdoc/doclet.Doclet} secondary - The secondary doclet.
 * @param {module:@jsdoc/doclet.Doclet} target - The doclet to which properties will be copied.
 * @param {Array.<string>} exclude - The names of properties to exclude from copying.
 */
function copyPropsWithExcludelist(primary, secondary, target, exclude) {
  // Get names of primary and secondary properties that don't contain the value `undefined`.
  const primaryPropertyNames = Object.getOwnPropertyNames(primary).filter(
    (name) => !_.isUndefined(primary[name])
  );
  const primaryProperties = _.difference(primaryPropertyNames, exclude);
  const secondaryPropertyNames = Object.getOwnPropertyNames(secondary).filter(
    (name) => !_.isUndefined(secondary[name])
  );
  const secondaryProperties = _.difference(
    secondaryPropertyNames,
    exclude.concat(primaryProperties)
  );

  clone(primary, target, primaryProperties);
  clone(secondary, target, secondaryProperties);
}

/**
 * Copy specific properties from one of two doclets onto a target doclet, as long as the property
 * has a non-falsy value and a length greater than 0. Prefers the primary doclet over the secondary
 * doclet.
 *
 * @private
 * @param {module:@jsdoc/doclet.Doclet} primary - The primary doclet.
 * @param {module:@jsdoc/doclet.Doclet} secondary - The secondary doclet.
 * @param {module:@jsdoc/doclet.Doclet} target - The doclet to which properties will be copied.
 * @param {Array.<string>} include - The names of properties to copy.
 */
function copyPropsWithIncludelist(primary, secondary, target, include) {
  include.forEach((property) => {
    if (Object.hasOwn(primary, property) && primary[property]?.length) {
      target[property] = _.cloneDeep(primary[property]);
    } else if (Object.hasOwn(secondary, property) && secondary[property]?.length) {
      target[property] = _.cloneDeep(secondary[property]);
    }
  });
}

/**
 * Combine two doclets into a new doclet.
 *
 * @param {module:@jsdoc/doclet.Doclet} primary - The doclet whose properties will be used.
 * @param {module:@jsdoc/doclet.Doclet} secondary - The doclet to use as a fallback for properties
 * that the primary doclet does not have.
 * @returns {module:@jsdoc/doclet.Doclet} A new doclet that combines the primary and secondary
 * doclets.
 */
export function combineDoclets(primary, secondary) {
  const excludelist = ['env', 'params', 'properties', 'undocumented'];
  const includelist = ['params', 'properties'];
  const target = Doclet.emptyDoclet(secondary.env);

  // First, copy most properties to the target doclet.
  copyPropsWithExcludelist(primary, secondary, target, excludelist);
  // Then copy a few specific properties to the target doclet, as long as they're not falsy and
  // have a length greater than 0.
  copyPropsWithIncludelist(primary, secondary, target, includelist);

  return target;
}

/**
 * Represents a single JSDoc comment.
 *
 * @alias module:@jsdoc/doclet.Doclet
 */
Doclet = class {
  #dictionary;

  /**
   * Create a doclet.
   *
   * @param {string} docletSrc - The raw source code of the jsdoc comment.
   * @param {object} meta - Properties describing the code related to this comment.
   * @param {object} env - JSDoc environment.
   */
  constructor(docletSrc, meta, env) {
    const accessConfig = env.config?.opts?.access?.slice() ?? [];
    const emitter = env.emitter;
    const boundEmitDocletChanged = emitDocletChanged.bind(null, emitter, this);
    let newTags = [];

    this.#dictionary = env.tags;

    Object.defineProperty(this, 'accessConfig', {
      value: accessConfig,
      writable: true,
    });
    Object.defineProperty(this, 'env', {
      value: env,
    });
    Object.defineProperty(this, 'watchableProps', {
      value: {},
      writable: true,
    });
    WATCHABLE_PROPS.forEach((prop) => this.#defineWatchableProp(prop));

    /** The original text of the comment from the source code. */
    this.comment = docletSrc;
    meta ??= {};
    this.setMeta(meta);
    docletSrc = fixDescription(unwrap(docletSrc), meta);

    newTags = toTags(docletSrc);
    for (let i = 0, l = newTags.length; i < l; i++) {
      this.addTag(newTags[i].title, newTags[i].text);
    }
    this.postProcess();

    // Now that we've set the doclet's initial properties, listen for changes to those properties,
    // unless we were told not to.
    if (meta._watch !== false) {
      this.watchableProps = onChange(
        this.watchableProps,
        (property, oldValue, newValue) =>
          this.#onChangeHandler(boundEmitDocletChanged, property, oldValue, newValue),
        ON_CHANGE_OPTIONS
      );
    }
  }

  static clone(doclet) {
    return combineDoclets(doclet, Doclet.emptyDoclet(doclet.env));
  }

  static emptyDoclet(env) {
    return new Doclet('', {}, env);
  }

  // TODO: We call this method in the constructor _and_ in `jsdoc/src/handlers`. It appears that
  // if we don't call the method twice, various doclet properties can be incorrect, including name
  // and memberof.
  /** Called once after all tags have been added. */
  postProcess() {
    if (!this.preserveName) {
      resolve(this);
    }
    if (this.name && !this.longname) {
      this.setLongname(this.name);
    }
    if (this.memberof === '') {
      this.memberof = undefined;
    }

    if (!this.kind && this.meta?.code) {
      this.addTag('kind', codeToKind(this.meta.code));
    }

    if (this.variation && this.longname && !/\)$/.test(this.longname)) {
      this.longname += `(${this.variation})`;
    }

    // add in any missing param names
    if (this.params && this.meta?.code?.paramnames) {
      for (let i = 0, l = this.params.length; i < l; i++) {
        if (!this.params[i].name) {
          this.params[i].name = this.meta.code.paramnames[i] || '';
        }
      }
    }
  }

  /**
   * Add a tag to the doclet.
   *
   * @param {string} title - The title of the tag being added.
   * @param {string} [text] - The text of the tag being added.
   */
  addTag(title, text) {
    const tagDef = this.#dictionary.lookUp(title);
    const newTag = new Tag(title, text, this.meta, this.env);

    if (tagDef?.onTagged) {
      tagDef.onTagged(this, newTag);
    }

    if (!tagDef) {
      this.tags ??= [];
      this.tags.push(newTag);
    }
  }

  /**
   * Check whether the doclet represents a globally available symbol.
   *
   * @returns {boolean} `true` if the doclet represents a global; `false` otherwise.
   */
  isGlobal() {
    return this.scope === 'global' && GLOBAL_KINDS.includes(this.kind);
  }

  /**
   * Check whether the doclet should be used to generate output.
   *
   * @returns {boolean} `true` if the doclet should be used to generate output; `false` otherwise.
   */
  isVisible() {
    const accessConfig = this.accessConfig;

    // By default, we don't use:
    //
    // + Doclets that explicitly declare that they should be ignored
    // + Doclets that claim to belong to an anonymous scope
    // + "Undocumented" doclets (usually code with no JSDoc comment; might also include some odd
    //   artifacts of the parsing process)
    if (
      this.ignore === true ||
      this.memberof === LONGNAMES.ANONYMOUS ||
      this.undocumented === true
    ) {
      return false;
    }

    // We also don't use private doclets by default, unless the user told us to use them.
    if (
      (!accessConfig.length ||
        (!accessConfig.includes('all') && !accessConfig.includes('private'))) &&
      this.access === 'private'
    ) {
      return false;
    }

    if (accessConfig.length && !accessConfig.includes('all')) {
      // The string `undefined` needs special treatment.
      if (
        !accessConfig.includes('undefined') &&
        (this.access === null || this.access === undefined)
      ) {
        return false;
      }
      // For other access levels, we can just check whether the user asked us to use that level.
      if (ACCESS_LEVELS.some((level) => !accessConfig.includes(level) && this.access === level)) {
        return false;
      }
    }

    return true;
  }

  #defineWatchableProp(prop) {
    Object.defineProperty(this, prop, {
      configurable: false,
      enumerable: true,
      get() {
        return this.watchableProps[prop];
      },
      set(newValue) {
        this.watchableProps[prop] = newValue;
      },
    });
  }

  #onChangeHandler(boundEmitDocletChanged, propertyPath, newValue, oldValue) {
    let index;
    let newArray;
    let oldArray;
    const property = propertyPath[0];

    // Handle changes to arrays, like: `doclet.listens[0] = 'event:foo';`
    if (propertyPath.length > 1) {
      newArray = this.watchableProps[property].slice();

      oldArray = newArray.slice();
      // Update `oldArray` to contain the original value.
      index = propertyPath[propertyPath.length - 1];
      oldArray[index] = oldValue;

      boundEmitDocletChanged(property, oldArray, newArray);
    }
    // Handle changes to primitive values.
    else if (newValue !== oldValue) {
      boundEmitDocletChanged(property, oldValue, newValue);
    }
  }

  /**
   * Set the doclet's `longname` property.
   *
   * @param {string} longname - The longname for the doclet.
   */
  setLongname(longname) {
    /**
     * The fully resolved symbol name.
     * @type {string}
     */
    longname = removeGlobal(longname);
    if (this.#dictionary.isNamespace(this.kind)) {
      longname = applyNamespace(longname, this.kind);
    }

    this.longname = longname;
  }

  /**
   * Set the doclet's `memberof` property.
   *
   * @param {string} sid - The longname of the doclet's parent symbol.
   */
  setMemberof(sid) {
    /**
     * The longname of the symbol that contains this one, if any.
     * @type {string}
     */
    this.memberof = removeGlobal(sid)
      // TODO: Use `prototypeToPunc` instead?
      .replace(/\.prototype/g, SCOPE.PUNC.INSTANCE);
  }

  /**
   * Set the doclet's `scope` property. Must correspond to a scope name that is defined in
   * {@link module:@jsdoc/name.SCOPE.NAMES}.
   *
   * @param {string} scope - The scope for the doclet relative to the symbol's parent.
   * @throws {Error} If the scope name is not recognized.
   */
  setScope(scope) {
    let errorMessage;
    let filepath;

    if (!ALL_SCOPE_NAMES.includes(scope)) {
      filepath = getFilepath(this);

      errorMessage =
        `The scope name "${scope}" is not recognized. Use one of the following values: ` +
        `${ALL_SCOPE_NAMES}`;
      if (filepath) {
        errorMessage += ` (Source file: ${filepath})`;
      }

      throw new Error(errorMessage);
    }

    this.scope = scope;
  }

  /**
   * Add a symbol to this doclet's `borrowed` array.
   *
   * @param {string} source - The longname of the symbol that is the source.
   * @param {string} target - The name the symbol is being assigned to.
   */
  borrow(source, target) {
    const about = { from: source };

    if (target) {
      about.as = target;
    }

    /**
     * A list of symbols that are borrowed by this one, if any.
     *
     * @type {Array<string>}
     */
    this.borrowed ??= [];
    this.borrowed.push(about);
  }

  mix(source) {
    /**
     * A list of symbols that are mixed into this one, if any.
     *
     * @type {Array<string>}
     */
    this.mixes ??= [];
    this.mixes.push(source);
  }

  /**
   * Add a symbol to the doclet's `augments` array.
   *
   * @param {string} base - The longname of the base symbol.
   */
  augment(base) {
    /**
     * A list of symbols that are augmented by this one, if any.
     *
     * @type {Array<string>}
     */
    this.augments ??= [];
    this.augments.push(base);
  }

  /**
   * Set the `meta` property of this doclet.
   *
   * @param {object} meta
   */
  setMeta(meta) {
    let pathname;

    /**
     * Information about the source code associated with this doclet.
     *
     * @namespace
     */
    this.meta ??= {};

    if (meta.range) {
      /**
       * The positions of the first and last characters of the code associated with this doclet.
       *
       * @type {Array<number>}
       */
      this.meta.range = meta.range.slice();
    }

    if (meta.lineno) {
      /**
       * The name of the file containing the code associated with this doclet.
       *
       * @type {string}
       */
      this.meta.filename = path.basename(meta.filename);
      /**
       * The line number of the code associated with this doclet.
       *
       * @type {number}
       */
      this.meta.lineno = meta.lineno;
      /**
       * The column number of the code associated with this doclet.
       *
       * @type {number}
       */
      this.meta.columnno = meta.columnno;

      pathname = path.dirname(meta.filename);
      if (pathname && pathname !== '.') {
        this.meta.path = pathname;
      }
    }

    /**
     * Information about the code symbol.
     *
     * @namespace
     */
    this.meta.code ??= {};
    if (meta.id) {
      this.meta.code.id = meta.id;
    }
    if (meta.code) {
      if (meta.code.name) {
        /**
         * The name of the symbol in the source code.
         *
         * @type {string}
         */
        this.meta.code.name = meta.code.name;
      }
      if (meta.code.type) {
        /**
         * The type of the symbol in the source code.
         *
         * @type {string}
         */
        this.meta.code.type = meta.code.type;
      }
      if (meta.code.node) {
        Object.defineProperty(this.meta.code, 'node', {
          value: meta.code.node,
          enumerable: false,
        });
      }
      if (meta.code.funcscope) {
        this.meta.code.funcscope = meta.code.funcscope;
      }
      if (!_.isUndefined(meta.code.value)) {
        /**
         * The value of the symbol in the source code.
         *
         * @type {*}
         */
        this.meta.code.value = meta.code.value;
      }
      if (meta.code.paramnames) {
        this.meta.code.paramnames = meta.code.paramnames.slice();
      }
    }
  }
};

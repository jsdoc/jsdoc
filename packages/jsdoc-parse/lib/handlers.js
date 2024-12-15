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

import { Syntax } from '@jsdoc/ast';
import { Doclet } from '@jsdoc/doclet';
import * as name from '@jsdoc/name';
import escape from 'escape-string-regexp';

const PROTOTYPE_OWNER_REGEXP = /^(.+?)(\.prototype|#)$/;
const { LONGNAMES, SCOPE } = name;
const ESCAPED_MODULE_LONGNAMES = [
  escape(LONGNAMES.MODULE_DEFAULT_EXPORT),
  escape(LONGNAMES.MODULE_EXPORT),
  escape('module.exports'),
].join('|');

let currentModule = null;
// Modules inferred from the value of an `@alias` tag, like `@alias module:foo.bar`.
let inferredModules = [];

class ModuleInfo {
  constructor(doclet) {
    this.longname = doclet.longname;
    this.originalName = doclet.meta?.code?.name ?? '';
  }
}

function filterByLongname({ longname }) {
  // you can't document prototypes
  if (/#$/.test(longname)) {
    return true;
  }

  return false;
}

function createDoclet(comment, e, env) {
  let doclet;
  let flatComment;
  let msg;

  try {
    doclet = new Doclet(comment, e, env);
  } catch (error) {
    flatComment = comment.replace(/[\r\n]/g, '');
    msg = `cannot create a doclet for the comment "${flatComment}": ${error.message}`;
    env.log.error(msg);
    doclet = new Doclet('', e, env);
  }

  return doclet;
}

/**
 * Create a doclet for a `symbolFound` event. The doclet represents an actual symbol that is defined
 * in the code.
 *
 * Here's why this function is useful. A JSDoc comment can define a symbol name by including:
 *
 * + A `@name` tag
 * + Another tag that accepts a name, such as `@function`
 *
 * When the JSDoc comment defines a symbol name, we treat it as a "virtual comment" for a symbol
 * that isn't actually present in the code. And if a virtual comment is attached to a symbol, it's
 * possible that the comment and symbol have nothing to do with one another.
 *
 * To handle this case, this function checks the new doclet to see if we've already added a name
 * property by parsing the JSDoc comment. If so, this method creates a replacement doclet that
 * ignores the attached JSDoc comment and only looks at the code.
 *
 * @private
 */
function createSymbolDoclet(comment, e, env) {
  let doclet = createDoclet(comment, e, env);

  if (doclet.name) {
    // try again, without the comment
    e.comment = '@undocumented';
    doclet = createDoclet(e.comment, e, env);
  }

  return doclet;
}

function getModule() {
  return inferredModules.length ? inferredModules[inferredModules.length - 1] : currentModule;
}

function setModule(doclet) {
  if (doclet.kind === 'module') {
    currentModule = new ModuleInfo(doclet);
  } else if (doclet.longname.startsWith('module:')) {
    inferredModules.push(
      new ModuleInfo({
        longname: name.getBasename(doclet.longname),
      })
    );
  }
}

function isModuleExports(module, doclet) {
  return module.longname === doclet.name;
}

function setModuleScopeMemberOf(parser, doclet) {
  const moduleInfo = getModule();
  let parentDoclet;
  let skipMemberof;

  // Handle CommonJS module symbols that are _not_ assigned to `module.exports`.
  if (moduleInfo && !isModuleExports(moduleInfo, doclet)) {
    if (!doclet.scope) {
      // is this a method definition? if so, we usually get the scope from the node directly
      if (doclet.meta?.code?.node?.type === Syntax.MethodDefinition) {
        parentDoclet = parser._getDocletById(doclet.meta.code.node.parent.parent.nodeId);
        // special case for constructors of classes that have @alias tags
        if (doclet.meta.code.node.kind === 'constructor' && parentDoclet?.alias) {
          // the constructor should use the same name as the class
          doclet.addTag('alias', parentDoclet.alias);
          doclet.addTag('name', parentDoclet.alias);
          // and we shouldn't try to set a memberof value
          skipMemberof = true;
        } else {
          doclet.addTag(doclet.meta.code.node.static ? 'static' : 'instance');
          // The doclet should be a member of the parent doclet's alias.
          if (parentDoclet?.alias) {
            doclet.memberof = parentDoclet.alias;
          }
        }
      }
      // is this something that the module exports? if so, it's a static member
      else if (doclet.meta?.code?.node?.parent?.type === Syntax.ExportNamedDeclaration) {
        doclet.addTag('static');
      }
      // otherwise, it must be an inner member
      else {
        doclet.addTag('inner');
      }
    }

    // if the doclet isn't a memberof anything yet, and it's not a global, it must be a memberof
    // the current module (unless we were told to skip adding memberof)
    if (!doclet.memberof && doclet.scope !== SCOPE.NAMES.GLOBAL && !skipMemberof) {
      doclet.addTag('memberof', moduleInfo.longname);
    }
  }
}

function setDefaultScope(doclet) {
  // module doclets don't get a default scope
  if (!doclet.scope && doclet.kind !== 'module') {
    doclet.setScope(SCOPE.NAMES.GLOBAL);
  }
}

function addDoclet(parser, newDoclet) {
  let e;

  if (newDoclet) {
    setModule(newDoclet);
    e = { doclet: newDoclet };
    parser.emit('newDoclet', e);

    if (!e.defaultPrevented && !filterByLongname(e.doclet)) {
      parser.addResult(e.doclet);
    }
  }
}

function processAlias(parser, doclet, astNode) {
  let match;
  let memberofName;

  if (doclet.alias === '{@thisClass}') {
    memberofName = parser.resolveThis(astNode);

    // "class" refers to the owner of the prototype, not the prototype itself
    match = memberofName.match(PROTOTYPE_OWNER_REGEXP);
    if (match) {
      memberofName = match[1];
    }
    doclet.alias = memberofName;
  }

  doclet.addTag('name', doclet.alias);
  doclet.postProcess();
}

function isModuleObject(doclet) {
  return doclet.name === LONGNAMES.MODULE_DEFAULT_EXPORT || doclet.name === 'module.exports';
}

// TODO: separate code that resolves `this` from code that resolves the module object
function findSymbolMemberof(parser, doclet, astNode, nameStartsWith, trailingPunc) {
  const docletIsModuleObject = isModuleObject(doclet);
  let memberof = '';
  let nameAndPunc;
  let scopePunc = '';

  // handle computed properties like foo['bar']
  if (trailingPunc === '[') {
    // we don't know yet whether the symbol is a static or instance member
    trailingPunc = null;
  }

  nameAndPunc = nameStartsWith + (trailingPunc || '');

  // Remove parts of the name that indicate module membership. Don't touch the name if it identifies
  // the module object itself.
  if (!docletIsModuleObject) {
    doclet.name = doclet.name.replace(nameAndPunc, '');
  }

  // like `bar` in:
  //   exports.bar = 1;
  //   module.exports.bar = 1;
  //   module.exports = MyModuleObject; MyModuleObject.bar = 1;
  if (nameStartsWith !== 'this' && currentModule && !docletIsModuleObject) {
    memberof = currentModule.longname;
    scopePunc = SCOPE.PUNC.STATIC;
  }
  // like: module.exports = 1;
  else if (docletIsModuleObject && currentModule) {
    doclet.addTag('name', currentModule.longname);
    doclet.postProcess();
  } else {
    memberof = parser.resolveThis(astNode);

    // like the following at the top level of a module:
    //   this.foo = 1;
    if (nameStartsWith === 'this' && currentModule && !memberof) {
      memberof = currentModule.longname;
      scopePunc = SCOPE.PUNC.STATIC;
    } else {
      scopePunc = SCOPE.PUNC.INSTANCE;
    }
  }

  return {
    memberof: memberof,
    scopePunc: scopePunc,
  };
}

function addSymbolMemberof(parser, doclet, astNode) {
  let basename;
  let memberof;
  let memberofInfo;
  let moduleOriginalName = '';
  let resolveTargetRegExp;
  let scopePunc;
  let unresolved;

  if (!astNode) {
    return;
  }

  // check to see if the doclet name is an unresolved reference to the module object, or to `this`
  // TODO: handle cases where the module object is shadowed in the current scope
  if (currentModule) {
    moduleOriginalName = `|${currentModule.originalName}`;
  }
  resolveTargetRegExp = new RegExp(
    `^((?:module\\.)?exports|${ESCAPED_MODULE_LONGNAMES}|this${moduleOriginalName})(\\.|\\[|$)`
  );
  unresolved = resolveTargetRegExp.exec(doclet.name);

  if (unresolved) {
    memberofInfo = findSymbolMemberof(parser, doclet, astNode, unresolved[1], unresolved[2]);
    memberof = memberofInfo.memberof;
    scopePunc = memberofInfo.scopePunc;

    if (memberof) {
      doclet.name = doclet.name ? memberof + scopePunc + doclet.name : memberof;
    }
  } else {
    memberofInfo = parser.astnodeToMemberof(astNode);
    basename = memberofInfo.basename;
    memberof = memberofInfo.memberof;
  }

  // if we found a memberof name, apply it to the doclet
  if (memberof) {
    doclet.addTag('memberof', memberof);
    if (basename) {
      doclet.name = (doclet.name || '').replace(new RegExp(`^${escape(basename)}.`), '');
    }
  }
  // otherwise, add the defaults for a module (if we're currently in a module)
  else {
    setModuleScopeMemberOf(parser, doclet);
  }
}

function newSymbolDoclet(parser, docletSrc, e) {
  const newDoclet = createSymbolDoclet(docletSrc, e, parser.env);

  // if there's an alias, use that as the symbol name
  if (newDoclet.alias) {
    processAlias(parser, newDoclet, e.astnode);
  }
  // otherwise, get the symbol name from the code
  else if (typeof e.code?.name !== 'undefined' && e.code?.name !== '') {
    newDoclet.addTag('name', e.code.name);
    if (!newDoclet.memberof) {
      addSymbolMemberof(parser, newDoclet, e.astnode);
    }

    newDoclet.postProcess();
  } else {
    return false;
  }

  // Set the scope to `global` unless any of the following are true:
  //
  // + The doclet is a `memberof` something.
  // + The doclet represents a module.
  // + We're in a CommonJS module that exports only this symbol.
  if (
    !newDoclet.memberof &&
    newDoclet.kind !== 'module' &&
    (!currentModule || !isModuleExports(currentModule, newDoclet))
  ) {
    newDoclet.scope = SCOPE.NAMES.GLOBAL;
  }

  // handle cases where the doclet kind is auto-detected from the node type
  if (e.code.kind && newDoclet.kind === 'member') {
    newDoclet.kind = e.code.kind;
  }

  addDoclet(parser, newDoclet);
  e.doclet = newDoclet;

  return true;
}

/**
 * Attach these event handlers to a particular instance of a parser.
 * @param parser
 */
export function attachTo(parser) {
  // Handle JSDoc "virtual comments" that include one of the following:
  // + A `@name` tag
  // + Another tag that accepts a name, such as `@function`
  parser.on('jsdocCommentFound', (e) => {
    const comments = e.comment.split(/@also\b/g);
    let newDoclet;

    for (let i = 0, l = comments.length; i < l; i++) {
      newDoclet = createDoclet(comments[i], e, parser.env);

      // we're only interested in virtual comments here
      if (!newDoclet.name) {
        continue;
      }

      // add the default scope/memberof for a module (if we're in a module)
      setModuleScopeMemberOf(parser, newDoclet);
      newDoclet.postProcess();

      // if we _still_ don't have a scope, use the default
      setDefaultScope(newDoclet);

      addDoclet(parser, newDoclet);

      e.doclet = newDoclet;
    }
  });

  // Handle named symbols in the code. May or may not have a JSDoc comment attached.
  parser.on('symbolFound', (e) => {
    const comments = e.comment.split(/@also\b/g);

    for (let i = 0, l = comments.length; i < l; i++) {
      newSymbolDoclet(parser, comments[i], e);
    }
  });

  parser.on('fileComplete', () => {
    currentModule = null;
    inferredModules = [];
  });
}

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
import EventEmitter from 'node:events';
import fs from 'node:fs';

import { AstBuilder, astNode, Syntax, Walker } from '@jsdoc/ast';
import { name } from '@jsdoc/core';
import { Doclet, DocletStore } from '@jsdoc/doclet';
import _ from 'lodash';

import { Visitor } from './visitor.js';

const { getBasename, LONGNAMES, SCOPE, toParts } = name;

// Prefix for JavaScript strings that were provided in lieu of a filename.
const SCHEMA = 'javascript:'; // eslint-disable-line no-script-url

// TODO: docs
function pretreat(code) {
  return (
    code
      // comment out hashbang at the top of the file, like: #!/usr/bin/env node
      .replace(/^(#![\S \t]+\r?\n)/, '// $1')

      // to support code minifiers that preserve /*! comments, treat /*!* as equivalent to /**
      .replace(/\/\*!\*/g, '/**')
      // merge adjacent doclets
      .replace(/\*\/\/\*\*+/g, '@also')
  );
}

// TODO: docs
function definedInScope(doclet, basename) {
  return (
    Boolean(doclet?.meta?.vars) && Boolean(basename) && Object.hasOwn(doclet.meta.vars, basename)
  );
}

function getLastValue(set) {
  let value;

  if (set) {
    // eslint-disable-next-line curly
    for (value of set);
  }

  return value;
}

// TODO: docs
/**
 * @alias module:jsdoc/src/parser.Parser
 * @extends module:events.EventEmitter
 */
export class Parser extends EventEmitter {
  // TODO: docs
  constructor(dependencies) {
    super();

    this._conf = dependencies.get('config');
    this._dependencies = dependencies;
    this._docletStore = new DocletStore(dependencies);
    this._emitter = dependencies.get('emitter');
    this._log = dependencies.get('log');
    this._visitor = new Visitor();
    this._walker = new Walker(dependencies);

    this._visitor.setParser(this);

    // Create a special doclet for the global namespace. Prevent it from emitting events when its
    // watchable properties change.
    this._globalDoclet = new Doclet(`@name ${LONGNAMES.GLOBAL}`, { _watch: false }, dependencies);
    this._globalDoclet.longname = LONGNAMES.GLOBAL;

    Object.defineProperties(this, {
      dependencies: {
        get() {
          return this._dependencies;
        },
      },
      visitor: {
        get() {
          return this._visitor;
        },
      },
      walker: {
        get() {
          return this._walker;
        },
      },
    });
  }

  _stopListening() {
    this._docletStore.stopListening();
  }

  // TODO: Always emit events from the dependencies' emitter, never from the parser.
  emit(eventName, event, ...args) {
    super.emit(eventName, event, ...args);
    this._emitter.emit(eventName, event, ...args);
  }

  // TODO: update docs
  /**
   * Parse the given source files for JSDoc comments.
   * @param {Array.<string>} sourceFiles An array of filepaths to the JavaScript sources.
   * @param {string} [encoding]
   *
   * @fires module:jsdoc/src/parser.Parser.parseBegin
   * @fires module:jsdoc/src/parser.Parser.fileBegin
   * @fires module:jsdoc/src/parser.Parser.jsdocCommentFound
   * @fires module:jsdoc/src/parser.Parser.symbolFound
   * @fires module:jsdoc/src/parser.Parser.newDoclet
   * @fires module:jsdoc/src/parser.Parser.fileComplete
   * @fires module:jsdoc/src/parser.Parser.parseComplete
   *
   * @example <caption>Parse two source files.</caption>
   * var myFiles = ['file1.js', 'file2.js'];
   * var docs = jsdocParser.parse(myFiles);
   */
  parse(sourceFiles, encoding) {
    let filename = '';
    let sourceCode = '';
    let sourceFile;
    const parsedFiles = [];
    const e = {};

    encoding ??= this._conf.encoding ?? 'utf8';

    if (typeof sourceFiles === 'string') {
      sourceFiles = [sourceFiles];
    }

    e.sourcefiles = sourceFiles;
    this._log.debug('Parsing source files: %j', sourceFiles);

    this.emit('parseBegin', e);

    for (let i = 0, l = sourceFiles.length; i < l; i++) {
      sourceCode = '';
      sourceFile = sourceFiles[i];

      if (sourceFile.indexOf(SCHEMA) === 0) {
        sourceCode = sourceFile.substring(SCHEMA.length);
        filename = `[[string${i}]]`;
      } else {
        filename = sourceFile;
        try {
          sourceCode = fs.readFileSync(filename, encoding);
        } catch (err) {
          this._log.error(`Unable to read and parse the source file ${filename}: ${err}`);
        }
      }

      if (sourceCode.length) {
        this._parseSourceCode(sourceCode, filename);
        parsedFiles.push(filename);
      }
    }

    if (this.listenerCount('parseComplete')) {
      this.emit('parseComplete', {
        sourcefiles: parsedFiles,
        doclets: this.results(),
      });
    }
    this._log.debug('Finished parsing source files.');

    return this._docletStore;
  }

  // TODO: docs
  fireProcessingComplete(doclets) {
    this.emit('processingComplete', { doclets: doclets });
  }

  // TODO: docs
  results() {
    return Array.from(this._docletStore.allDoclets);
  }

  addResult(doclet) {
    this._docletStore.add(doclet);
  }

  // TODO: docs
  addAstNodeVisitor(visitor) {
    this._visitor.addAstNodeVisitor(visitor);
  }

  // TODO: docs
  getAstNodeVisitors() {
    return this._visitor.getAstNodeVisitors();
  }

  /** @private */
  _parseSourceCode(sourceCode, sourceName) {
    let ast;
    const builder = new AstBuilder(this._dependencies);
    let e = {
      filename: sourceName,
    };
    let sourceType;

    this.emit('fileBegin', e);
    this._log.info(`Parsing ${sourceName} ...`);

    if (!e.defaultPrevented) {
      e = {
        filename: sourceName,
        source: sourceCode,
      };
      this.emit('beforeParse', e);
      sourceCode = e.source;
      sourceName = e.filename;

      sourceCode = pretreat(e.source);
      sourceType = this._conf.source ? this._conf.source.type : undefined;

      ast = builder.build(sourceCode, sourceName, sourceType);
      if (ast) {
        this._walkAst(ast, this._visitor, sourceName);
      }
    }

    this.emit('fileComplete', e);
  }

  /** @private */
  _walkAst(ast, visitor, sourceName) {
    this._walker.recurse(ast, visitor, sourceName);
  }

  // TODO: docs
  addDocletRef(e) {
    let anonymousDoclet;
    const node = e?.code?.node;

    if (!node) {
      return;
    }

    // Create a placeholder if the node is an undocumented anonymous function; there might be
    // variables in its scope.
    if (
      (node.type === Syntax.FunctionDeclaration ||
        node.type === Syntax.FunctionExpression ||
        node.type === Syntax.ArrowFunctionExpression) &&
      !this._getDocletById(node.nodeId)
    ) {
      anonymousDoclet = new Doclet(
        `@name ${LONGNAMES.ANONYMOUS}`,
        {
          _watch: false,
          code: e.code,
        },
        this._dependencies
      );
      anonymousDoclet.longname = LONGNAMES.ANONYMOUS;
      anonymousDoclet.undocumented = true;

      this._docletStore.add(anonymousDoclet);
    }
  }

  // TODO: docs
  _getDocletById(id) {
    return getLastValue(this._docletStore.docletsByNodeId.get(id));
  }

  /**
   * Retrieve the most recently seen doclet that has the given longname.
   *
   * @param {string} longname - The longname to search for.
   * @return {module:@jsdoc/doclet.Doclet?} The most recent doclet for the longname.
   */
  _getDocletByLongname(longname) {
    let doclets = this._getDocletsByLongname(longname);

    return doclets[doclets.length - 1];
  }

  /**
   * Retrieves all doclets with the given longname.
   *
   * @param {string} longname - The longname to search for.
   * @return {Array<module:@jsdoc/doclet.Doclet>} The doclets for the longname.
   */
  _getDocletsByLongname(longname) {
    let doclets;

    if (longname === LONGNAMES.GLOBAL) {
      return [this._globalDoclet];
    }

    doclets = this._docletStore.docletsByLongname.get(longname);

    return doclets ? Array.from(doclets) : [];
  }

  // TODO: docs
  /**
   * Given a node, determine what the node is a member of.
   * @param {node} node
   * @returns {string} The long name of the node that this is a member of.
   */
  astnodeToMemberof(node) {
    let basename;
    let doclet;
    let scope;

    const result = {};
    const type = node.type;

    if (
      (type === Syntax.FunctionDeclaration ||
        type === Syntax.FunctionExpression ||
        type === Syntax.ArrowFunctionExpression ||
        type === Syntax.VariableDeclarator) &&
      node.enclosingScope
    ) {
      doclet = this._getDocletById(node.enclosingScope.nodeId);

      if (!doclet) {
        result.memberof = LONGNAMES.ANONYMOUS + SCOPE.PUNC.INNER;
      } else {
        result.memberof = doclet.longname + SCOPE.PUNC.INNER;
      }
    } else if (type === Syntax.ClassPrivateProperty || type === Syntax.ClassProperty) {
      doclet = this._getDocletById(node.enclosingScope.nodeId);

      if (!doclet) {
        result.memberof = LONGNAMES.ANONYMOUS + SCOPE.PUNC.INSTANCE;
      } else {
        result.memberof = doclet.longname + SCOPE.PUNC.INSTANCE;
      }
    } else if (type === Syntax.MethodDefinition && node.kind === 'constructor') {
      doclet = this._getDocletById(node.enclosingScope.nodeId);

      // global classes aren't a member of anything
      if (doclet.memberof) {
        result.memberof = doclet.memberof + SCOPE.PUNC.INNER;
      }
    }
    // special case for methods in classes that are returned by arrow function expressions; for
    // other method definitions, we get the memberof from the node name elsewhere. yes, this is
    // confusing...
    else if (
      type === Syntax.MethodDefinition &&
      node.parent.parent.parent?.type === Syntax.ArrowFunctionExpression
    ) {
      doclet = this._getDocletById(node.enclosingScope.nodeId);

      if (doclet) {
        result.memberof =
          doclet.longname + (node.static === true ? SCOPE.PUNC.STATIC : SCOPE.PUNC.INSTANCE);
      }
    } else {
      // check local references for aliases
      scope = node;
      basename = getBasename(astNode.nodeToValue(node));

      // walk up the scope chain until we find the scope in which the node is defined
      while (scope.enclosingScope) {
        doclet = this._getDocletById(scope.enclosingScope.nodeId);
        if (doclet && definedInScope(doclet, basename)) {
          result.memberof = doclet.meta.vars[basename];
          result.basename = basename;
          break;
        } else {
          // move up
          scope = scope.enclosingScope;
        }
      }

      // do we know that it's a global?
      doclet = this._getDocletByLongname(LONGNAMES.GLOBAL);
      if (doclet && definedInScope(doclet, basename)) {
        result.memberof = doclet.meta.vars[basename];
        result.basename = basename;
      } else {
        doclet = this._getDocletById(node.parent.nodeId);

        // set the result if we found a doclet. (if we didn't, the AST node may describe a
        // global symbol.)
        if (doclet) {
          result.memberof = doclet.longname || doclet.name;
        }
      }
    }

    return result;
  }

  /**
   * Get the doclet for the lowest-level class, if any, that is in the scope chain for a given node.
   *
   * @param {Object} node - The node whose scope chain will be searched.
   * @return {module:@jsdoc/doclet.Doclet?} The doclet for the lowest-level class in the node's scope
   * chain.
   */
  _getParentClass({ enclosingScope }) {
    let doclet;
    let parts;
    let scope = enclosingScope;

    function isClass(d) {
      return d?.kind === 'class';
    }

    while (scope) {
      // get the doclet, if any, for the parent scope
      doclet = this._getDocletById(scope.nodeId);

      if (doclet) {
        // is the doclet for a class? if so, we're done
        if (isClass(doclet)) {
          break;
        }

        // is the doclet for an instance member of a class? if so, try to get the doclet for the
        // owning class
        parts = toParts(doclet.longname);
        if (parts.scope === SCOPE.PUNC.INSTANCE) {
          doclet = this._getDocletsByLongname(parts.memberof).filter((d) => isClass(d))[0];
          if (doclet) {
            break;
          }
        }
      }

      // move up to the next parent scope
      scope = scope.enclosingScope;
    }

    return isClass(doclet) ? doclet : null;
  }

  // TODO: docs
  /**
   * Resolve what "this" refers to relative to a node.
   * @param {node} node - The "this" node
   * @returns {string} The longname of the enclosing node.
   */
  resolveThis(node) {
    let doclet;
    let parentClass;
    let result;

    // Properties are handled below.
    if (node.type !== Syntax.Property && node.enclosingScope) {
      // For ES2015 constructor functions, we use the class declaration to resolve `this`.
      if (node.parent?.type === Syntax.MethodDefinition && node.parent?.kind === 'constructor') {
        doclet = this._getDocletById(node.parent.parent.parent.nodeId);
      }
      // Otherwise, if there's an enclosing scope, we use the enclosing scope to resolve `this`.
      else {
        doclet = this._getDocletById(node.enclosingScope.nodeId);
      }

      if (!doclet) {
        result = LONGNAMES.ANONYMOUS; // TODO handle global this?
      } else if (doclet.this) {
        result = doclet.this;
      } else if (doclet.kind === 'function' && doclet.memberof) {
        parentClass = this._getParentClass(node);

        // like: function Foo() { this.bar = function(n) { /** blah */ this.name = n; };
        // or:   Foo.prototype.bar = function(n) { /** blah */ this.name = n; };
        // or:   var Foo = exports.Foo = function(n) { /** blah */ this.name = n; };
        // or:   Foo.constructor = function(n) { /** blah */ this.name = n; }
        if (parentClass || /\.constructor$/.test(doclet.longname)) {
          result = doclet.memberof;
        }
        // like: function notAClass(n) { /** global this */ this.name = n; }
        else {
          result = doclet.longname;
        }
      }
      // like: var foo = function(n) { /** blah */ this.bar = n; }
      else if (doclet.kind === 'member' && astNode.isAssignment(node)) {
        result = doclet.longname;
      }
      // walk up to the closest class we can find
      else if (doclet.kind === 'class' || doclet.kind === 'interface' || doclet.kind === 'module') {
        result = doclet.longname;
      } else if (node.enclosingScope) {
        result = this.resolveThis(node.enclosingScope);
      }
    }
    // For object properties, we use the node's parent (the object) instead.
    else {
      doclet = this._getDocletById(node.parent.nodeId);

      if (!doclet) {
        // The object wasn't documented, so we don't know what name to use.
        result = '';
      } else {
        result = doclet.longname;
      }
    }

    return result;
  }

  /**
   * Given an AST node representing an object property, find the doclets for the parent object or
   * objects.
   *
   * If the object is part of a simple assignment (for example, `var foo = { x: 1 }`), this method
   * returns a single doclet (in this case, the doclet for `foo`).
   *
   * If the object is part of a chained assignment (for example, `var foo = exports.FOO = { x: 1 }`,
   * this method returns multiple doclets (in this case, the doclets for `foo` and `exports.FOO`).
   *
   * @param {Object} node - An AST node representing an object property.
   * @return {Array.<module:@jsdoc/doclet.Doclet>} An array of doclets for the parent object or objects, or
   * an empty array if no doclets are found.
   */
  resolvePropertyParents({ parent }) {
    let currentAncestor = parent;
    let nextAncestor = currentAncestor.parent;
    let doclet;
    const doclets = [];

    while (currentAncestor) {
      doclet = this._getDocletById(currentAncestor.nodeId);
      if (doclet) {
        doclets.push(doclet);
      }

      // if the next ancestor is an assignment expression (for example, `exports.FOO` in
      // `var foo = exports.FOO = { x: 1 }`, keep walking upwards
      if (nextAncestor?.type === Syntax.AssignmentExpression) {
        nextAncestor = nextAncestor.parent;
        currentAncestor = currentAncestor.parent;
      }
      // otherwise, we're done
      else {
        currentAncestor = null;
      }
    }

    return doclets;
  }

  // TODO: docs
  /**
   * Resolve what function a var is limited to.
   * @param {astnode} node
   * @param {string} basename The leftmost name in the long name: in foo.bar.zip the basename is foo.
   */
  resolveVar({ enclosingScope, type }, basename) {
    let doclet;
    let result;
    const scope = enclosingScope;

    // HACK: return an empty string for function declarations so they don't end up in anonymous
    // scope (see #685 and #693)
    if (type === Syntax.FunctionDeclaration) {
      result = '';
    } else if (!scope) {
      result = ''; // global
    } else {
      doclet = this._getDocletById(scope.nodeId);
      if (definedInScope(doclet, basename)) {
        result = doclet.longname;
      } else {
        result = this.resolveVar(scope, basename);
      }
    }

    return result;
  }

  // TODO: docs
  resolveEnum(e) {
    const doclets = this.resolvePropertyParents(e.code.node.parent);

    doclets.forEach((doclet) => {
      if (doclet?.isEnum) {
        doclet.properties = doclet.properties || [];

        // members of an enum inherit the enum's type
        if (doclet.type && !e.doclet.type) {
          // clone the type to prevent circular refs
          e.doclet.type = _.cloneDeep(doclet.type);
        }

        e.doclet.undocumented = undefined;
        e.doclet.defaultvalue = e.doclet.meta.code.value;

        // add the doclet to the parent's properties
        doclet.properties.push(e.doclet);
      }
    });
  }
}

// TODO: docs
export function createParser(deps) {
  return new Parser(deps);
}

// TODO: document other events
/**
 * Fired once for each JSDoc comment in the current source code.
 * @event jsdocCommentFound
 * @memberof module:@jsdoc/parse.Parser
 * @type {Object}
 * @property {string} comment The text content of the JSDoc comment
 * @property {number} lineno The line number associated with the found comment.
 * @property {number} columnno The column number associated with the found comment.
 * @property {string} filename The file name associated with the found comment.
 */

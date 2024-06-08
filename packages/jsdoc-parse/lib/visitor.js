/*
  Copyright 2012 the JSDoc Authors.

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
import { name } from '@jsdoc/core';
import { combineDoclets } from '@jsdoc/doclet';

const { getBasename, LONGNAMES } = name;

/**
 * Get the raw comment string for a block comment node.
 *
 * @private
 * @param {!Object} comment - A comment node with `type` and `value` properties.
 */
function getRawComment({ value }) {
  return `/*${value}*/`;
}

/**
 * Check whether a comment node represents a block comment.
 *
 * @param {!Object} comment - A comment node with `type` and `value` properties.
 * @return {boolean} `true` if the comment is a block comment, `false` otherwise.
 */
function isBlockComment({ type }) {
  return type === 'CommentBlock';
}

/**
 * Verify that a block comment exists; that it is a JSDoc comment; and that its leading delimiter
 * does not contain three or more asterisks.
 *
 * @private
 * @memberof module:jsdoc/src/parser.Parser
 */
function isValidJsdoc(commentSrc) {
  return (
    commentSrc?.length > 4 && commentSrc?.indexOf('/**') === 0 && commentSrc?.indexOf('/***') !== 0
  );
}

// TODO: docs
function getLeadingJsdocComment({ leadingComments }) {
  let comment = null;

  if (Array.isArray(leadingComments) && leadingComments.length) {
    // the attached comments may include line comments, which we don't want
    leadingComments = leadingComments.filter(isBlockComment);

    if (leadingComments.length) {
      // treat the comment closest to the node as the leading comment
      comment = getRawComment(leadingComments[leadingComments.length - 1]);

      if (!isValidJsdoc(comment)) {
        comment = null;
      }
    }
  }

  return comment;
}

// TODO: docs
function makeVarsFinisher(scopeDoclet) {
  return ({ doclet, code }) => {
    // no need to evaluate all things related to scopeDoclet again, just use it
    if (scopeDoclet && (doclet?.alias || doclet?.memberof)) {
      scopeDoclet.meta.vars[code.name] = doclet.longname;
    }
  };
}

// Given an event, get the parent node's doclet.
function getParentDocletFromEvent(parser, { doclet }) {
  if (doclet?.meta?.code?.node?.parent) {
    return parser._getDocletById(doclet.meta.code.node.parent.nodeId);
  }

  return null;
}

/**
 * For function parameters that have inline documentation, create a function that will merge the
 * inline documentation into the function's doclet. If the parameter is already documented in the
 * function's doclet, the inline documentation will be ignored.
 *
 * @private
 * @param {module:jsdoc/src/parser.Parser} parser - The JSDoc parser.
 * @return {function} A function that merges a parameter's inline documentation into the function's
 * doclet.
 */
function makeInlineParamsFinisher(parser) {
  return (e) => {
    let documentedParams;
    const { doclet: eventDoclet } = e;
    let knownParams;
    let param;
    let parentDoclet;

    let i = 0;

    parentDoclet = getParentDocletFromEvent(parser, e);
    if (!parentDoclet) {
      return;
    }

    // we only want to use the doclet if it's param-specific (but not, for example, if it's
    // a param tagged with `@exports` in an AMD module)
    if (eventDoclet.kind !== 'param') {
      return;
    }

    parentDoclet.params ??= [];
    documentedParams = parentDoclet.params;
    knownParams = parentDoclet.meta.code.paramnames ?? [];

    while (true) {
      param = documentedParams[i];

      // is the param already documented? if so, we don't need to use the doclet
      if (param?.name === eventDoclet.name) {
        eventDoclet.undocumented = true;
        break;
      }

      // if we ran out of documented params, or we're at the parameter's actual position,
      // splice in the param at the current index
      if (!param || i === knownParams.indexOf(eventDoclet.name)) {
        documentedParams.splice(i, 0, {
          type: eventDoclet.type ?? {},
          description: '',
          name: eventDoclet.name,
        });

        // the doclet is no longer needed
        eventDoclet.undocumented = true;

        break;
      }

      i++;
    }
  };
}

/**
 * Given an array of nodes that represent function parameters, find the node for the rest parameter,
 * if any.
 *
 * @private
 * @param {Array.<Object>} params - An array of nodes that represent function parameters.
 * @return {Object?} The node for the rest parameter.
 */
function findRestParam(params) {
  let restParam = null;

  params.some((param) => {
    if (param.type === Syntax.RestElement) {
      restParam = param;

      return true;
    }

    return false;
  });

  return restParam;
}

/**
 * For functions that may include a rest parameter, create a function that will automatically update
 * the rest parameter's documentation to indicate that the parameter is repeatable. If the parameter
 * is not documented, the function's doclet will remain unchanged.
 *
 * @private
 * @return {function} A function that updates the rest parameter's documentation to indicate that
 * the parameter is repeatable.
 */
function makeRestParamFinisher() {
  return ({ code, doclet }) => {
    let documentedParams;
    let restNode;

    if (!doclet) {
      return;
    }

    documentedParams = doclet.params ??= [];
    restNode = findRestParam(
      code.node.params || code.node.value?.params || code.node.init?.params || []
    );

    if (restNode) {
      for (let i = documentedParams.length - 1; i >= 0; i--) {
        if (documentedParams[i].name === restNode.argument.name) {
          documentedParams[i].variable = true;
          break;
        }
      }
    }
  };
}

/**
 * Given an array of nodes that represent function parameters, find the nodes for the default
 * parameters, if any.
 *
 * @private
 * @param {Array.<Object>} params - An array of nodes that represent function parameters.
 * @return {Array.<Object>} The nodes for the default parameters.
 */
function findDefaultParams(params) {
  const defaultParams = [];

  params.forEach((param) => {
    if (param.type === Syntax.AssignmentPattern) {
      defaultParams.push(param);
    } else {
      defaultParams.push(null);
    }
  });

  return defaultParams;
}

/**
 * For functions that may have at least one parameter with default values, create a function that
 * will automatically add the parameters' default values to the function's documentation. If any
 * default value is already documented, the function's doclet will remain unchanged.
 *
 * This function is only intended to handle default parameters whose node type is `Syntax.Literal`
 * (string, numeric, and boolean literals). This is because more complex default values may include,
 * for example, references to internal variables, which it may not make sense to include in
 * documentation.
 *
 * @private
 * @return {function} A function that updates the function doclet to include the default values of
 * parameters.
 */
function makeDefaultParamFinisher() {
  return ({ code, doclet }) => {
    let defaultValues;
    let documentedParams;
    let paramName;
    let params;

    if (!doclet) {
      return;
    }

    documentedParams = doclet.params ??= [];
    params = code.node.params ?? code.node.value?.params ?? [];
    defaultValues = findDefaultParams(params);

    for (let i = 0, j = 0, l = params.length; i < l; i++) {
      // bail out if we ran out of documented params
      if (!documentedParams[j]) {
        break;
      }

      // if the current parameter doesn't appear to be documented, move to the next one
      paramName =
        params[i].type === Syntax.AssignmentPattern ? params[i].left.name : params[i].name;
      if (paramName !== documentedParams[j].name) {
        continue;
      }

      // add the default value iff a) a literal default value is defined in the code,
      // b) no default value is documented, and c) the default value is not an empty string
      if (
        defaultValues[i]?.right?.type === Syntax.Literal &&
        typeof documentedParams[j].defaultvalue === 'undefined' &&
        defaultValues[i].right.value !== ''
      ) {
        documentedParams[j].defaultvalue = astNode.nodeToValue(defaultValues[i].right);
      }

      // move to the next documented param
      j++;
    }
  };
}

/**
 * For method definitions that are constructors, create a function that will merge portions of the
 * constructor's doclet into the class's doclet, provided that a doclet exists for the class.
 * Merging the constructor's documentation allows ES 2015 classes to be documented in a natural way,
 * with separate JSDoc comments for the class and its constructor.
 *
 * @private
 * @param {module:jsdoc/src/parser.Parser} parser - The JSDoc parser.
 * @return {function} A function that merges the constructor's doclet into the class's doclet.
 */
function makeConstructorFinisher(parser) {
  return ({ code, doclet: eventDoclet }) => {
    let combined;
    let doclets;
    let nodeId;
    let parentDoclet;

    // for class declarations that are named module exports, the node that's documented is the
    // ExportNamedDeclaration, not the ClassDeclaration
    if (code.node.parent.parent.parent?.type === Syntax.ExportNamedDeclaration) {
      nodeId = code.node.parent.parent.parent.nodeId;
    }
    // otherwise, we want the ClassDeclaration
    else {
      nodeId = code.node.parent.parent.nodeId;
    }
    doclets = parser._docletStore.docletsByNodeId.get(nodeId);
    // Use the first documented doclet for the parent node.
    parentDoclet = Array.from(doclets || []).filter((d) => !d.undocumented)[0];

    if (!eventDoclet || !parentDoclet) {
      return;
    }

    // We prefer the parent doclet because it has the correct kind, longname, and memberof.
    // The child doclet might or might not have the correct kind, longname, and memberof.
    combined = combineDoclets(parentDoclet, eventDoclet, parser.dependencies);
    parser.addResult(combined);

    parentDoclet.undocumented = eventDoclet.undocumented = true;
  };
}

/**
 * Create a function that will add an `async` property to the doclet for async functions.
 *
 * @private
 * @return {function} A function that adds an `async` property to the doclet of async functions.
 */
function makeAsyncFunctionFinisher() {
  return ({ code, doclet }) => {
    if (!doclet) {
      return;
    }

    if (code.node.async || code.node.value?.async || code.node.init?.async) {
      doclet.async = true;
    }
  };
}

/**
 * Create a function that will mark a doclet as private.
 *
 * @private
 * @return {function} A function that marks a doclet as private.
 */
function makePrivatePropertyFinisher() {
  return ({ doclet }) => {
    doclet.access = 'private';
  };
}

/**
 * Create a function that will mark a doclet as a generator function.
 *
 * @private
 * @return {function} A function that marks a doclet as a generator function.
 */
function makeGeneratorFinisher() {
  return ({ code, doclet }) => {
    if (!doclet) {
      return;
    }

    if (code.node.generator || code.node.init?.generator || code.node.value?.generator) {
      doclet.generator = true;
    }
  };
}

/**
 * Creates a function that adds the source file's module type to a doclet.
 *
 * @private
 * @return {function} A function that adds the module type to the doclet's `meta` info.
 */
function makeModuleTypeFinisher(moduleTypes) {
  return ({ doclet }) => {
    let filepath;
    let type;

    if (!doclet || !doclet.meta.filename || !doclet.meta.path) {
      return;
    }

    filepath = path.join(doclet.meta.path, doclet.meta.filename);
    type = moduleTypes.get(filepath);

    if (type) {
      doclet.meta.moduletype = type;
    }
  };
}

// TODO: docs
class SymbolFound {
  // TODO: docs
  constructor(node, parser, filename, extras = {}) {
    this.id = extras.id || node.nodeId;
    this.comment = extras.comment || getLeadingJsdocComment(node) || '@undocumented';
    this.lineno = extras.lineno || node.loc.start.line;
    this.columnno = extras.columnno || node.loc.start.column;
    this.range = extras.range || node.range;
    this.filename = extras.filename || filename;
    this.astnode = extras.astnode || node;
    this.code = extras.code;
    this.event = extras.event || 'symbolFound';
    this.finishers = extras.finishers || [];
    this.moduletype = null;

    // make sure the event includes properties that don't have default values
    Object.keys(extras).forEach((key) => {
      this[key] = extras[key];
    });
  }
}

// TODO: docs
class JsdocCommentFound {
  // TODO: docs
  constructor({ loc, range }, rawComment, filename) {
    this.comment = rawComment;
    this.lineno = loc.start.line;
    this.columnno = loc.start.column;
    this.filename = filename;
    this.range = range;

    Object.defineProperty(this, 'event', {
      value: 'jsdocCommentFound',
    });
  }
}

// TODO: docs
function hasComments(node) {
  return (
    node?.leadingComments?.length || node?.trailingComments?.length || node?.innerComments?.length
  );
}

// TODO: docs
function removeCommentDelimiters(comment) {
  return comment.substring(2, comment.length - 2);
}

// TODO: docs
function updateCommentNode(commentNode, comment) {
  commentNode.value = removeCommentDelimiters(comment);
}

// TODO: docs
// TODO: note that it's essential to call this function before you try to resolve names!
function trackVars(parser, { enclosingScope }, { code, finishers }) {
  let doclet;
  const enclosingScopeId = enclosingScope ? enclosingScope.nodeId : null;

  if (enclosingScopeId) {
    doclet = parser._getDocletById(enclosingScopeId);
  } else {
    doclet = parser._getDocletByLongname(LONGNAMES.GLOBAL);
  }

  if (doclet) {
    doclet.meta.vars ??= {};
    doclet.meta.vars[code.name] = null;
    finishers.push(makeVarsFinisher(doclet));
  }
}

// TODO: docs
function makeSymbolFoundEvent(node, parser, filename) {
  let e;
  let basename;
  let parent;

  const extras = {
    code: astNode.getInfo(node),
    finishers: [makeModuleTypeFinisher(parser.moduleTypes)],
  };

  switch (node.type) {
    // like: i = 0;
    case Syntax.AssignmentExpression:
      e = new SymbolFound(node, parser, filename, extras);

      trackVars(parser, node, e);

      basename = getBasename(e.code.name);
      if (basename !== 'this') {
        e.code.funcscope = parser.resolveVar(node, basename);
      }

      break;

    // like `bar='baz'` in: function foo(bar='baz') {}
    case Syntax.AssignmentPattern:
      parent = node.parent;

      if (node.leadingComments && parent && astNode.isFunction(parent)) {
        extras.finishers.push(makeInlineParamsFinisher(parser));
        e = new SymbolFound(node, parser, filename, extras);

        trackVars(parser, node, e);
      }

      break;

    // like: class foo {}
    case Syntax.ClassDeclaration:
    // falls through

    // like: let MyClass = class {}
    case Syntax.ClassExpression:
      e = new SymbolFound(node, parser, filename, extras);

      trackVars(parser, node, e);

      basename = getBasename(e.code.name);

      break;

    // like `#b = 1` in: class A { #b = 1; }
    case Syntax.ClassPrivateProperty:
      extras.finishers.push(parser.resolveEnum, makePrivatePropertyFinisher());

      e = new SymbolFound(node, parser, filename, extras);

      break;

    // like `b = 1` in: class A { b = 1; }
    case Syntax.ClassProperty:
      extras.finishers.push(parser.resolveEnum);

      e = new SymbolFound(node, parser, filename, extras);

      break;

    // like: export * from 'foo'
    case Syntax.ExportAllDeclaration:
      e = new SymbolFound(node, parser, filename, extras);

      break;

    // like: export default 'foo'
    case Syntax.ExportDefaultDeclaration:
    // falls through

    // like: export var foo;
    // or:   export {foo}
    case Syntax.ExportNamedDeclaration:
    // falls through

    // like `foo as bar` in: export {foo as bar}
    case Syntax.ExportSpecifier:
      e = new SymbolFound(node, parser, filename, extras);

      trackVars(parser, node, e);

      break;

    // like: var foo = () => {};
    case Syntax.ArrowFunctionExpression:
    // falls through

    // like: function foo() {}
    case Syntax.FunctionDeclaration:
    // falls through

    // like: var foo = function() {};
    case Syntax.FunctionExpression:
      extras.finishers.push(
        // handle cases where at least one parameter has a default value
        makeDefaultParamFinisher(),
        // handle rest parameters
        makeRestParamFinisher(),
        // handle async functions
        makeAsyncFunctionFinisher(),
        // handle generator functions
        makeGeneratorFinisher()
      );

      e = new SymbolFound(node, parser, filename, extras);

      trackVars(parser, node, e);

      basename = getBasename(e.code.name);
      e.code.funcscope = parser.resolveVar(node, basename);

      break;

    // like `bar` in: function foo(/** @type {string} */ bar) {}
    // or `module` in: define("MyModule", function(/** @exports MyModule */ module) {}
    // This is an extremely common type of node; we only care about function parameters with
    // inline comments. No need to fire an event in other cases.
    case Syntax.Identifier:
      parent = node.parent;

      // function parameters with inline comments
      if (node.leadingComments && parent && astNode.isFunction(parent)) {
        extras.finishers.push(makeInlineParamsFinisher(parser));
        e = new SymbolFound(node, parser, filename, extras);

        trackVars(parser, node, e);
      }

      break;

    // like `obj.prop` in: /** @typedef {string} */ obj.prop;
    // Closure Compiler uses this pattern extensively for enums.
    // No need to fire an event unless the node is already commented.
    case Syntax.MemberExpression:
      if (node.leadingComments) {
        e = new SymbolFound(node, parser, filename, extras);
      }

      break;

    // like: foo() {}
    // or:   constructor() {}
    case Syntax.MethodDefinition:
      extras.finishers.push(
        // handle cases where at least one parameter has a default value
        makeDefaultParamFinisher(),
        // handle rest parameters
        makeRestParamFinisher(),
        // handle async functions
        makeAsyncFunctionFinisher(),
        // handle generator functions
        makeGeneratorFinisher()
      );
      // for constructors, we attempt to merge the constructor's docs into the class's docs
      if (node.kind === 'constructor') {
        extras.finishers.push(makeConstructorFinisher(parser));
      }

      e = new SymbolFound(node, parser, filename, extras);

      break;

    // like `{}` in: function Foo = Class.create(/** @lends Foo */ {});
    case Syntax.ObjectExpression:
      e = new SymbolFound(node, parser, filename, extras);

      break;

    // like `bar: true` in: var foo = { bar: true };
    // like `get bar() {}` in: var foo = { get bar() {} };
    case Syntax.Property:
      if (node.kind !== 'get' && node.kind !== 'set') {
        extras.finishers.push(parser.resolveEnum);
      }

      e = new SymbolFound(node, parser, filename, extras);

      break;

    // like `...bar` in: function foo(...bar) {}
    case Syntax.RestElement:
      parent = node.parent;

      if (node.leadingComments && parent && astNode.isFunction(parent)) {
        extras.finishers.push(makeInlineParamsFinisher(parser));
        e = new SymbolFound(node, parser, filename, extras);

        trackVars(parser, node, e);
      }

      break;

    // like: var i = 0;
    case Syntax.VariableDeclarator:
      extras.finishers.push(
        // handle cases where at least one parameter has a default value
        makeDefaultParamFinisher(),
        // handle rest parameters
        makeRestParamFinisher(),
        // handle async functions
        makeAsyncFunctionFinisher(),
        // handle generator functions
        makeGeneratorFinisher()
      );

      e = new SymbolFound(node, parser, filename, extras);

      trackVars(parser, node, e);

      basename = getBasename(e.code.name);
      // auto-detect constants
      if (node.parent.kind === 'const') {
        e.code.kind = 'constant';
      }

      break;

    default:
    // ignore
  }

  if (!e) {
    e = {
      finishers: [],
    };
  }

  return e;
}

// TODO: docs
export class Visitor {
  // TODO: docs
  constructor() {
    this._parser = null;

    // ESTree node visitors added by plugins
    this._nodeVisitors = [];
    // built-in visitors
    this._visitors = [this.visitNodeComments, this.visitNode];
  }

  /**
   * Set the parser instance that visitors can use.
   *
   * @param {module:jsdoc/src/parser.Parser} parser - The parser instance.
   */
  setParser(parser) {
    this._parser = parser;
  }

  // TODO: docs
  addAstNodeVisitor(visitor) {
    this._nodeVisitors.push(visitor);
  }

  // TODO: docs
  removeAstNodeVisitor(visitor) {
    const idx = this._nodeVisitors.indexOf(visitor);

    if (idx !== -1) {
      this._nodeVisitors.splice(idx, 1);
    }
  }

  // TODO: docs
  getAstNodeVisitors() {
    return this._nodeVisitors;
  }

  // TODO: docs; visitor signature is (node, parser, filename)
  visit(node, filename) {
    for (let visitor of this._visitors) {
      visitor.call(this, node, this._parser, filename);
    }

    return true;
  }

  // TODO: docs
  visitNodeComments(node, parser, filename) {
    let comments;
    let e;
    const isBlock = isBlockComment(node);
    let rawComment;

    function addComments(source) {
      comments = comments.concat(source.slice());
    }

    if (!hasComments(node) && (!node.type || !isBlock)) {
      return true;
    }

    comments = isBlock ? [node] : [];

    if (node.leadingComments?.length) {
      addComments(node.leadingComments);
    }

    // trailing comments are always duplicates of leading comments unless they're attached to the
    // Program node
    if (node.type === Syntax.Program && node.trailingComments?.length) {
      addComments(node.trailingComments);
    }

    if (node.innerComments?.length) {
      addComments(node.innerComments);
    }

    for (let comment of comments) {
      rawComment = getRawComment(comment);

      if (isValidJsdoc(rawComment)) {
        e = new JsdocCommentFound(comment, rawComment, filename);

        parser.emit(e.event, e, parser);

        if (e.comment !== rawComment) {
          updateCommentNode(comment, e.comment);
        }
      }
    }

    return true;
  }

  // TODO: docs
  visitNode(node, parser, filename) {
    const e = makeSymbolFoundEvent(node, parser, filename);

    if (this._nodeVisitors?.length) {
      for (let visitor of this._nodeVisitors) {
        visitor.visitNode(node, e, parser, filename);
        if (e.stopPropagation) {
          break;
        }
      }
    }

    if (!e.preventDefault) {
      parser.emit(e.event, e, parser);
    }

    // add the node to the parser's lookup table
    parser.addDocletRef(e);

    for (let finisher of e.finishers) {
      finisher.call(parser, e);
    }

    return true;
  }
}

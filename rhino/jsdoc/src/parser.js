// TODO: module docs
'use strict';

// TODO: docs
exports.createParser = require('jsdoc/src/parser').createParser;

// TODO: docs
var Parser = exports.Parser = function() {
    var astBuilder;
    var visitor;

    var runtime = require('jsdoc/util/runtime');
    if ( !runtime.isRhino() ) {
        throw new Error('You must run JSDoc on Mozilla Rhino to use the Rhino parser.');
    }

    astBuilder = new ( require(runtime.getModulePath('jsdoc/src/astbuilder')) ).AstBuilder();
    visitor = new ( require(runtime.getModulePath('jsdoc/src/visitor')) ).Visitor(this);

    Parser.super_.call(this, astBuilder, visitor);
};
require('util').inherits(Parser, require('jsdoc/src/parser').Parser);

// TODO: update docs
/**
 * Adds a node visitor to use in parsing
 */
Parser.prototype.addNodeVisitor = function(visitor) {
    this._visitor.addRhinoNodeVisitor(visitor);
};

// TODO: docs
/**
 * Get the node visitors used in parsing
 */
Parser.prototype.getNodeVisitors = function() {
    return this._visitor.getRhinoNodeVisitors();
};

// TODO: docs
Parser.prototype._walkAst = function(ast, visitor, sourceName) {
    // On Rhino, we visit the comments all at once before we walk the AST
    this._visitor.visitNodeComments({
        leadingComments: ast.comments
    }, this, sourceName);

    Parser.super_.prototype._walkAst.call(this, ast, visitor, sourceName);
};

/*global Packages: true */
/**
 * Creates an Esprima-compatible AST using Rhino's JavaScript parser.
 * @module rhino/jsdoc/src/astbuilder
 */
'use strict';

var AstBuilder = exports.AstBuilder = function() {
    this._builder = new Packages.org.jsdoc.AstBuilder();
};

AstBuilder.prototype.build = function(sourceCode, sourceName) {
    return this._builder.build(sourceCode, sourceName);
};

AstBuilder.prototype.getRhinoNodes = function() {
    return this._builder.getRhinoNodes();
};

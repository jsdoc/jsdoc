// TODO: module docs
'use strict';

// TODO: docs
var Visitor = exports.Visitor = function(parser) {
    var runtime = require('jsdoc/util/runtime');
    if ( !runtime.isRhino() ) {
        throw new Error('You must run JSDoc on Mozilla Rhino to use the Rhino node visitor.');
    }

    Visitor.super_.call(this, parser);

    // Rhino node visitors added by plugins (deprecated in JSDoc 3.3)
    this._rhinoNodeVisitors = [];
    // Rhino nodes retrieved from the org.jsdoc.AstBuilder instance
    this._rhinoNodes = null;

    this.addAstNodeVisitor({
        visitNode: this._visitRhinoNode.bind(this)
    });
};
require('util').inherits(Visitor, require('jsdoc/src/visitor').Visitor);

// TODO: docs (deprecated)
Visitor.prototype.addRhinoNodeVisitor = function(visitor) {
    this._rhinoNodeVisitors.push(visitor);
};

// TODO: docs (deprecated)
Visitor.prototype.getRhinoNodeVisitors = function() {
    return this._rhinoNodeVisitors;
};

// TODO: docs (deprecated)
Visitor.prototype._visitRhinoNode = function(astNode, e, parser, filename) {
    var rhinoNode;

    var visitors = this._rhinoNodeVisitors;
    // if there are no visitors, bail out before we retrieve all the nodes
    if (!visitors.length) {
        return;
    }

    if (!this._rhinoNodes) {
        this._rhinoNodes = parser.astBuilder.getRhinoNodes();
    }

    rhinoNode = this._rhinoNodes ? this._rhinoNodes.get(astNode.nodeId) : null;
    if (rhinoNode) {
        for (var i = 0, l = visitors.length; i < l; i++) {
            visitors[i].visitNode(rhinoNode, e, parser, filename);
            if (e.stopPropagation) {
                break;
            }
        }
    }
};

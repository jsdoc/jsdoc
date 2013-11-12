/**
 * @module jsdoc/src/visitor
 */
'use strict';

// TODO: consider exporting more stuff so users can override it

var doclet = require('jsdoc/doclet');
var Syntax = require('jsdoc/src/syntax').Syntax;
var util = require('util');

var hasOwnProp = Object.prototype.hasOwnProperty;

// TODO: docs
function getLeadingComment(node) {
    var comment = null;
    var leadingComments = node.leadingComments;

    if (Array.isArray(leadingComments) && leadingComments.length && leadingComments[0].raw) {
        comment = leadingComments[0].raw;
    }

    return comment;
}

// TODO: docs
function makeVarsFinisher(scopeDoc) {
    return function(e) {
        // no need to evaluate all things related to scopeDoc again, just use it
        if (scopeDoc && e.doclet && e.doclet.alias) {
            scopeDoc.meta.vars[e.code.name] = e.doclet.longname;
        }
    };
}


// TODO: docs
function SymbolFound(node, filename, extras) {
    var self = this;
    extras = extras || {};

    this.id = extras.id || node.nodeId;
    this.comment = extras.comment || getLeadingComment(node) || doclet.UNDOCUMENTED_TAG;
    this.lineno = extras.lineno || node.loc.start.line;
    this.range = extras.range || node.range;
    this.filename = extras.filename || filename;
    this.astnode = extras.astnode || node;
    this.code = extras.code;
    this.event = extras.event || 'symbolFound';
    this.finishers = extras.finishers || [];

    // make sure the event includes properties that don't have default values
    Object.keys(extras).forEach(function(key) {
        self[key] = extras[key];
    });
}

// TODO: docs
function JsdocCommentFound(comment, filename) {
    this.comment = comment.raw;
    this.lineno = comment.loc.start.line;
    this.filename = filename;
    this.range = comment.range;

    Object.defineProperty(this, 'event', {
        value: 'jsdocCommentFound'
    });
}


// TODO: docs
var Visitor = exports.Visitor = function(parser) {
    this._parser = parser;

    // Mozilla Parser API node visitors added by plugins
    this._nodeVisitors = [];
    // built-in visitors
    this._visitors = [
        this.visitNodeComments,
        this.visitNode
    ];
};

// TODO: docs
Visitor.prototype.addAstNodeVisitor = function(visitor) {
    this._nodeVisitors.push(visitor);
};

// TODO: docs
Visitor.prototype.removeAstNodeVisitor = function(visitor) {
    var idx = this._nodeVisitors.indexOf(visitor);
    if (idx !== -1) {
        this._nodeVisitors.splice(idx, 1);
    }
};

// TODO: docs
Visitor.prototype.getAstNodeVisitors = function() {
    return this._nodeVisitors;
};

// TODO: docs; visitor signature is (node, parser, filename)
Visitor.prototype.visit = function(node, filename) {
    var i;
    var l;

    for (i = 0, l = this._visitors.length; i < l; i++) {
        this._visitors[i].call(this, node, this._parser, filename);
    }

    // we also need to visit standalone comments, which are not attached to a node
    if (node.type === Syntax.Program && node.comments && node.comments.length) {
        for (i = 0, l = node.comments.length; i < l; i++) {
            this.visitNodeComments.call(this, node.comments[i], this._parser, filename);
        }
    }

    return true;
};

// TODO: docs
/**
 * Verify that a block comment exists and that its leading delimiter does not contain three or more
 * asterisks.
 * 
 * @private
 * @memberof module:jsdoc/src/parser.Parser
 */
function isValidJsdoc(commentSrc) {
    return commentSrc && commentSrc.indexOf('/***') !== 0;
}

// TODO: docs
function hasJsdocComments(node) {
    return (node && node.leadingComments && node.leadingComments.length > 0) ||
        (node && node.trailingComments && node.trailingComments.length > 0);
}

// TODO: docs
function removeCommentDelimiters(comment) {
    return comment.substring(2, comment.length - 2);
}

// TODO: docs
function updateCommentNode(commentNode, comment) {
    commentNode.raw = comment;
    commentNode.value = removeCommentDelimiters(comment);
}

// TODO: docs
Visitor.prototype.visitNodeComments = function(node, parser, filename) {
    var comment;
    var comments;
    var e;

    var BLOCK_COMMENT = 'Block';

    if ( !hasJsdocComments(node) && (!node.type || node.type !== BLOCK_COMMENT) ) {
        return true;
    }

    comments = [];
    if (node.type === BLOCK_COMMENT) {
        comments.push(node);
    }
    
    if (node.leadingComments && node.leadingComments.length) {
        comments = node.leadingComments.slice(0);
    }

    if (node.trailingComments && node.trailingComments.length) {
        comments = comments.concat( node.trailingComments.slice(0) );
    }

    for (var i = 0, l = comments.length; i < l; i++) {
        comment = comments[i];
        if ( isValidJsdoc(comment.raw) ) {
            e = new JsdocCommentFound(comment, filename);

            parser.emit(e.event, e, parser);

            if (e.comment !== comment.raw) {
                updateCommentNode(comment, e.comment);
            }
        }
    }

    return true;
};

// TODO: docs
Visitor.prototype.visitNode = function(node, parser, filename) {
    var i;
    var l;

    var e = this.makeSymbolFoundEvent(node, parser, filename);

    if (!node.nodeId) {
        Object.defineProperty(node, 'nodeId', {
            value: parser.getUniqueId()
        });
    }

    if (this._nodeVisitors && this._nodeVisitors.length) {
        for (i = 0, l = this._nodeVisitors.length; i < l; i++) {
            this._nodeVisitors[i].visitNode(node, e, parser, filename);
            if (e.stopPropagation) {
                break;
            }
        }
    }

    if (!e.preventDefault && e.comment && isValidJsdoc(e.comment)) {
        parser.emit(e.event, e, parser);
    }

    // add the node to the parser's lookup table
    parser.addDocletRef(e);

    for (i = 0, l = e.finishers.length; i < l; i++) {
        e.finishers[i].call(parser, e);
    }

    return true;
};

// TODO: docs
function trackVars(parser, node, e) {
    // keep track of vars within a given scope
    var scope = '__global__';
    var doclet = null;

    if (node.enclosingScope) {
        scope = node.enclosingScope.nodeId;
    }

    doclet = parser.refs[scope];
    if (doclet) {
        doclet.meta.vars = doclet.meta.vars || {};
        doclet.meta.vars[e.code.name] = false;
        e.finishers.push(makeVarsFinisher(doclet));
    }
}

// TODO: docs
Visitor.prototype.makeSymbolFoundEvent = function(node, parser, filename) {
    var e;
    var basename;
    var i;
    var l;

    var extras = {
        code: parser.getNodeInfo(node)
    };

    switch (node.type) {
        // like: i = 0;
        case Syntax.AssignmentExpression:
            // TODO: ignore unless operator is '=' (for example, ignore '+=')
            // falls through
        
        // like: var i = 0;
        case Syntax.VariableDeclarator:
            e = new SymbolFound(node, filename, extras);

            basename = parser.getBasename(e.code.name);
            // TODO: handle code that does things like 'var self = this';
            if (basename !== 'this') {
                e.code.funcscope = parser.resolveVar(node, basename);
            }

            trackVars(parser, node, e);

            break;

        // like: function foo() {}
        case Syntax.FunctionDeclaration:
            // falls through
        
        // like: var foo = function() {};
        case Syntax.FunctionExpression:
            e = new SymbolFound(node, filename, extras);

            trackVars(parser, node, e);

            basename = parser.getBasename(e.code.name);
            e.code.funcscope = parser.resolveVar(node, basename);

            break;

        // like "obj.prop" in: /** @typedef {string} */ obj.prop;
        // Closure Compiler uses this pattern extensively for enums.
        // No need to fire events for them unless they're already commented.
        case Syntax.MemberExpression:
            if (node.leadingComments) {
                e = new SymbolFound(node, filename, extras);
            }

            break;

        // like "bar: true" in: var foo = { bar: true };
        // like "get bar() {}" in: var foo = { get bar() {} };
        case Syntax.Property:
            if ( node.kind !== ('get' || 'set') ) {
                extras.finishers = [parser.resolveEnum];
            }

            e = new SymbolFound(node, filename, extras);

            break;

        default:
            // ignore
    }

    if (!e) {
        e = {
            finishers: []
        };
    }

    return e;
};

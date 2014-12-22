'use strict';

var esprima = require('esprima');
var jsdoc = {
    src: {
        syntax: require('jsdoc/src/syntax'),
        Walker: require('jsdoc/src/walker').Walker
    },
    util: {
        logger: require('jsdoc/util/logger')
    }
};
var Syntax = jsdoc.src.syntax.Syntax;

// TODO: should set e.stopPropagation == true for consistency with Rhino, right?
var VISITOR_CONTINUE = true;
var VISITOR_STOP = false;

// TODO: docs; empty array means any node type, otherwise only the node types in the array
var acceptsLeadingComments = (function() {
    var accepts = {};

    // these nodes always accept leading comments
    var commentable = [
        Syntax.AssignmentExpression,
        Syntax.CallExpression,
        Syntax.FunctionDeclaration,
        Syntax.FunctionExpression,
        Syntax.MemberExpression,
        Syntax.Property,
        Syntax.TryStatement,
        Syntax.VariableDeclaration,
        Syntax.VariableDeclarator,
        Syntax.WithStatement
    ];
    for (var i = 0, l = commentable.length; i < l; i++) {
        accepts[commentable[i]] = [];
    }

    // these nodes accept leading comments if they have specific types of parent nodes
    // like: function foo(/** @type {string} */ bar) {}
    accepts[Syntax.Identifier] = [
        Syntax.CatchClause,
        Syntax.FunctionDeclaration,
        Syntax.FunctionExpression
    ];
    // like: var Foo = Class.create(/** @lends Foo */{ // ... })
    accepts[Syntax.ObjectExpression] = [
        Syntax.CallExpression,
        Syntax.Property,
        Syntax.ReturnStatement
    ];

    return accepts;
})();

// TODO: docs
function canAcceptComment(node) {
    var canAccept = false;
    var spec = acceptsLeadingComments[node.type];

    if (spec) {
        // empty array means we don't care about the parent type
        if (spec.length === 0) {
            canAccept = true;
        }
        // we can accept the comment if the spec contains the type of the node's parent
        else if (node.parent) {
            canAccept = spec.indexOf(node.parent.type) !== -1;
        }
    }

    return canAccept;
}

// TODO: docs
// check whether node1 is before node2
function isBefore(beforeRange, afterRange) {
    return beforeRange[1] <= afterRange[0];
}

// TODO: docs
function isWithin(innerRange, outerRange) {
    return innerRange[0] >= outerRange[0] && innerRange[1] <= outerRange[1];
}

// TODO: docs
function isJsdocComment(comment) {
    return comment && (comment.type === 'Block') && (comment.value[0] === '*');
}

/**
 * Add the raw comment string to a block comment node.
 *
 * @private
 * @param {!Object} comment - A comment node with `type` and `value` properties.
 */
function addRawComment(comment) {
    comment.raw = comment.raw || ('/*' + comment.value + '*/');
    return comment;
}

// TODO: docs
function scrubComments(comments) {
    var comment;

    var scrubbed = [];

    for (var i = 0, l = comments.length; i < l; i++) {
        comment = comments[i];
        if ( isJsdocComment(comment) ) {
            scrubbed.push( addRawComment(comment) );
        }
    }

    return scrubbed;
}

// TODO: docs
var AstBuilder = exports.AstBuilder = function() {};

function parse(source, filename, esprimaOpts) {
    var ast;

    try {
        ast = esprima.parse(source, esprimaOpts);
    }
    catch (e) {
        jsdoc.util.logger.error('Unable to parse %s: %s', filename, e.message);
    }

    return ast;
}

// TODO: docs
AstBuilder.prototype.build = function(source, filename) {
    var ast;

    var esprimaOpts = {
        comment: true,
        loc: true,
        range: true,
        tokens: true
    };

    ast = parse(source, filename, esprimaOpts);

    if (ast) {
        this._postProcess(filename, ast);
    }

    return ast;
};

// TODO: docs
function atomSorter(a, b) {
    var aRange = a.range;
    var bRange = b.range;
    var result = 0;

    // does a end before b starts?
    if ( isBefore(aRange, bRange) ) {
        result = -1;
    }
    // does a enclose b?
    else if ( isWithin(bRange, aRange) ) {
        result = -1;
    }
    // does a start before b?
    else if (aRange[0] < bRange[0]) {
        result = -1;
    }
    // are the ranges non-identical? if so, b must be first
    else if ( aRange[0] !== bRange[0] || aRange[1] !== bRange[1] ) {
        result = 1;
    }

    return result;
}

// TODO: docs
// TODO: export?
function CommentAttacher(comments, tokens) {
    this._comments = comments || [];
    this._tokens = tokens || [];

    this._tokenIndex = 0;
    this._previousNode = null;
    this._astRoot = null;

    this._resetPendingComments()
        ._resetCandidates();
}

// TODO: docs
CommentAttacher.prototype._resetPendingComments = function() {
    this._pendingComments = [];
    this._pendingCommentRange = null;

    return this;
};

// TODO: docs
CommentAttacher.prototype._resetCandidates = function() {
    this._candidates = [];

    return this;
};

// TODO: docs
CommentAttacher.prototype._nextComment = function() {
    return this._comments[0] || null;
};

// TODO: docs
CommentAttacher.prototype._nextToken = function() {
    return this._tokens[this._tokenIndex] || null;
};

// TODO: docs
// find the index of the atom whose end position is closest to (but not after) the specified
// position
CommentAttacher.prototype._nextIndexBefore = function(atoms, startIndex, position) {
    var atom;

    var newIndex = startIndex;

    for (var i = newIndex, l = atoms.length; i < l; i++) {
        atom = atoms[i];

        if (atom.range[1] > position) {
            break;
        }
        else {
            newIndex = i;
        }
    }

    return newIndex;
};

// TODO: docs
CommentAttacher.prototype._advanceTokenIndex = function(node) {
    var position = node.range[0];

    this._tokenIndex = this._nextIndexBefore(this._tokens, this._tokenIndex, position);

    return this;
};

// TODO: docs
CommentAttacher.prototype._fastForwardComments = function(node) {
    var position = node.range[0];
    var commentIndex = this._nextIndexBefore(this._comments, 0, position);

    // all comments before the node (except the last one) are pended
    if (commentIndex > 0) {
        this._pendingComments = this._pendingComments.concat( this._comments.splice(0,
            commentIndex) );
    }
};

CommentAttacher.prototype._attachPendingCommentsAsLeading = function(target) {
    target.leadingComments = (target.leadingComments || []).concat(this._pendingComments);
};

CommentAttacher.prototype._attachPendingCommentsAsTrailing = function(target) {
    target.trailingComments = (target.trailingComments || []).concat(this._pendingComments);
};

// TODO: docs
CommentAttacher.prototype._attachPendingComments = function(currentNode) {
    var target;

    if (!this._pendingComments.length) {
        return this;
    }

    // if there are one or more candidate nodes, attach the pending comments before the last
    // candidate node
    if (this._candidates.length > 0) {
        target = this._candidates[this._candidates.length - 1];
        this._attachPendingCommentsAsLeading(target);
    }
    // if we don't have a previous node, attach pending comments before the AST root; this should
    // mean that we haven't encountered any other nodes yet, or that the source file contains
    // JSDoc comments but not code
    else if (!this._previousNode) {
        target = this._astRoot;
        this._attachPendingCommentsAsLeading(target);
    }
    // otherwise, the comments must come after the current node (or the last node of the AST, if
    // we've run out of nodes)
    else {
        this._attachPendingCommentsAsTrailing(currentNode || this._previousNode);
    }

    // update the previous node
    this._previousNode = currentNode;

    this._resetPendingComments()
        ._resetCandidates();

    return this;
};

// TODO: docs
CommentAttacher.prototype._isEligible = function(node) {
    var atoms;
    var token;

    var isEligible = false;

    var comment = this._nextComment();
    if (comment) {
        atoms = [node, comment];
        token = this._nextToken();
        if (token) {
            atoms.push(token);
        }

        atoms.sort(atomSorter);

        // a candidate node must immediately follow the comment
        if (atoms.indexOf(node) === atoms.indexOf(comment) + 1) {
            isEligible = true;
        }
    }

    return isEligible;
};

// TODO: docs
// TODO: do we ever get multiple candidate nodes?
CommentAttacher.prototype.visit = function(node) {
    var isEligible;

    // bail if we're out of comments
    if ( !this._nextComment() ) {
        return VISITOR_STOP;
    }

    // set the AST root if necessary
    this._astRoot = this._astRoot || node;

    // move to the next token, and fast-forward past comments that can no longer be attached
    this._advanceTokenIndex(node);
    this._fastForwardComments(node);
    // now we can check whether the current node is in the right position to accept the next comment
    isEligible = this._isEligible(node);

    // attach the pending comments, if any
    this._attachPendingComments(node);

    // okay, now that we've done all that bookkeeping, we can check whether the current node accepts
    // leading comments and add it to the candidate list if needed
    if ( isEligible && canAcceptComment(node) ) {
        // make sure we don't go past the end of the outermost target node
        if (!this._pendingCommentRange) {
            this._pendingCommentRange = node.range.slice(0);
        }
        this._candidates.push(node);

        // we have a candidate node, so pend the current comment
        this._pendingComments.push(this._comments.splice(0, 1)[0]);
    }

    return VISITOR_CONTINUE;
};

// TODO: docs
CommentAttacher.prototype.finish = function() {
    var length = this._comments.length;

    // any leftover comments are pended
    if (length) {
        this._pendingComments = this._pendingComments.concat( this._comments.splice(0, length) );
    }

    // attach the pending comments, if any
    this._attachPendingComments();
};

// TODO: docs
// TODO: refactor to make this extensible
/**
 * @private
 * @param {string} filename - The full path to the source file.
 * @param {Object} ast - An abstract syntax tree that conforms to the Mozilla Parser API.
 */
AstBuilder.prototype._postProcess = function(filename, ast) {
    var attachComments = !!ast.comments && !!ast.comments.length;
    var commentAttacher;
    var scrubbed;
    var visitor;
    var walker;

    if (!attachComments) {
        return;
    }

    scrubbed = scrubComments(ast.comments.slice(0));
    commentAttacher = new CommentAttacher(scrubbed.slice(0), ast.tokens);
    visitor = {
        visit: function(node) {
            return commentAttacher.visit(node);
        }
    };
    walker = new jsdoc.src.Walker();

    walker.recurse(ast, visitor, filename);

    commentAttacher.finish();

    // replace the comments with the filtered comments
    ast.comments = scrubbed;
    // we no longer need the tokens
    ast.tokens = [];
};

'use strict';

var espree = require('espree');
var logger = require('jsdoc/util/logger');

// exported so we can use them in tests
var parserOptions = exports.parserOptions = {
    attachComment: true,
    comment: true,
    ecmaFeatures: {
        experimentalObjectRestSpread: true,
        globalReturn: true,
        impliedStrict: true,
        jsx: true
    },
    ecmaVersion: 7,
    loc: true,
    range: true,
    sourceType: 'module',
    tokens: true
};

// TODO: docs
var AstBuilder = exports.AstBuilder = function() {};

function parse(source, filename) {
    var ast;

    try {
        ast = espree.parse(source, parserOptions);
    }
    catch (e) {
        logger.error('Unable to parse %s: %s', filename, e.message);
    }

    return ast;
}

// TODO: docs
AstBuilder.prototype.build = function(source, filename) {
    return parse(source, filename);
};

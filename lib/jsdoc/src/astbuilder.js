'use strict';

var babylon = require('babylon');
var env = require('jsdoc/env');
var logger = require('jsdoc/util/logger');

// exported so we can use them in tests
var parserOptions = exports.parserOptions = {
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    plugins: [
        'asyncGenerators',
        'bigInt',
        'classPrivateProperties',
        'classProperties',
        'decorators2',
        'doExpressions',
        'dynamicImport',
        'estree',
        'exportExtensions',
        'functionBind',
        'functionSent',
        'importMeta',
        'jsx',
        'numericSeparator',
        'objectRestSpread',
        'optionalCatchBinding',
        'optionalChaining'
    ],
    ranges: true,
    sourceType: env.conf.sourceType
};

// TODO: docs
/* eslint-disable no-empty-function */
var AstBuilder = exports.AstBuilder = function() {};
/* eslint-enable no-empty-function */

function parse(source, filename) {
    var ast;

    try {
        ast = babylon.parse(source, parserOptions);
        // console.log(JSON.stringify(ast, null, 2));
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

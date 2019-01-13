'use strict';

var babelParser = require('@babel/parser');
var env = require('jsdoc/env');
var logger = require('jsdoc/util/logger');

// exported so we can use them in tests
var parserOptions = exports.parserOptions = {
    allowAwaitOutsideFunction: true,
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    plugins: [
        'asyncGenerators',
        'bigInt',
        'classPrivateMethods',
        'classPrivateProperties',
        'classProperties',
        ['decorators', {
            decoratorsBeforeExport: true
        }],
        'doExpressions',
        'dynamicImport',
        'estree',
        'exportDefaultFrom',
        'exportNamespaceFrom',
        'functionBind',
        'functionSent',
        'importMeta',
        'jsx',
        'logicalAssignment',
        'nullishCoalescingOperator',
        'numericSeparator',
        'objectRestSpread',
        'optionalCatchBinding',
        'optionalChaining',
        ['pipelineOperator', {
            proposal: 'minimal'
        }],
        'throwExpressions'
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
        ast = babelParser.parse(source, parserOptions);
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

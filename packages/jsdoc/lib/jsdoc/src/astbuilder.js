const babelParser = require('@babel/parser');
const env = require('jsdoc/env');
const logger = require('jsdoc/util/logger');

// exported so we can use them in tests
const parserOptions = exports.parserOptions = {
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
    sourceType: env.conf.source.type
};

/**
 * @param {string} source - The source to parse (from `filename`).
 * @param {string} filename - The filename of `source`.
 * @returns {object} An abstract syntax tree (AST).
 */
function parse(source, filename) {
    let ast;

    try {
        ast = babelParser.parse(source, parserOptions);
        // console.log(JSON.stringify(ast, null, 2));
    }
    catch (e) {
        logger.error(`Unable to parse ${filename}: ${e.message}`);
    }

    return ast;
}


class AstBuilder {
    // TODO: docs
    /* eslint-disable no-empty-function */
    constructor() {}
    /* eslint-enable no-empty-function */

    // TODO: docs
    /* eslint-disable class-methods-use-this */
    build(source, filename) {
        return parse(source, filename);
    }
    /* eslint-enable class-methods-use-this */
}
exports.AstBuilder = AstBuilder;

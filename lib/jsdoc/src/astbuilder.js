const babelParser = require('@babel/parser');
const env = require('jsdoc/env');
const logger = require('jsdoc/util/logger');

// exported so we can use them in tests
const parserOptions = exports.parserOptions = {
    allowAwaitOutsideFunction: true,
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    allowUndeclaredExports: true,
    plugins: [
        'asyncDoExpressions',
        'decoratorAutoAccessors',
        ['decorators', {
            version: '2022-03'
        }],
        'decimal',
        'destructuringPrivate',
        'doExpressions',
        'estree',
        'explicitResourceManagement',
        'exportDefaultFrom',
        'functionBind',
        'functionSent',
        'importAssertions',
        'importMeta',
        'importReflection',
        'jsx',
        'moduleBlocks',
        'partialApplication',
        ['pipelineOperator', {
            proposal: 'hack',
            topicToken: '^^'
        }],
        'recordAndTuple',
        'regexpUnicodeSets',
        'throwExpressions'
    ],
    ranges: true,
    sourceType: env.conf.sourceType
};

function parse(source, filename) {
    let ast;

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

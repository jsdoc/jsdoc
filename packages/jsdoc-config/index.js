/**
 * @module @jsdoc/config
 */

const _ = require('lodash');
const cosmiconfig = require('cosmiconfig');
const defaults = require('./defaults');
const stripBom = require('strip-bom');
const stripJsonComments = require('strip-json-comments');

const MODULE_NAME = 'jsdoc';

class Config {
    constructor(filepath, config) {
        this.config = config;
        this.filepath = filepath;
    }
}

function loadJson(filepath, content) {
    return cosmiconfig.loadJson(filepath, stripBom(stripJsonComments(content)));
}

function loadYaml(filepath, content) {
    return cosmiconfig.loadYaml(filepath, stripBom(content));
}

const explorer = cosmiconfig(MODULE_NAME, {
    cache: false,
    loaders: {
        '.json': loadJson,
        '.yaml': loadYaml,
        '.yml': loadYaml,
        noExt: loadYaml
    },
    searchPlaces: [
        'package.json',
        `.${MODULE_NAME}rc`,
        `.${MODULE_NAME}rc.json`,
        `.${MODULE_NAME}rc.yaml`,
        `.${MODULE_NAME}rc.yml`,
        `.${MODULE_NAME}rc.js`,
        `${MODULE_NAME}.config.js`
    ]
});

exports.loadSync = (filepath) => {
    let loaded;

    if (filepath) {
        loaded = explorer.loadSync(filepath);
    } else {
        loaded = explorer.searchSync() || {};
    }

    return new Config(
        loaded.filepath,
        _.defaultsDeep({}, loaded.config, defaults)
    );
};

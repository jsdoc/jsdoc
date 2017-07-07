/**
 * @module jsdoc/config
 */
'use strict';

var stripBom = require('jsdoc/util/stripbom');
var stripJsonComments = require('strip-json-comments');

function mergeRecurse(target, source) {
    Object.keys(source).forEach(function(p) {
        if ( source[p].constructor === Object ) {
            if ( !target[p] ) {
                target[p] = {};
            }
            mergeRecurse(target[p], source[p]);
        }
        else {
            target[p] = source[p];
        }
    });

    return target;
}

// required config values, override these defaults in your config.json if necessary
var defaults = {
    plugins: [],
    recurseDepth: 10,
    source: {
        includePattern: '.+\\.js(doc|x)?$',
        excludePattern: ''
    },
    sourceType: 'module',
    tags: {
        allowUnknownTags: true,
        dictionaries: ['jsdoc', 'closure']
    },
    templates: {
        monospaceLinks: false,
        cleverLinks: false
    }
};

/**
 * @class
 * @classdesc Represents a JSDoc application configuration.
 * @param {(string|object)} [jsonOrObject] - The contents of config.json, or a JavaScript object
 * exported from a .js config file.
 */
function Config(jsonOrObject) {
    if (typeof jsonOrObject === 'undefined') {
        jsonOrObject = {};
    }

    if (typeof jsonOrObject === 'string') {
        jsonOrObject = JSON.parse( (stripJsonComments(stripBom.strip(jsonOrObject)) || '{}') );
    }

    if (typeof jsonOrObject !== 'object') {
        jsonOrObject = {};
    }

    this._config = mergeRecurse(defaults, jsonOrObject);
}

module.exports = Config;

/**
 * Get the merged configuration values.
 */
Config.prototype.get = function() {
    return this._config;
};

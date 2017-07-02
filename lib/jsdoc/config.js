/**
    @overview
    @author Michael Mathews <micmath@gmail.com>
    @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
    @module jsdoc/config
 */
'use strict';

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
    tags: {
        allowUnknownTags: true,
        dictionaries: ['jsdoc', 'closure']
    },
    templates: {
        monospaceLinks: false,
        cleverLinks: false
    },
    source: {
        includePattern: '.+\\.js(doc|x)?$',
        excludePattern: ''
    },
    plugins: []
};

/**
    @class
    @classdesc Represents a JSDoc application configuration.
    @param {string|object} [jsonOrObject] - The contents of config.json, or a module exports from a js config
 */
function Config(jsonOrObject) {
    if (typeof jsonOrObject === 'undefined') {
        jsonOrObject = {};
    }

    if (typeof jsonOrObject === 'string') {
        jsonOrObject = JSON.parse( (jsonOrObject || '{}') );
    }

    if (typeof jsonOrObject !== 'object') {
        jsonOrObject = {};
    }

    this._config = mergeRecurse(defaults, jsonOrObject);
}

module.exports = Config;

/**
    Get the merged configuration values.
 */
Config.prototype.get = function() {
    return this._config;
};

/**
    @overview
    @author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
	@module jsdoc/config
 */

var hasOwnProp = Object.prototype.hasOwnProperty;

function mergeRecurse(target, source) {
    for (var p in source) {
        if ( hasOwnProp.call(source, p) ) {
            if ( source[p].constructor === Object ) {
                if ( !target[p] ) {  target[p] = {}; }
                mergeRecurse(target[p], source[p]);
            }
            else {
                target[p] = source[p];
            }
        }
    }
    
    return target;
}

// required config values, override these defaults in your config.json if necessary
const defaults = {
    "tags": {
        "allowUnknownTags": true
    },
    "templates": {
        "monospaceLinks": false,
        "cleverLinks": false
    },
    "source": {
        "includePattern": ".+\\.js(doc)?$",
        "excludePattern": "(^|\\/)_"
    },
    "plugins": [],
    "jsVersion": 180
};

/**
    @class
    @classdesc Represents a JSDoc application configuration.
    @param {string} [json] - The contents of config.json.
 */
function Config(json) {
    json = JSON.parse( (json || "{}") );
    this._config = mergeRecurse(defaults, json);
}

module.exports = Config;

/**
    Get the merged configuration values.
 */
Config.prototype.get = function() {
    return this._config;
};

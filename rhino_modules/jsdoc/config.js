/**
    @overview
    @author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
	@module jsdoc/config
	@requires common/util
 */

// used to do recursive merge
var util = require('common/util');

// required config values, override these defaults in your config.json if necessary
const defaults = {
    "source": {
        "includePattern": ".+\\.js(doc)?$",
        "excludePattern": "(^|\\/)_"
    },
    "jsVersion": 180
};

/**
    @class
    @classdesc Represents a JSDoc application configuration.
    @param {string} [json] - The contents of config.json.
 */
function Config(json) {
    json = JSON.parse( (json || "{}") );
    
    this._config = util.mergeRecurse(defaults, json);
}

module.exports = Config;

/**
    Get the merged configuration values.
 */
Config.prototype.get = function() {
    return this._config;
};

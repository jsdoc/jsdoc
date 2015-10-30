/**
 * Utility functions to support the JSDoc plugin framework.
 * @module jsdoc/plugins
 */
'use strict';

var logger = require('jsdoc/util/logger');
var path = require('jsdoc/path');

function addHandlers(handlers, parser) {
    Object.keys(handlers).forEach(function(eventName) {
        parser.on(eventName, handlers[eventName]);
    });
}

exports.installPlugins = function(plugins, parser) {
    var dictionary = require('jsdoc/tag/dictionary');

    var eventName;
    var plugin;

    for (var i = 0, l = plugins.length; i < l; i++) {
        plugin = require(plugins[i]);

        // allow user-defined plugins to...
        // ...register event handlers
        if (plugin.handlers) {
            addHandlers(plugin.handlers, parser);
        }

        // ...define tags
        if (plugin.defineTags) {
            plugin.defineTags(dictionary);
        }

        // ...add a Mozilla Parser API node visitor
        if (plugin.astNodeVisitor) {
            parser.addAstNodeVisitor(plugin.astNodeVisitor);
        }
    }
};

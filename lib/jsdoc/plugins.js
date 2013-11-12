/*global app: true */
/**
 * Utility functions to support the JSDoc plugin framework.
 * @module jsdoc/plugins
 */
'use strict';

var error = require('jsdoc/util/error');
var path = require('jsdoc/path');

exports.installPlugins = function(plugins, parser) {
    var dictionary = require('jsdoc/tag/dictionary');

    var eventName;
    var plugin;
    var pluginPath;

    for (var i = 0, l = plugins.length; i < l; i++) {
        pluginPath = path.getResourcePath(path.dirname(plugins[i]), path.basename(plugins[i]));

        if (!pluginPath) {
            error.handle(new Error('Unable to find the plugin "' + plugins[i] + '"'));
            continue;
        }

        plugin = require(pluginPath);

        // allow user-defined plugins to...
        //...register event handlers
        if (plugin.handlers) {
            Object.keys(plugin.handlers).forEach(function(eventName) {
                parser.on(eventName, plugin.handlers[eventName]);
            });
        }

        //...define tags
        if (plugin.defineTags) {
            plugin.defineTags(dictionary);
        }

        //...add a Rhino node visitor (deprecated in JSDoc 3.3)
        if (plugin.nodeVisitor) {
            if ( !parser.addNodeVisitor ) {
                error.handle( new Error('Unable to add the Rhino node visitor from ' + plugins[i] +
                    ', because JSDoc is not using the Rhino JavaScript parser.') );
            }
            else {
                parser.addNodeVisitor(plugin.nodeVisitor);
            }
        }

        //...add a Mozilla Parser API node visitor
        if (plugin.astNodeVisitor) {
            parser.addAstNodeVisitor(plugin.astNodeVisitor);
        }
    }
};

/*global app: true */
/**
 * Utility functions to support the JSDoc plugin framework.
 * @module jsdoc/plugins
 */

var error = require('jsdoc/util/error');
var path = require('jsdoc/path');

var hasOwnProp = Object.prototype.hasOwnProperty;

exports.installPlugins = function(plugins, p) {
    var dictionary = require('jsdoc/tag/dictionary');
    var parser = p;

    var eventName;
    var plugin;
    var pluginPath;

    for (var i = 0, l = plugins.length; i < l; i++) {
        pluginPath = path.getResourcePath(path.dirname(plugins[i]), path.basename(plugins[i]));
        if (!pluginPath) {
            error.handle(new Error('Unable to find the plugin "' + plugins[i] + '"'));
        }
        else {
            plugin = require(pluginPath);

            // allow user-defined plugins to...
            //...register event handlers
            if (plugin.handlers) {
                for (eventName in plugin.handlers) {
                    if ( hasOwnProp.call(plugin.handlers, eventName) ) {
                        parser.on(eventName, plugin.handlers[eventName]);
                    }
                }
            }

            //...define tags
            if (plugin.defineTags) {
                plugin.defineTags(dictionary);
            }

            //...add a node visitor
            if (plugin.nodeVisitor) {
                parser.addNodeVisitor(plugin.nodeVisitor);
            }
        }
    }
};

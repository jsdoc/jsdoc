/*global app: true */
/**
 * Utility functions to support the JSDoc plugin framework.
 * @module jsdoc/plugins
 */

var hasOwnProp = Object.prototype.hasOwnProperty;

exports.installPlugins = function(plugins, p) {
    var dictionary = require('jsdoc/tag/dictionary');
    var parser = p;

    var eventName;
    var plugin;

    // allow user-defined plugins to...
    for (var i = 0, leni = plugins.length; i < leni; i++) {
        plugin = require(plugins[i]);

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
};

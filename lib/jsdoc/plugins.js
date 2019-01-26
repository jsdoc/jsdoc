/**
 * Utility functions to support the JSDoc plugin framework.
 * @module jsdoc/plugins
 */
const dictionary = require('jsdoc/tag/dictionary');

function addHandlers(handlers, parser) {
    Object.keys(handlers).forEach(eventName => {
        parser.on(eventName, handlers[eventName]);
    });
}

exports.installPlugins = (plugins, parser) => {
    let plugin;

    for (let pluginModule of plugins) {
        plugin = require(pluginModule);

        // allow user-defined plugins to...
        // ...register event handlers
        if (plugin.handlers) {
            addHandlers(plugin.handlers, parser);
        }

        // ...define tags
        if (plugin.defineTags) {
            plugin.defineTags(dictionary);
        }

        // ...add an ESTree node visitor
        if (plugin.astNodeVisitor) {
            parser.addAstNodeVisitor(plugin.astNodeVisitor);
        }
    }
};

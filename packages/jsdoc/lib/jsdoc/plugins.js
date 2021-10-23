/**
 * Utility functions to support the JSDoc plugin framework.
 * @module jsdoc/plugins
 */

function addHandlers(handlers, parser, deps) {
  Object.keys(handlers).forEach((eventName) => {
    parser.on(eventName, handlers[eventName], deps);
  });
}

exports.installPlugins = (plugins, parser, deps) => {
  let dictionary;
  let plugin;

  for (let pluginModule of plugins) {
    plugin = require(pluginModule);

    // allow user-defined plugins to...
    // ...register event handlers
    if (plugin.handlers) {
      addHandlers(plugin.handlers, parser, deps);
    }

    // ...define tags
    if (plugin.defineTags) {
      dictionary = deps.get('tags');
      plugin.defineTags(dictionary, deps);
    }

    // ...add an ESTree node visitor
    if (plugin.astNodeVisitor) {
      parser.addAstNodeVisitor(plugin.astNodeVisitor, deps);
    }
  }
};

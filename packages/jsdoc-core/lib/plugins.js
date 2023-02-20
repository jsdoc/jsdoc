/*
  Copyright 2012 the JSDoc Authors.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
/**
 * Utility functions to support the JSDoc plugin framework.
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

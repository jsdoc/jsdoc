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
/* global jsdoc */
describe('railsTemplate plugin', () => {
  const { handlers } = require('@jsdoc/parse');
  const { installPlugins } = require('jsdoc/plugins');
  const path = require('path');

  const parser = jsdoc.createParser();
  const pluginPath = path.join(__dirname, '../../railsTemplate');

  installPlugins([pluginPath], parser, jsdoc.deps);
  handlers.attachTo(parser);

  it('should remove <% %> rails template tags from the source of *.erb files', () => {
    const docSet = parser.parse([path.join(__dirname, '../fixtures/railsTemplate.js.erb')]);

    expect(docSet[2].description).toEqual('Remove rails tags from the source input (e.g. )');
  });
});

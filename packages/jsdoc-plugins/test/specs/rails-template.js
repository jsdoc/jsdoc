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

import path from 'node:path';

import { plugins } from '@jsdoc/core';
import { handlers } from '@jsdoc/parse';

describe('rails-template plugin', () => {
  const __dirname = jsdoc.dirname(import.meta.url);
  let parser;
  const pluginPath = path.join(__dirname, '../../rails-template.js');

  beforeEach(async () => {
    parser = jsdoc.createParser();
    await plugins.installPlugins([pluginPath], parser, jsdoc.deps);
    handlers.attachTo(parser);
  });

  afterEach(() => {
    parser._stopListening();
  });

  it('removes <% %> rails template tags from the source of *.erb files', () => {
    const docletStore = parser.parse([
      path.resolve(__dirname, '../fixtures/rails-template.js.erb'),
    ]);
    const doclet = Array.from(
      docletStore.docletsByLongname.get('module:plugins/railsTemplate.handlers.beforeParse')
    )[0];

    expect(doclet.description).toBe('Remove rails tags from the source input (e.g. )');
  });
});

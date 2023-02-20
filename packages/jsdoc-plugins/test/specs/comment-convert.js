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

describe('comment-convert plugin', () => {
  const path = require('path');
  const { plugins } = require('@jsdoc/core');

  let docSet;
  const parser = jsdoc.createParser();
  const pluginPath = path.join(__dirname, '../../comment-convert.js');

  plugins.installPlugins([pluginPath], parser, jsdoc.deps);
  docSet = jsdoc.getDocSetFromFile(pluginPath, parser);

  it('converts ///-style comments into jsdoc comments', () => {
    const doclet = docSet.getByLongname(
      'module:@jsdoc/plugins/comment-convert.handlers.beforeParse'
    );

    expect(doclet.length).toBe(1);
  });
});

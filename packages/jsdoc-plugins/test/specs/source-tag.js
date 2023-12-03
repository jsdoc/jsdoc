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
import path from 'node:path';

import { plugins } from '@jsdoc/core';

describe('source-tag plugin', () => {
  const __dirname = jsdoc.dirname(import.meta.url);
  let docSet;
  let parser;
  const pluginPath = path.join(__dirname, '../../source-tag.js');

  beforeEach(async () => {
    parser = jsdoc.createParser();
    await plugins.installPlugins([pluginPath], parser, jsdoc.deps);
    docSet = jsdoc.getDocSetFromFile(pluginPath, parser);
  });

  afterEach(() => {
    parser._stopListening();
  });

  it("should set the lineno and filename of the doclet's meta property", () => {
    const doclet = docSet.getByLongname('handlers.newDoclet')[0];

    expect(doclet.meta).toBeObject();
    expect(doclet.meta.filename).toBe('sourcetag.js');
    expect(doclet.meta.lineno).toBe(9);
  });
});

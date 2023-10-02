/*
  Copyright 2011 the JSDoc Authors.

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
import os from 'node:os';
import path from 'node:path';

import { Doclet } from '@jsdoc/doclet';
import { handlers } from '@jsdoc/parse';

const __dirname = jsdoc.dirname(import.meta.url);

describe('module names', () => {
  let doclets;
  const env = jsdoc.deps.get('env');
  let srcParser = null;

  beforeEach(() => {
    env.opts._ = [path.resolve(__dirname, '../../fixtures/modules/data')];
    env.sourceFiles = [];
    srcParser = jsdoc.createParser();
    handlers.attachTo(srcParser);
  });

  afterEach(() => {
    srcParser._removeListeners();
  });

  it('should create a name from the file path when no documented module name exists', () => {
    const filename = path.resolve(__dirname, '../../fixtures/modules/data/mod-1.js');

    env.sourceFiles.push(filename);
    doclets = Array.from(srcParser.parse(filename).doclets);

    expect(doclets[0].longname).toBe('module:mod-1');
  });

  // Windows-specific test
  if (/^win/.test(os.platform())) {
    it('should always use forward slashes when creating a name from the file path', () => {
      let doclet;

      env.sourceFiles = [
        'C:\\Users\\Jane Smith\\myproject\\index.js',
        'C:\\Users\\Jane Smith\\myproject\\lib\\mymodule.js',
      ];
      env.opts._ = [];

      doclet = new Doclet(
        '/** @module */',
        {
          lineno: 1,
          filename: 'C:\\Users\\Jane Smith\\myproject\\lib\\mymodule.js',
        },
        jsdoc.deps
      );

      expect(doclet.name).toBe('lib/mymodule');
    });
  }

  it('should use the documented module name if available', () => {
    const filename = path.resolve(__dirname, '../../fixtures/modules/data/mod-2.js');

    env.sourceFiles.push(filename);
    doclets = Array.from(srcParser.parse(filename).doclets);

    expect(doclets[0].longname).toBe('module:my/module/name');
  });
});

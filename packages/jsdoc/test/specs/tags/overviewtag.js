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

import { Doclet } from '@jsdoc/doclet';
import { handlers } from '@jsdoc/parse';

const __dirname = jsdoc.dirname(import.meta.url);

describe('@overview tag', () => {
  let doclets;
  const env = jsdoc.env;

  let srcParser;
  const sourceFiles = env.sourceFiles.slice();
  const sourcePaths = env.opts._?.slice();

  beforeEach(() => {
    env.opts._ = [path.normalize(`${__dirname}/../../fixtures`)];
    env.sourceFiles = [];
    srcParser = jsdoc.createParser();
    handlers.attachTo(srcParser);
  });

  afterEach(() => {
    env.opts._ = sourcePaths;
    env.sourceFiles = sourceFiles;
    srcParser._stopListening();
  });

  it('When a file overview tag appears in a doclet, the name of the doclet should contain the path to the file.', () => {
    const filename = path.resolve(__dirname, '../../fixtures/file.js');

    env.sourceFiles.push(filename);
    doclets = Array.from(srcParser.parse(filename).doclets);

    expect(doclets[0].name).toMatch(/^file\.js$/);
  });

  it('The name and longname should be equal', () => {
    const filename = path.resolve(__dirname, '../../fixtures/file.js');

    env.sourceFiles.push(filename);
    doclets = Array.from(srcParser.parse(filename).doclets);

    expect(doclets[0].name).toBe(doclets[0].longname);
  });

  it(
    'The name should not include the entire filepath when the source file is outside the ' +
      'JSDoc directory',
    () => {
      let doclet;
      let docletMeta;
      let docletSrc;
      let fakePath = path.resolve(__dirname, 'somefile.js');

      // set up the environment to reflect the fake filepath
      env.opts._ = [fakePath];

      // create a doclet with a fake filepath, then add a `@file` tag
      docletSrc = '/** @class */';
      docletMeta = {
        lineno: 1,
        filename: fakePath,
      };
      doclet = new Doclet(docletSrc, docletMeta, jsdoc.env);
      doclet.addTag('file', 'A random file.');

      expect(doclet.name).toBe('somefile.js');
    }
  );
});

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
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { augment } from '@jsdoc/doclet';
import { createParser, handlers } from '@jsdoc/parse';
import { EventBus } from '@jsdoc/util';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bus = new EventBus('jsdoc');
const originalDictionaries = ['jsdoc', 'closure'];
const packagePath = path.resolve(__dirname, '../..');
const parseResults = [];

const helpers = {
  addParseResults: (filename, doclets) => {
    parseResults.push({
      filename: filename,
      doclets: doclets,
    });
  },
  createParser: () => createParser(jsdoc.deps),
  didLog: (fn, level) => {
    const events = [];

    function listener(e) {
      events.push(e);
    }

    bus.on(`logger:${level}`, listener);
    fn();
    bus.off(`logger:${level}`, listener);

    return events.length !== 0;
  },
  dirname: (importMetaUrl) => path.dirname(fileURLToPath(importMetaUrl)),
  getDocSetFromFile: (filename, parser, shouldValidate, shouldAugment) => {
    const docSet = {
      get doclets() {
        return Array.from(docSet.docletStore.allDoclets);
      },
      getByLongname(longname) {
        return docSet.doclets.filter((doclet) => (doclet.longname || doclet.name) === longname);
      },
    };
    const sourcePath = path.isAbsolute(filename) ? filename : path.join(packagePath, filename);
    const sourceCode = fs.readFileSync(sourcePath, 'utf8');
    const testParser = parser || helpers.createParser();

    handlers.attachTo(testParser);

    docSet.docletStore = testParser.parse(`javascript:${sourceCode}`); // eslint-disable-line no-script-url

    if (shouldAugment !== false) {
      augment.augmentAll(docSet.docletStore);
    }

    // tests assume that borrows have not yet been resolved

    if (shouldValidate !== false) {
      helpers.addParseResults(filename, docSet.doclets);
    }

    docSet.docletStore._removeListeners();

    return docSet;
  },
  getParseResults: () => parseResults,
  replaceTagDictionary: (dictionaryNames) => {
    const config = jsdoc.deps.get('config');

    if (!Array.isArray(dictionaryNames)) {
      dictionaryNames = [dictionaryNames];
    }

    config.tags.dictionaries = dictionaryNames;
    jsdoc.deps.reset('tags');
  },
  restoreTagDictionary: () => {
    const config = jsdoc.deps.get('config');

    config.tags.dictionaries = originalDictionaries.slice();
    jsdoc.deps.reset('tags');
  },
};

if (!global.jsdoc) {
  global.jsdoc = {};
}

for (const helper of Object.keys(helpers)) {
  global.jsdoc[helper] = helpers[helper];
}

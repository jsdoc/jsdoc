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
const { augmentAll } = require('jsdoc/augment');
const { createParser } = require('jsdoc/src/parser');
const { EventBus } = require('@jsdoc/util');
const fs = require('fs');
const handlers = require('jsdoc/src/handlers');
const path = require('path');

const bus = new EventBus('jsdoc');
const originalDictionaries = ['jsdoc', 'closure'];
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
  getDocSetFromFile: (filename, parser, shouldValidate, augment) => {
    let doclets;
    const packagePath = path.resolve(__dirname, '../..');
    const sourceCode = fs.readFileSync(path.join(packagePath, filename), 'utf8');
    const testParser = parser || helpers.createParser();

    handlers.attachTo(testParser);

    /* eslint-disable no-script-url */
    doclets = testParser.parse(`javascript:${sourceCode}`);
    /* eslint-enable no-script-url */

    if (augment !== false) {
      augmentAll(doclets);
    }

    // tests assume that borrows have not yet been resolved

    if (shouldValidate !== false) {
      helpers.addParseResults(filename, doclets);
    }

    return {
      doclets,
      getByLongname(longname) {
        return doclets.filter((doclet) => (doclet.longname || doclet.name) === longname);
      },
    };
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

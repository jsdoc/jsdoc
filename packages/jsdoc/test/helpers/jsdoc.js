const { _replaceDictionary } = require('jsdoc/doclet');
const { augmentAll } = require('jsdoc/augment');
const { createParser } = require('jsdoc/src/parser');
const { Dictionary } = require('jsdoc/tag/dictionary');
const { EventBus } = require('@jsdoc/util');
const fs = require('fs');
const handlers = require('jsdoc/src/handlers');
const path = require('path');

const bus = new EventBus('jsdoc');
let originalDictionaries;
const parseResults = [];

const helpers = {
  addParseResults: (filename, doclets) => {
    parseResults.push({
      filename: filename,
      doclets: doclets,
    });
  },
  createParser,
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
      doclets: doclets,
      getByLongname(longname) {
        return doclets.filter((doclet) => (doclet.longname || doclet.name) === longname);
      },
    };
  },
  getParseResults: () => parseResults,
  replaceTagDictionary: (dictionaryNames) => {
    let dict;
    const env = jsdoc.deps.get('env');

    if (!Array.isArray(dictionaryNames)) {
      dictionaryNames = [dictionaryNames];
    }

    originalDictionaries = env.conf.tags.dictionaries.slice();
    env.conf.tags.dictionaries = dictionaryNames;

    dict = Dictionary.fromConfig(env);
    dict.Dictionary = Dictionary;
    _replaceDictionary(dict);

    env.conf.tags.dictionaries = originalDictionaries;
  },
  restoreTagDictionary: () => {
    const env = jsdoc.deps.get('env');

    _replaceDictionary(Dictionary.fromConfig(env));
  },
};

if (!global.jsdoc) {
  global.jsdoc = {};
}

for (const helper of Object.keys(helpers)) {
  global.jsdoc[helper] = helpers[helper];
}

const { _replaceDictionary } = require('jsdoc/doclet');
const { augmentAll } = require('jsdoc/augment');
const { createParser } = require('jsdoc/src/parser');
const { defineTags } = require('jsdoc/tag/dictionary/definitions');
const dictionary = require('jsdoc/tag/dictionary');
const env = require('jsdoc/env');
const fs = require('jsdoc/fs');
const handlers = require('jsdoc/src/handlers');
const path = require('jsdoc/path');

const originalDictionary = dictionary;
const parseResults = [];

const helpers = global.jsdoc = {
    addParseResults: (filename, doclets) => {
        parseResults.push({
            filename: filename,
            doclets: doclets
        });
    },
    createParser,
    getDocSetFromFile: (filename, parser, shouldValidate, augment) => {
        let doclets;

        const sourceCode = fs.readFileSync(path.join(env.dirname, filename), 'utf8');
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
                return doclets.filter(doclet => (doclet.longname || doclet.name) === longname);
            }
        };
    },
    getParseResults: () => parseResults,
    replaceTagDictionary: dictionaryNames => {
        const dict = new dictionary.Dictionary();
        const originalDictionaries = env.conf.tags.dictionaries.slice(0);

        if (!Array.isArray(dictionaryNames)) {
            dictionaryNames = [dictionaryNames];
        }

        env.conf.tags.dictionaries = dictionaryNames;

        defineTags(dict);
        _replaceDictionary(dict);

        env.conf.tags.dictionaries = originalDictionaries;
    },
    restoreTagDictionary: () => {
        _replaceDictionary(originalDictionary);
    }
};

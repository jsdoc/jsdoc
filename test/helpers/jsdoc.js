const fs = require('fs');
const jsdoc = {
    augment: require('jsdoc/augment'),
    doclet: require('jsdoc/doclet'),
    env: require('jsdoc/env'),
    schema: require('jsdoc/schema'),
    src: {
        handlers: require('jsdoc/src/handlers'),
        parser: require('jsdoc/src/parser')
    },
    tag: {
        dictionary: require('jsdoc/tag/dictionary'),
        definitions: require('jsdoc/tag/dictionary/definitions')
    }
};
const path = require('jsdoc/path');

const originalDictionary = jsdoc.tag.dictionary;
const parseResults = [];

const helpers = global.jsdoc = {
    addParseResults: (filename, doclets) => {
        parseResults.push({
            filename: filename,
            doclets: doclets
        });
    },
    createParser: () => jsdoc.src.parser.createParser(),
    getDocSetFromFile: (filename, parser, shouldValidate, augment) => {
        let doclets;

        const sourceCode = fs.readFileSync(path.join(jsdoc.env.dirname, filename), 'utf8');
        const testParser = parser || helpers.createParser();

        jsdoc.src.handlers.attachTo(testParser);

        /* eslint-disable no-script-url */
        doclets = testParser.parse(`javascript:${sourceCode}`);
        /* eslint-enable no-script-url */

        if (augment !== false) {
            jsdoc.augment.augmentAll(doclets);
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
        const dict = new jsdoc.tag.dictionary.Dictionary();
        const originalDictionaries = jsdoc.env.conf.tags.dictionaries.slice(0);

        if (!Array.isArray(dictionaryNames)) {
            dictionaryNames = [dictionaryNames];
        }

        jsdoc.env.conf.tags.dictionaries = dictionaryNames;

        jsdoc.tag.definitions.defineTags(dict);
        jsdoc.doclet._replaceDictionary(dict);

        jsdoc.env.conf.tags.dictionaries = originalDictionaries;
    },
    restoreTagDictionary: () => {
        jsdoc.doclet._replaceDictionary(originalDictionary);
    }
};

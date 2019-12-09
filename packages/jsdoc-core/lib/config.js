/**
 * Manages configuration settings for JSDoc.
 *
 * @alias module:@jsdoc/core.config
 */

const _ = require('lodash');
const { cosmiconfigSync, defaultLoaders } = require('cosmiconfig');
const stripBom = require('strip-bom');
const stripJsonComments = require('strip-json-comments');

const MODULE_NAME = 'jsdoc';

const defaults = exports.defaults = {
    // TODO(hegemonic): Integrate CLI options with other options.
    opts: {
        destination: './out',
        encoding: 'utf8'
    },
    /**
     * The JSDoc plugins to load.
     */
    plugins: [],
    // TODO(hegemonic): Move to `source` or remove.
    recurseDepth: 10,
    /**
     * Settings for loading and parsing source files.
     */
    source: {
        /**
         * A regular expression that matches source files to exclude from processing.
         *
         * To exclude files if any portion of their path begins with an underscore, use the value
         * `(^|\\/|\\\\)_`.
         */
        excludePattern: '',
        /**
         * A regular expression that matches source files that JSDoc should process.
         *
         * By default, all source files with the extensions `.js`, `.jsdoc`, and `.jsx` are
         * processed.
         */
        includePattern: '.+\\.js(doc|x)?$',
        /**
         * The type of source file. In general, you should use the value `module`. If none of your
         * source files use ECMAScript >=2015 syntax, you can use the value `script`.
         */
        type: 'module'
    },
    /**
     * Settings for interpreting JSDoc tags.
     */
    tags: {
        /**
         * Set to `true` to allow tags that JSDoc does not recognize.
         */
        allowUnknownTags: true,
        // TODO(hegemonic): Use module paths, not magic strings.
        /**
         * The JSDoc tag dictionaries to load.
         *
         * If you specify two or more tag dictionaries, and a tag is defined in multiple
         * dictionaries, JSDoc uses the definition from the first dictionary that includes that tag.
         */
        dictionaries: [
            'jsdoc',
            'closure'
        ]
    },
    /**
     * Settings for generating output with JSDoc templates. Some JSDoc templates might ignore these
     * settings.
     */
    templates: {
        /**
         * Set to `true` to use a monospaced font for links to other code symbols, but not links to
         * websites.
         */
        cleverLinks: false,
        /**
         * Set to `true` to use a monospaced font for all links.
         */
        monospaceLinks: false
    }
};

// TODO: Consider exporting this class.
class Config {
    constructor(filepath, config) {
        this.config = config;
        this.filepath = filepath;
    }
}

function loadJson(filepath, content) {
    return defaultLoaders['.json'](filepath, stripBom(stripJsonComments(content)));
}

function loadYaml(filepath, content) {
    return defaultLoaders['.yaml'](filepath, stripBom(content));
}

const explorerSync = cosmiconfigSync(MODULE_NAME, {
    cache: false,
    loaders: {
        '.json': loadJson,
        '.yaml': loadYaml,
        '.yml': loadYaml,
        noExt: loadYaml
    },
    searchPlaces: [
        'package.json',
        `.${MODULE_NAME}rc`,
        `.${MODULE_NAME}rc.json`,
        `.${MODULE_NAME}rc.yaml`,
        `.${MODULE_NAME}rc.yml`,
        `.${MODULE_NAME}rc.js`,
        `${MODULE_NAME}.config.js`
    ]
});

exports.loadSync = (filepath) => {
    let loaded;

    if (filepath) {
        loaded = explorerSync.load(filepath);
    } else {
        loaded = explorerSync.search() || {};
    }

    return new Config(
        loaded.filepath,
        _.defaultsDeep({}, loaded.config, defaults)
    );
};

/**
 * The default configuration settings for JSDoc.
 *
 * @module @jsdoc/config/lib/defaults
 */

module.exports = {
    // TODO(hegemonic): integrate CLI options with other options
    opts: {
        access: ['package', 'protected', 'public', 'undefined'],
        destination: './out',
        encoding: 'utf8'
    },
    /**
     * The JSDoc plugins to load.
     */
    plugins: [],
    // TODO(hegemonic): move to `source` or remove
    recurseDepth: 10,
    // TODO(hegemonic): switch to glob patterns
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
        // TODO(hegemonic): use module paths, not magic strings
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
     * Settings for generating output with JSDoc templates.
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

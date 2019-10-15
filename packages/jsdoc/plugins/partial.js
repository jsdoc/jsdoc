/**
 * Adds support for reusable partial JSDoc files.
 *
 * @module plugins/partial
 */
const env = require('jsdoc/env');
const fs = require('jsdoc/fs');
const path = require('path');

exports.handlers = {
    /**
     * Include a partial JSDoc.
     *
     * @param {*} e - The event fired before parsing.
     * @param {string} e.filename - The name of the file about to be parsed.
     * @param {string} e.source - The contents of `e.filename`.
     * @example
     *  ```
     *  @partial "partial_doc.jsdoc"
     *  ```
     */
    beforeParse(e) {
        e.source = e.source.replace(/(@partial ".*")+/g, $ => {
            const pathArg = $.match(/".*"/)[0].replace(/"/g, '');
            const fullPath = path.join(e.filename, '..', pathArg);

            const partialData = fs.readFileSync(fullPath, env.opts.encoding);

            return partialData;
        });
    }
};

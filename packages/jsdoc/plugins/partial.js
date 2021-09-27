/**
 * Adds support for reusable partial jsdoc files.
 *
 * @module plugins/partial
 */
const fs = require('fs');
const path = require('path');

exports.handlers = {
  /**
   * Include a partial jsdoc
   *
   * @param e
   * @param e.filename
   * @param e.source
   * @param e.deps
   * @example
   *     @partial "partial_doc.jsdoc"
   */
  beforeParse(e, deps) {
    const options = deps.get('options');

    e.source = e.source.replace(/(@partial ".*")+/g, ($) => {
      const pathArg = $.match(/".*"/)[0].replace(/"/g, '');
      const fullPath = path.join(e.filename, '..', pathArg);

      const partialData = fs.readFileSync(fullPath, options.encoding);

      return partialData;
    });
  },
};

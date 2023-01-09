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

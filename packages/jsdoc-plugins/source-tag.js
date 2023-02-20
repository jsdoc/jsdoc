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
const { log } = require('@jsdoc/util');

exports.handlers = {
  /**
   * Support @source tag. Expected value like:
   *
   *     { "filename": "myfile.js", "lineno": 123 }
   *
   * Modifies the corresponding meta values on the given doclet.
   *
   * WARNING: If you are using a JSDoc template that generates pretty-printed source files,
   * such as JSDoc's default template, this plugin can cause JSDoc to crash. To fix this issue,
   * update your template settings to disable pretty-printed source files.
   *
   * @source { "filename": "sourcetag.js", "lineno": 9 }
   */
  newDoclet({ doclet }) {
    let tags = doclet.tags;
    let tag;
    let value;

    // any user-defined tags in this doclet?
    if (typeof tags !== 'undefined') {
      // only interested in the @source tags
      tags = tags.filter(({ title }) => title === 'source');

      if (tags.length) {
        // take the first one
        tag = tags[0];

        try {
          value = JSON.parse(tag.value);
        } catch (ex) {
          log.error(
            '@source tag expects a valid JSON value, like ' +
              '{ "filename": "myfile.js", "lineno": 123 }.'
          );

          return;
        }

        doclet.meta = doclet.meta || {};
        doclet.meta.filename = value.filename || '';
        doclet.meta.lineno = value.lineno || '';
      }
    }
  },
};

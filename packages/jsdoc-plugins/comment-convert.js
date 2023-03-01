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
/**
 * Demonstrate how to modify the source code before the parser sees it.
 *
 * @module @jsdoc/plugins/comment-convert
 */
/* eslint-disable spaced-comment */
/** @alias module:@jsdoc/plugins/comment-convert.handlers */
export const handlers = {
  ///
  /// Convert ///-style comments into jsdoc comments.
  /// @param e
  /// @param e.filename
  /// @param e.source
  /// @memberof module:@jsdoc/plugins/comment-convert.handlers
  ///
  beforeParse(e) {
    e.source = e.source.replace(/(\n[ \t]*\/\/\/[^\n]*)+/g, ($) => {
      const replacement = `\n/**${$.replace(/^[ \t]*\/\/\//gm, '').replace(/(\n$|$)/, '*/$1')}`;

      return replacement;
    });
  },
};

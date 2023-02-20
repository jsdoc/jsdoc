/*
  Copyright 2013 the JSDoc Authors.

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
 * Remove everything in a file except JSDoc-style comments. By enabling this plugin, you can
 * document source files that are not valid JavaScript, including source files for other languages.
 */
exports.handlers = {
  beforeParse(e) {
    // a JSDoc comment looks like: /**[one or more chars]*/
    const comments = e.source.match(/\/\*\*[\s\S]+?\*\//g);

    if (comments) {
      e.source = comments.join('\n\n');
    } else {
      e.source = ''; // If file has no comments, parser should still receive no code
    }
  },
};

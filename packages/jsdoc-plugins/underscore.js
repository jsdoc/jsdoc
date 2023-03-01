/*
  Copyright 2014 the JSDoc Authors.

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
 * Removes all symbols that begin with an underscore from the doc output. If
 * you're using underscores to denote private variables in modules, this
 * automatically hides them.
 */

export const handlers = {
  newDoclet({ doclet }) {
    // Ignore comment blocks for all symbols that begin with underscore
    if (doclet.name.charAt(0) === '_' || doclet.name.substr(0, 6) === 'this._') {
      doclet.access = 'private';
    }
  },
};

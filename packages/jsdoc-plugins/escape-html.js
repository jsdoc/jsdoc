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
 * Escape HTML tags in descriptions.
 */
export const handlers = {
  /**
   * Translate HTML tags in descriptions into safe entities. Replaces <, & and newlines
   */
  newDoclet({ doclet }) {
    if (doclet.description) {
      doclet.description = doclet.description
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/\r\n|\n|\r/g, '<br>');
    }
  },
};

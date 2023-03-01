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
 * This plugin creates a summary tag, if missing, from the first sentence in the description.
 */
export const handlers = {
  /**
   * Autogenerate summaries, if missing, from the description, if present.
   */
  newDoclet({ doclet }) {
    let endTag;
    let tags;
    let stack;

    // If the summary is missing, grab the first sentence from the description
    // and use that.
    if (doclet && !doclet.summary && doclet.description) {
      // The summary may end with `.$`, `. `, or `.<` (a period followed by an HTML tag).
      doclet.summary = doclet.description.split(/\.$|\.\s|\.</)[0];
      // Append `.` as it was removed in both cases, or is possibly missing.
      doclet.summary += '.';

      // This is an excerpt of something that is possibly HTML.
      // Balance it using a stack. Assume it was initially balanced.
      tags = doclet.summary.match(/<[^>]+>/g) || [];
      stack = [];

      tags.forEach((tag) => {
        const idx = tag.indexOf('/');

        if (idx === -1) {
          // start tag -- push onto the stack
          stack.push(tag);
        } else if (idx === 1) {
          // end tag -- pop off of the stack
          stack.pop();
        }

        // otherwise, it's a self-closing tag; don't modify the stack
      });

      // stack should now contain only the start tags that lack end tags,
      // with the most deeply nested start tag at the top
      while (stack.length > 0) {
        // pop the unmatched tag off the stack
        endTag = stack.pop();
        // get just the tag name
        endTag = endTag.substring(1, endTag.search(/[ >]/));
        // append the end tag
        doclet.summary += `</${endTag}>`;
      }

      // and, finally, if the summary starts and ends with a <p> tag, remove it; let the
      // template decide whether to wrap the summary in a <p> tag
      doclet.summary = doclet.summary.replace(/^<p>(.*)<\/p>$/i, '$1');
    }
  },
};

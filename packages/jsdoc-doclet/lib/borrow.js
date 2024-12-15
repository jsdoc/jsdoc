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
 * Functions that resolve `@borrows` tags in JSDoc comments.
 */

import { SCOPE } from '@jsdoc/name';

import { combineDoclets, Doclet } from './doclet.js';

function cloneBorrowedDoclets({ borrowed, longname }, docletStore) {
  borrowed?.forEach(({ from, as }) => {
    const borrowedDoclets = docletStore.docletsByLongname.get(from);
    let borrowedAs = as || from;
    let parts;
    let scopePunc;

    if (borrowedDoclets) {
      borrowedAs = borrowedAs.replace(/^prototype\./, SCOPE.PUNC.INSTANCE);
      borrowedDoclets.forEach((borrowedDoclet) => {
        const clone = combineDoclets(borrowedDoclet, Doclet.emptyDoclet(borrowedDoclet.env));

        // TODO: this will fail on longnames like '"Foo#bar".baz'
        parts = borrowedAs.split(SCOPE.PUNC.INSTANCE);

        if (parts.length === 2) {
          clone.scope = SCOPE.NAMES.INSTANCE;
          scopePunc = SCOPE.PUNC.INSTANCE;
        } else {
          clone.scope = SCOPE.NAMES.STATIC;
          scopePunc = SCOPE.PUNC.STATIC;
        }

        clone.name = parts.pop();
        clone.memberof = longname;
        clone.longname = clone.memberof + scopePunc + clone.name;
        docletStore.add(clone);
      });
    }
  });
}

/**
  Take a copy of the docs for borrowed symbols and attach them to the
  docs for the borrowing symbol. This process changes the symbols involved,
  moving docs from the "borrowed" array and into the general docs, then
  deleting the "borrowed" array.
 */
export function resolveBorrows(docletStore) {
  for (const doclet of docletStore.docletsWithBorrowed) {
    cloneBorrowedDoclets(doclet, docletStore);
    doclet.borrowed = undefined;
  }
}

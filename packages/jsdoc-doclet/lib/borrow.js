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
import { name } from '@jsdoc/core';
import _ from 'lodash';

const { SCOPE } = name;

function cloneBorrowedDoclets({ borrowed, longname }, doclets) {
  borrowed.forEach(({ from, as }) => {
    const borrowedDoclets = doclets.index.longname[from];
    let borrowedAs = as || from;
    let parts;
    let scopePunc;

    if (borrowedDoclets) {
      borrowedAs = borrowedAs.replace(/^prototype\./, SCOPE.PUNC.INSTANCE);
      _.cloneDeep(borrowedDoclets).forEach((clone) => {
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
        doclets.push(clone);
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
export function resolveBorrows(doclets) {
  for (let doclet of doclets.index.borrowed) {
    cloneBorrowedDoclets(doclet, doclets);
    delete doclet.borrowed;
  }

  doclets.index.borrowed = [];
}

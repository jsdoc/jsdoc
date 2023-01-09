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
function filterUndocumented({ undocumented }) {
  return !undocumented;
}

describe('@borrows tag', () => {
  it('When a symbol has a @borrows-as tag, that is added to the symbol\'s "borrowed" property.', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/borrowstag.js');
    const util = docSet.getByLongname('util').filter(filterUndocumented)[0];

    expect(util.borrowed).toBeArrayOfSize(1);
    expect(util.borrowed[0].from).toBe('trstr');
    expect(util.borrowed[0].as).toBe('trim');
  });

  it('When a symbol has a @borrows tag, the borrowed symbol is added to the symbol.', () => {
    const borrow = require('jsdoc/borrow');
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/borrowstag2.js');

    borrow.resolveBorrows(docSet.doclets);

    const strRtrim = docSet
      .getByLongname('str.rtrim')
      .filter(({ undocumented }) => !undocumented)[0];

    expect(strRtrim).toBeObject();
  });

  it('When a symbol has a `@borrows X as Y` tag, X and Y may contain whitespace.', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/borrowstag3.js');
    const util = docSet.getByLongname('util').filter(filterUndocumented)[0];

    expect(util.borrowed).toBeArrayOfSize(2);
    expect(util.borrowed[0].from).toBe('trstr');
    expect(util.borrowed[0].as).toBe('trim string');
    expect(util.borrowed[1].from).toBe('util.hidden util');
    expect(util.borrowed[1].as).toBe('hidden');
  });
});

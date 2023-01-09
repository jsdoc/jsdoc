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
describe('@example tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/exampletag.js');
  const doc = docSet.getByLongname('x')[0];
  const doc2 = docSet.getByLongname('y')[0];
  const txtRegExp = /console\.log\("foo"\);[\r\n]{1,2}console\.log\("bar"\)/;
  const txt2RegExp = /<caption>Example 2<\/caption>[\r\n]{1,2}1 \+ 2;/;

  it("creates an 'examples' property on the doclet with the example", () => {
    expect(doc.examples).toBeArrayOfSize(1);
    expect(doc.examples).toMatch(txtRegExp);
  });

  it('can be specified multiple times on one doclet', () => {
    expect(doc2.examples).toBeArrayOfSize(2);
    expect(doc2.examples).toMatch(txtRegExp);
    expect(doc2.examples).toMatch(txt2RegExp);
  });
});

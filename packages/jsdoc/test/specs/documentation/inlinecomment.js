/*
  Copyright 2012 the JSDoc Authors.

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
describe('inline comments', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/inlinecomment.js');
  const t = docSet.getByLongname('test');
  const t2 = docSet.getByLongname('test2');

  it(
    'When there is an inline comment on a line ending with no semicolon, ' +
      'that comment and the next comment are still captured',
    () => {
      // Inline comment on line without semicolon is captured
      expect(t).toBeArrayOfSize(1);
      // Inline comment on line after line without semicolon is captured
      expect(t2).toBeArrayOfSize(1);
    }
  );
});

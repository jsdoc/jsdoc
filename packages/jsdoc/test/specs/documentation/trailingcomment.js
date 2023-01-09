/*
  Copyright 2017 the JSDoc Authors.

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
describe('trailing comment', () => {
  it(
    'should not ignore trailing comments in a non-empty source file with a `use strict` ' +
      'declaration',
    () => {
      const docSet = jsdoc.getDocSetFromFile('test/fixtures/trailingcomment.js');
      const foo = docSet.getByLongname('external:foo');

      expect(foo).toBeArrayOfSize(1);
    }
  );

  it(
    'should not ignore trailing comments in an empty source file with a `use strict` ' +
      'declaration',
    () => {
      const docSet = jsdoc.getDocSetFromFile('test/fixtures/trailingcomment2.js');
      const foo = docSet.getByLongname('external:foo');

      expect(foo).toBeArrayOfSize(1);
    }
  );
});

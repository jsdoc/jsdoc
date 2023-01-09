/*
  Copyright 2015 the JSDoc Authors.

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
describe('longnames with special characters', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/specialchars.js');
  const portNumber = docSet.getByLongname("Socket#'port#number'")[0];
  const open = docSet.getByLongname("Socket#'open~a.connection#now'")[0];

  it(
    'should use the correct longname for instance members of "this" whose names contain ' +
      'scope punctuation',
    () => {
      expect(portNumber).toBeObject();
    }
  );

  it(
    'should use the correct longname for instance members of the prototype whose names ' +
      'contain scope punctuation',
    () => {
      expect(open).toBeObject();
    }
  );
});

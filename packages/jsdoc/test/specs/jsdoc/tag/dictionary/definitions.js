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
describe('jsdoc/tag/dictionary/definitions', () => {
  const definitions = require('jsdoc/tag/dictionary/definitions');

  it('has a baseTags object', () => {
    expect(definitions.baseTags).toBeObject();
  });

  it('has a closureTags object', () => {
    expect(definitions.closureTags).toBeObject();
  });

  it('has an internalTags object', () => {
    expect(definitions.internalTags).toBeObject();
  });

  it('has a jsdocTags object', () => {
    expect(definitions.jsdocTags).toBeObject();
  });

  // Nothing to test in these objects except which tags are listed, which would duplicate the code.
});

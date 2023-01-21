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
describe('@jsdoc/tag/lib/definitions', () => {
  const definitions = require('../../../lib/definitions');

  it('has a `closure` object', () => {
    expect(definitions.closure).toBeObject();
  });

  it('has a `core` object', () => {
    expect(definitions.core).toBeObject();
  });

  it('has an `internal` object', () => {
    expect(definitions.internal).toBeObject();
  });

  it('has a `jsdoc` object', () => {
    expect(definitions.jsdoc).toBeObject();
  });

  // For additional tests, see packages/jsdoc/test/specs/tags/.
});

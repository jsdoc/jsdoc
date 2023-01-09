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
describe('@modifies tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/modifiestag.js');
  const mutator = docSet.getByLongname('mutator')[0];

  it("should add the specified types to the doclet's `modifies` property", () => {
    expect(mutator.modifies).toBeArrayOfSize(1);
    expect(mutator.modifies[0].type).toBeObject();
    expect(mutator.modifies[0].type.names).toBeArrayOfSize(2);
    expect(mutator.modifies[0].type.names[0]).toBe('foo');
    expect(mutator.modifies[0].type.names[1]).toBe('bar');
  });
});

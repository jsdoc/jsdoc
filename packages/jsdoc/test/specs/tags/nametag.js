/*
  Copyright 2014 the JSDoc Authors.

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
describe('@name tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/nametag.js');
  const view = docSet.getByLongname('View')[0];
  const controller = docSet.getByLongname('Controller')[0];
  const addToParent = docSet.getByLongname('MvcHelpers~addToParent')[0];

  it('applies the specified name to the doclet', () => {
    expect(view).toBeObject();
  });

  it('uses the name in the @name tag, ignoring the name in the code', () => {
    expect(controller).toBeObject();
  });

  it("sets the doclet's scope to `global` by default", () => {
    expect(view.scope).toBe('global');
    expect(controller.scope).toBe('global');
  });

  it('uses the specified scope if one is provided', () => {
    expect(addToParent).toBeObject();
    expect(addToParent.scope).toBe('inner');
  });
});

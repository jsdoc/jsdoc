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
describe('@lends tag', () => {
  // see also specs/documentation/lends.js for tests on @lends behaviour.
  const { Doclet } = require('@jsdoc/doclet');

  const doc = new Doclet('/** @lends */', {}, jsdoc.deps);
  const doc2 = new Doclet('/** @lends MyClass# */', {}, jsdoc.deps);

  it("sets the doclet's 'alias' property to the tag value or <global>", () => {
    expect(doc.alias).toBe('<global>');
    expect(doc2.alias).toBe('MyClass#');
  });

  it("sets the doclet's 'undocumented' property to 'true'", () => {
    expect(doc.undocumented).toBeTrue();
    expect(doc2.undocumented).toBeTrue();
  });
});

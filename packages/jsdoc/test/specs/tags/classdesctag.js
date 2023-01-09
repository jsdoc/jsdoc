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
describe('@classdesc tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/classdesctag.js');
  const foo = docSet.getByLongname('Foo')[0];
  const bar = docSet.getByLongname('Bar')[0];
  const baz = docSet.getByLongname('Baz')[0];

  it('should add a classdesc property to the doclet with the description', () => {
    expect(foo.classdesc).toBe('A description of the class.');
  });

  it('should work when the @class and @constructor tags are also present, and @class has a value', () => {
    expect(bar.classdesc).toBe('A description of the class.');
  });

  it('should infer that a description after the @class tag is a classdesc if no @classdesc tag is present', () => {
    expect(baz.classdesc).toBe('Description of the Baz class.');
  });
});

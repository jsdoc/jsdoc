/*
  Copyright 2011 the JSDoc Authors.

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
describe('@access tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/accesstag.js');
  const foo = docSet.getByLongname('Thingy~foo')[0];
  const _bar = docSet.getByLongname('Thingy#_bar')[0];
  const _gnu = docSet.getByLongname('Thingy#_gnu')[0];
  const pez = docSet.getByLongname('Thingy#pez')[0];
  const foo2 = docSet.getByLongname('OtherThingy~foo')[0];
  const _bar2 = docSet.getByLongname('OtherThingy#_bar')[0];
  const _gnu2 = docSet.getByLongname('OtherThingy#_gnu')[0];
  const pez2 = docSet.getByLongname('OtherThingy#pez')[0];

  it("should set the doclet's 'access' property to 'private' when there is an @access private tag", () => {
    expect(foo.access).toBe('private');
    expect(foo2.access).toBe('private');
  });

  it("should set the doclet's 'access' property to 'protected' when there is an @access protected tag", () => {
    expect(_bar.access).toBe('protected');
    expect(_bar2.access).toBe('protected');
  });

  it("should set the doclet's 'access' property to 'public' when there is an @access public tag", () => {
    expect(_gnu.access).toBe('public');
    expect(_gnu2.access).toBe('public');
  });

  it("should set no 'access' property on the doclet when there is no @access tag", () => {
    expect(pez.access).toBeUndefined();
    expect(pez2.access).toBeUndefined();
  });
});

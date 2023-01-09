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
describe('@namespace tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/namespacetag.js');
  const x = docSet.getByLongname('x')[0];
  const Foo = docSet.getByLongname('Foo')[0];
  const Bar = docSet.getByLongname('Bar')[0];
  const Socket = docSet.getByLongname('S.Socket')[0];

  it("sets the doclet's kind to 'namespace'", () => {
    expect(x.kind).toBe('namespace');
    expect(Foo.kind).toBe('namespace');
    expect(Bar.kind).toBe('namespace');
  });

  it("sets the doclet's name to the tag value (if provided)", () => {
    expect(x.name).toBe('x');
    expect(Foo.name).toBe('Foo');
    expect(Bar.name).toBe('Bar');
  });

  it("sets the doclet's type (if provided in @namespace)", () => {
    expect(Bar.type.names).toBeArrayOfSize(1);
    expect(Bar.type.names[0]).toBe('function');
  });

  it("sets the doclet's longname correctly when the namespace is a substring of the name", () => {
    expect(Socket).toBeObject();
    expect(Socket.name).toBe('Socket');
  });
});

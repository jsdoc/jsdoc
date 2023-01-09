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
describe('@constant tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/constanttag.js');
  const FOO = docSet.getByLongname('FOO')[0];
  const BAR = docSet.getByLongname('BAR')[0];
  const BAZ = docSet.getByLongname('BAZ')[0];
  const QUX = docSet.getByLongname('QUX')[0];
  const SOCKET = docSet.getByLongname('SOCKET')[0];
  const ROCKET = docSet.getByLongname('ROCKET')[0];

  it("sets the doclet's 'kind' property to 'constant'", () => {
    expect(FOO).toBeObject();
    expect(FOO.kind).toBe('constant');

    expect(BAR).toBeObject();
    expect(BAR.kind).toBe('constant');

    expect(BAZ).toBeObject();
    expect(BAZ.kind).toBe('constant');

    expect(QUX).toBeObject();
    expect(QUX.kind).toBe('constant');

    expect(SOCKET).toBeObject();
    expect(SOCKET.kind).toBe('constant');

    expect(ROCKET).toBeObject();
    expect(ROCKET.kind).toBe('constant');
  });

  it('If used as a standalone, takes the name from the code', () => {
    expect(FOO.name).toBe('FOO');
  });

  it("If used with just a name, sets the doclet's name to that", () => {
    expect(BAR.name).toBe('BAR');
  });

  it("If used with a name and a type, sets the doclet's name and type appropriately", () => {
    expect(BAZ.name).toBe('BAZ');
    expect(BAZ.type).toBeObject();
    expect(BAZ.type.names).toBeArrayOfSize(1);
    expect(BAZ.type.names[0]).toBe('string');
  });

  it('If used with just a type, adds the type and takes the name from the code', () => {
    expect(QUX.name).toBe('QUX');
    expect(QUX.type).toBeObject();
    expect(QUX.type.names).toBeArrayOfSize(1);
    expect(QUX.type.names[0]).toBe('number');
  });

  it('If used with a name and type, ignores the name in the code', () => {
    expect(SOCKET.name).toBe('SOCKET');
    expect(SOCKET.type).toBeObject();
    expect(SOCKET.type.names).toBeArrayOfSize(1);
    expect(SOCKET.type.names[0]).toBe('Object');
  });

  it('If used with just a name, ignores the name in the code', () => {
    expect(ROCKET.name).toBe('ROCKET');
  });
});

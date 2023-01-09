/*
  Copyright 2012 the JSDoc Authors.

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
describe('documenting symbols with special names', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/specialnames.js');
  const construct = docSet.getByLongname('constructor')[0];
  const constructToString = docSet.getByLongname('constructor.toString')[0];
  const hasOwnProp = docSet.getByLongname('hasOwnProperty')[0];
  const proto = docSet.getByLongname('prototype')[0];
  const protoValueOf = docSet.getByLongname('prototype.valueOf')[0];

  it('When a symbol is named "constructor", the symbol should appear in the docs.', () => {
    expect(construct).toBeObject();
  });

  it('When a symbol is named "constructor", its members are resolved correctly.', () => {
    expect(constructToString).toBeObject();
  });

  it('When a symbol is named "hasOwnProperty," the symbol should appear in the docs.', () => {
    expect(hasOwnProp).toBeObject();
  });

  it('When a symbol is named "prototype", the symbol should appear in the docs.', () => {
    expect(proto).toBeObject();
  });

  it('When a symbol is named "prototype", its members are resolved correctly.', () => {
    expect(protoValueOf).toBeObject();
  });
});

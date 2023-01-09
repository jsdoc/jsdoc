/*
  Copyright 2020 the JSDoc Authors.

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
const options = jsdoc.deps.get('options');

describe('multiple @param tags with the same type expression', () => {
  const debug = Boolean(options.debug);

  afterEach(() => {
    options.debug = debug;
  });

  it('does not have circular references when type.parsedType is enumerable', () => {
    let docSet;
    let params;
    let stringified;

    // Force type.parsedType to be enumerable.
    options.debug = true;
    docSet = jsdoc.getDocSetFromFile('test/fixtures/paramtagsametype.js');
    params = docSet.getByLongname('foo.bar.Baz').filter((d) => !d.undocumented)[0].params;
    stringified = JSON.stringify(params);

    expect(stringified).toContain('"parsedType":');
    expect(stringified).not.toContain('<CircularRef>');

    // Prevent the schema validator from complaining about `parsedType`. (The schema _should_
    // allow that property, but for some reason, that doesn't work correctly.)
    params.forEach((p) => delete p.type.parsedType);
  });
});

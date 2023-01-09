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
describe('callback tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/callbacktag.js');

  function callbackTests(callback) {
    expect(callback).toBeObject();

    expect(callback.type).toBeObject();

    expect(callback.type.names).toBeArrayOfSize(1);

    expect(callback.type.names[0]).toBe('function');
  }

  it('correctly handles callbacks that do not define a {type}', () => {
    const callback = docSet.getByLongname('requestResponseCallback')[0];

    callbackTests(callback);
  });

  it('correctly handles callbacks that define an incorrect {type}', () => {
    const callback = docSet.getByLongname('wrongTypeCallback')[0];

    callbackTests(callback);
  });
});

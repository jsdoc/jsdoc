/*
  Copyright 2015 the JSDoc Authors.

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
describe('rest parameters', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/restparams.js');
  const setAdmins = docSet.getByLongname('setAdmins')[0];
  const setManagers = docSet.getByLongname('setManagers')[0];
  const setWidgetAccess = docSet.getByLongname('setWidgetAccess')[0];

  it('should automatically mark standalone rest parameters as repeatable', () => {
    const restParam = setAdmins.params[0];

    expect(restParam.name).toBe('users');
    expect(restParam.variable).toBeTrue();
  });

  it('should automatically mark rest parameters as repeatable when they are mixed with other params', () => {
    const restParam = setWidgetAccess.params[1];

    expect(restParam.name).toBe('users');
    expect(restParam.variable).toBeTrue();
  });

  it('should automatically mark rest parameters as repeatable when the function is assigned to a variable', () => {
    const restParam = setManagers.params[0];

    expect(restParam.name).toBe('users');
    expect(restParam.variable).toBeTrue();
  });

  describe('ES2015 methods', () => {
    const docSet2 = jsdoc.getDocSetFromFile('test/fixtures/restparams2.js');
    const addUsers = docSet2.getByLongname('Widget#addUsers')[0];

    it('should autodetect rest parameters', () => {
      expect(addUsers.params[0].variable).toBeTrue();
    });
  });
});

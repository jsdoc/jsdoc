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
describe('function expressions', () => {
  function checkLongnames(docSet, namespace) {
    const memberName = `${namespace || ''}Foo#member1`;
    const variableName = `${namespace || ''}Foo~var1`;
    const fooMember = docSet.getByLongname(memberName)[0];
    const fooVariable = docSet.getByLongname(variableName)[0];

    it('should assign the correct longname to members of a function expression', () => {
      expect(fooMember.longname).toBe(memberName);
    });

    it('should assign the correct longname to variables in a function expression', () => {
      expect(fooVariable.longname).toBe(variableName);
    });
  }

  describe('standard', () => {
    checkLongnames(jsdoc.getDocSetFromFile('test/fixtures/funcExpression.js'));
  });

  describe('global', () => {
    checkLongnames(jsdoc.getDocSetFromFile('test/fixtures/funcExpression2.js'));
  });

  describe('as object literal property', () => {
    checkLongnames(jsdoc.getDocSetFromFile('test/fixtures/funcExpression3.js'), 'ns.');
  });
});

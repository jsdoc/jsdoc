/*
  Copyright 2014 the JSDoc Authors.

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
describe('@implements tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/interface-implements.js');

  const myTester = docSet.getByLongname('MyTester')[0];
  const beforeEachMethod = docSet.getByLongname('MyTester#beforeEach')[0];
  const itMethod = docSet
    .getByLongname('MyTester#it')
    .filter(({ undocumented }) => !undocumented)[0];
  const processMethod = docSet.getByLongname('MyWorker#process')[0];

  it('MyTester has an "implements" array', () => {
    expect(myTester.implements).toBeArrayOfSize(1);
    expect(myTester.implements[0]).toBe('ITester');
  });

  it('beforeEach has an "implements" array', () => {
    expect(beforeEachMethod.implements).toBeArrayOfSize(1);
    expect(beforeEachMethod.implements[0]).toBe('ITester#beforeEach');
  });

  it('MyTester#it inherits the docs from ITester#it', () => {
    expect(itMethod.description).toBe('it method.');
  });

  it("MyWorker's process() method does not implement an interface", () => {
    expect(processMethod.implements).toBeUndefined();
  });

  it('MyIncompleteWorker does not have any methods', () => {
    expect(docSet.getByLongname('MyIncompleteWorker#work')).toBeEmptyArray();
  });
});

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
describe('@abstract tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/abstracttag.js');
  const thingy = docSet.getByLongname('Thingy')[0];
  const thingyPez = docSet.getByLongname('Thingy#pez')[0];
  const otherThingyPez = docSet.getByLongname('OtherThingy#pez')[0];

  it('should have an undefined "virtual" property with no "@abstract" tag', () => {
    expect(thingy.virtual).toBeUndefined();
  });

  it('should set the doclet\'s "virtual" property to true when "@abstract" tag is present', () => {
    expect(thingyPez.virtual).toBeTrue();
    expect(otherThingyPez.virtual).toBeTrue();
  });
});

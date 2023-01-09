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
describe('variations by name', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/variations.js');
  const fadein1 = docSet.getByLongname('anim.fadein(1)')[0];
  const fadein2 = docSet.getByLongname('anim.fadein(2)')[0];

  it('When a symbol has a name with a variation, the doclet has a variation property.', () => {
    expect(fadein1.variation).toBe('1');
    expect(fadein2.variation).toBe('2');
  });

  it('When a symbol has a name with a variation in the name, the doclet name has no variation in it.', () => {
    expect(fadein1.name).toBe('fadein');
    expect(fadein2.name).toBe('fadein');
  });

  it('When a symbol has a name with a variation in the name, the doclet longname has the variation in it.', () => {
    expect(fadein1.longname).toBe('anim.fadein(1)');
    expect(fadein2.longname).toBe('anim.fadein(2)');
  });
});

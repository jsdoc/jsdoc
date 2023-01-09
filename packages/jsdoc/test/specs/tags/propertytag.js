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
describe('@property tag', () => {
  it('When a symbol has a @property tag, the property appears in the doclet.', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/propertytag.js');
    const myobject = docSet.getByLongname('myobject')[0];

    expect(myobject.properties).toBeArrayOfSize(4);

    expect(myobject.properties[0].name).toBe('id');
    expect(myobject.properties[1].name).toBe('defaults');
    expect(myobject.properties[2].name).toBe('defaults.a');
    expect(myobject.properties[3].name).toBe('defaults.b');

    expect(myobject.properties[0].defaultvalue).toBe('abc123');
    expect(myobject.properties[2].defaultvalue).toBe(1);

    expect(myobject.properties[1].description).toBe('The default values.');
    expect(myobject.properties[1].type.names[0]).toBe('Object');
  });

  it('When a symbol has a @property tag for a numeric property, the property appears in the doclet.', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/numericpropertytag.js');
    const numericObject = docSet.getByLongname('numericObject')[0];

    expect(numericObject.properties).toBeArrayOfSize(3);

    expect(numericObject.properties[0].name).toBe('1');
    expect(numericObject.properties[1].name).toBe('2');
    expect(numericObject.properties[2].name).toBe('3');
  });
});

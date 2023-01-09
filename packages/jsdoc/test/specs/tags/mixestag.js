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
describe('@mixes tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/mixintag.js');
  const FormButton = docSet.getByLongname('FormButton')[0];
  const MyClass = docSet.getByLongname('MyClass')[0];

  it("When a symbol has a @mixes tag, it gets an array property 'mixes' with the name of the mixin", () => {
    expect(FormButton.mixes).toBeArrayOfSize(1);
    expect(FormButton.mixes[0]).toBe('Eventful');
  });

  it('When a symbol has more than one @mixes tag, all of the mixins are added', () => {
    expect(MyClass.mixes).toBeArrayOfSize(2);
    expect(MyClass.mixes).toContain('Eventful');
    expect(MyClass.mixes).toContain('AnotherMixin');
  });
});

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
describe('@requires tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/requirestag.js');
  const foo = docSet.getByLongname('foo')[0];
  const bar = docSet.getByLongname('bar')[0];
  const baz = docSet.getByLongname('baz')[0];

  it('When a symbol has a @requires tag, the doclet has a requires property that includes that value, with the "module:" namespace added.', () => {
    expect(foo.requires).toBeArrayOfSize(1);
    expect(foo.requires[0]).toBe('module:foo/helper');

    expect(bar.requires).toBeArrayOfSize(2);
    expect(bar.requires[0]).toBe('module:foo');
    expect(bar.requires[1]).toBe('module:Pez#blat');
  });

  it('When a symbol has a @requires tag whose value is an inline {@link} tag, the doclet has a requires property that includes that tag without modification.', () => {
    expect(baz.requires).toBeArrayOfSize(3);
    expect(baz.requires[0]).toBe('{@link module:zest}');
    expect(baz.requires[1]).toBe('{@linkplain module:zing}');
    // by design, we don't validate the tag name, as long as it starts with @link
    expect(baz.requires[2]).toBe('{@linkstupid module:pizzazz}');
  });
});

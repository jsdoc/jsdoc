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
describe('@kind tag with type', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/typekind.js');
  const blog = docSet.getByLongname('module:blog/server')[0];
  const port = docSet.getByLongname('module:blog/server.port')[0];

  it('When a module symbol has an kind tag, that includes a {type} clause, the doclet has a type property set to that {type} clause', () => {
    expect(blog.type).toBeObject();
    expect(blog.type.names.join(', ')).toBe('ConnectServer');
  });

  it('When a property symbol has an kind tag, that includes a {type} clause, the doclet has a type property set to that {type} clause', () => {
    expect(port.type).toBeObject();
    expect(port.type.names.join(', ')).toBe('number');
  });
});

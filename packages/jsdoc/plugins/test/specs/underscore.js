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
/* global jsdoc */
describe('underscore plugin', () => {
  const path = require('path');

  let docSet;
  const parser = jsdoc.createParser();
  const pluginPath = path.resolve(__dirname, '../../underscore.js');

  require('jsdoc/plugins').installPlugins([pluginPath], parser, jsdoc.deps);
  docSet = jsdoc.getDocSetFromFile('plugins/test/fixtures/underscore.js', parser);

  it('should not mark normal, public properties as private', () => {
    // Base line tests
    const normal = docSet.getByLongname('normal');

    expect(normal[0].access).toBeUndefined();

    const realPrivate = docSet.getByLongname('Klass#privateProp');

    expect(realPrivate[0].access).toEqual('private');
  });

  it('should hide doclet for symbols beginning with an underscore under normal circumstances', () => {
    const hidden = docSet.getByLongname('_hidden');

    expect(hidden[0].access).toEqual('private');
  });

  it('picks up "this"', () => {
    const privateUnderscore = docSet.getByLongname('Klass#_privateProp');

    expect(privateUnderscore[0].access).toEqual('private');
  });
});

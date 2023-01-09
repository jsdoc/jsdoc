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
// TODO: consolidate with specs/jsdoc/parser and specs/jsdoc/plugins
describe('plugins', () => {
  const path = require('path');

  let docSet;
  const pluginPaths = [
    path.join(__dirname, '../../fixtures/testPlugin1'),
    path.join(__dirname, '../../fixtures/testPlugin2'),
  ];

  const parser = jsdoc.createParser();

  global.jsdocPluginsTest = global.jsdocPluginsTest || {};

  require('jsdoc/plugins').installPlugins(pluginPaths, parser, jsdoc.deps);

  docSet = jsdoc.getDocSetFromFile('test/fixtures/plugins.js', parser, false);

  it("should fire the plugin's event handlers", () => {
    expect(global.jsdocPluginsTest.plugin1.fileBegin).toBeTrue();
    expect(global.jsdocPluginsTest.plugin1.beforeParse).toBeTrue();
    expect(global.jsdocPluginsTest.plugin1.jsdocCommentFound).toBeTrue();
    expect(global.jsdocPluginsTest.plugin1.symbolFound).toBeTrue();
    expect(global.jsdocPluginsTest.plugin1.newDoclet).toBeTrue();
    expect(global.jsdocPluginsTest.plugin1.fileComplete).toBeTrue();

    expect(global.jsdocPluginsTest.plugin2.fileBegin).toBeTrue();
    expect(global.jsdocPluginsTest.plugin2.beforeParse).toBeTrue();
    expect(global.jsdocPluginsTest.plugin2.jsdocCommentFound).toBeTrue();
    expect(global.jsdocPluginsTest.plugin2.symbolFound).toBeTrue();
    expect(global.jsdocPluginsTest.plugin2.newDoclet).toBeTrue();
    expect(global.jsdocPluginsTest.plugin2.fileComplete).toBeTrue();
  });

  it("should add the plugin's tag definitions to the dictionary", () => {
    const test = docSet.getByLongname('test');

    expect(test[0].longname).toBe('test');
    expect(test[0].foo).toBeTrue();
  });
});

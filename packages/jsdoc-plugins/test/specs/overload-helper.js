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

import path from 'node:path';

import { plugins } from '@jsdoc/core';

describe('overload-helper plugin', () => {
  const __dirname = jsdoc.dirname(import.meta.url);
  let docSet;
  const parser = jsdoc.createParser();
  let plugin;
  const pluginPath = path.join(__dirname, '../../overload-helper.js');

  beforeAll(async () => {
    plugin = await import(pluginPath);
    await plugins.installPlugins([pluginPath], parser, jsdoc.deps);
    docSet = jsdoc.getDocSetFromFile(
      path.resolve(__dirname, '../fixtures/overload-helper.js'),
      parser
    );
  });

  it('has a `handlers` object', () => {
    expect(plugin.handlers).toBeDefined();
    expect(typeof plugin.handlers).toBe('object');
  });

  it('has a `newDoclet` handler', () => {
    expect(plugin.handlers.newDoclet).toBeDefined();
    expect(typeof plugin.handlers.newDoclet).toBe('function');
  });

  it('has a `parseComplete` handler', () => {
    expect(plugin.handlers.parseComplete).toBeDefined();
    expect(typeof plugin.handlers.parseComplete).toBe('function');
  });

  describe('newDoclet handler', () => {
    it('does not add unique longnames to constructors', () => {
      const soup = docSet.getByLongname('Soup');
      const soup1 = docSet.getByLongname('Soup()');
      const soup2 = docSet.getByLongname('Soup(spiciness)');

      expect(soup.length).toBe(2);
      expect(soup1.length).toBe(0);
      expect(soup2.length).toBe(0);
    });

    it('adds unique longnames to methods', () => {
      const slurp = docSet.getByLongname('Soup#slurp');
      const slurp1 = docSet.getByLongname('Soup#slurp()');
      const slurp2 = docSet.getByLongname('Soup#slurp(dBA)');

      expect(slurp.length).toBe(0);
      expect(slurp1.length).toBe(1);
      expect(slurp2.length).toBe(1);
    });

    it('updates the `variation` property of the method', () => {
      const slurp1 = docSet.getByLongname('Soup#slurp()')[0];
      const slurp2 = docSet.getByLongname('Soup#slurp(dBA)')[0];

      expect(slurp1.variation).toBe('');
      expect(slurp2.variation).toBe('dBA');
    });

    it('does not add to or change existing variations that are unique', () => {
      const salt1 = docSet.getByLongname('Soup#salt');
      const salt2 = docSet.getByLongname('Soup#salt(mg)');

      expect(salt1.length).toBe(1);
      expect(salt2.length).toBe(1);
    });

    it('does not duplicate the names of existing numeric variations', () => {
      const heat1 = docSet.getByLongname('Soup#heat(1)');
      const heat2 = docSet.getByLongname('Soup#heat(2)');
      const heat3 = docSet.getByLongname('Soup#heat(3)');

      expect(heat1.length).toBe(1);
      expect(heat2.length).toBe(1);
      expect(heat3.length).toBe(1);
    });

    it('replaces identical variations with new, unique variations', () => {
      const discard1 = docSet.getByLongname('Soup#discard()');
      const discard2 = docSet.getByLongname('Soup#discard(container)');

      expect(discard1.length).toBe(1);
      expect(discard2.length).toBe(1);
    });
  });

  describe('parseComplete handler', () => {
    // disabled because on the second run, each comment is being parsed twice; who knows why...
    xit('does not retain parse results between parser runs', () => {
      parser.clear();
      docSet = jsdoc.getDocSetFromFile(
        path.resolve(__dirname, '../fixtures/overload-helper.js'),
        parser
      );
      const heat = docSet.getByLongname('Soup#heat(4)');

      expect(heat.length).toBe(0);
    });
  });
});

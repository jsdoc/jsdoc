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
/* global jsdoc */
import path from 'node:path';

import * as plugins from '../../../lib/plugins.js';

const __dirname = jsdoc.dirname(import.meta.url);

describe('@jsdoc/core/lib/plugins', () => {
  it('has an `installPlugins` method', () => {
    expect(plugins.installPlugins).toBeFunction();
  });

  describe('installPlugins', () => {
    let parser;

    const events = [
      'parseBegin',
      'fileBegin',
      'beforeParse',
      'jsdocCommentFound',
      'symbolFound',
      'newDoclet',
      'fileComplete',
      'parseComplete',
      'processingComplete',
    ];

    beforeEach(() => {
      parser = jsdoc.createParser();
    });

    it('adds event handlers to the parser', async () => {
      let pluginPath = path.resolve(__dirname, '../../fixtures/plugin-test-handlers.js');
      const { eventCounts, init } = await import(pluginPath);

      init();

      await plugins.installPlugins([pluginPath], parser, jsdoc.deps);
      jsdoc.getDocSetFromFile(
        path.resolve(__dirname, '../../fixtures/plugin-source-file.js'),
        parser
      );
      // The `processingComplete` event is triggered by code that wouldn't normally be called during
      // this test, so we trigger the event manually.
      parser.fireProcessingComplete();

      // Confirm that each type of event was emitted at least once.
      events.forEach((eventName) => {
        expect(eventCounts[eventName]).toBeGreaterThanOrEqual(1);
      });
    });

    it('adds AST node visitors to the parser', async () => {
      let pluginPath = path.resolve(__dirname, '../../fixtures/plugin-test-ast-visitor.js');
      const { nodes, init } = await import(pluginPath);

      init();

      await plugins.installPlugins([pluginPath], parser, jsdoc.deps);
      jsdoc.getDocSetFromFile(
        path.resolve(__dirname, '../../fixtures/plugin-source-file.js'),
        parser
      );

      expect(nodes.length).toBe(1);
      expect(nodes[0].init.value).toBe('bar');
    });

    it('adds tags to the dictionary', async () => {
      const doclets = [];
      let pluginPath = path.resolve(__dirname, '../../fixtures/plugin-test-tags.js');

      await plugins.installPlugins([pluginPath], parser, jsdoc.deps);
      parser.on('newDoclet', (e) => {
        if (e.doclet.longname === 'test') {
          doclets.push(e.doclet);
        }
      });
      jsdoc.getDocSetFromFile(
        path.resolve(__dirname, '../../fixtures/plugin-source-file.js'),
        parser
      );

      expect(doclets.length).toBe(1);
      expect(doclets[0].foo).toBeTrue();
    });
  });
});

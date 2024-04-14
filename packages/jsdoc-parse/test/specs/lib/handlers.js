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

import * as handlers from '../../../lib/handlers.js';

describe('@jsdoc/parse/lib/handlers', () => {
  let testParser;

  beforeEach(() => {
    testParser = jsdoc.createParser();
    handlers.attachTo(testParser);
  });

  afterEach(() => {
    testParser._stopListening();
  });

  it('is an object', () => {
    expect(handlers).toBeObject();
  });

  it('exports an `attachTo` method', () => {
    expect(handlers.attachTo).toBeFunction();
  });

  describe('attachTo', () => {
    it('attaches a `jsdocCommentFound` handler to the parser', () => {
      const callbacks = testParser.listeners('jsdocCommentFound');

      expect(callbacks).toBeArrayOfSize(1);
      expect(callbacks[0]).toBeFunction();
    });

    it('attaches a `symbolFound` handler to the parser', () => {
      const callbacks = testParser.listeners('symbolFound');

      expect(callbacks).toBeArrayOfSize(1);
      expect(callbacks[0]).toBeFunction();
    });

    it('attaches a `fileComplete` handler to the parser', () => {
      const callbacks = testParser.listeners('fileComplete');

      expect(callbacks).toBeArrayOfSize(1);
      expect(callbacks[0]).toBeFunction();
    });
  });

  describe('`jsdocCommentFound` handler', () => {
    let doclets;
    // eslint-disable-next-line no-script-url
    const sourceCode = 'javascript:/** @name bar */';

    testParser = jsdoc.createParser();
    handlers.attachTo(testParser);
    doclets = Array.from(testParser.parse(sourceCode).doclets);

    it('creates a doclet for comments with `@name` tags', () => {
      expect(doclets).toBeArrayOfSize(1);
      expect(doclets[0].name).toBe('bar');
    });
  });

  // TODO: tests for `symbolFound` handler
});

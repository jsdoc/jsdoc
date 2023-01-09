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
describe('jsdoc/src/handlers', () => {
  const handlers = require('jsdoc/src/handlers');

  const testParser = jsdoc.createParser();

  handlers.attachTo(testParser);

  it('should exist', () => {
    expect(handlers).toBeObject();
  });

  it('should export an "attachTo" function', () => {
    expect(handlers.attachTo).toBeFunction();
  });

  describe('attachTo', () => {
    it('should attach a "jsdocCommentFound" handler to the parser', () => {
      const callbacks = testParser.listeners('jsdocCommentFound');

      expect(callbacks).toBeArrayOfSize(1);
      expect(callbacks[0]).toBeFunction();
    });

    it('should attach a "symbolFound" handler to the parser', () => {
      const callbacks = testParser.listeners('symbolFound');

      expect(callbacks).toBeArrayOfSize(1);
      expect(callbacks[0]).toBeFunction();
    });

    it('should attach a "fileComplete" handler to the parser', () => {
      const callbacks = testParser.listeners('fileComplete');

      expect(callbacks).toBeArrayOfSize(1);
      expect(callbacks[0]).toBeFunction();
    });
  });

  describe('jsdocCommentFound handler', () => {
    /* eslint-disable no-script-url */
    const sourceCode = 'javascript:/** @name bar */';
    /* eslint-enable no-script-url */
    const result = testParser.parse(sourceCode);

    it('should create a doclet for comments with "@name" tags', () => {
      expect(result).toBeArrayOfSize(1);
      expect(result[0].name).toBe('bar');
    });
  });

  xdescribe('symbolFound handler', () => {
    // TODO
  });
});

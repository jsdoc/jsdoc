/*
  Copyright 2020 the JSDoc Authors.

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

import * as astBuilder from '../../../lib/ast-builder.js';

const { AstBuilder } = astBuilder;

describe('@jsdoc/ast/lib/ast-builder', () => {
  it('is an object', () => {
    expect(astBuilder).toBeObject();
  });

  it('exports an AstBuilder class', () => {
    expect(astBuilder.AstBuilder).toBeFunction();
  });

  it('exports a parserOptions object', () => {
    expect(astBuilder.parserOptions).toBeObject();
  });

  describe('AstBuilder', () => {
    let instance;

    beforeEach(() => {
      instance = new AstBuilder(jsdoc.deps);
    });

    // TODO: more tests
    it('has a `build` method', () => {
      expect(instance.build).toBeFunction();
    });

    describe('build', () => {
      // TODO: more tests
      it('logs (not throws) an error when a file cannot be parsed', () => {
        function parse() {
          instance.build('qwerty!!!!!', 'bad.js');
        }

        expect(parse).not.toThrow();
        expect(jsdoc.didLog(parse, 'error')).toBeTrue();
      });
    });
  });

  // TODO: parserOptions tests
});

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
import ast from '../../index.js';

describe('@jsdoc/ast', () => {
  it('is an object', () => {
    expect(ast).toBeObject();
  });

  describe('AstBuilder', () => {
    it('is lib/ast-builder.AstBuilder', async () => {
      const { AstBuilder } = await import('../../lib/ast-builder.js');

      expect(ast.AstBuilder).toEqual(AstBuilder);
    });
  });

  describe('astNode', () => {
    it('is lib/ast-node', async () => {
      const astNode = await import('../../lib/ast-node.js');

      expect(ast.astNode).toEqual(astNode);
    });
  });

  describe('Syntax', () => {
    it('is lib/syntax.Syntax', async () => {
      const { Syntax } = await import('../../lib/syntax.js');

      expect(ast.Syntax).toEqual(Syntax);
    });
  });

  describe('Walker', () => {
    it('is lib/walker.Walker', async () => {
      const { Walker } = await import('../../lib/walker.js');

      expect(ast.Walker).toEqual(Walker);
    });
  });
});

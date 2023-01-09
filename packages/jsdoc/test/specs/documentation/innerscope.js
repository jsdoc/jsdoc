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
describe('inner scope', () => {
  describe('Outer~inner.member cases', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/innerscope.js');
    const to = docSet.getByLongname('Message~headers.to');
    const from = docSet.getByLongname('Message~headers.from');
    const response = docSet.getByLongname('Message~response.code');

    it('should occur when a member of a var member is documented.', () => {
      expect(to).toBeArrayOfSize(1);
    });

    it('should occur when a second member of a var member is documented.', () => {
      expect(response).toBeArrayOfSize(1);
    });

    it('should occur when a deeply nested member of a var member is documented.', () => {
      expect(from).toBeArrayOfSize(1);
    });
  });

  describe('other cases', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/innerscope2.js');
    const from = docSet.getByLongname('<anonymous>~headers.from');
    const cache = docSet.getByLongname('<anonymous>~headers.cache');

    it('When a var is declared in a function, It is like Inner~member', () => {
      expect(cache).toBeArrayOfSize(1);
    });

    it('When a var is masked by an inner var and a member of the inner is documented, it is like Inner~inner.member', () => {
      expect(from).toBeArrayOfSize(1);
    });

    it('When a documented member is assigned to a var that masks an outer var.', () => {
      expect(from[0].name).toBe('from');
      expect(from[0].memberof).toBe('<anonymous>~headers');
    });
  });
});

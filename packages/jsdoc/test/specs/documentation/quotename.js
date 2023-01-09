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
describe('quoted names', () => {
  describe('when found in square brackets', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/quotename.js');
    const found1 = docSet.getByLongname('chat."#channel".open')[0];

    it('should have correct name and memberof', () => {
      expect(found1.name).toBe('open');
      expect(found1.memberof).toBe('chat."#channel"');
    });
  });

  describe('when found in an object literal', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/quotename2.js');
    const found1 = docSet.getByLongname('contacts."say-\\"hello\\"@example.com".username')[0];

    it('should have correct name and memberof', () => {
      expect(found1.name).toBe('username');
      expect(found1.memberof).toBe('contacts."say-\\"hello\\"@example.com"');
    });
  });
});

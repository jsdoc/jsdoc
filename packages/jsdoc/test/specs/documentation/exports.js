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
describe("'exports' symbol in modules", () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/exports.js');
  const sayHello = docSet.getByLongname('module:hello/world.sayHello')[0];
  const sayGoodbye = docSet.getByLongname('module:hello/world.sayGoodbye')[0];

  it(
    'When a symbol starts with the special name "exports" and is in a file with a ' +
      '@module tag, the symbol is documented as a member of that module.',
    () => {
      expect(sayHello).toBeObject();
      expect(sayHello.kind).toBe('function');
      expect(sayHello.memberof).toBe('module:hello/world');
    }
  );

  it(
    'When a symbol starts with the special name "module.exports" and is in a file with a ' +
      '@module tag, the symbol is documented as a member of that module.',
    () => {
      expect(sayGoodbye).toBeObject();
      expect(sayGoodbye.kind).toBe('function');
      expect(sayGoodbye.memberof).toBe('module:hello/world');
    }
  );
});

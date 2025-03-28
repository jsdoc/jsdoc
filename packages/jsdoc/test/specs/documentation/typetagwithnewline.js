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

describe('@type tag containing a newline character', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/typetagwithnewline.js');
  const mini = docSet.getByLongname('Matryoshka.mini')[0];
  const mega = docSet.getByLongname('Matryoshka.mega')[0];

  it(
    'When the type expression for a @type tag contains a newline character and is not ' +
      'enclosed in braces, the type expression is parsed correctly.',
    () => {
      expect(mini).toBeObject();
      expect(mini.type).toBeObject();
      expect(mini.type.names).toEqual(['!Array<number>', '!Array<!Array<number>>']);
    }
  );

  it(
    'When the type expression for a @type tag contains a newline character and is enclosed ' +
      'in braces, the type expression is parsed correctly.',
    () => {
      expect(mega).toBeObject();
      expect(mega.type).toBeObject();
      expect(mega.type.names).toEqual([
        '!Array<number>',
        '!Array<!Array<number>>',
        '!Array<!Array<!Array<number>>>',
      ]);
    }
  );
});

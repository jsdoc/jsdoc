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
describe('@event and @fires/@emits tags', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/eventfirestag.js');
  const snowballMethod = docSet.getByLongname('Hurl#snowball')[0];
  const snowballEvent = docSet.getByLongname('Hurl#event:snowball')[0];
  const footballMatchMethod = docSet.getByLongname('Hurl#footballMatch')[0];

  // @event tag
  it('When a symbol has an @event tag, the doclet is of kind "event".', () => {
    expect(snowballEvent.kind).toBe('event');
  });

  // @fires/@emits tag
  it('When a symbol has a @fires tag, the doclet has an array named "fires".', () => {
    expect(snowballMethod.fires).toBeArray();
  });

  it('When a symbol has an @emits tag, the doclet has an array named "fires".', () => {
    expect(footballMatchMethod.fires).toBeArray();
  });

  it('When a symbol has a "fires" array, the members have the "event:" namespace.', () => {
    expect(snowballMethod.fires[0]).toBe('Hurl#event:snowball');
  });

  it(
    'When a symbol has a "fires" array with a name that already has an "event:" namespace, ' +
      'it does not have a second namespace applied.',
    () => {
      expect(snowballMethod.fires[1]).toBe('Hurl#event:brick');
    }
  );
});

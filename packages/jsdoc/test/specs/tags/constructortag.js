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
describe('@constructor tag', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/constructortag.js');
  const feed = docSet.getByLongname('Feed')[0];

  it('When a symbol has an @constructor tag, it is documented as a class.', () => {
    expect(feed.kind).toBe('class');
  });

  it('When a symbol has an @constructor tag and a @class tag, the value of the @class tag becomes the classdesc property.', () => {
    expect(feed.classdesc).toBe('Describe your class here.');
    expect(feed.description).toBe('Describe your constructor function here.');
  });
});

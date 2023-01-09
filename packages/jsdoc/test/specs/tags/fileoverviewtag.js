/*
  Copyright 2017 the JSDoc Authors.

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
describe('@fileoverview tag', () => {
  // For JSDoc tags, @fileoverview is a synonym of @file, so this is covered by the @file tag tests.

  describe('Closure Compiler tags', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/fileoverviewtag.js');
    const fileDoc = docSet.getByLongname('[[string0]]')[0];

    it("should set the doclet's name and longname to the file name", () => {
      expect(fileDoc.name).toBe('[[string0]]');
    });

    it("should set the doclet's kind to `file`", () => {
      expect(fileDoc.kind).toBe('file');
    });

    it('should use the value as a description', () => {
      expect(fileDoc.description).toBe('Overview of this file.');
    });

    it('should set `preserveName` to `true`', () => {
      expect(fileDoc.preserveName).toBe(true);
    });
  });
});

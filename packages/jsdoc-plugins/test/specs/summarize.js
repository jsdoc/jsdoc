/*
  Copyright 2014 the JSDoc Authors.

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
import * as summarize from '../../summarize.js';

describe('summarize', () => {
  it('should export handlers', () => {
    expect(summarize.handlers).toBeDefined();
    expect(typeof summarize.handlers).toBe('object');
  });

  it('should export a newDoclet handler', () => {
    expect(summarize.handlers.newDoclet).toBeDefined();
    expect(typeof summarize.handlers.newDoclet).toBe('function');
  });

  describe('newDoclet handler', () => {
    const handler = summarize.handlers.newDoclet;

    it('should not blow up if the doclet is missing', () => {
      function noDoclet() {
        return handler({});
      }

      expect(noDoclet).not.toThrow();
    });

    it('should not change the summary if it is already defined', () => {
      const doclet = {
        summary: 'This is a summary.',
        description: 'Descriptions are good.',
      };

      handler({ doclet: doclet });

      expect(doclet.summary).not.toBe(doclet.description);
    });

    it('should not do anything if the description is missing', () => {
      const doclet = {};

      handler({ doclet: doclet });

      expect(doclet.summary).not.toBeDefined();
    });

    it('should use the first sentence as the summary', () => {
      const doclet = {
        description: 'This sentence is the summary. This sentence is not.',
      };

      handler({ doclet: doclet });

      expect(doclet.summary).toBe('This sentence is the summary.');
    });

    it('should not add an extra period if there is only one sentence in the description', () => {
      const doclet = {
        description: 'This description has only one sentence.',
      };

      handler({ doclet: doclet });

      expect(doclet.summary).toBe('This description has only one sentence.');
    });

    it(
      'should use the entire description, plus a period, as the summary if the description ' +
        'does not contain a period',
      () => {
        const doclet = {
          description: 'This is a description',
        };

        handler({ doclet: doclet });

        expect(doclet.summary).toBe('This is a description.');
      }
    );

    it(
      'should use the entire description as the summary if the description contains only ' +
        'one sentence',
      () => {
        const doclet = {
          description: 'This is a description.',
        };

        handler({ doclet: doclet });

        expect(doclet.description).toBe('This is a description.');
      }
    );

    it('should work when an HTML tag immediately follows the first sentence', () => {
      const doclet = {
        description: 'This sentence is the summary.<small>This sentence is small.</small>',
      };

      handler({ doclet: doclet });

      expect(doclet.summary).toBe('This sentence is the summary.');
    });

    it('should generate valid HTML if a tag is opened, but not closed, in the summary', () => {
      const doclet = {
        description: 'This description has <em>a tag. The tag straddles</em> sentences.',
      };

      handler({ doclet: doclet });

      expect(doclet.summary).toBe('This description has <em>a tag.</em>');
    });

    it('should not include a <p> tag in the summary', () => {
      const doclet = {
        description: '<p>This description contains HTML.</p><p>And plenty of it!</p>',
      };

      handler({ doclet: doclet });

      expect(doclet.summary).toBe('This description contains HTML.');
    });
  });
});

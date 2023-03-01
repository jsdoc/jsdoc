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
/* global jsdoc */
import { Parser } from '../../../lib/parser.js';
import { Visitor } from '../../../lib/visitor.js';

describe('@jsdoc/parse/lib/visitor', () => {
  // TODO: more tests
  const parser = new Parser(jsdoc.deps);
  const visitor = new Visitor();

  describe('visitNodeComments', () => {
    // TODO: more tests

    let events = [];

    function listener(event) {
      events.push(event);
    }

    beforeEach(() => {
      parser.addListener('jsdocCommentFound', listener);
    });

    afterEach(() => {
      parser.removeListener('jsdocCommentFound', listener);
      events = [];
    });

    it('ignores line comments', () => {
      const node = {
        leadingComments: [
          {
            type: 'CommentLine',
            value: ' line comment',
            loc: {
              start: {
                line: 0,
                column: 0,
              },
            },
          },
        ],
      };

      visitor.visitNodeComments(node, parser, 'fake');

      expect(events).toBeEmptyArray();
    });

    it('ignores normal, non-JSDoc block comments', () => {
      const node = {
        leadingComments: [
          {
            type: 'CommentBlock',
            value: ' block comment ',
            loc: {
              start: {
                line: 0,
                column: 0,
              },
            },
          },
        ],
      };

      visitor.visitNodeComments(node, parser, 'fake');

      expect(events).toBeEmptyArray();
    });

    it('ignores comments that begin with three or more asterisks', () => {
      const node = {
        leadingComments: [
          {
            type: 'CommentBlock',
            value: '** block comment ',
            loc: {
              start: {
                line: 0,
                column: 0,
              },
            },
          },
        ],
      };

      visitor.visitNodeComments(node, parser, 'fake');

      expect(events).toBeEmptyArray();
    });

    it('ignores empty block comments', () => {
      const node = {
        leadingComments: [
          {
            type: 'CommentBlock',
            value: '',
            loc: {
              start: {
                line: 0,
                column: 0,
              },
            },
          },
        ],
      };

      visitor.visitNodeComments(node, parser, 'fake');

      expect(events).toBeEmptyArray();
    });

    it('emits an event for JSDoc comments', () => {
      const node = {
        leadingComments: [
          {
            type: 'CommentBlock',
            value: '* block comment ',
            loc: {
              start: {
                line: 0,
                column: 0,
              },
            },
          },
        ],
      };

      visitor.visitNodeComments(node, parser, 'fake');

      expect(events).toBeArrayOfSize(1);
      expect(events[0].comment).toBe('/** block comment */');
    });
  });

  // TODO: these tests aren't working; the code for visitor.visitNode() stops running in the
  // middle of the SymbolFound constructor. maybe an async issue?
  xdescribe('visitNode', () => {
    // TODO: more tests

    let events = [];

    function listener(event) {
      events.push(event);
    }

    beforeEach(() => {
      parser.addListener('symbolFound', listener);
    });

    afterEach(() => {
      parser.removeListener('symbolFound', listener);
      events = [];
    });

    it('ignores non-JSDoc leading comments', () => {
      const node = {
        type: 'Property',
        key: {
          type: 'Identifier',
          name: 'foo',
        },
        value: {
          type: 'Literal',
          value: true,
        },
        kind: 'init',
        leadingComments: [
          {
            type: 'CommentBlock',
            value: ' block comment ',
            loc: {
              start: {
                line: 0,
                column: 0,
              },
            },
          },
        ],
      };

      visitor.visitNode(node, parser, 'fake');

      expect(events[0].comment).toBe('');
    });

    it('includes JSDoc leading comments', () => {
      const node = {
        type: 'Property',
        key: {
          type: 'Identifier',
          name: 'foo',
        },
        value: {
          type: 'Literal',
          value: true,
        },
        kind: 'init',
        leadingComments: [
          {
            type: 'CommentBlock',
            value: '* block comment ',
            loc: {
              start: {
                line: 0,
                column: 0,
              },
            },
          },
        ],
      };

      visitor.visitNode(node, parser, 'fake');

      expect(events[0].comment).toBe('/** block comment */');
    });
  });
});

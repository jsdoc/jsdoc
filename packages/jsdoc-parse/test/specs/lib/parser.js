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
/* eslint-disable no-script-url */
/* global jsdoc */
import fs from 'node:fs';
import path from 'node:path';

import { Syntax, Walker } from '@jsdoc/ast';
import { combineDoclets, Doclet } from '@jsdoc/doclet';

import { attachTo } from '../../../lib/handlers.js';
import * as jsdocParser from '../../../lib/parser.js';
import { Visitor } from '../../../lib/visitor.js';

describe('@jsdoc/parse/lib/parser', () => {
  const dirname = path.resolve(path.join(jsdoc.dirname(import.meta.url), '..', '..', '..'));

  it('is an object', () => {
    expect(jsdocParser).toBeObject();
  });

  it('exports a `createParser` method', () => {
    expect(jsdocParser.createParser).toBeFunction();
  });

  it('exports a `Parser` constructor', () => {
    expect(jsdocParser.Parser).toBeFunction();
  });

  describe('createParser', () => {
    it('returns a `Parser` when called with dependencies', () => {
      const parser = jsdocParser.createParser(jsdoc.deps);

      expect(parser).toBeObject();

      parser._stopListening();
    });
  });

  describe('Parser', () => {
    let parser;

    beforeEach(() => {
      parser = new jsdocParser.Parser(jsdoc.deps);
    });

    afterEach(() => {
      parser._stopListening();
    });

    it('has a `visitor` property', () => {
      expect(parser.visitor).toBeObject();
    });

    it('has a `walker` property', () => {
      expect(parser.walker).toBeObject();
    });

    it('has a `parse` method', () => {
      expect(parser.parse).toBeFunction();
    });

    it('has a `results` method', () => {
      expect(parser.results).toBeFunction();
    });

    it('has an `addAstNodeVisitor` method', () => {
      expect(parser.addAstNodeVisitor).toBeFunction();
    });

    it('has a `getAstNodeVisitors` method', () => {
      expect(parser.getAstNodeVisitors).toBeFunction();
    });

    describe('visitor', () => {
      it('contains an appropriate visitor by default', () => {
        expect(parser.visitor instanceof Visitor).toBeTrue();
      });
    });

    describe('walker', () => {
      it('contains an appropriate walker by default', () => {
        expect(parser.walker instanceof Walker).toBeTrue();
      });
    });

    describe('parse', () => {
      it('emits `parseBegin` events before it parses any files', () => {
        const spy = jasmine.createSpy();
        const sourceFiles = ['javascript:/** @name foo */'];

        parser.on('parseBegin', spy).parse(sourceFiles);
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.mostRecent().args[0].sourcefiles).toBe(sourceFiles);
      });

      it('allows `parseBegin` handlers to modify the list of source files', () => {
        const sourceCode = 'javascript:/** @name foo */';
        const newFiles = ['[[replaced]]'];
        let evt;

        function handler(e) {
          e.sourcefiles = newFiles;
          evt = e;
        }

        parser.on('parseBegin', handler).parse(sourceCode);
        expect(evt.sourcefiles).toBe(newFiles);
      });

      it('emits `jsdocCommentFound` events when a source file contains JSDoc comments', () => {
        const spy = jasmine.createSpy();
        const sourceCode = ['javascript:/** @name bar */'];

        parser.on('jsdocCommentFound', spy).parse(sourceCode);

        expect(spy).toHaveBeenCalled();
        expect(spy.calls.mostRecent().args[0].comment).toBe('/** @name bar */');
      });

      it('emits `symbolFound` events when a source file contains named symbols', () => {
        const spy = jasmine.createSpy();
        const sourceCode = 'javascript:var foo = 1';

        parser.on('symbolFound', spy).parse(sourceCode);

        expect(spy).toHaveBeenCalled();
      });

      it('emits `newDoclet` events after creating a new doclet', () => {
        const spy = jasmine.createSpy();
        const sourceCode = 'javascript:var foo = 1';

        parser.on('symbolFound', spy).parse(sourceCode);

        expect(spy).toHaveBeenCalled();
      });

      it('allows `newDoclet` handlers to modify doclets', () => {
        let doclets;
        let docletStore;
        const sourceCode = 'javascript:/** @class */function Foo() {}';

        function handler(e) {
          e.doclet = combineDoclets(e.doclet, new Doclet('', {}, jsdoc.deps));
          e.doclet.foo = 'bar';
        }

        attachTo(parser);
        docletStore = parser.on('newDoclet', handler).parse(sourceCode);
        doclets = Array.from(docletStore.doclets).filter((d) => d.foo === 'bar');

        expect(doclets).toBeArrayOfSize(1);
      });

      it('calls AST node visitors', () => {
        let args;
        const sourceCode = ['javascript:/** foo */var foo;'];
        const visitor = {
          visitNode(node, e) {
            if (e && e.code && !args) {
              args = Array.prototype.slice.call(arguments);
            }
          },
        };

        attachTo(parser);
        parser.addAstNodeVisitor(visitor);
        parser.parse(sourceCode);

        expect(args).toBeArrayOfSize(4);

        // args[0]: AST node
        expect(args[0].type).toBe(Syntax.VariableDeclarator);

        // args[1]: JSDoc event
        expect(args[1]).toBeObject();
        expect(args[1].code).toBeObject();
        expect(args[1].code.name).toBe('foo');

        // args[2]: parser
        expect(args[2]).toBeObject();
        expect(args[2] instanceof jsdocParser.Parser).toBeTrue();

        // args[3]: current source name
        expect(String(args[3])).toBe('[[string0]]');
      });

      it('reflects changes made by AST node visitors', () => {
        let doclet;
        const sourceCode = ['javascript:/** foo */var foo;'];
        const visitor = {
          visitNode(node, e) {
            if (e && e.code && e.code.name === 'foo') {
              e.code.name = 'bar';
            }
          },
        };

        attachTo(parser);
        parser.addAstNodeVisitor(visitor);
        parser.parse(sourceCode);

        doclet = parser.results()[0];

        expect(doclet).toBeObject();
        expect(doclet.name).toBe('bar');
      });

      it('emits `parseComplete` events after it finishes parsing files', () => {
        let eventObject;
        const spy = jasmine.createSpy();
        const sourceCode = ['javascript:/** @class */function Foo() {}'];

        attachTo(parser);
        parser.on('parseComplete', spy).parse(sourceCode);

        expect(spy).toHaveBeenCalled();

        eventObject = spy.calls.mostRecent().args[0];

        expect(eventObject).toBeDefined();
        expect(eventObject.sourcefiles).toEqual(['[[string0]]']);

        expect(eventObject.doclets).toBeArrayOfSize(1);
        expect(eventObject.doclets[0].kind).toBe('class');
        expect(eventObject.doclets[0].longname).toBe('Foo');
      });

      it('emits a `processingComplete` event when fireProcessingComplete is called', () => {
        const spy = jasmine.createSpy();
        const doclets = ['a', 'b'];
        let mostRecentArg0;

        parser.on('processingComplete', spy).fireProcessingComplete(doclets);

        expect(spy).toHaveBeenCalled();

        mostRecentArg0 = spy.calls.mostRecent().args[0];
        expect(mostRecentArg0).toBeObject();
        expect(mostRecentArg0.doclets).toBe(doclets);
      });

      it('does not throw errors when parsing files with ES6 syntax', () => {
        function parse() {
          const parserSrc = `javascript:${fs.readFileSync(
            path.join(dirname, 'test/fixtures/es6.js'),
            'utf8'
          )}`;

          parser.parse(parserSrc);
        }

        expect(parse).not.toThrow();
      });

      it('can parse its own source file', () => {
        const parserSrc = `javascript:${fs.readFileSync(
          path.join(dirname, 'lib/parser.js'),
          'utf8'
        )}`;

        function parse() {
          parser.parse(parserSrc);
        }

        expect(parse).not.toThrow();
      });

      it('comments out a POSIX hashbang at the start of the file', () => {
        const parserSrc = 'javascript:#!/usr/bin/env node\n/** class */function Foo() {}';

        function parse() {
          parser.parse(parserSrc);
        }

        expect(parse).not.toThrow();
      });
    });

    describe('results', () => {
      it('returns an empty array before files are parsed', () => {
        const results = parser.results();

        expect(results).toBeEmptyArray();
      });

      it('returns an array of doclets after files are parsed', () => {
        const source = 'javascript:var foo;';
        let results;

        attachTo(parser);

        parser.parse(source);
        results = parser.results();

        expect(results).toBeArrayOfSize(1);
        expect(results[0]).toBeObject();
        expect(results[0].name).toBe('foo');
      });

      it('reflects comment changes made by `jsdocCommentFound` handlers', () => {
        // we test both POSIX and Windows line endings
        const source =
          'javascript:/**\n * replaceme\r\n * @module foo\n */\n\n' +
          '/**\n * replaceme\n */\nvar bar;';

        parser.on('jsdocCommentFound', (e) => {
          e.comment = e.comment.replace('replaceme', 'REPLACED!');
        });
        attachTo(parser);

        parser.parse(source);
        parser.results().forEach(({ comment }) => {
          expect(comment).not.toMatch('replaceme');
          expect(comment).toMatch('REPLACED!');
        });
      });

      // TODO: this test appears to be doing nothing...
      xdescribe('event order', () => {
        const events = {
          all: [],
          jsdocCommentFound: [],
          symbolFound: [],
        };
        const source = fs.readFileSync(path.join(dirname, 'test/fixtures/eventorder.js'), 'utf8');

        /*
                function pushEvent(e) {
                    events.all.push(e);
                    events[e.event].push(e);
                }
                */

        function sourceOrderSort(atom1, atom2) {
          if (atom1.range[1] < atom2.range[0]) {
            return -1;
          } else if (atom1.range[0] < atom2.range[0] && atom1.range[1] === atom2.range[1]) {
            return 1;
          } else {
            return 0;
          }
        }

        it('emits interleaved `jsdocCommentFound` and `symbolFound` events, in source order', () => {
          attachTo(parser);
          parser.parse(source);
          events.all
            .slice()
            .sort(sourceOrderSort)
            .forEach((e, i) => {
              expect(e).toBe(events.all[i]);
            });
        });
      });
    });

    describe('addAstNodeVisitor', () => {
      /* eslint-disable no-empty-function */
      function visitorA() {}
      function visitorB() {}
      /* eslint-enable no-empty-function */

      let visitors;

      it('works with a single node visitor', () => {
        parser.addAstNodeVisitor(visitorA);

        visitors = parser.getAstNodeVisitors();

        expect(visitors).toEqual([visitorA]);
      });

      it('works with multiple node visitors', () => {
        parser.addAstNodeVisitor(visitorA);
        parser.addAstNodeVisitor(visitorB);

        visitors = parser.getAstNodeVisitors();

        expect(visitors).toEqual([visitorA, visitorB]);
      });
    });

    describe('getAstNodeVisitors', () => {
      it('returns an empty array by default', () => {
        const visitors = parser.getAstNodeVisitors();

        expect(visitors).toBeEmptyArray();
      });

      // other functionality is covered by the addNodeVisitors tests
    });
  });
});

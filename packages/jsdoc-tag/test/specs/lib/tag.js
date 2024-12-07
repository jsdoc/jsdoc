/*
  Copyright 2012 the JSDoc Authors.

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

import * as jsdocTag from '../../../lib/tag.js';
import * as type from '../../../lib/type.js';

const jsdocDictionary = jsdoc.env.tags;
const options = jsdoc.env.options;
const parseType = type.parse;
const { Tag } = jsdocTag;

describe('@jsdoc/tag/lib/tag', () => {
  it('is an object', () => {
    expect(jsdocTag).toBeObject();
  });

  it('exports a `Tag` constructor', () => {
    expect(jsdocTag.Tag).toBeFunction();
  });

  describe('Tag', () => {
    const meta = {
      lineno: 1,
      filename: 'asdf.js',
    };
    const desc = 'lalblakd lkjasdlib\n  lija';
    const text = `{!number} [foo=1] - ${desc}`;
    const exampleRaw = [
      '<caption>Asdf</caption>\n',
      ' myFunction(1, 2); // returns 3\n',
      ' myFunction(3, 4); // returns 7\n',
    ];
    const textExample = exampleRaw.join('');
    const exampleIndentedRaw = [
      '     var firstLine;\n',
      '     function secondLine() {\n',
      '         // comment\n',
      '     }\n',
    ];
    const textExampleIndented = exampleIndentedRaw.join('');

    let tagArg;
    let tagExample;
    let tagExampleIndented;
    let tagParam;
    let tagParamWithType;
    let tagType;

    function createTags() {
      // Synonym for @param; space in the title
      tagArg = new Tag('arg  ', text, meta, jsdoc.env);
      // @param with no type, but with optional and defaultvalue
      tagParam = new Tag('param', '[foo=1]', meta, jsdoc.env);
      // @param with type and no type modifiers (such as optional)
      tagParamWithType = new Tag('param', '{string} foo', meta, jsdoc.env);
      // @example that does not need indentation to be removed
      tagExample = new Tag('example', textExample, meta, jsdoc.env);
      // @example that needs indentation to be removed
      tagExampleIndented = new Tag('example', textExampleIndented, meta, jsdoc.env);
      // For testing that `onTagText` is called when necessary
      tagType = new Tag('type', 'MyType ', meta, jsdoc.env);
    }

    beforeEach(() => {
      createTags();
    });

    describe('`originalTitle` property', () => {
      it('has an `originalTitle` property', () => {
        expect(tagArg.originalTitle).toBeString();
      });

      it('trims the value of `originalTitle`', () => {
        expect(tagArg.originalTitle).toBe('arg');
        expect(tagExample.originalTitle).toBe('example');
      });
    });

    describe('`title` property', () => {
      it('has a `title` property', () => {
        expect(tagArg.title).toBeString();
      });

      it('contains the normalized tag title', () => {
        expect(tagArg.title).toBe(jsdocDictionary.normalize(tagArg.originalTitle));
        expect(tagExample.title).toBe(jsdocDictionary.normalize(tagExample.originalTitle));
      });
    });

    describe('`text` property', () => {
      it('has a `text` property', () => {
        expect(tagArg.text).toBeString();
      });

      it('is trimmed unless the tag preserves whitespace', () => {
        // @example has keepsWhitespace and removesIndent, @param doesn't
        expect(tagArg.text).toBe(text.replace(/^\s+|\n$/g, ''));
        expect(tagExample.text).toBe(textExample.replace(/\n$/, ''));
        expect(tagExampleIndented.text).toBe(
          textExampleIndented.replace(/^ {5}/gm, '').replace(/\n$/, '')
        );
      });

      it('calls the `onTagText` function for the tag if present', () => {
        const def = jsdocDictionary.lookUp('type');

        expect(def.onTagText).toBeFunction();

        // @type adds {} around the type if necessary.
        expect(tagType.text).toBe(def.onTagText('MyType'));
      });

      it('is quoted and not trimmed for symbol names with leading or trailing whitespace', () => {
        let wsBoth;
        let wsLeading;
        let wsOnly;
        let wsTrailing;

        function newTags() {
          wsOnly = new Tag('name', ' ', { code: { name: ' ' } }, jsdoc.env);
          wsLeading = new Tag('name', '  foo', { code: { name: '  foo' } }, jsdoc.env);
          wsTrailing = new Tag('name', 'foo  ', { code: { name: 'foo  ' } }, jsdoc.env);
          wsBoth = new Tag('name', '  foo  ', { code: { name: '  foo  ' } }, jsdoc.env);
        }

        expect(jsdoc.didLog(newTags, 'error')).toBeFalse();
        expect(wsOnly.text).toBe('" "');
        expect(wsLeading.text).toBe('"  foo"');
        expect(wsTrailing.text).toBe('"foo  "');
        expect(wsBoth.text).toBe('"  foo  "');
      });
    });

    describe('`value` property', () => {
      const debug = Boolean(options.debug);

      afterEach(() => {
        options.debug = debug;
      });

      it('has a `value` property', () => {
        expect(tagArg.value).toBeDefined();
        expect(tagExample.value).toBeDefined();
        expect(tagType.value).toBeDefined();
      });

      it('is the tag text if the tag cannot have a type or name', () => {
        // @example can't have type or name
        expect(typeof tagExample.value).toBe('string');
        expect(tagExample.value).toBe(tagExample.text);
      });

      it('is an object if the tag can have a type or name', () => {
        expect(typeof tagType.value).toBe('object');
        expect(typeof tagArg.value).toBe('object');
      });

      function verifyTagType(tag) {
        let def;
        let descriptor;
        let info;

        def = jsdocDictionary.lookUp(tag.title);

        expect(def).toBeObject();

        info = parseType(tag.text, def.canHaveName, def.canHaveType);

        ['optional', 'nullable', 'variable', 'defaultvalue'].forEach((prop) => {
          if (Object.hasOwn(info, prop)) {
            expect(tag.value[prop]).toBe(info[prop]);
          }
        });

        if (info.type && info.type.length) {
          expect(tag.value.type).toBeObject();
          expect(tag.value.type.names).toEqual(info.type);

          expect(tag.value.type.parsedType).toBeObject();

          descriptor = Object.getOwnPropertyDescriptor(tag.value.type, 'parsedType');
          expect(descriptor.enumerable).toBe(Boolean(options.debug));
        }
      }

      it('contains the type information for tags with types', () => {
        [true, false].forEach((bool) => {
          options.debug = bool;
          createTags();

          verifyTagType(tagType);
          verifyTagType(tagArg);
          verifyTagType(tagParam);
        });
      });

      it('contains any additional descriptive text', () => {
        expect(tagType.value.description).toBeUndefined();
        expect(tagArg.value.description).toBe(desc);
      });

      it('contains the name for tags with names', () => {
        expect(tagArg.value.name).toBe('foo');
        expect(tagType.value.name).toBeUndefined();
      });

      it('does not include type modifier properties on the tag value', () => {
        ['optional', 'nullable', 'variable', 'defaultvalue'].forEach((modifier) => {
          expect(Object.hasOwn(tagParamWithType.value, modifier)).toBeFalse();
        });
      });
    });

    // Additional tests in validator.js.
    describe('tag validating', () => {
      it('logs an error for tags with bad type expressions', () => {
        function newTag() {
          return new Tag('param', '{!*!*!*!} foo', null, jsdoc.env);
        }

        expect(jsdoc.didLog(newTag, 'error')).toBeTrue();
      });

      it('validates tags with no text', () => {
        function newTag() {
          return new Tag('copyright', null, null, jsdoc.env);
        }

        expect(jsdoc.didLog(newTag, 'error')).toBeTrue();
      });
    });
  });
});

/*
  Copyright 2023 the JSDoc Authors.

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
import { name } from '@jsdoc/core';

import { Doclet } from '../../../lib/doclet.js';
import * as docletStore from '../../../lib/doclet-store.js';

const ANONYMOUS_LONGNAME = name.LONGNAMES.ANONYMOUS;

const { DocletStore } = docletStore;

function makeDoclet(comment, meta, deps) {
  let doclet;

  deps ??= jsdoc.deps;
  doclet = new Doclet(`/**\n${comment.join('\n')}\n*/`, meta, deps);
  if (meta?._emitEvent !== false) {
    deps.get('eventBus').emit('newDoclet', { doclet });
  }

  return doclet;
}

describe('@jsdoc/doclet/lib/doclet-store', () => {
  it('exists', () => {
    expect(docletStore).toBeObject();
  });

  it('has a DocletStore class', () => {
    expect(docletStore.DocletStore).toBeFunction();
  });

  describe('DocletStore', () => {
    let store;

    beforeEach(() => {
      store = new DocletStore(jsdoc.deps);
    });

    afterEach(() => {
      store._removeListeners();
    });

    it('is not constructable with no arguments', () => {
      expect(() => new DocletStore()).toThrow();
    });

    it('is constructable when dependencies are passed in', () => {
      expect(() => new DocletStore(jsdoc.deps)).not.toThrow();
    });

    it('has an `add` method', () => {
      expect(store.add).toBeFunction();
    });

    it('has an `allDoclets` property', () => {
      expect(store.allDoclets).toBeEmptySet();
    });

    it('has an `allDocletsByLongname` property', () => {
      expect(store.allDocletsByLongname).toBeEmptyMap();
    });

    it('has a `commonPathPrefix` property', () => {
      expect(store.commonPathPrefix).toBeEmptyString();
    });

    it('has a `doclets` property', () => {
      expect(store.doclets).toBeEmptySet();
    });

    it('has a `docletsByKind` property', () => {
      expect(store.docletsByKind).toBeEmptyMap();
    });

    it('has a `docletsByLongname` property', () => {
      expect(store.docletsByLongname).toBeEmptyMap();
    });

    it('has a `docletsByMemberof` property', () => {
      expect(store.docletsByMemberof).toBeEmptyMap();
    });

    it('has a `docletsWithBorrowed` property', () => {
      expect(store.docletsWithBorrowed).toBeEmptySet();
    });

    it('has a `globals` property', () => {
      expect(store.globals).toBeEmptySet();
    });

    it('has a `listenersByListensTo` property', () => {
      expect(store.listenersByListensTo).toBeEmptyMap();
    });

    it('has a `longnames` property', () => {
      expect(store.longnames).toBeEmptyArray();
    });

    it('has a `sourcePaths` property', () => {
      expect(store.sourcePaths).toBeEmptyArray();
    });

    it('has an `unusedDoclets` property', () => {
      expect(store.unusedDoclets).toBeEmptySet();
    });

    describe('add', () => {
      describe('method', () => {
        it('adds a normal doclet normally', () => {
          // Create a doclet without emitting it, and add it to the store directly.
          store.add(makeDoclet(['@namespace', '@name Foo'], { _emitEvent: false }));

          expect(Array.from(store.doclets)).toBeArrayOfSize(1);
          expect(store.docletsByKind).toHave('namespace');
          expect(store.docletsByLongname).toHave('Foo');
        });

        it('tracks changes to a normal doclet', () => {
          // Create a doclet without emitting it.
          const doclet = makeDoclet(['@namespace', '@name Foo'], { _emitEvent: false });

          store.add(doclet);
          doclet.longname = doclet.name = 'Bar';

          expect(store.docletsByLongname).not.toHave('Foo');
          expect(store.docletsByLongname).toHave('Bar');
        });

        it('tracks anonymous doclets only by node ID', () => {
          const anonymousDoclet = makeDoclet(['@function', `@name ${ANONYMOUS_LONGNAME}`], {
            _emitEvent: false,
            code: {
              node: {
                nodeId: 'a',
              },
            },
          });

          anonymousDoclet.longname = ANONYMOUS_LONGNAME;
          store.add(anonymousDoclet);

          expect(store.docletsByNodeId.get('a')).toHave(anonymousDoclet);
          expect(store.docletsByLongname).not.toHave(ANONYMOUS_LONGNAME);
        });
      });

      describe('events with visible doclets', () => {
        let doclet;

        it('adds the doclet to the list of visible doclets when appropriate', () => {
          doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(doclet.isVisible()).toBeTrue();
          expect(store.doclets).toHave(doclet);
        });

        it('never adds visible doclets to the list of unused doclets', () => {
          doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(doclet.isVisible()).toBeTrue();
          expect(store.unusedDoclets).toBeEmptySet();
        });

        it('adds visible doclets to the map of doclets by kind', () => {
          doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(doclet.isVisible()).toBeTrue();
          expect(store.docletsByKind.get('class')).toHave(doclet);
        });

        it('adds visible doclets to the map of doclets by longname', () => {
          doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(doclet.isVisible()).toBeTrue();
          expect(store.docletsByLongname.get('foo.Bar')).toHave(doclet);
        });

        it('adds visible doclets to the map of doclets by memberof when appropriate', () => {
          doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(doclet.isVisible()).toBeTrue();
          expect(store.docletsByMemberof.get('foo')).toHave(doclet);
        });

        it('adds doclets that augment others to the list of doclets that augment', () => {
          doclet = makeDoclet(['@class', '@name Qux', '@extends foo.Bar']);

          expect(store.docletsWithAugments).toHave(doclet);
        });

        it('does not add doclets that do not augment others to the list of doclets that augment', () => {
          doclet = makeDoclet(['@class', '@name Qux']);

          expect(store.docletsWithAugments).not.toHave(doclet);
        });

        it('adds doclets that borrow others to the list of doclets that borrow', () => {
          doclet = makeDoclet(['@class', '@name Qux', '@borrows foo.Bar#baz']);

          expect(store.docletsWithBorrowed).toHave(doclet);
        });

        it('does not add doclets that do not borrow others to the list of doclets that borrow', () => {
          doclet = makeDoclet(['@class', '@name Qux']);

          expect(store.docletsWithBorrowed).not.toHave(doclet);
        });

        it('adds doclets that implement others to the list of doclets that implement', () => {
          doclet = makeDoclet(['@class', '@name Qux', '@implements IQux']);

          expect(store.docletsWithImplements).toHave(doclet);
        });

        it('does not add doclets that do not implement others to the list of doclets that implement', () => {
          doclet = makeDoclet(['@class', '@name Qux']);

          expect(store.docletsWithImplements).not.toHave(doclet);
        });

        it('adds doclets that mix others to the list of doclets that mix', () => {
          doclet = makeDoclet(['@class', '@name Qux', '@mixes foo']);

          expect(store.docletsWithMixes).toHave(doclet);
        });

        it('does not add doclets that do not mix others to the list of doclets that mix', () => {
          doclet = makeDoclet(['@class', '@name Qux']);

          expect(store.docletsWithMixes).not.toHave(doclet);
        });

        it('adds visible doclets to the list of globals when appropriate', () => {
          doclet = makeDoclet(['@function', '@global', '@name baz']);

          expect(doclet.isVisible()).toBeTrue();
          expect(store.globals).toHave(doclet);
        });

        it('does not add doclets that are global, but not visible, to the list of globals', () => {
          doclet = makeDoclet(['@function', '@global', '@name baz', '@ignore']);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.globals).toBeEmptySet();
        });

        it('adds visible doclets to the map of listeners by listens to when appropriate', () => {
          doclet = makeDoclet(['@function', '@listens event:bar', '@name foo']);

          expect(doclet.isVisible()).toBeTrue();
          expect(store.listenersByListensTo.get('event:bar')).toHave(doclet);
        });

        it('adds the source paths for visible doclets to the list of source paths', () => {
          const meta = {
            filename: '/Users/carolr/code/foo.js',
            lineno: 1,
          };

          doclet = makeDoclet(['@function', '@global', '@name baz'], meta);

          expect(doclet.isVisible()).toBeTrue();
          expect(store.sourcePaths).toContain('/Users/carolr/code/foo.js');
        });
      });

      describe('events with unused doclets', () => {
        let doclet;

        it('adds the doclet to the list of unused doclets when appropriate', () => {
          doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@ignore']);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.unusedDoclets).toHave(doclet);
        });

        it('does not add unused doclets to the list of visible doclets', () => {
          doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@ignore']);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.doclets).toBeEmptySet();
        });

        it('does not add unused doclets to the map of doclets by kind', () => {
          doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@ignore']);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.docletsByKind).toBeEmptyMap();
        });

        it('does not add unused doclets to the map of doclets by longname', () => {
          doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@ignore']);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.docletsByLongname).toBeEmptyMap();
        });

        it('does not add unused doclets to the map of doclets by memberof', () => {
          doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@ignore']);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.docletsByMemberof).toBeEmptyMap();
        });

        it('does not add doclets that augment others to the list of doclets that augment', () => {
          doclet = makeDoclet(['@class', '@name Qux', '@extends foo.Bar', '@ignore']);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.docletsWithAugments).toBeEmptySet();
        });

        it('does not add doclets that borrow others to the list of doclets that borrow', () => {
          doclet = makeDoclet(['@class', '@name Qux', '@borrows foo.Bar#baz', '@ignore']);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.docletsWithBorrowed).toBeEmptySet();
        });

        it('does not add doclets that implement others to the list of doclets that implement', () => {
          doclet = makeDoclet(['@class', '@name Qux', '@implements IQux', '@ignore']);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.docletsWithImplements).toBeEmptySet();
        });

        it('does not add doclets that mix others to the list of doclets that mix', () => {
          doclet = makeDoclet(['@class', '@name Qux', '@mixes foo', '@ignore']);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.docletsWithMixes).toBeEmptySet();
        });

        it('does not add unused doclets to the list of globals', () => {
          doclet = makeDoclet(['@function', '@global', '@name baz', '@ignore']);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.globals).toBeEmptySet();
        });

        it('does not add unused doclets to the map of listeners by listens to', () => {
          doclet = makeDoclet(['@function', '@listens event:bar', '@name foo', '@ignore']);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.listenersByListensTo).toBeEmptyMap();
        });

        it('does not add longnames for unused doclets to the list of longnames', () => {
          expect(store.longnames).toBeEmptyArray();
        });

        it('does not add source paths for unused doclets to the list of source paths', () => {
          const meta = {
            filename: '/Users/carolr/code/foo.js',
            lineno: 1,
          };

          doclet = makeDoclet(['@function', '@global', '@name baz', '@ignore'], meta);

          expect(doclet.isVisible()).toBeFalse();
          expect(store.sourcePaths).toBeEmptyArray();
        });
      });
    });

    describe('allDoclets', () => {
      it('contains both visible and hidden doclets', () => {
        const fooDoclet = makeDoclet(['@function', '@name foo']);
        const barDoclet = makeDoclet(['@function', '@name bar', '@ignore']);

        expect(store.allDoclets.size).toBe(2);
        expect(store.allDoclets).toHave(fooDoclet);
        expect(store.allDoclets).toHave(barDoclet);
      });

      it('does not contain anonymous doclets that were added directly', () => {
        const anonymousDoclet = makeDoclet(['@function', `@name ${ANONYMOUS_LONGNAME}`], {
          _emitEvent: false,
          code: {
            node: {
              nodeId: 'a',
            },
          },
        });

        anonymousDoclet.longname = ANONYMOUS_LONGNAME;
        store.add(anonymousDoclet);

        makeDoclet(['@function', '@name foo']);

        // Confirm that the anonymous doclet wasn't just ignored.
        expect(store.docletsByNodeId.get('a')).toHave(anonymousDoclet);

        expect(store.allDoclets.size).toBe(1);
        expect(store.allDoclets).not.toContain(anonymousDoclet);
      });
    });

    describe('allDocletsByLongname', () => {
      it('contains both visible and hidden doclets', () => {
        const fooDoclet = makeDoclet(['@function', '@name foo']);
        const barDoclet = makeDoclet(['@function', '@name bar', '@ignore']);

        expect(store.allDocletsByLongname.get('foo')).toHave(fooDoclet);
        expect(store.allDocletsByLongname.get('bar')).toHave(barDoclet);
      });

      it('does not contain anonymous doclets that were added directly', () => {
        const anonymousDoclet = makeDoclet(['@function', `@name ${ANONYMOUS_LONGNAME}`], {
          _emitEvent: false,
          code: {
            node: {
              nodeId: 'a',
            },
          },
        });

        anonymousDoclet.longname = ANONYMOUS_LONGNAME;
        store.add(anonymousDoclet);

        makeDoclet(['@function', '@name foo']);

        // Confirm that the anonymous doclet wasn't just ignored.
        expect(store.docletsByNodeId.get('a')).toHave(anonymousDoclet);

        expect(store.allDocletsByLongname).not.toHave(ANONYMOUS_LONGNAME);
      });
    });

    describe('commonPathPrefix', () => {
      it('returns an empty string if there are no paths', () => {
        expect(store.commonPathPrefix).toBeEmptyString();
      });

      it('returns the dirname if there is only one path', () => {
        const meta = {
          filename: '/Users/carolr/code/foo.js',
          lineno: 1,
        };

        makeDoclet(['@function', '@global', '@name baz'], meta);

        expect(store.commonPathPrefix).toBe('/Users/carolr/code');
      });

      // Here for the sake of code coverage; it tests the path where the value is already cached.
      it('works twice in a row', () => {
        const meta = {
          filename: '/Users/carolr/code/foo.js',
          lineno: 1,
        };

        makeDoclet(['@function', '@global', '@name baz'], meta);

        expect(store.commonPathPrefix).toBe('/Users/carolr/code');
        expect(store.commonPathPrefix).toBe('/Users/carolr/code');
      });

      it('returns the correct common path if one exists', () => {
        const metaA = {
          filename: '/Users/carolr/code/foo.js',
          lineno: 1,
        };
        const metaB = {
          filename: '/Users/carolr/assets/bar.js',
          lineno: 1,
        };

        makeDoclet(['@function', '@global', '@name foo'], metaA);
        makeDoclet(['@function', '@global', '@name bar'], metaB);

        expect(store.commonPathPrefix).toBe('/Users/carolr');
      });

      it('returns an empty string if there is no common path', () => {
        const metaA = {
          filename: 'C:\\carolr\\code\\foo.js',
          lineno: 1,
        };
        const metaB = {
          filename: 'D:\\code\\bar.js',
          lineno: 1,
        };

        makeDoclet(['@function', '@global', '@name foo'], metaA);
        makeDoclet(['@function', '@global', '@name bar'], metaB);

        expect(store.commonPathPrefix).toBeEmptyString();
      });

      it('returns the correct value if you get the property, then add a path that does not change the result', () => {
        const metaA = {
          filename: '/Users/carolr/code/foo.js',
          lineno: 1,
        };
        const metaB = {
          filename: '/Users/carolr/code/bar.js',
          lineno: 1,
        };
        let prefix1;
        let prefix2;

        makeDoclet(['@function', '@global', '@name foo'], metaA);
        prefix1 = store.commonPathPrefix;
        makeDoclet(['@function', '@global', '@name bar'], metaB);
        prefix2 = store.commonPathPrefix;

        expect(prefix1).toBe('/Users/carolr/code');
        expect(prefix2).toBe('/Users/carolr/code');
      });

      it('returns the correct value if you get the property, then add a path that changes the result', () => {
        const metaA = {
          filename: '/Users/carolr/code/foo.js',
          lineno: 1,
        };
        const metaB = {
          filename: '/Users/carolr/bar.js',
          lineno: 1,
        };
        let prefix1;
        let prefix2;

        makeDoclet(['@function', '@global', '@name foo'], metaA);
        prefix1 = store.commonPathPrefix;
        makeDoclet(['@function', '@global', '@name bar'], metaB);
        prefix2 = store.commonPathPrefix;

        expect(prefix1).toBe('/Users/carolr/code');
        expect(prefix2).toBe('/Users/carolr');
      });
    });

    describe('longnames', () => {
      it('is an empty array if there are no doclets', () => {
        expect(store.longnames).toBeEmptyArray();
      });

      it('is a list of longnames if there are doclets', () => {
        makeDoclet(['@class', '@memberof foo', '@name Bar']);

        expect(store.longnames).toEqual(['foo.Bar']);
      });
    });

    describe('reactivity', () => {
      describe('`access`', () => {
        it('marks a public doclet as unused if it becomes private', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(store.unusedDoclets).not.toHave(doclet);

          doclet.access = 'private';

          expect(store.unusedDoclets).toHave(doclet);
        });

        it('marks a private doclet as visible if it becomes public', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@private']);

          expect(store.unusedDoclets).toHave(doclet);

          doclet.access = 'public';

          expect(store.unusedDoclets).not.toHave(doclet);
        });
      });

      describe('`augments`', () => {
        it('adds a doclet to the list of doclets that augment others when the doclet gains an `augments` value', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(store.docletsWithAugments).not.toHave(doclet);

          doclet.augments = ['Baz'];

          expect(store.docletsWithAugments).toHave(doclet);
        });

        it('removes a doclet from the list of doclets that augment others when the doclet loses all `augments` values', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@extends Baz']);

          expect(store.docletsWithAugments).toHave(doclet);

          doclet.augments.pop();

          expect(store.docletsWithAugments).not.toHave(doclet);
        });

        it('removes a doclet from the list of doclets that augment others when the doclet loses its `augments` property', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@extends Baz']);

          expect(store.docletsWithAugments).toHave(doclet);

          doclet.augments = undefined;

          expect(store.docletsWithAugments).not.toHave(doclet);
        });

        it('does nothing when a doclet augmented A, but it now augments B instead', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@extends Baz']);

          expect(store.docletsWithAugments).toHave(doclet);

          doclet.augments[0] = 'Qux';

          expect(store.docletsWithAugments).toHave(doclet);
        });
      });

      describe('`borrowed`', () => {
        it('adds a doclet to the list of doclets that borrow others when the doclet gains a `borrowed` value', () => {
          const doclet = makeDoclet(['@function', '@memberof Foo', '@name bar', '@instance']);

          expect(store.docletsWithBorrowed).not.toHave(doclet);

          doclet.borrowed = [{ from: 'Baz#bar' }];

          expect(store.docletsWithBorrowed).toHave(doclet);
        });

        it('removes a doclet from the list of doclets that borrow others when the doclet loses all `borrowed` values', () => {
          const doclet = makeDoclet([
            '@function',
            '@memberof Foo',
            '@name bar',
            '@instance',
            '@borrows Baz#bar',
          ]);

          expect(store.docletsWithBorrowed).toHave(doclet);

          doclet.borrowed.pop();

          expect(store.docletsWithBorrowed).not.toHave(doclet);
        });

        it('removes a doclet from the list of doclets that borrow others when the doclet loses its `borrowed` property', () => {
          const doclet = makeDoclet([
            '@function',
            '@memberof Foo',
            '@name bar',
            '@instance',
            '@borrows Baz#bar',
          ]);

          expect(store.docletsWithBorrowed).toHave(doclet);

          doclet.borrowed = undefined;

          expect(store.docletsWithBorrowed).not.toHave(doclet);
        });

        it('does nothing when a doclet borrowed A, but it now borrows B instead', () => {
          const doclet = makeDoclet([
            '@function',
            '@memberof Foo',
            '@name bar',
            '@instance',
            '@borrows Baz#bar',
          ]);

          expect(store.docletsWithBorrowed).toHave(doclet);

          doclet.borrowed[0] = { from: 'Qux#bar' };

          expect(store.docletsWithBorrowed).toContain(doclet);
        });
      });

      describe('`ignore`', () => {
        it('marks the doclet as unused when added', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(store.doclets).toHave(doclet);
          expect(store.unusedDoclets).not.toHave(doclet);

          doclet.ignore = true;

          expect(store.doclets).not.toHave(doclet);
          expect(store.unusedDoclets).toHave(doclet);
        });

        it('marks the doclet as visible when removed', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@ignore']);

          expect(store.doclets).not.toHave(doclet);
          expect(store.unusedDoclets).toHave(doclet);

          doclet.ignore = undefined;

          expect(store.doclets).toHave(doclet);
          expect(store.unusedDoclets).not.toHave(doclet);
        });
      });

      describe('`implements`', () => {
        it('adds a doclet to the list of doclets that implement others when the doclet gains an `implements` value', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(store.docletsWithImplements).not.toHave(doclet);

          doclet.implements = ['IBar'];

          expect(store.docletsWithImplements).toHave(doclet);
        });

        it('removes a doclet from the list of doclets that implement others when the doclet loses all `implements` values', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@implements IBar']);

          expect(store.docletsWithImplements).toHave(doclet);

          doclet.implements.pop();

          expect(store.docletsWithImplements).not.toHave(doclet);
        });

        it('removes a doclet from the list of doclets that implement others when the doclet loses its `implements` property', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@implements IBar']);

          expect(store.docletsWithImplements).toHave(doclet);

          doclet.implements = undefined;

          expect(store.docletsWithImplements).not.toHave(doclet);
        });

        it('does nothing when a doclet implemented A, but it now implements B instead', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@implements IBar']);

          expect(store.docletsWithImplements).toHave(doclet);

          doclet.implements[0] = 'IBaz';

          expect(store.docletsWithImplements).toHave(doclet);
        });
      });

      describe('`kind`', () => {
        it('adds a doclet to the list of doclets with that `kind`', () => {
          const doclet = makeDoclet(['@function', '@name foo']);

          expect(store.docletsByKind.get('function')).toHave(doclet);
        });

        it('removes a doclet from the list of doclets for a kind when the kind changes', () => {
          const doclet = makeDoclet(['@function', '@name foo']);

          expect(store.docletsByKind.get('constant')).not.toHave(doclet);
          expect(store.docletsByKind.get('function')).toHave(doclet);

          doclet.kind = 'constant';

          expect(store.docletsByKind.get('constant')).toHave(doclet);
          expect(store.docletsByKind.get('function')).not.toHave(doclet);
        });

        // Doclets should always have a `kind`, so this test is just for completeness.
        it('removes a doclet from the list of doclets for a kind when the doclet loses its kind', () => {
          const doclet = makeDoclet(['@function', '@name foo']);

          expect(store.docletsByKind.get('function')).toHave(doclet);

          doclet.kind = 'undefined';

          expect(store.docletsByKind.get('function')).not.toHave(doclet);
        });

        it('adds a doclet to the list of global doclets when it gains a `kind` that can be global', () => {
          const doclet = makeDoclet(['@class', '@name foo', '@global']);

          expect(store.globals).toBeEmptySet();

          doclet.kind = 'function';

          expect(store.globals).toHave(doclet);
        });

        it('removes a doclet from the list of global doclets when its new `kind` cannot be global', () => {
          const doclet = makeDoclet(['@function', '@name foo', '@global']);

          expect(store.globals).toHave(doclet);

          doclet.kind = 'class';

          expect(store.globals).toBeEmptySet();
        });

        it('does not treat the values of other properties as kinds', () => {
          const doclet = makeDoclet(['@function', '@name foo']);

          doclet.ignore = true;
          doclet.ignore = 'hello';

          expect(store.docletsByKind.get('hello')).toBeUndefined();
        });
      });

      describe('`listens`', () => {
        it('adds a doclet to the list of listeners when the doclet gains a `listens` value', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(store.listenersByListensTo.get('event:baz')).toBeUndefined();

          doclet.listens = ['event:baz'];

          expect(store.listenersByListensTo.get('event:baz')).toHave(doclet);
        });

        it('removes a doclet from the list of listeners when the doclet loses all `listens` values', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@listens event:baz']);

          expect(store.listenersByListensTo.get('event:baz')).toHave(doclet);

          doclet.listens.pop();

          expect(store.listenersByListensTo.get('event:baz')).toBeUndefined();
        });

        it('removes a doclet from the list of listeners when the doclet loses its `listens` property', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@listens event:baz']);

          expect(store.listenersByListensTo.get('event:baz')).toHave(doclet);

          doclet.listens = undefined;

          expect(store.listenersByListensTo.get('event:baz')).toBeUndefined();
        });

        it('changes the longname that a doclet listens to when needed', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@listens event:baz']);

          expect(store.listenersByListensTo.get('event:baz')).toHave(doclet);
          expect(store.listenersByListensTo.get('event:qux')).toBeUndefined();

          doclet.listens[0] = 'event:qux';

          expect(store.listenersByListensTo.get('event:baz')).toBeUndefined();
          expect(store.listenersByListensTo.get('event:qux')).toHave(doclet);
        });

        it('does not treat the values of other properties as `listens` values', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@listens event:baz']);

          doclet.ignore = true;
          doclet.ignore = 'hello';

          expect(store.listenersByListensTo.get('hello')).toBeUndefined();
        });
      });

      describe('`longname`', () => {
        it('tracks a doclet by its new longname after it changes', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(store.docletsByLongname.get('foo.Bar')).toHave(doclet);
          expect(store.docletsByLongname.get('zoo.Bar')).toBeUndefined();

          doclet.memberof = 'zoo';
          doclet.longname = 'zoo.Bar';

          expect(store.docletsByLongname.get('foo.Bar')).toBeUndefined();
          expect(store.docletsByLongname.get('zoo.Bar')).toHave(doclet);
        });

        it('does not treat the values of other properties as longnames', () => {
          const doclet = makeDoclet(['@function', '@name foo']);

          doclet.undocumented = true;

          expect(store.allDocletsByLongname.get(true)).toBeUndefined();
        });

        it('does not track a doclet by longname if it is no longer visible', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(store.docletsByLongname.get('foo.Bar')).toHave(doclet);

          doclet.undocumented = true;

          expect(store.docletsByLongname.get('foo.Bar')).toBeUndefined();
        });
      });

      describe('`memberof`', () => {
        it('tracks a doclet by its new memberof after it changes', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(store.docletsByMemberof.get('foo')).toHave(doclet);
          expect(store.docletsByMemberof.get('zoo')).toBeUndefined();

          doclet.memberof = 'zoo';
          doclet.longname = 'zoo.Bar';

          expect(store.docletsByMemberof.get('foo')).toBeUndefined();
          expect(store.docletsByMemberof.get('zoo')).toHave(doclet);
        });

        it('does not treat the values of other properties as `memberof` values', () => {
          const doclet = makeDoclet(['@function', '@name bar', '@memberof foo']);

          doclet.ignore = true;
          doclet.ignore = 'hello';

          expect(store.docletsByMemberof.get('hello')).toBeUndefined();
        });
      });

      describe('`mixes`', () => {
        it('adds a doclet to the list of doclets that mix in others when the doclet gains a `mixes` value', () => {
          const doclet = makeDoclet(['@class', '@name Foo']);

          expect(store.docletsWithMixes).not.toHave(doclet);

          doclet.mixes = ['bar'];

          expect(store.docletsWithMixes).toHave(doclet);
        });

        it('removes a doclet from the list of doclets that mix in others when the doclet loses all `mixes` values', () => {
          const doclet = makeDoclet(['@class', '@name Foo', '@mixes bar']);

          expect(store.docletsWithMixes).toHave(doclet);

          doclet.mixes.pop();

          expect(store.docletsWithMixes).not.toHave(doclet);
        });

        it('removes a doclet from the list of doclets that mix in others when the doclet loses its `mixes` property', () => {
          const doclet = makeDoclet(['@class', '@name Foo', '@mixes bar']);

          expect(store.docletsWithMixes).toHave(doclet);

          doclet.mixes = undefined;

          expect(store.docletsWithMixes).not.toHave(doclet);
        });

        it('does nothing when a doclet mixed in A, but it now mixes in B instead', () => {
          const doclet = makeDoclet(['@class', '@name Foo', '@mixes bar']);

          expect(store.docletsWithMixes).toHave(doclet);

          doclet.mixes[0] = 'baz';

          expect(store.docletsWithMixes).toContain(doclet);
        });
      });

      describe('`scope`', () => {
        it('adds a doclet to the list of global doclets when it gains global scope', () => {
          const doclet = makeDoclet(['@function', '@name foo']);

          expect(store.globals).toBeEmptySet();

          doclet.scope = 'global';

          expect(store.globals).toHave(doclet);
        });

        it('removes a doclet from the list of global doclets when it loses global scope', () => {
          const doclet = makeDoclet(['@function', '@name foo', '@global']);

          expect(store.globals).toHave(doclet);

          doclet.scope = 'static';

          expect(store.globals).toBeEmptySet();
        });
      });

      describe('`undocumented`', () => {
        it('marks the doclet as unused when added', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar']);

          expect(store.doclets).toHave(doclet);
          expect(store.unusedDoclets).not.toHave(doclet);

          doclet.undocumented = true;

          expect(store.doclets).not.toHave(doclet);
          expect(store.unusedDoclets).toHave(doclet);
        });

        it('marks the doclet as visible when removed', () => {
          const doclet = makeDoclet(['@class', '@memberof foo', '@name Bar', '@undocumented']);

          expect(store.doclets).not.toHave(doclet);
          expect(store.unusedDoclets).toHave(doclet);

          doclet.undocumented = undefined;

          expect(store.doclets).toHave(doclet);
          expect(store.unusedDoclets).not.toHave(doclet);
        });
      });
    });

    describe('sourcePaths', () => {
      it('is an empty array if there are no visible doclets', () => {
        expect(store.sourcePaths).toBeEmptyArray();
      });

      it('is a list of source paths if there are visible doclets', () => {
        const metaA = {
          filename: '/Users/carolr/code/foo.js',
          lineno: 1,
        };
        const metaB = {
          filename: '/Users/carolr/code/bar.js',
          lineno: 1,
        };

        makeDoclet(['@function', '@name baz'], metaA);
        makeDoclet(['@function', '@name qux'], metaB);

        expect(store.sourcePaths).toEqual([
          '/Users/carolr/code/foo.js',
          '/Users/carolr/code/bar.js',
        ]);
      });
    });
  });
});

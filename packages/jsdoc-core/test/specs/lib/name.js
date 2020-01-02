describe('@jsdoc/core.name', () => {
    const { name } = require('@jsdoc/core');

    it('exists', () => {
        expect(name).toBeObject();
    });

    it('has an applyNamespace method', () => {
        expect(name.applyNamespace).toBeFunction();
    });

    it('has a fromParts method', () => {
        expect(name.fromParts).toBeFunction();
    });

    it('has a getBasename method', () => {
        expect(name.getBasename).toBeFunction();
    });

    it('has a hasAncestor method', () => {
        expect(name.hasAncestor).toBeFunction();
    });

    it('has a hasLeadingScope method', () => {
        expect(name.hasLeadingScope).toBeFunction();
    });

    it('has a hasTrailingScope method', () => {
        expect(name.hasTrailingScope).toBeFunction();
    });

    it('has a LONGNAMES enum', () => {
        expect(name.LONGNAMES).toBeObject();
    });

    it('has a longnamesToTree method', () => {
        expect(name.longnamesToTree).toBeFunction();
    });

    it('has a MODULE_NAMESPACE property', () => {
        expect(name.MODULE_NAMESPACE).toBeString();
    });

    it('has a nameIsLongname method', () => {
        expect(name.nameIsLongname).toBeFunction();
    });

    it('has a prototypeToPunc method', () => {
        expect(name.prototypeToPunc).toBeFunction();
    });

    it('has a PUNC_TO_SCOPE enum', () => {
        expect(name.PUNC_TO_SCOPE).toBeObject();
    });

    it('has a SCOPE enum', () => {
        expect(name.SCOPE).toBeObject();
    });

    it('has a SCOPE_TO_PUNC enum', () => {
        expect(name.SCOPE_TO_PUNC).toBeObject();
    });

    it('has a splitNameAndDescription method', () => {
        expect(name.splitNameAndDescription).toBeFunction();
    });

    it('has a stripNamespace method', () => {
        expect(name.stripNamespace).toBeFunction();
    });

    it('has a stripVariation method', () => {
        expect(name.stripVariation).toBeFunction();
    });

    it('has a toParts method', () => {
        expect(name.toParts).toBeFunction();
    });

    describe('applyNamespace', () => {
        it('applies the namespace to the name part of the longname', () => {
            expect(name.applyNamespace('lib.Panel#open', 'event')).toBe('lib.Panel#event:open');
        });

        it('applies the namespace to the start of a top-level longname', () => {
            expect(name.applyNamespace('math/bigint', 'module')).toBe('module:math/bigint');
        });

        // TODO(hegemonic): This has never worked
        xit('handles longnames with quoted portions', () => {
            expect(name.applyNamespace('foo."*don\'t.look~in#here!"', 'event'))
                .toBe('foo.event:"*don\'t.look~in#here!"');
        });

        it('handles longnames that already have namespaces', () => {
            expect(name.applyNamespace('lib.Panel#event:open', 'event'))
                .toBe('lib.Panel#event:open');
        });
    });

    xdescribe('fromParts', () => {
        // TODO: tests
    });

    describe('getBasename', () => {
        it('returns null on empty input', () => {
            expect(name.getBasename()).toBeNull();
        });

        it('returns the original value if it has no punctuation except underscores', () => {
            expect(name.getBasename('foo_bar')).toBe('foo_bar');
        });

        it('returns the basename if the original value has punctuation', () => {
            expect(name.getBasename('foo.Bar#baz')).toBe('foo');
        });
    });

    describe('hasAncestor', () => {
        it('returns false if no parent is specified', () => {
            expect(name.hasAncestor(null, 'foo')).toBe(false);
        });

        it('returns false if no child is specified', () => {
            expect(name.hasAncestor('foo')).toBe(false);
        });

        it('returns true when the ancestor is the immediate parent', () => {
            expect(name.hasAncestor('module:foo', 'module:foo~bar')).toBe(true);
        });

        it('returns true when the ancestor is not the immediate parent', () => {
            expect(name.hasAncestor('module:foo', 'module:foo~bar.Baz#qux')).toBe(true);
        });

        it('returns false when a non-ancestor is passed in', () => {
            expect(name.hasAncestor('module:foo', 'foo')).toBe(false);
        });

        it('returns false if the parent and child are the same', () => {
            expect(name.hasAncestor('module:foo', 'module:foo')).toBe(false);
        });
    });

    describe('hasLeadingScope', () => {
        it('returns true if the string starts with a scope character', () => {
            expect(name.hasLeadingScope('#foo')).toBeTrue();
        });

        it('returns false if the string does not start with a scope character', () => {
            expect(name.hasLeadingScope('!foo')).toBeFalse();
        });
    });

    describe('hasTrailingScope', () => {
        it('returns true if the string ends with a scope character', () => {
            expect(name.hasTrailingScope('Foo#')).toBeTrue();
        });

        it('returns false if the string does not end with a scope character', () => {
            expect(name.hasTrailingScope('Foo!')).toBeFalse();
        });
    });

    describe('LONGNAMES', () => {
        it('has an ANONYMOUS property', () => {
            expect(name.LONGNAMES.ANONYMOUS).toBeString();
        });

        it('has a GLOBAL property', () => {
            expect(name.LONGNAMES.GLOBAL).toBeString();
        });
    });

    xdescribe('longnamesToTree', () => {
        // TODO: tests
    });

    describe('MODULE_NAMESPACE', () => {
        // This is just a string, so nothing to test.
    });

    xdescribe('nameIsLongname', () => {
        // TODO(hegemonic)
    });

    xdescribe('prototypeToPunc', () => {
        // TODO(hegemonic)
    });

    describe('PUNC_TO_SCOPE', () => {
        it('has the same number of properties as SCOPE_TO_PUNC', () => {
            expect(Object.keys(name.PUNC_TO_SCOPE).length)
                .toBe(Object.keys(name.SCOPE_TO_PUNC).length);
        });
    });

    describe('SCOPE', () => {
        const SCOPE = name.SCOPE;

        it('has a NAMES enum', () => {
            expect(SCOPE.NAMES).toBeObject();
        });

        it('has a PUNC enum', () => {
            expect(SCOPE.PUNC).toBeObject();
        });

        describe('NAMES', () => {
            it('has a GLOBAL property', () => {
                expect(SCOPE.NAMES.GLOBAL).toBeString();
            });

            it('has an INNER property', () => {
                expect(SCOPE.NAMES.INNER).toBeString();
            });

            it('has an INSTANCE property', () => {
                expect(SCOPE.NAMES.INSTANCE).toBeString();
            });

            it('has a STATIC property', () => {
                expect(SCOPE.NAMES.STATIC).toBeString();
            });
        });

        describe('PUNC', () => {
            it('has an INNER property', () => {
                expect(SCOPE.PUNC.INNER).toBeString();
            });

            it('has an INSTANCE property', () => {
                expect(SCOPE.PUNC.INSTANCE).toBeString();
            });

            it('has a STATIC property', () => {
                expect(SCOPE.PUNC.STATIC).toBeString();
            });
        });
    });

    describe('SCOPE_TO_PUNC', () => {
        it('has an inner property', () => {
            expect(name.SCOPE_TO_PUNC.inner).toBeString();
        });

        it('has an instance property', () => {
            expect(name.SCOPE_TO_PUNC.instance).toBeString();
        });

        it('has a static property', () => {
            expect(name.SCOPE_TO_PUNC.static).toBeString();
        });
    });

    describe('splitNameAndDescription', () => {
        // TODO(hegemonic): This has never worked
        xit('separates the name from the description', () => {
            const parts = name.splitNameAndDescription(
                'ns.Page#"last \\"sentence\\"".words~sort(2)   - This is a description. '
            );

            expect(parts.name).toBe('ns.Page#"last \\"sentence\\"".words~sort(2)');
            expect(parts.description).toBe('This is a description.');
        });

        it('strips a separator when it starts on the same line as the name', () => {
            const parts = name.splitNameAndDescription(
                'socket - The networking kind, not the wrench.'
            );

            expect(parts.name).toBe('socket');
            expect(parts.description).toBe('The networking kind, not the wrench.');
        });

        it('does not strip a separator that is preceded by a line break', () => {
            const parts = name.splitNameAndDescription(
                'socket\n - The networking kind, not the wrench.'
            );

            expect(parts.name).toBe('socket');
            expect(parts.description).toBe('- The networking kind, not the wrench.');
        });

        it('allows default values to contain square brackets', () => {
            const parts = name.splitNameAndDescription(
                '[path=["home", "user"]] - Path split into components'
            );

            expect(parts.name).toBe('[path=["home", "user"]]');
            expect(parts.description).toBe('Path split into components');
        });

        it('allows default values to contain unmatched square brackets inside strings', () => {
            const parts = name.splitNameAndDescription(
                '[path=["Unmatched begin: ["]] - Path split into components'
            );

            expect(parts.name).toBe('[path=["Unmatched begin: ["]]');
            expect(parts.description).toBe('Path split into components');
        });

        it('fails gracefully when the default value has an unmatched square bracket', () => {
            const parts = name.splitNameAndDescription(
                '[path=["home", "user"] - Path split into components'
            );

            expect(parts).toBeObject();
            expect(parts.name).toBe('[path=["home", "user"]');
            expect(parts.description).toBe('Path split into components');
        });

        it('fails gracefully when the default value has an unmatched quote', () => {
            const parts = name.splitNameAndDescription(
                '[path=["home", "user] - Path split into components'
            );

            expect(parts).toBeObject();
            expect(parts.name).toBe('[path=["home", "user]');
            expect(parts.description).toBe('Path split into components');
        });
    });

    describe('stripNamespace', () => {
        it('removes the namespace from the longname', () => {
            expect(name.stripNamespace('module:foo/bar/baz')).toBe('foo/bar/baz');
        });

        it('does not remove the namespace from a child member', () => {
            expect(name.stripNamespace('foo/bar.baz~event:qux')).toBe('foo/bar.baz~event:qux');
        });

        it('does not change longnames that do not have a namespace', () => {
            expect(name.stripNamespace('Foo#bar')).toBe('Foo#bar');
        });
    });

    describe('stripVariation', () => {
        it('does not change longnames with no variation', () => {
            expect(name.stripVariation('Foo#bar')).toBe('Foo#bar');
        });

        it('removes the variation if present', () => {
            expect(name.stripVariation('Foo#bar(qux)')).toBe('Foo#bar');
        });
    });

    describe('toParts', () => {
        it('breaks up a longname into the correct parts', () => {
            const parts = name.toParts('lib.Panel#open');

            expect(parts.name).toBe('open');
            expect(parts.memberof).toBe('lib.Panel');
            expect(parts.scope).toBe('#');
        });

        it('handles static names', () => {
            const parts = name.toParts('elements.selected.getVisible');

            expect(parts.name).toBe('getVisible');
            expect(parts.memberof).toBe('elements.selected');
            expect(parts.scope).toBe('.');
        });

        it('handles members of a prototype', () => {
            const parts = name.toParts('Validator.prototype.$element');

            expect(parts.name).toEqual('$element');
            expect(parts.memberof).toEqual('Validator');
            expect(parts.scope).toEqual('#');
        });

        it('handles inner names', () => {
            const parts = name.toParts('Button~_onclick');

            expect(parts.name).toEqual('_onclick');
            expect(parts.memberof).toEqual('Button');
            expect(parts.scope).toEqual('~');
        });

        it('handles global names', () => {
            const parts = name.toParts('close');

            expect(parts.name).toEqual('close');
            expect(parts.memberof).toEqual('');
            expect(parts.scope).toEqual('');
        });

        it('handles a single property that uses bracket notation', () => {
            const parts = name.toParts('channels["#ops"]#open');

            expect(parts.name).toEqual('open');
            expect(parts.memberof).toEqual('channels."#ops"');
            expect(parts.scope).toEqual('#');
        });

        it('handles consecutive properties that use bracket notation', () => {
            const parts = name.toParts('channels["#bots"]["log.max"]');

            expect(parts.name).toEqual('"log.max"');
            expect(parts.memberof).toEqual('channels."#bots"');
            expect(parts.scope).toEqual('.');
        });

        it('handles a property that uses single-quoted bracket notation', () => {
            const parts = name.toParts("channels['#ops']");

            expect(parts.name).toBe("'#ops'");
            expect(parts.memberof).toBe('channels');
            expect(parts.scope).toBe('.');
        });

        it('handles double-quoted strings', () => {
            const parts = name.toParts('"foo.bar"');

            expect(parts.name).toEqual('"foo.bar"');
            expect(parts.longname).toEqual('"foo.bar"');
            expect(parts.memberof).toEqual('');
            expect(parts.scope).toEqual('');
        });

        it('handles single-quoted strings', () => {
            const parts = name.toParts("'foo.bar'");

            expect(parts.name).toBe("'foo.bar'");
            expect(parts.longname).toBe("'foo.bar'");
            expect(parts.memberof).toBe('');
            expect(parts.scope).toBe('');
        });

        it('handles variations', () => {
            const parts = name.toParts('anim.fadein(2)');

            expect(parts.variation).toEqual('2');
            expect(parts.name).toEqual('fadein');
            expect(parts.longname).toEqual('anim.fadein(2)');
        });
    });
});

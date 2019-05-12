describe('jsdoc/name', () => {
    const { Doclet } = require('jsdoc/doclet');
    const name = require('jsdoc/name');

    it('should exist', () => {
        expect(name).toBeDefined();
        expect(typeof name).toBe('object');
    });

    it("should export a 'resolve' function", () => {
        expect(name.resolve).toBeDefined();
        expect(typeof name.resolve).toBe('function');
    });

    it("should export an 'applyNamespace' function", () => {
        expect(name.applyNamespace).toBeDefined();
        expect(typeof name.applyNamespace).toBe('function');
    });

    it('should export a "stripNamespace" function', () => {
        expect(typeof name.stripNamespace).toBe('function');
    });

    it('should export a "hasAncestor" function', () => {
        expect(typeof name.hasAncestor).toBe('function');
    });

    // TODO: add tests for other exported constants
    it('should export a SCOPE enum', () => {
        expect(name.SCOPE).toBeDefined();
        expect(typeof name.SCOPE).toBe('object');
    });

    it("should export a 'shorten' function", () => {
        expect(name.shorten).toBeDefined();
        expect(typeof name.shorten).toBe('function');
    });

    it('should export a "combine" function', () => {
        expect(name.combine).toBeDefined();
        expect(typeof name.combine).toBe('function');
    });

    it('should export a "stripVariation" function', () => {
        expect(typeof name.stripVariation).toBe('function');
    });

    it('should export a "longnamesToTree" function', () => {
        expect(name.longnamesToTree).toBeDefined();
        expect(typeof name.longnamesToTree).toBe('function');
    });

    it("should export a 'splitName' function", () => {
        expect(name.splitName).toBeDefined();
        expect(typeof name.splitName).toBe('function');
    });

    describe('SCOPE', () => {
        const SCOPE = name.SCOPE;

        it('should have a "NAMES" property', () => {
            expect(SCOPE.NAMES).toBeDefined();
            expect(typeof SCOPE.NAMES).toBe('object');
        });

        it('should have a "PUNC" property', () => {
            expect(SCOPE.PUNC).toBeDefined();
            expect(typeof SCOPE.PUNC).toBe('object');
        });

        describe('NAMES', () => {
            it('should have a "GLOBAL" property', () => {
                expect(SCOPE.NAMES.GLOBAL).toBeDefined();
                expect(typeof SCOPE.NAMES.GLOBAL).toBe('string');
            });

            it('should have an "INNER" property', () => {
                expect(SCOPE.NAMES.INNER).toBeDefined();
                expect(typeof SCOPE.NAMES.INNER).toBe('string');
            });

            it('should have an "INSTANCE" property', () => {
                expect(SCOPE.NAMES.INSTANCE).toBeDefined();
                expect(typeof SCOPE.NAMES.INSTANCE).toBe('string');
            });

            it('should have a "STATIC" property', () => {
                expect(SCOPE.NAMES.STATIC).toBeDefined();
                expect(typeof SCOPE.NAMES.STATIC).toBe('string');
            });
        });

        describe('PUNC', () => {
            it('should have an "INNER" property', () => {
                expect(SCOPE.PUNC.INNER).toBeDefined();
                expect(typeof SCOPE.PUNC.INNER).toBe('string');
            });

            it('should have an "INSTANCE" property', () => {
                expect(SCOPE.PUNC.INSTANCE).toBeDefined();
                expect(typeof SCOPE.PUNC.INSTANCE).toBe('string');
            });

            it('should have a "STATIC" property', () => {
                expect(SCOPE.PUNC.STATIC).toBeDefined();
                expect(typeof SCOPE.PUNC.STATIC).toBe('string');
            });
        });
    });

    describe('shorten', () => {
        it('should break up a longname into the correct memberof, name and scope parts', () => {
            const startName = 'lib.Panel#open';
            const parts = name.shorten(startName);

            expect(parts.name).toEqual('open');
            expect(parts.memberof).toEqual('lib.Panel');
            expect(parts.scope).toEqual('#');
        });

        it('should work on static names', () => {
            const startName = 'elements.selected.getVisible';
            const parts = name.shorten(startName);

            expect(parts.name).toEqual('getVisible');
            expect(parts.memberof).toEqual('elements.selected');
            expect(parts.scope).toEqual('.');
        });

        it('should work on protoyped names', () => {
            const startName = 'Validator.prototype.$element';
            const parts = name.shorten(startName);

            expect(parts.name).toEqual('$element');
            expect(parts.memberof).toEqual('Validator');
            expect(parts.scope).toEqual('#');
        });

        it('should work on inner names', () => {
            const startName = 'Button~_onclick';
            const parts = name.shorten(startName);

            expect(parts.name).toEqual('_onclick');
            expect(parts.memberof).toEqual('Button');
            expect(parts.scope).toEqual('~');
        });

        it('should work on global names', () => {
            const startName = 'close';
            const parts = name.shorten(startName);

            expect(parts.name).toEqual('close');
            expect(parts.memberof).toEqual('');
            expect(parts.scope).toEqual('');
        });

        it('should work when a single property uses bracket notation', () => {
            const startName = 'channels["#ops"]#open';
            const parts = name.shorten(startName);

            expect(parts.name).toEqual('open');
            expect(parts.memberof).toEqual('channels."#ops"');
            expect(parts.scope).toEqual('#');
        });

        it('should work when consecutive properties use bracket notation', () => {
            const startName = 'channels["#bots"]["log.max"]';
            const parts = name.shorten(startName);

            expect(parts.name).toEqual('"log.max"');
            expect(parts.memberof).toEqual('channels."#bots"');
            expect(parts.scope).toEqual('.');
        });

        it('should work when a property uses single-quoted bracket notation', () => {
            const startName = "channels['#ops']";
            const parts = name.shorten(startName);

            expect(parts.name).toBe("'#ops'");
            expect(parts.memberof).toBe('channels');
            expect(parts.scope).toBe('.');
        });

        it('should work on double-quoted strings', () => {
            const startName = '"foo.bar"';
            const parts = name.shorten(startName);

            expect(parts.name).toEqual('"foo.bar"');
            expect(parts.longname).toEqual('"foo.bar"');
            expect(parts.memberof).toEqual('');
            expect(parts.scope).toEqual('');
        });

        it('should work on single-quoted strings', () => {
            const startName = "'foo.bar'";
            const parts = name.shorten(startName);

            expect(parts.name).toBe("'foo.bar'");
            expect(parts.longname).toBe("'foo.bar'");
            expect(parts.memberof).toBe('');
            expect(parts.scope).toBe('');
        });

        it('should find the variation', () => {
            const startName = 'anim.fadein(2)';
            const parts = name.shorten(startName);

            expect(parts.variation).toEqual('2');
            expect(parts.name).toEqual('fadein');
            expect(parts.longname).toEqual('anim.fadein(2)');
        });
    });

    describe('applyNamespace', () => {
        it('should insert the namespace only before the name part of the longname', () => {
            const startName = 'lib.Panel#open';
            const endName = name.applyNamespace(startName, 'event');

            expect(endName, 'lib.Panel#event:open');
        });

        it('should insert the namespace before a global name', () => {
            const startName = 'maths/bigint';
            const endName = name.applyNamespace(startName, 'module');

            expect(endName, 'module:maths/bigint');
        });

        it('should treat quoted parts of the name as atomic and insert namespace before a quoted shortname', () => {
            const startName = 'foo."*dont\'t.look~in#here!"';
            const endName = name.applyNamespace(startName, 'event');

            expect(endName, 'foo.event:"*dont\'t.look~in#here!"');
        });

        it('should not add another namespace if one already exists.', () => {
            const startName = 'lib.Panel#event:open';
            const endName = name.applyNamespace(startName, 'event');

            expect(endName, 'lib.Panel#event:open');
        });
    });

    describe('stripNamespace', () => {
        it('should not change longnames without a leading namespace', () => {
            const startName = 'Foo#bar';
            const endName = name.stripNamespace(startName);

            expect(endName).toBe(startName);
        });

        it('should not change longnames with an embedded namespace', () => {
            const startName = 'foo/bar.baz~event:qux';
            const endName = name.stripNamespace(startName);

            expect(endName).toBe(startName);
        });

        it('should remove the leading namespace, if present', () => {
            const startName = 'module:foo/bar/baz';
            const endName = name.stripNamespace(startName);

            expect(endName).toBe('foo/bar/baz');
        });
    });

    describe('hasAncestor', () => {
        it('should return false if "parent" is missing', () => {
            const hasAncestor = name.hasAncestor(null, 'foo');

            expect(hasAncestor).toBe(false);
        });

        it('should return false if "child" is missing', () => {
            const hasAncestor = name.hasAncestor('foo');

            expect(hasAncestor).toBe(false);
        });

        it('should correctly identify when the immediate parent is passed in', () => {
            const hasAncestor = name.hasAncestor('module:foo', 'module:foo~bar');

            expect(hasAncestor).toBe(true);
        });

        it('should correctly identify when an ancestor is passed in', () => {
            const hasAncestor = name.hasAncestor('module:foo', 'module:foo~bar.Baz#qux');

            expect(hasAncestor).toBe(true);
        });

        it('should correctly identify when a non-ancestor is passed in', () => {
            const hasAncestor = name.hasAncestor('module:foo', 'foo');

            expect(hasAncestor).toBe(false);
        });

        it('should not say that a longname is its own ancestor', () => {
            const hasAncestor = name.hasAncestor('module:foo', 'module:foo');

            expect(hasAncestor).toBe(false);
        });
    });

    xdescribe('combine', () => {
        // TODO: tests
    });

    describe('stripVariation', () => {
        it('should not change longnames without a variation', () => {
            const startName = 'Foo#bar';
            const endName = name.stripVariation(startName);

            expect(endName).toBe(startName);
        });

        it('should remove the variation, if present', () => {
            const startName = 'Foo#bar(qux)';
            const endName = name.stripVariation(startName);

            expect(endName).toBe('Foo#bar');
        });
    });

    xdescribe('longnamesToTree', () => {
        // TODO: tests
    });

    describe('splitName', () => {
        it('should find the name and description.', () => {
            const startName = 'ns.Page#"last \\"sentence\\"".words~sort(2)   - This is a description. ';
            const parts = name.splitName(startName);

            expect(parts.name, 'ns.Page#"last \\"sentence\\"".words~sort(2)');
            expect(parts.description, 'This is a description.');
        });

        it('should strip the separator when the separator starts on the same line as the name', () => {
            const startName = 'socket - The networking kind, not the wrench.';
            const parts = name.splitName(startName);

            expect(parts.name).toBe('socket');
            expect(parts.description).toBe('The networking kind, not the wrench.');
        });

        it('should not strip a separator that is preceded by a line break', () => {
            const startName = 'socket\n - The networking kind, not the wrench.';
            const parts = name.splitName(startName);

            expect(parts.name).toBe('socket');
            expect(parts.description).toBe('- The networking kind, not the wrench.');
        });

        it('should allow default values to have brackets', () => {
            const startName = '[path=["home", "user"]] - Path split into components';
            const parts = name.splitName(startName);

            expect(parts.name).toBe('[path=["home", "user"]]');
            expect(parts.description).toBe('Path split into components');
        });

        it('should allow default values to have unmatched brackets inside strings', () => {
            const startName = '[path=["Unmatched begin: ["]] - Path split into components';
            const parts = name.splitName(startName);

            expect(parts.name).toBe('[path=["Unmatched begin: ["]]');
            expect(parts.description).toBe('Path split into components');
        });

        it('should fail gracefully when the default value has an unmatched bracket', () => {
            const startName = '[path=["home", "user"] - Path split into components';
            const parts = name.splitName(startName);

            expect(parts).not.toBe(null);
            expect(parts.name).toBe('[path=["home", "user"]');
            expect(parts.description).toBe('Path split into components');
        });

        it('should fail gracefully when the default value has an unmatched quote', () => {
            const startName = '[path=["home", "user] - Path split into components';
            const parts = name.splitName(startName);

            expect(parts).not.toBe(null);
            expect(parts.name).toBe('[path=["home", "user]');
            expect(parts.description).toBe('Path split into components');
        });
    });

    describe('resolve', () => {
        // TODO: further tests (namespaces, modules, ...)

        function makeDoclet(tagStrings) {
            const comment = `/**\n${tagStrings.join('\n')}\n*/`;

            return new Doclet(comment, {});
        }

        describe('aliases', () => {
            // If `doclet.alias` is defined, `doclet.name` will be set to the same value by the time
            // we call `resolve()`. Therefore, we set both `@alias` and `@name` in these tests.

            it('can resolve aliases that identify instance members', () => {
                const doclet = makeDoclet(['@alias Foo#bar', '@name Foo#bar']);

                name.resolve(doclet);

                expect(doclet.name).toBe('bar');
                expect(doclet.memberof).toBe('Foo');
                expect(doclet.scope).toBe('instance');
                expect(doclet.longname).toBe('Foo#bar');
            });

            it('can resolve aliases that identify static members', () => {
                const doclet = makeDoclet(['@alias Foo.bar', '@name Foo.bar']);

                name.resolve(doclet);

                expect(doclet.name).toBe('bar');
                expect(doclet.memberof).toBe('Foo');
                expect(doclet.scope).toBe('static');
                expect(doclet.longname).toBe('Foo.bar');
            });

            it('works when the alias only specifies the short name', () => {
                const doclet = makeDoclet(['@alias bar', '@name bar', '@memberof Foo', '@instance']);

                name.resolve(doclet);

                expect(doclet.name).toBe('bar');
                expect(doclet.memberof).toBe('Foo');
                expect(doclet.scope).toBe('instance');
                expect(doclet.longname).toBe('Foo#bar');
            });
        });

        describe('events', () => {
            const event = '@event';
            const memberOf = '@memberof MyClass';
            const nameTag = '@name A';

            // Test the basic @event that is not nested.
            it('unnested @event gets resolved correctly', () => {
                const doclet = makeDoclet([event, nameTag]);

                name.resolve(doclet);

                expect(doclet.name).toEqual('A');
                expect(doclet.memberof).toBeUndefined();
                expect(doclet.longname).toEqual('event:A');
            });

            // test all permutations of @event @name [name] @memberof.
            it('@event @name @memberof resolves correctly', () => {
                const doclet = makeDoclet([event, nameTag, memberOf]);

                name.resolve(doclet);

                expect(doclet.name).toEqual('A');
                expect(doclet.memberof).toEqual('MyClass');
                expect(doclet.longname).toEqual('MyClass.event:A');
            });
            it('@event @memberof @name resolves correctly', () => {
                const doclet = makeDoclet([event, memberOf, nameTag]);

                name.resolve(doclet);

                expect(doclet.name).toEqual('A');
                expect(doclet.memberof).toEqual('MyClass');
                expect(doclet.longname).toEqual('MyClass.event:A');
            });
            it('@name @event @memberof resolves correctly', () => {
                const doclet = makeDoclet([nameTag, event, memberOf]);

                name.resolve(doclet);

                expect(doclet.name).toEqual('A');
                expect(doclet.memberof).toEqual('MyClass');
                expect(doclet.longname).toEqual('MyClass.event:A');
            });
            it('@name @memberof @event resolves correctly', () => {
                const doclet = makeDoclet([nameTag, memberOf, event]);

                name.resolve(doclet);

                expect(doclet.name).toEqual('A');
                expect(doclet.memberof).toEqual('MyClass');
                expect(doclet.longname).toEqual('MyClass.event:A');
            });
            it('@memberof @event @name resolves correctly', () => {
                const doclet = makeDoclet([memberOf, event, nameTag]);

                name.resolve(doclet);

                expect(doclet.name).toEqual('A');
                expect(doclet.memberof).toEqual('MyClass');
                expect(doclet.longname).toEqual('MyClass.event:A');
            });
            it('@memberof @name @event resolves correctly', () => {
                const doclet = makeDoclet([memberOf, nameTag, event]);

                name.resolve(doclet);

                expect(doclet.name).toEqual('A');
                expect(doclet.memberof).toEqual('MyClass');
                expect(doclet.longname).toEqual('MyClass.event:A');
            });

            // test all permutations of @event [name]  @memberof
            it('@event [name] @memberof resolves correctly', () => {
                const doclet = makeDoclet(['@event A', memberOf]);

                name.resolve(doclet);

                expect(doclet.name).toEqual('A');
                expect(doclet.memberof).toEqual('MyClass');
                expect(doclet.longname).toEqual('MyClass.event:A');
            });
            it('@memberof @event [name] resolves correctly', () => {
                const doclet = makeDoclet([memberOf, '@event A']);

                name.resolve(doclet);

                expect(doclet.name).toEqual('A');
                expect(doclet.memberof).toEqual('MyClass');
                expect(doclet.longname).toEqual('MyClass.event:A');
            });

            // test full @event A.B
            it('full @event definition works', () => {
                const doclet = makeDoclet(['@event MyClass.A']);

                name.resolve(doclet);

                expect(doclet.name).toEqual('A');
                expect(doclet.memberof).toEqual('MyClass');
                expect(doclet.longname).toEqual('MyClass.event:A');
            });
            it('full @event definition with event: works', () => {
                const doclet = makeDoclet(['@event MyClass.event:A']);

                name.resolve(doclet);

                expect(doclet.name).toEqual('event:A');
                expect(doclet.memberof).toEqual('MyClass');
                expect(doclet.longname).toEqual('MyClass.event:A');
            });

            // a double-nested one just in case
            it('@event @name MyClass.EventName @memberof somethingelse works', () => {
                const doclet = makeDoclet([event, '@name MyClass.A', '@memberof MyNamespace']);

                name.resolve(doclet);

                expect(doclet.name).toEqual('A');
                expect(doclet.memberof).toEqual('MyNamespace.MyClass');
                expect(doclet.longname).toEqual('MyNamespace.MyClass.event:A');
            });
        });

        describe('special names', () => {
            // TODO: this test doesn't test what it claims to test! copy-and-paste error?
            it('correctly handles a function parameter named "prototype"', () => {
                const doclet = makeDoclet([
                    '@name Bar.prototype.baz',
                    '@function',
                    '@memberof module:foo',
                    '@param {string} qux'
                ]);

                name.resolve(doclet);

                expect(doclet.name).toBe('baz');
                expect(doclet.memberof).toBe('module:foo.Bar');
                expect(doclet.longname).toBe('module:foo.Bar#baz');
            });
        });
    });
});

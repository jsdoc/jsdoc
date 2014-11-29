'use strict';

describe('jsdoc/name', function() {
    var jsdoc = {
        doclet: require('jsdoc/doclet'),
        name: require('jsdoc/name')
    };

    it('should exist', function() {
        expect(jsdoc.name).toBeDefined();
        expect(typeof jsdoc.name).toBe('object');
    });

    it("should export a 'resolve' function", function() {
        expect(jsdoc.name.resolve).toBeDefined();
        expect(typeof jsdoc.name.resolve).toBe('function');
    });

    it("should export an 'applyNamespace' function", function() {
        expect(jsdoc.name.applyNamespace).toBeDefined();
        expect(typeof jsdoc.name.applyNamespace).toBe('function');
    });

    // TODO: add tests for other exported constants
    it('should export a SCOPE enum', function() {
        expect(jsdoc.name.SCOPE).toBeDefined();
        expect(typeof jsdoc.name.SCOPE).toBe('object');
    });

    it("should export a 'shorten' function", function() {
        expect(jsdoc.name.shorten).toBeDefined();
        expect(typeof jsdoc.name.shorten).toBe('function');
    });

    it("should export a 'splitName' function", function() {
        expect(jsdoc.name.splitName).toBeDefined();
        expect(typeof jsdoc.name.splitName).toBe('function');
    });

    describe('SCOPE', function() {
        var SCOPE = jsdoc.name.SCOPE;

        it('should have a "NAMES" property', function() {
            expect(SCOPE.NAMES).toBeDefined();
            expect(typeof SCOPE.NAMES).toBe('object');
        });

        it('should have a "PUNC" property', function() {
            expect(SCOPE.PUNC).toBeDefined();
            expect(typeof SCOPE.PUNC).toBe('object');
        });

        describe('NAMES', function() {
            it('should have a "GLOBAL" property', function() {
                expect(SCOPE.NAMES.GLOBAL).toBeDefined();
                expect(typeof SCOPE.NAMES.GLOBAL).toBe('string');
            });

            it('should have an "INNER" property', function() {
                expect(SCOPE.NAMES.INNER).toBeDefined();
                expect(typeof SCOPE.NAMES.INNER).toBe('string');
            });

            it('should have an "INSTANCE" property', function() {
                expect(SCOPE.NAMES.INSTANCE).toBeDefined();
                expect(typeof SCOPE.NAMES.INSTANCE).toBe('string');
            });

            it('should have a "STATIC" property', function() {
                expect(SCOPE.NAMES.STATIC).toBeDefined();
                expect(typeof SCOPE.NAMES.STATIC).toBe('string');
            });
        });

        describe('PUNC', function() {
            it('should have an "INNER" property', function() {
                expect(SCOPE.PUNC.INNER).toBeDefined();
                expect(typeof SCOPE.PUNC.INNER).toBe('string');
            });

            it('should have an "INSTANCE" property', function() {
                expect(SCOPE.PUNC.INSTANCE).toBeDefined();
                expect(typeof SCOPE.PUNC.INSTANCE).toBe('string');
            });

            it('should have a "STATIC" property', function() {
                expect(SCOPE.PUNC.STATIC).toBeDefined();
                expect(typeof SCOPE.PUNC.STATIC).toBe('string');
            });
        });
    });

    describe('shorten', function() {
        it('should break up a longname into the correct memberof, name and scope parts', function() {
            var startName = 'lib.Panel#open';
            var parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('open');
            expect(parts.memberof).toEqual('lib.Panel');
            expect(parts.scope).toEqual('#');
        });

        it('should work on static names', function() {
            var startName = 'elements.selected.getVisible';
            var parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('getVisible');
            expect(parts.memberof).toEqual('elements.selected');
            expect(parts.scope).toEqual('.');
        });

        it('should work on protoyped names', function() {
            var startName = 'Validator.prototype.$element';
            var parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('$element');
            expect(parts.memberof).toEqual('Validator');
            expect(parts.scope).toEqual('#');
        });

        it('should work on inner names', function() {
            var startName = 'Button~_onclick';
            var parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('_onclick');
            expect(parts.memberof).toEqual('Button');
            expect(parts.scope).toEqual('~');
        });

        it('should work on global names', function() {
            var startName = 'close';
            var parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('close');
            expect(parts.memberof).toEqual('');
            expect(parts.scope).toEqual('');
        });

        it('should work when a single property uses bracket notation', function() {
            var startName = 'channels["#ops"]#open';
            var parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('open');
            expect(parts.memberof).toEqual('channels."#ops"');
            expect(parts.scope).toEqual('#');
        });

        it('should work when consecutive properties use bracket notation', function() {
            var startName = 'channels["#bots"]["log.max"]';
            var parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('"log.max"');
            expect(parts.memberof).toEqual('channels."#bots"');
            expect(parts.scope).toEqual('.');
        });

        it('should work when a property uses single-quoted bracket notation', function() {
            var startName = "channels['#ops']";
            var parts = jsdoc.name.shorten(startName);

            expect(parts.name).toBe("'#ops'");
            expect(parts.memberof).toBe('channels');
            expect(parts.scope).toBe('.');
        });

        it('should work on double-quoted strings', function() {
            var startName = '"foo.bar"';
            var parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('"foo.bar"');
            expect(parts.longname).toEqual('"foo.bar"');
            expect(parts.memberof).toEqual('');
            expect(parts.scope).toEqual('');
        });

        it('should work on single-quoted strings', function() {
            var startName = "'foo.bar'";
            var parts = jsdoc.name.shorten(startName);

            expect(parts.name).toBe("'foo.bar'");
            expect(parts.longname).toBe("'foo.bar'");
            expect(parts.memberof).toBe('');
            expect(parts.scope).toBe('');
        });

        it('should find the variation', function() {
            var startName = 'anim.fadein(2)';
            var parts = jsdoc.name.shorten(startName);

            expect(parts.variation).toEqual('2');
            expect(parts.name).toEqual('fadein');
            expect(parts.longname).toEqual('anim.fadein(2)');
        });
    });

    describe('applyNamespace', function() {
        it('should insert the namespace only before the name part of the longname', function() {
            var startName = 'lib.Panel#open';
            var endName = jsdoc.name.applyNamespace(startName, 'event');

            expect(endName, 'lib.Panel#event:open');
        });

        it('should insert the namespace before a global name', function() {
            var startName = 'maths/bigint';
            var endName = jsdoc.name.applyNamespace(startName, 'module');

            expect(endName, 'module:maths/bigint');
        });

        it('should treat quoted parts of the name as atomic and insert namespace before a quoted shortname', function() {
            var startName = 'foo."*dont\'t.look~in#here!"';
            var endName = jsdoc.name.applyNamespace(startName, 'event');

            expect(endName, 'foo.event:"*dont\'t.look~in#here!"');
        });

        it('should not add another namespace if one already exists.', function() {
            var startName = 'lib.Panel#event:open';
            var endName = jsdoc.name.applyNamespace(startName, 'event');

            expect(endName, 'lib.Panel#event:open');
        });
    });

    describe('splitName', function() {
        it('should find the name and description.', function() {
            var startName = 'ns.Page#"last \\"sentence\\"".words~sort(2)   - This is a description. ';
            var parts = jsdoc.name.splitName(startName);

            expect(parts.name, 'ns.Page#"last \\"sentence\\"".words~sort(2)');
            expect(parts.description, 'This is a description.');
        });

        it('should strip the separator when the separator starts on the same line as the name', function() {
            var startName = 'socket - The networking kind, not the wrench.';
            var parts = jsdoc.name.splitName(startName);

            expect(parts.name).toBe('socket');
            expect(parts.description).toBe('The networking kind, not the wrench.');
        });

        it('should not strip a separator that is preceded by a line break', function() {
            var startName = 'socket\n - The networking kind, not the wrench.';
            var parts = jsdoc.name.splitName(startName);

            expect(parts.name).toBe('socket');
            expect(parts.description).toBe('- The networking kind, not the wrench.');
        });

        it('should allow default values to have brackets', function() {
            var startName = '[path=["home", "user"]] - Path split into components';
            var parts = jsdoc.name.splitName(startName);

            expect(parts.name).toBe('[path=["home", "user"]]');
            expect(parts.description).toBe('Path split into components');
        });

        it('should allow default values to have unmatched brackets inside strings', function() {
            var startName = '[path=["Unmatched begin: ["]] - Path split into components';
            var parts = jsdoc.name.splitName(startName);

            expect(parts.name).toBe('[path=["Unmatched begin: ["]]');
            expect(parts.description).toBe('Path split into components');
        });

        it('should fail gracefully when the default value has an unmatched bracket', function() {
            var startName = '[path=["home", "user"] - Path split into components';
            var parts = jsdoc.name.splitName(startName);

            expect(parts).not.toBe(null);
            expect(parts.name).toBe('[path=["home", "user"]');
            expect(parts.description).toBe('Path split into components');
        });

        it('should fail gracefully when the default value has an unmatched quote', function() {
            var startName = '[path=["home", "user] - Path split into components';
            var parts = jsdoc.name.splitName(startName);

            expect(parts).not.toBe(null);
            expect(parts.name).toBe('[path=["home", "user]');
            expect(parts.description).toBe('Path split into components');
        });
    });

    describe('resolve', function() {
        // TODO: further tests (namespaces, modules, ...)

        function makeDoclet(tagStrings) {
            var comment = '/**\n' + tagStrings.join('\n') + '\n*/';
            return new jsdoc.doclet.Doclet(comment, {});
        }

        // @event testing.
        var event = '@event';
        var memberOf = '@memberof MyClass';
        var name = '@name A';

        // Test the basic @event that is not nested.
        it('unnested @event gets resolved correctly', function() {
            var doclet = makeDoclet([event, name]);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toBeUndefined();
            expect(doclet.longname).toEqual('event:A');
        });

        // test all permutations of @event @name [name] @memberof.
        it('@event @name @memberof resolves correctly', function() {
            var doclet = makeDoclet([event, name, memberOf]);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('@event @memberof @name resolves correctly', function() {
            var doclet = makeDoclet([event, memberOf, name]);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('@name @event @memberof resolves correctly', function() {
            var doclet = makeDoclet([name, event, memberOf]);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('@name @memberof @event resolves correctly', function() {
            var doclet = makeDoclet([name, memberOf, event]);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('@memberof @event @name resolves correctly', function() {
            var doclet = makeDoclet([memberOf, event, name]);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('@memberof @name @event resolves correctly', function() {
            var doclet = makeDoclet([memberOf, name, event]);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });

        // test all permutations of @event [name]  @memberof
        it('@event [name] @memberof resolves correctly', function() {
            var doclet = makeDoclet(['@event A', memberOf]);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('@memberof @event [name] resolves correctly', function() {
            var doclet = makeDoclet([memberOf, '@event A']);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });

        // test full @event A.B
        it('full @event definition works', function() {
            var doclet = makeDoclet(['@event MyClass.A']);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('full @event definition with event: works', function() {
            var doclet = makeDoclet(['@event MyClass.event:A']);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toEqual('event:A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });

        // a double-nested one just in case
        it('@event @name MyClass.EventName @memberof somethingelse works', function() {
            var doclet = makeDoclet([event, '@name MyClass.A', '@memberof MyNamespace']);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyNamespace.MyClass');
            expect(doclet.longname).toEqual('MyNamespace.MyClass.event:A');
        });

        // other cases
        it('correctly handles a function parameter named "prototype"', function() {
            var doclet = makeDoclet([
                '@name Bar.prototype.baz',
                '@function',
                '@memberof module:foo',
                '@param {string} qux'
            ]);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toBe('baz');
            expect(doclet.memberof).toBe('module:foo.Bar');
            expect(doclet.longname).toBe('module:foo.Bar#baz');
        });
    });
});

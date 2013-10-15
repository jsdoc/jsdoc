/*global describe: true, expect: true, it: true */

describe("jsdoc/name", function() {
    var jsdoc = {name: require('jsdoc/name'), doclet: require('jsdoc/doclet') };

    it("should exist", function() {
        expect(jsdoc.name).toBeDefined();
        expect(typeof jsdoc.name).toEqual("object");
    });

    it("should export an 'resolve' function", function() {
        expect(jsdoc.name.resolve).toBeDefined();
        expect(typeof jsdoc.name.resolve).toEqual("function");
    });

    it("should export an 'applyNamespace' function", function() {
        expect(jsdoc.name.applyNamespace).toBeDefined();
        expect(typeof jsdoc.name.applyNamespace).toEqual("function");
    });

    it("should export an 'shorten' function", function() {
        expect(jsdoc.name.shorten).toBeDefined();
        expect(typeof jsdoc.name.shorten).toEqual("function");
    });

    it("should export an 'splitName' function", function() {
        expect(jsdoc.name.splitName).toBeDefined();
        expect(typeof jsdoc.name.splitName).toEqual("function");
    });

    describe ("shorten", function() {
        it('should break up a longname into the correct memberof, name and scope parts', function() {
            var startName = 'lib.Panel#open',
                parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('open');
            expect(parts.memberof).toEqual('lib.Panel');
            expect(parts.scope).toEqual('#');
        });

        it('should work on static names', function() {
            var startName = 'elements.selected.getVisible',
                parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('getVisible');
            expect(parts.memberof).toEqual('elements.selected');
            expect(parts.scope).toEqual('.');
        });

        it('should work on protoyped names', function() {
            var startName = 'Validator.prototype.$element',
                parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('$element');
            expect(parts.memberof).toEqual('Validator');
            expect(parts.scope).toEqual('#');
        });

        it('should work on inner names.', function() {
            var startName = 'Button~_onclick',
                parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('_onclick');
            expect(parts.memberof).toEqual('Button');
            expect(parts.scope).toEqual('~');
        });

        it('should work on global names.', function() {
            var startName = 'close',
                parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('close');
            //'The memberof should be an empty string for global symbols.'
            expect(parts.memberof).toEqual('');
            //'The scope should be an empty string for global symbols.'
            expect(parts.scope).toEqual('');
        });

        it('should work on bracketed stringy names', function() {
            var startName = 'channels["#ops"]#open',
                parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('open');
            //'Bracketed stringy names should appear as quoted strings.'
            expect(parts.memberof).toEqual('channels."#ops"');
            expect(parts.scope).toEqual('#');

            startName = 'channels["#bots"]["log.max"]';
            parts = jsdoc.name.shorten(startName);

            expect(parts.name).toEqual('"log.max"');
            expect(parts.memberof).toEqual('channels."#bots"');
            expect(parts.scope).toEqual('.');
        });

        it('should work on bracketed stringy names with single quotes', function() {
            var startName = "channels['#ops']",
                parts = jsdoc.name.shorten(startName);

            expect(parts.name).toBe("'#ops'");
            expect(parts.memberof).toBe('channels');
            expect(parts.scope).toBe('.');
        });

        it('should work on fully stringy names, like "foo.bar"', function() {
            var startName = '"foo.bar"',
                parts = jsdoc.name.shorten(startName);

            //'The name should be the full quoted string.'
            expect(parts.name).toEqual('"foo.bar"');
            //'The longname should be the full quoted string.'
            expect(parts.longname).toEqual('"foo.bar"');
            //'There should be no memberof, as it is global.'
            expect(parts.memberof).toEqual('');
            //'The scope should be as global.'
            expect(parts.scope).toEqual('');
        });

        it('should work on fully stringy names in single quotes, like \'foo.bar\'', function() {
            var startName = "'foo.bar'",
                parts = jsdoc.name.shorten(startName);

            expect(parts.name).toBe("'foo.bar'");
            expect(parts.longname).toBe("'foo.bar'");
            expect(parts.memberof).toBe('');
            expect(parts.scope).toBe('');
        });

        it('should find the variation', function() {
            var startName = 'anim.fadein(2)',
                parts = jsdoc.name.shorten(startName);

            expect(parts.variation).toEqual('2');
            expect(parts.name).toEqual('fadein');
            expect(parts.longname).toEqual('anim.fadein(2)');
        });
    });

    describe("applyNamespace", function() {
        it('should insert the namespace only before the name part of the longname', function() {
            var startName = 'lib.Panel#open',
                endName = jsdoc.name.applyNamespace(startName, 'event');

            expect(endName, 'lib.Panel#event:open');
        });

        it(" should insert the namespace before a global name", function() {
            var startName = 'maths/bigint',
            endName = jsdoc.name.applyNamespace(startName, 'module');

            expect(endName, 'module:maths/bigint');
        });

        it('should treat quoted parts of the name as atomic and insert namespace before a quoted shortname', function() {
            var startName = 'foo."*dont\'t.look~in#here!"',
            endName = jsdoc.name.applyNamespace(startName, 'event');

            expect(endName, 'foo.event:"*dont\'t.look~in#here!"');
        });

        it('should not add another namespace if one already exists.', function() {
            var startName = 'lib.Panel#event:open',
                endName = jsdoc.name.applyNamespace(startName, 'event');

            expect(endName, 'lib.Panel#event:open');
        });
    });

    describe("splitName", function() {
        it('should find the name and description.', function() {
            var startName = 'ns.Page#"last \\"sentence\\"".words~sort(2)   - This is a description. ',
                parts = jsdoc.name.splitName(startName);

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
    });

    describe("resolve", function() {
        // TODO: further tests (namespaces, modules, ...)
    
        function makeDoclet(bits) {
            var comment = '/**\n' + bits.join('\n') + '\n*/';
            return new jsdoc.doclet.Doclet(comment, {});
        }

        // @event testing.
        var event = '@event';
        var memberOf = '@memberof MyClass';
        var name = '@name A';

        // Test the basic @event that is not nested.
        it('unnested @event gets resolved correctly', function() {
            var doclet = makeDoclet([event, name]),
                out = jsdoc.name.resolve(doclet);
            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toBeUndefined();
            expect(doclet.longname).toEqual('event:A');
        });

        // test all permutations of @event @name [name] @memberof.
        it('@event @name @memberof resolves correctly', function() {
            var doclet = makeDoclet([event, name, memberOf]),
                out = jsdoc.name.resolve(doclet);
            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('@event @memberof @name resolves correctly', function() {
            var doclet = makeDoclet([event, memberOf, name]),
                out = jsdoc.name.resolve(doclet);
            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('@name @event @memberof resolves correctly', function() {
            var doclet = makeDoclet([name, event, memberOf]),
                out = jsdoc.name.resolve(doclet);
            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('@name @memberof @event resolves correctly', function() {
            var doclet = makeDoclet([name, memberOf, event]),
                out = jsdoc.name.resolve(doclet);
            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('@memberof @event @name resolves correctly', function() {
            var doclet = makeDoclet([memberOf, event, name]),
                out = jsdoc.name.resolve(doclet);
            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('@memberof @name @event resolves correctly', function() {
            var doclet = makeDoclet([memberOf, name, event]),
                out = jsdoc.name.resolve(doclet);
            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });

        // test all permutations of @event [name]  @memberof
        it('@event [name] @memberof resolves correctly', function() {
            var doclet = makeDoclet(['@event A', memberOf]),
                out = jsdoc.name.resolve(doclet);
            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('@memberof @event [name] resolves correctly', function() {
            var doclet = makeDoclet([memberOf, '@event A']),
                out = jsdoc.name.resolve(doclet);
            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });

        // test full @event A.B
        it('full @event definition works', function() {
            var doclet = makeDoclet(['@event MyClass.A']),
                out = jsdoc.name.resolve(doclet);
            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });
        it('full @event definition with event: works', function() {
            var doclet = makeDoclet(['@event MyClass.event:A']),
                out = jsdoc.name.resolve(doclet);
            expect(doclet.name).toEqual('event:A');
            expect(doclet.memberof).toEqual('MyClass');
            expect(doclet.longname).toEqual('MyClass.event:A');
        });

        // a double-nested one just in case
        it('@event @name MyClass.EventName @memberof somethingelse works', function() {
            var doclet = makeDoclet([event, '@name MyClass.A', '@memberof MyNamespace']),
                out = jsdoc.name.resolve(doclet);
            expect(doclet.name).toEqual('A');
            expect(doclet.memberof).toEqual('MyNamespace.MyClass');
            expect(doclet.longname).toEqual('MyNamespace.MyClass.event:A');
        });

        // other cases
        it('correctly handles a function parameter named "prototype"', function() {
            var doclet = makeDoclet(['@name Bar.prototype.baz', '@function', '@memberof module:foo',
                '@param {string} qux']);
            var out = jsdoc.name.resolve(doclet);

            expect(doclet.name).toBe('baz');
            expect(doclet.memberof).toBe('module:foo.Bar');
            expect(doclet.longname).toBe('module:foo.Bar#baz');
        });
    });
});

/* eslint-disable quotes */
const hasOwnProp = Object.prototype.hasOwnProperty;

describe("jsdoc/util/templateHelper", () => {
    const _ = require('lodash');
    const definitions = require('jsdoc/tag/dictionary/definitions');
    const dictionary = require('jsdoc/tag/dictionary');
    const doclet = require('jsdoc/doclet');
    const env = require('jsdoc/env');
    const helper = require('jsdoc/util/templateHelper');
    const { taffy } = require('taffydb');

    helper.registerLink('test', 'path/to/test.html');

    it("should exist", () => {
        expect(helper).toBeObject();
    });

    it("should export a 'globalName' property", () => {
        expect(helper.globalName).toBeString();
    });

    it("should export a 'fileExtension' property", () => {
        expect(helper.fileExtension).toBeString();
    });

    it("should export a 'SCOPE_TO_PUNC' property", () => {
        expect(helper.SCOPE_TO_PUNC).toBeObject();
    });

    it("should export a 'getUniqueFilename' function", () => {
        expect(helper.getUniqueFilename).toBeFunction();
    });

    it("should export a 'getUniqueId' function", () => {
        expect(helper.getUniqueId).toBeFunction();
    });

    it("should export a 'longnameToUrl' property", () => {
        expect(helper.longnameToUrl).toBeObject();
    });

    it("should export a 'linkto' function", () => {
        expect(helper.linkto).toBeFunction();
    });

    it("should export an 'htmlsafe' function", () => {
        expect(helper.htmlsafe).toBeFunction();
    });

    it("should export a 'find' function", () => {
        expect(helper.find).toBeFunction();
    });

    it("should export a 'getMembers' function", () => {
        expect(helper.getMembers).toBeFunction();
    });

    it("should export a 'getAttribs' function", () => {
        expect(helper.getAttribs).toBeFunction();
    });

    it("should export a 'getSignatureTypes' function", () => {
        expect(helper.getSignatureTypes).toBeFunction();
    });

    it("should export a 'getSignatureParams' function", () => {
        expect(helper.getSignatureParams).toBeFunction();
    });

    it("should export a 'getSignatureReturns' function", () => {
        expect(helper.getSignatureReturns).toBeFunction();
    });

    it("should export a 'getAncestors' function", () => {
        expect(helper.getAncestors).toBeFunction();
    });

    it("should export a 'getAncestorLinks' function", () => {
        expect(helper.getAncestorLinks).toBeFunction();
    });

    it("should export a 'addEventListeners' function", () => {
        expect(helper.addEventListeners).toBeFunction();
    });

    it("should export a 'prune' function", () => {
        expect(helper.prune).toBeFunction();
    });

    it("should export a 'registerLink' function", () => {
        expect(helper.registerLink).toBeFunction();
    });

    it("should export a 'resolveLinks' function", () => {
        expect(helper.resolveLinks).toBeFunction();
    });

    it("should export a 'resolveAuthorLinks' function", () => {
        expect(helper.resolveAuthorLinks).toBeFunction();
    });

    it("should export a 'createLink' function", () => {
        expect(helper.createLink).toBeFunction();
    });

    it('should export a "longnamesToTree" function', () => {
        expect(helper.longnamesToTree).toBeFunction();
    });

    describe("globalName", () => {
        it("should equal 'global'", () => {
            expect(helper.globalName).toBe('global');
        });
    });

    describe("fileExtension", () => {
        it("should equal '.html'", () => {
            expect(helper.fileExtension).toBe('.html');
        });
    });

    describe("SCOPE_TO_PUNC", () => {
        it("should map 'static' to '.', 'inner', to '~', 'instance' to '#'", () => {
            expect(helper.SCOPE_TO_PUNC).toEqual({
                static: '.',
                inner: '~',
                instance: '#'
            });
        });
    });

    describe("getUniqueFilename", () => {
        afterEach(() => {
            jsdoc.restoreTagDictionary();
        });

        // TODO: needs more tests for unusual values and things that get special treatment (such as
        // inner members)
        it('should convert a simple string into the string plus the default extension', () => {
            const filename = helper.getUniqueFilename('BackusNaur');

            expect(filename).toBe('BackusNaur.html');
        });

        it('should replace slashes with underscores', () => {
            const filename = helper.getUniqueFilename('tick/tock');

            expect(filename).toBe('tick_tock.html');
        });

        it('should replace other problematic characters with underscores', () => {
            const filename = helper.getUniqueFilename('a very strange \\/?*:|\'"<> filename');

            expect(filename).toBe('a very strange __________ filename.html');
        });

        it('should not allow a filename to start with an underscore', () => {
            expect( helper.getUniqueFilename('') ).toBe('-_.html');
        });

        it('should not return the same filename twice', () => {
            const name = 'polymorphic';
            const filename1 = helper.getUniqueFilename(name);
            const filename2 = helper.getUniqueFilename(name);

            expect(filename1).not.toBe(filename2);
        });

        it('should not consider the same name with different letter case to be unique', () => {
            const camel = 'myJavaScriptIdentifier';
            const pascal = 'MyJavaScriptIdentifier';
            const filename1 = helper.getUniqueFilename(camel);
            const filename2 = helper.getUniqueFilename(pascal);

            expect( filename1.toLowerCase() ).not.toBe( filename2.toLowerCase() );
        });

        it('should remove variations from the longname before generating the filename', () => {
            const filename = helper.getUniqueFilename('MyClass(foo, bar)');

            expect(filename).toBe('MyClass.html');
        });

        it('should generate the correct filename for built-in namespaces', () => {
            const filenameEvent = helper.getUniqueFilename('event:userDidSomething');
            const filenameExternal = helper.getUniqueFilename('external:NotInThisPackage');
            const filenameModule = helper.getUniqueFilename('module:some/sort/of/module');
            const filenamePackage = helper.getUniqueFilename('package:node-solve-all-your-problems');

            expect(filenameEvent).toBe('event-userDidSomething.html');
            expect(filenameExternal).toBe('external-NotInThisPackage.html');
            expect(filenameModule).toBe('module-some_sort_of_module.html');
            expect(filenamePackage).toBe('package-node-solve-all-your-problems.html');
        });

        it('should generate the correct filename for user-specified namespaces', () => {
            let filename;
            const dict = new dictionary.Dictionary();

            dict.defineTag('anaphylaxis', {
                isNamespace: true
            });
            definitions.defineTags(dict);
            doclet._replaceDictionary(dict);

            filename = helper.getUniqueFilename('anaphylaxis:peanut');

            expect(filename).toBe('anaphylaxis-peanut.html');
        });
    });

    describe('getUniqueId', () => {
        it('should return the provided string in normal cases', () => {
            const id = helper.getUniqueId('futon.html', 'backrest');

            expect(id).toBe('backrest');
        });

        it('should return an empty string if no base ID is provided', () => {
            const id = helper.getUniqueId('futon.html', '');

            expect(id).toBe('');
        });

        it('should remove whitespace characters', () => {
            const id = helper.getUniqueId('futon.html', 'a very long identifier');

            expect(id).toBe('averylongidentifier');
        });

        it('should not return the same ID twice for a given file', () => {
            const filename = 'futon.html';
            const name = 'polymorphic';
            const id1 = helper.getUniqueId(filename, name);
            const id2 = helper.getUniqueId(filename, name);

            expect(id1).not.toBe(id2);
        });

        it('should allow duplicate IDs if they are in different files', () => {
            const name = 'magnificence';
            const id1 = helper.getUniqueId('supersensational.html', name);
            const id2 = helper.getUniqueId('razzledazzle.html', name);

            expect(id1).toBe(id2);
        });

        it('should not consider the same name with different letter case to be unique', () => {
            const camel = 'myJavaScriptIdentifier';
            const pascal = 'MyJavaScriptIdentifier';
            const filename = 'mercutio.html';
            const id1 = helper.getUniqueId(filename, camel);
            const id2 = helper.getUniqueId(filename, pascal);

            expect( id1.toLowerCase() ).not.toBe( id2.toLowerCase() );
        });
    });

    describe("longnameToUrl", () => {
        afterEach(() => {
            delete helper.longnameToUrl.foo2;
            delete helper.longnameToUrl.MySymbol;
        });

        it("is an object", () => {
            expect(typeof helper.longnameToUrl).toBe('object');
        });

        it("has an entry added into it by calling registerLink", () => {
            helper.registerLink('MySymbol', 'asdf.html');

            expect(helper.longnameToUrl.MySymbol).toBeDefined();
            expect(helper.longnameToUrl.MySymbol).toBe('asdf.html');
        });

        it("adding an entry to it allows me to link with linkto", () => {
            helper.longnameToUrl.foo2 = 'bar.html';

            expect(helper.linkto('foo2')).toBe('<a href="bar.html">foo2</a>');
        });
    });

    describe("linkto", () => {
        beforeEach(() => {
            helper.longnameToUrl.linktoTest = 'test.html';
            helper.longnameToUrl.LinktoFakeClass = 'fakeclass.html';
            helper.longnameToUrl['Foo#bar(baz)'] = 'foo-bar-baz.html';
        });

        afterEach(() => {
            delete helper.longnameToUrl.linktoTest;
            delete helper.longnameToUrl.LinktoFakeClass;
            delete helper.longnameToUrl['Foo#bar(baz)'];
        });

        it('returns the longname if only the longname is specified and has no URL', () => {
            const link = helper.linkto('example');

            expect(link).toBe('example');
        });

        it('returns the link text if only the link text is specified', () => {
            const link = helper.linkto(null, 'link text');

            expect(link).toBe('link text');
        });

        it('returns the link text if the longname does not have a URL, and both the longname and ' +
            'link text are specified', () => {
            const link = helper.linkto('example', 'link text');

            expect(link).toBe('link text');
        });

        it('uses the longname as the link text if no link text is provided', () => {
            const link = helper.linkto('linktoTest');

            expect(link).toBe('<a href="test.html">linktoTest</a>');
        });

        it('uses the link text if it is specified', () => {
            const link = helper.linkto('linktoTest', 'link text');

            expect(link).toBe('<a href="test.html">link text</a>');
        });

        it('includes a "class" attribute in the link if a class is specified', () => {
            const link = helper.linkto('linktoTest', 'link text', 'myclass');

            expect(link).toBe('<a href="test.html" class="myclass">link text</a>');
        });

        it('is careful with longnames that are reserved words in JS', () => {
            // we don't have a registered link for 'constructor' so it should return the text 'link text'.
            const link = helper.linkto('constructor', 'link text');

            expect(link).toBe('link text');
        });

        it('works correctly with type applications if only the longname is specified', () => {
            const link = helper.linkto('Array.<LinktoFakeClass>');

            expect(link).toBe('Array.&lt;<a href="fakeclass.html">LinktoFakeClass</a>>');
        });

        it('works correctly with type applications if a class is not specified', () => {
            const link = helper.linkto('Array.<LinktoFakeClass>', 'link text');

            expect(link).toBe('Array.&lt;<a href="fakeclass.html">LinktoFakeClass</a>>');
        });

        it('works correctly with type applications if a class is specified', () => {
            const link = helper.linkto('Array.<LinktoFakeClass>', 'link text', 'myclass');

            expect(link).toBe('Array.&lt;<a href="fakeclass.html" class="myclass">LinktoFakeClass' +
                '</a>>');
        });

        it('works correctly with type applications that include a type union', () => {
            const link = helper.linkto('Array.<(linktoTest|LinktoFakeClass)>', 'link text');

            expect(link).toBe('Array.&lt;(<a href="test.html">linktoTest</a>|' +
                '<a href="fakeclass.html">LinktoFakeClass</a>)>');
        });

        it('works correctly with type unions that are not enclosed in parentheses', () => {
            const link = helper.linkto('linktoTest|LinktoFakeClass', 'link text');

            expect(link).toBe('(<a href="test.html">linktoTest</a>|' +
                '<a href="fakeclass.html">LinktoFakeClass</a>)');
        });

        it('does not try to parse a longname starting with <anonymous> as a type application',
            () => {
                function linkto() {
                    helper.linkto('<anonymous>~foo');
                }

                expect(jsdoc.didLog(linkto, 'error')).toBeFalse();
            });

        it('does not treat a longname with a variation as a type application', () => {
            const link = helper.linkto('Foo#bar(baz)', 'link text');

            expect(link).toBe('<a href="foo-bar-baz.html">link text</a>');
        });

        it('returns a link when a URL is specified', () => {
            const link = helper.linkto('http://example.com');

            expect(link).toBe('<a href="http://example.com">http://example.com</a>');
        });

        it('returns a link if a URL wrapped in angle brackets is specified', () => {
            const link = helper.linkto('<http://example.com>');

            expect(link).toBe('<a href="http://example.com">http://example.com</a>');
        });

        it('returns a link with link text if a URL and link text are specified', () => {
            const link = helper.linkto('http://example.com', 'text');

            expect(link).toBe('<a href="http://example.com">text</a>');
        });

        it('returns a link with a fragment ID if a URL and fragment ID are specified', () => {
            const link = helper.linkto('LinktoFakeClass', null, null, 'fragment');

            expect(link).toBe('<a href="fakeclass.html#fragment">LinktoFakeClass</a>');
        });

        it('returns the original text if an HTML <a> tag is specified', () => {
            const text = '<a href="http://example.com">text</a>';
            const link = helper.linkto(text);

            expect(link).toBe(text);
        });

        it('returns the original text if an inline {@link} tag is specified', () => {
            let link;
            const text = '{@link Foo}';

            function getLink() {
                link = helper.linkto(text);
            }

            // make sure we're not trying to parse the inline link as a type expression
            expect(getLink).not.toThrow();
            // linkto doesn't process {@link} tags
            expect(link).toBe(text);
        });
    });

    describe("htmlsafe", () => {
        it('should convert all occurences of < to &lt;', () => {
            const inp = '<h1>Potentially dangerous.</h1>';
            const out = helper.htmlsafe(inp);

            expect(out).toBe('&lt;h1>Potentially dangerous.&lt;/h1>');
        });

        it('should convert all occurrences of & to &amp;', () => {
            const input = 'foo && bar & baz;';

            expect( helper.htmlsafe(input) ).toBe('foo &amp;&amp; bar &amp; baz;');
        });

        it('should not double-convert ampersands', () => {
            const input = '<h1>Foo & Friends</h1>';

            expect( helper.htmlsafe(input) ).toBe('&lt;h1>Foo &amp; Friends&lt;/h1>');
        });

        it('should convert non-strings to strings', () => {
            function htmlsafe() {
                return helper.htmlsafe(false);
            }

            expect(htmlsafe).not.toThrow();
            expect(htmlsafe()).toBe('false');
        });
    });

    describe("find", () => {
        const array = [
            // match
            {
                number: 2,
                A: true
            },
            // match
            {
                number: 1,
                A: true,
                D: 'hello',
                Q: false
            },
            // match
            {
                number: 3,
                A: 'maybe',
                squiggle: '?'
            },
            // no match (number not in spec)
            {
                number: 4,
                A: true
            },
            // no match (missing top-level property)
            {
                A: true
            }
        ];
        const matches = array.slice(0, 3);
        const spec = {
            number: [1, 2, 3],
            A: [true, 'maybe']
        };

        it('should find the requested items', () => {
            expect( helper.find(taffy(array), spec) ).toEqual(matches);
        });
    });

    // we can't use toEqual() because TaffyDB adds its own stuff to the array it returns.
    // instead, we make sure arrays a and b are the same length, and that each object in
    // array b has all the properties of the corresponding object in array a
    // used for getMembers and prune tests.
    function compareObjectArrays(a, b) {
        expect(a.length).toEqual(b.length);

        for (let i = 0, l = a.length; i < l; i++) {
            for (const prop in a[i]) {
                if ( hasOwnProp.call(a[i], prop) ) {
                    expect(b[i][prop]).toBeDefined();
                    expect(a[i][prop]).toEqual(b[i][prop]);
                }
            }
        }
    }
    describe("getMembers", () => {
        // instead parse a file from fixtures and verify it?
        const classes = [
            // global
            {
                kind: 'class'
            },
            // not global
            {
                kind: 'class',
                memberof: 'SomeNamespace'
            }
        ];
        const externals = [
            {
                kind: 'external',
                name: 'foo'
            }
        ];
        const events = [
            {
                kind: 'event'
            }
        ];
        const mixins = [
            {
                kind: 'mixin'
            }
        ];
        const modules = [
            {
                kind: 'module'
            }
        ];
        const namespaces = [
            {
                kind: 'namespace'
            }
        ];
        const miscGlobal = [
            {
                kind: 'function'
            },
            {
                kind: 'member'
            },
            {
                kind: 'constant'
            },
            {
                kind: 'typedef'
            }
        ];
        const miscNonGlobal = [
            {
                kind: 'constant',
                memberof: 'module:one/two'
            },
            {
                kind: 'function',
                name: 'module:foo',
                longname: 'module:foo'
            },
            {
                kind: 'member',
                name: 'module:bar',
                longname: 'module:bar'
            }
        ];
        const misc = miscGlobal.concat(miscNonGlobal);
        const array = [
            ...classes,
            ...externals,
            ...events,
            ...mixins,
            ...modules,
            ...namespaces,
            ...misc
        ];
        const data = taffy(array);
        const members = helper.getMembers(data);

        // check the output object has properties as expected.
        it("should have a 'classes' property", () => {
            expect(members.classes).toBeArray();
        });

        it("should have a 'externals' property", () => {
            expect(members.externals).toBeArray();
        });

        it("should have a 'events' property", () => {
            expect(members.events).toBeArray();
        });

        it("should have a 'globals' property", () => {
            expect(members.globals).toBeArray();
        });

        it("should have a 'mixins' property", () => {
            expect(members.mixins).toBeArray();
        });

        it("should have a 'modules' property", () => {
            expect(members.modules).toBeArray();
        });

        it("should have a 'namespaces' property", () => {
            expect(members.namespaces).toBeArray();
        });

        // check that things were found properly.
        it("classes are detected", () => {
            compareObjectArrays(classes, members.classes);
        });

        it("externals are detected", () => {
            compareObjectArrays(externals, members.externals);
        });

        it("events are detected", () => {
            compareObjectArrays(events, members.events);
        });

        it("mixins are detected", () => {
            compareObjectArrays(mixins, members.mixins);
        });

        it("modules are detected", () => {
            compareObjectArrays(modules, members.modules);
        });

        it("namespaces are detected", () => {
            compareObjectArrays(namespaces, members.namespaces);
        });

        it("globals are detected", () => {
            compareObjectArrays(miscGlobal, members.globals);
        });
    });

    describe("getAttribs", () => {
        let doc;
        let attribs;

        it('should return an array', () => {
            doc = new doclet.Doclet('/** ljklajsdf */', {});
            attribs = helper.getAttribs(doc);

            expect(attribs).toBeEmptyArray();
        });

        // tests is an object of test[doclet src] = <result expected in attribs|false>
        // if false, we expect attribs to either not contain anything in whatNotToContain,
        // or be empty (if whatNotToContain was not provided).
        function doTests(tests, whatNotToContain) {
            for (const src in tests) {
                if ( hasOwnProp.call(tests, src) ) {
                    doc = new doclet.Doclet(`/** ${src} */`, {});
                    attribs = helper.getAttribs(doc);

                    if (tests[src]) {
                        expect(attribs).toContain(tests[src]);
                    } else if (Array.isArray(whatNotToContain)) {
                        for (let i = 0; i < whatNotToContain.length; ++i) {
                            expect(attribs).not.toContain(whatNotToContain[i]);
                        }
                    } else {
                        expect(attribs.length).toBe(0);
                    }
                }
            }
        }

        it('should detect if a doclet is virtual', () => {
            const tests = {
                'My constant. \n @virtual': 'abstract',
                'asdf': false
            };

            doTests(tests);
        });

        it("should detect if a doclet's access is not public", () => {
            const tests = {'@private': 'private',
                '@access private': 'private',
                '@protected': 'protected',
                '@access protected': 'protected',
                '@public': false,
                '@access public': false,
                'asdf': false
            };

            doTests(tests);
        });

        it("should detect if a doclet's scope is inner or static AND it is a function or member or constant", () => {
            const tests = {
                // by default these are members
                '@inner': 'inner',
                '@instance': false,
                '@global': false,
                '@static': 'static',
                '@name Asdf.fdsa': 'static',
                '@name Outer~inner': 'inner',
                '@name Fdsa#asdf': false,
                '@name <global>.log': false,
                // some tests with functions and constants
                '@const Asdf#FOO': false,
                '@const Asdf\n@inner': 'inner',
                '@function Asdf#myFunction': false,
                '@function Fdsa.MyFunction': 'static',
                '@function Fdsa': false,
                // these are not functions or members or constants, they should not have their scope recorded.
                '@namespace Fdsa\n@inner': false,
                '@class asdf': false
            };

            doTests(tests, ['inner', 'static', 'global', 'instance']);
        });

        it("should detect if a doclet is readonly (and its kind is 'member')", () => {
            const tests = {
                'asdf\n @readonly': 'readonly',
                'asdf': false,
                '@name Fdsa#foo\n@readonly': 'readonly',
                // kind is not 'member'.
                '@const asdf\n@readonly': 'constant',
                '@function asdf\n@readonly': false,
                '@function Asdf#bar\n@readonly': false
            };

            doTests(tests, 'readonly');
        });

        it("should detect if the doclet is a for constant", () => {
            const tests = {
                'Enum. @enum\n@constant': 'constant',
                '@function Foo#BAR\n@const': 'constant',
                '@const Asdf': 'constant'
            };

            doTests(tests, 'constant');
        });

        it('should detect if a doclet is async', () => {
            const tests = { '@async': 'async' };

            doTests(tests, 'async');
        });

        it('should detect if a doclet is a generator function', () => {
            const tests = { '@generator': 'generator' };

            doTests(tests, 'generator');
        });

        it("should detect multiple attributes", () => {
            const fdsaFoo = new doclet.Doclet('/** @const module:fdsa~FOO\n@readonly\n@private */', {});

            attribs = helper.getAttribs(fdsaFoo);

            expect(attribs).toContain('private');
            // expect(attribs).toContain('readonly'); // kind is 'constant' not 'member'.
            expect(attribs).toContain('constant');
            expect(attribs).toContain('inner');
        });

        it('should return an empty array for null values', () => {
            let emptyAttribs;

            function getAttribs() {
                return helper.getAttribs();
            }

            expect(getAttribs).not.toThrow();

            emptyAttribs = getAttribs();

            expect(emptyAttribs).toBeEmptyArray();
        });
    });

    describe("getSignatureTypes", () => {
        afterEach(() => {
            delete helper.longnameToUrl.MyClass;
        });

        // returns links to allowed types for a doclet.
        it("returns an empty array if the doclet has no specified type", () => {
            const doc = new doclet.Doclet('/** @const ASDF */', {});
            const types = helper.getSignatureTypes(doc);

            expect(types).toBeEmptyArray();
        });

        it("returns a string array of the doclet's types", () => {
            const doc = new doclet.Doclet('/** @const {number|Array.<boolean>} ASDF */', {});
            const types = helper.getSignatureTypes(doc);

            expect(types).toBeArrayOfSize(2);
            expect(types).toContain('number');
            expect(types).toContain(helper.htmlsafe('Array.<boolean>'));
        });

        it("creates links for types if relevant", () => {
            let doc;
            let types;

            // make some links.
            helper.longnameToUrl.MyClass = 'MyClass.html';

            doc = new doclet.Doclet('/** @const {MyClass} ASDF */', {});
            types = helper.getSignatureTypes(doc);

            expect(types).toBeArrayOfSize(1);
            expect(types).toContain('<a href="MyClass.html">MyClass</a>');
        });

        it("uses the cssClass parameter for links if it is provided", () => {
            let doc;
            let types;

            // make some links.
            helper.longnameToUrl.MyClass = 'MyClass.html';

            doc = new doclet.Doclet('/** @const {MyClass} ASDF */', {});
            types = helper.getSignatureTypes(doc, 'myCSSClass');

            expect(types).toBeArrayOfSize(1);
            expect(types).toContain('<a href="MyClass.html" class="myCSSClass">MyClass</a>');
        });
    });

    describe("getSignatureParams", () => {
        // retrieves parameter names.
        // if css class is provided, optional parameters are wrapped in a <span> with that class.
        it("returns an empty array if the doclet has no specified type", () => {
            const doc = new doclet.Doclet('/** @function myFunction */', {});
            const params = helper.getSignatureParams(doc);

            expect(params).toBeEmptyArray();
        });

        it("returns a string array of the doclet's parameter names", () => {
            const doc = new doclet.Doclet('/** @function myFunction\n @param {string} foo - asdf. */', {});
            const params = helper.getSignatureParams(doc);

            expect(params).toBeArrayOfSize(1);
            expect(params).toContain('foo');
        });

        it("wraps optional parameters in <span class=..> if optClass is provided", () => {
            const doc = new doclet.Doclet(
                '/** @function myFunction\n' +
                ' * @param {boolean} foo - explanation.\n' +
                ' * @param {number} [bar=1] - another explanation.\n' +
                ' * @param {string} [baz] - another explanation.\n' +
                ' */', {});
            const params = helper.getSignatureParams(doc, 'cssClass');

            expect(params).toBeArrayOfSize(3);
            expect(params).toContain('foo');
            expect(params).toContain('<span class="cssClass">bar</span>');
            expect(params).toContain('<span class="cssClass">baz</span>');
        });

        it("doesn't wrap optional parameters in <span class=..> if optClass is not provided", () => {
            const doc = new doclet.Doclet(
                '/** @function myFunction\n' +
                ' * @param {boolean} foo - explanation.\n' +
                ' * @param {number} [bar=1] - another explanation.\n' +
                ' * @param {string} [baz] - another explanation.\n' +
                ' */', {});
            const params = helper.getSignatureParams(doc);

            expect(params).toBeArrayOfSize(3);
            expect(params).toContain('foo');
            expect(params).toContain('bar');
            expect(params).toContain('baz');
        });
    });

    describe("getSignatureReturns", () => {
        afterEach(() => {
            delete helper.longnameToUrl.MyClass;
        });

        it("returns a value with correctly escaped HTML", () => {
            const mockDoclet = {
                returns: [
                    {
                        type: {
                            names: [
                                'Array.<string>'
                            ]
                        }
                    }
                ]
            };
            const html = helper.getSignatureReturns(mockDoclet);

            expect(html).not.toContain('Array.<string>');
            expect(html).toContain('Array.&lt;string>');
        });

        it("returns an empty array if the doclet has no returns", () => {
            const doc = new doclet.Doclet('/** @function myFunction */', {});
            const returns = helper.getSignatureReturns(doc);

            expect(returns).toBeEmptyArray();
        });

        it("returns an empty array if the doclet has @returns but with no type", () => {
            const doc = new doclet.Doclet('/** @function myFunction\n@returns an interesting result.*/', {});
            const returns = helper.getSignatureReturns(doc);

            expect(returns).toBeEmptyArray();
        });

        it('uses the value of the `yields` property', () => {
            const doc = new doclet.Doclet('/** @yields {string} A string. */', {});
            const html = helper.getSignatureReturns(doc);

            expect(html).toContain('string');
        });

        it('prefers `yields` over `returns`', () => {
            const doc = new doclet.Doclet('/** @yields {string}\n@returns {number} */', {});
            const html = helper.getSignatureReturns(doc);

            expect(html).toContain('string');
            expect(html).not.toContain('number');
        });

        it("creates links for return types if relevant", () => {
            let doc;
            let returns;

            // make some links.
            helper.longnameToUrl.MyClass = 'MyClass.html';

            doc = new doclet.Doclet('/** @function myFunction\n@returns {number|MyClass} an interesting result.*/', {});
            returns = helper.getSignatureReturns(doc);

            expect(returns).toBeArrayOfSize(2);
            expect(returns).toContain('<a href="MyClass.html">MyClass</a>');
            expect(returns).toContain('number');
        });

        it("uses the cssClass parameter for links if it is provided", () => {
            let doc;
            let returns;

            // make some links.
            helper.longnameToUrl.MyClass = 'MyClass.html';

            doc = new doclet.Doclet('/** @function myFunction\n@returns {number|MyClass} an interesting result.*/', {});
            returns = helper.getSignatureReturns(doc, 'myCssClass');

            expect(returns).toBeArrayOfSize(2);
            expect(returns).toContain('<a href="MyClass.html" class="myCssClass">MyClass</a>');
            expect(returns).toContain('number');
        });
    });

    xdescribe('getAncestors', () => {
        // TODO
    });

    describe("getAncestorLinks", () => {
        // make a hierarchy.
        const lackeys = new doclet.Doclet('/** @member lackeys\n@memberof module:mafia/gangs.Sharks~Henchman\n@instance*/', {});
        const henchman = new doclet.Doclet('/** @class Henchman\n@memberof module:mafia/gangs.Sharks\n@inner */', {});
        const gang = new doclet.Doclet('/** @namespace module:mafia/gangs.Sharks */', {});
        const mafia = new doclet.Doclet('/** @module mafia/gangs */', {});
        const data = taffy([lackeys, henchman, gang, mafia]);

        afterEach(() => {
            delete helper.longnameToUrl['module:mafia/gangs'];
            delete helper.longnameToUrl['module:mafia/gangs.Sharks~Henchman'];
        });

        // register some links
        it("returns an empty array if there are no ancestors", () => {
            const links = helper.getAncestorLinks(data, mafia);

            expect(links).toBeEmptyArray();
        });

        it("returns an array of ancestor names (with preceding punctuation) if there are ancestors, the direct ancestor with following punctuation too", () => {
            let links = helper.getAncestorLinks(data, lackeys);

            expect(links).toBeArrayOfSize(3);
            expect(links).toContain('~Henchman#');
            expect(links).toContain('.Sharks');
            expect(links).toContain('mafia/gangs');

            links = helper.getAncestorLinks(data, henchman);

            expect(links).toBeArrayOfSize(2);
            expect(links).toContain('.Sharks~');
            expect(links).toContain('mafia/gangs');

            links = helper.getAncestorLinks(data, gang);

            expect(links).toBeArrayOfSize(1);
            expect(links).toContain('mafia/gangs.');
        });

        it("adds links if they exist", () => {
            let links;

            // register some links
            helper.longnameToUrl['module:mafia/gangs'] = 'mafia_gangs.html';
            helper.longnameToUrl['module:mafia/gangs.Sharks~Henchman'] = 'henchman.html';

            links = helper.getAncestorLinks(data, lackeys);

            expect(links).toBeArrayOfSize(3);
            expect(links).toContain('<a href="henchman.html">~Henchman</a>#');
            expect(links).toContain('.Sharks');
            expect(links).toContain('<a href="mafia_gangs.html">mafia/gangs</a>');
        });

        it("adds cssClass to any link", () => {
            let links;

            // register some links
            helper.longnameToUrl['module:mafia/gangs'] = 'mafia_gangs.html';
            helper.longnameToUrl['module:mafia/gangs.Sharks~Henchman'] = 'henchman.html';

            links = helper.getAncestorLinks(data, lackeys, 'myClass');

            expect(links).toBeArrayOfSize(3);
            expect(links).toContain('<a href="henchman.html" class="myClass">~Henchman</a>#');
            expect(links).toContain('.Sharks');
            expect(links).toContain('<a href="mafia_gangs.html" class="myClass">mafia/gangs</a>');
        });
    });

    describe("addEventListeners", () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/listenstag.js');
        const doclets = (taffy(_.cloneDeep(docSet.doclets)));
        const ev = helper.find(doclets, {longname: 'module:myModule.event:MyEvent'})[0];
        const ev2 = helper.find(doclets, {longname: 'module:myModule~Events.event:Event2'})[0];
        const ev3 = helper.find(doclets, {longname: 'module:myModule#event:Event3'})[0];

        helper.addEventListeners(doclets);

        it("adds a 'listeners' array to events with the longnames of the listeners", () => {
            expect(ev.listeners).toBeArrayOfSize(2);
            expect(ev.listeners).toContain('module:myModule~MyHandler');
            expect(ev.listeners).toContain('module:myModule~AnotherHandler');

            expect(ev2.listeners).toBeArrayOfSize(1);
            expect(ev2.listeners).toContain('module:myModule~MyHandler');
        });

        it("does not add listeners for events with no listeners", () => {
            expect(ev3.listeners).toBeUndefined();
        });

        it("does not make spurious doclets if something @listens to a non-existent symbol", () => {
            expect(helper.find(doclets, {longname: 'event:fakeEvent'})).toBeEmptyArray();
        });
    });

    describe("prune", () => {
        const access = env.opts.access;
        const priv = Boolean(env.opts.private);

        afterEach(() => {
            env.opts.access = access;
            env.opts.private = priv;
        });

        const array = [
            // keep
            {undocumented: false},
            // keep
            {ignore: false},
            // keep
            {memberof: 'SomeClass'},
            // prune
            {undocumented: true},
            // prune
            {ignore: true},
            // prune
            {memberof: '<anonymous>'}
        ];
        const keep = [
            // keep
            {undocumented: false},
            // keep
            {ignore: false},
            // keep
            {memberof: 'SomeClass'}
        ];
        const arrayPrivate = [
            // prune (unless env.opts.private is truthy)
            {access: 'private'}
        ];
        const arrayMixed = [
            {access: 'package'},
            {access: 'public'},
            {asdf: true},
            {access: 'protected'},
            {access: 'private'}
        ];

        it('should prune the correct members', () => {
            const pruned = helper.prune( taffy(array) )().get();

            compareObjectArrays(keep, pruned);
        });

        it('should prune private members if env.opts.private is falsy', () => {
            let pruned;

            env.opts.private = false;
            pruned = helper.prune( taffy(arrayPrivate) )().get();

            compareObjectArrays([], pruned);
        });

        it('should only keep package-private members if env.opts.access only contains "package"', () => {
            let pruned;
            const keepPackage = [{access: 'package'}];

            env.opts.access = 'package';
            pruned = helper.prune( taffy(arrayMixed) )().get();

            compareObjectArrays(keepPackage, pruned);
        });

        it('should only keep public members if env.opts.access only contains "public"', () => {
            let pruned;
            const keepPublic = [{access: 'public'}];

            env.opts.access = 'public';
            pruned = helper.prune( taffy(arrayMixed) )().get();

            compareObjectArrays(keepPublic, pruned);
        });

        it('should only keep undefined members if env.opts.access only contains "undefined"', () => {
            let pruned;
            const keepUndefined = [{asdf: true}];

            env.opts.access = 'undefined';
            pruned = helper.prune( taffy(arrayMixed) )().get();

            compareObjectArrays(keepUndefined, pruned);
        });

        it('should only keep protected members if env.opts.access only contains "protected"', () => {
            let pruned;
            const keepProtected = [{access: 'protected'}];

            env.opts.access = 'protected';
            pruned = helper.prune( taffy(arrayMixed) )().get();

            compareObjectArrays(keepProtected, pruned);
        });

        it('should only keep private members if env.opts.access only contains "private"', () => {
            let pruned;
            const keepPrivate = [{access: 'private'}];

            env.opts.access = 'private';
            pruned = helper.prune( taffy(arrayMixed) )().get();

            compareObjectArrays(keepPrivate, pruned);
        });

        it('should keep public and protected members if env.opts.access contains "public" and "protected"', () => {
            let pruned;
            const keepPublicProtected = [{
                access: 'public'
            }, {
                access: 'protected'
            }];

            env.opts.access = ['public', 'protected'];
            pruned = helper.prune( taffy(arrayMixed) )().get();

            compareObjectArrays(keepPublicProtected, pruned);
        });

        it('should keep everything if env.opts.access contains "all"', () => {
            let pruned;

            env.opts.access = 'all';
            pruned = helper.prune( taffy(arrayMixed) )().get();

            compareObjectArrays(arrayMixed, pruned);
        });

        it('should not prune private members if env.opts.private is truthy', () => {
            let pruned;

            env.opts.private = true;
            pruned = helper.prune( taffy(arrayPrivate) )().get();

            compareObjectArrays(arrayPrivate, pruned);
        });
    });

    describe("registerLink", () => {
        afterEach(() => {
            delete helper.longnameToUrl.MySymbol;
        });

        it("adds an entry to exports.longnameToUrl", () => {
            helper.longnameToUrl.MySymbol = 'asdf.html';

            expect(helper.longnameToUrl.MySymbol).toBe('asdf.html');
        });

        it("allows linkto to work", () => {
            helper.registerLink('MySymbol', 'asdf.html');

            expect(helper.linkto('MySymbol')).toBe('<a href="asdf.html">MySymbol</a>');
        });
    });

    describe("resolveLinks", () => {
        let conf;

        beforeEach(() => {
            conf = _.cloneDeep(env.conf.templates);
        });

        afterEach(() => {
            env.conf.templates = conf;
            delete helper.longnameToUrl['my.long.namespace'];
        });

        it('should translate {@link test} into a HTML link.', () => {
            const input = 'This is a {@link test}.';
            const output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">test</a>.');
        });

        it('should translate {@link unknown} into a simple text.', () => {
            const input = 'This is a {@link unknown}.';
            const output = helper.resolveLinks(input);

            expect(output).toBe('This is a unknown.');
        });

        it('should translate {@link test} into a HTML links multiple times.', () => {
            const input = 'This is a {@link test} and {@link test}.';
            const output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">test</a> and <a href="path/to/test.html">test</a>.');
        });

        it('should translate [hello there]{@link test} into a HTML link with the custom content.', () => {
            const input = 'This is a [hello there]{@link test}.';
            const output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">hello there</a>.');
        });

        it('should translate [dummy text] and [hello there]{@link test} into an HTML link with the custom content.', () => {
            const input = 'This is [dummy text] and [hello there]{@link test}.';
            const output = helper.resolveLinks(input);

            expect(output).toBe('This is [dummy text] and <a href="path/to/test.html">hello there</a>.');
        });

        it('should translate [dummy text] and [more] and [hello there]{@link test} into an HTML link with the custom content.', () => {
            const input = 'This is [dummy text] and [more] and [hello there]{@link test}.';
            const output = helper.resolveLinks(input);

            expect(output).toBe('This is [dummy text] and [more] and <a href="path/to/test.html">hello there</a>.');
        });

        it('should ignore [hello there].', () => {
            const input = 'This is a [hello there].';
            const output = helper.resolveLinks(input);

            expect(output).toBe(input);
        });

        it('should translate http links in the tag', () => {
            const input = 'Link to {@link http://github.com}';
            const output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="http://github.com">http://github.com</a>');
        });

        it('should translate ftp links in the tag', () => {
            const input = 'Link to {@link ftp://foo.bar}';
            const output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="ftp://foo.bar">ftp://foo.bar</a>');
        });

        it('should allow pipe to be used as delimiter between href and text (external link)', () => {
            const input = 'Link to {@link http://github.com|Github}';
            const output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="http://github.com">Github</a>');
        });

        it('should allow pipe to be used as delimiter between href and text (symbol link)', () => {
            const input = 'Link to {@link test|Test}';
            const output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="path/to/test.html">Test</a>');
        });

        it('should allow first space to be used as delimiter between href and text (external link)', () => {
            const input = 'Link to {@link http://github.com Github}';
            const output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="http://github.com">Github</a>');
        });

        it('should allow first space to be used as delimiter between href and text (symbol link)', () => {
            const input = 'Link to {@link test My Caption}';
            const output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="path/to/test.html">My Caption</a>');
        });

        it('if pipe and space are present in link tag, use pipe as the delimiter', () => {
            const input = 'Link to {@link test|My Caption}';
            const output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="path/to/test.html">My Caption</a>');
        });

        it('Test of {@linkcode } which should be in monospace', () => {
            const input = 'Link to {@linkcode test}';
            const output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="path/to/test.html"><code>test</code></a>');
        });

        it('Test of {@linkplain } which should be in normal font', () => {
            const input = 'Link to {@linkplain test}';
            const output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="path/to/test.html">test</a>');
        });

        it('should be careful with linking to links whose names are reserved JS keywords', () => {
            const input = 'Link to {@link constructor}';
            const output = helper.resolveLinks(input);

            expect(output).toBe('Link to constructor');
        });

        it('should allow linebreaks between link tag and content', () => {
            const input = 'This is a {@link\ntest}.';
            const output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">test</a>.');
        });

        it('should allow linebreaks to separate url from link text', () => {
            const input = 'This is a {@link\ntest\ntest}.';
            const output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">test</a>.');
        });

        it('should normalize additional newlines to spaces', () => {
            const input = 'This is a {@link\ntest\ntest\n\ntest}.';
            const output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">test test</a>.');
        });

        it('should allow tabs between link tag and content', () => {
            const input = 'This is a {@link\ttest}.';
            const output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">test</a>.');
        });

        // conf.monospaceLinks. check that
        // a) it works
        it('if conf.monospaceLinks is true, all {@link} should be monospace', () => {
            const input = 'Link to {@link test}';
            let output;

            env.conf.templates.monospaceLinks = true;
            output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="path/to/test.html"><code>test</code></a>');
        });

        // b) linkcode and linkplain are still respected
        it('if conf.monospaceLinks is true, all {@linkcode} should still be monospace', () => {
            const input = 'Link to {@linkcode test}';
            let output;

            env.conf.templates.monospaceLinks = true;
            output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="path/to/test.html"><code>test</code></a>');
        });

        it('if conf.monospaceLinks is true, all {@linkplain} should still be plain', () => {
            const input = 'Link to {@linkplain test}';
            let output;

            env.conf.templates.monospaceLinks = true;
            output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="path/to/test.html">test</a>');
        });

        // conf.cleverLinks. check that
        // a) it works
        it('if conf.cleverLinks is true, {@link symbol} should be in monospace', () => {
            const input = 'Link to {@link test}';
            let output;

            env.conf.templates.cleverLinks = true;
            output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="path/to/test.html"><code>test</code></a>');
        });

        it('if conf.cleverLinks is true, {@link URL} should be in plain text', () => {
            const input = 'Link to {@link http://github.com}';
            let output;

            env.conf.templates.cleverLinks = true;
            output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="http://github.com">http://github.com</a>');
        });

        // b) linkcode and linkplain are still respected
        it('if conf.cleverLinks is true, all {@linkcode} should still be clever', () => {
            const input = 'Link to {@linkcode test}';
            let output;

            env.conf.templates.cleverLinks = true;
            output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="path/to/test.html"><code>test</code></a>');
        });

        it('if conf.cleverLinks is true, all {@linkplain} should still be plain', () => {
            const input = 'Link to {@linkplain test}';
            let output;

            env.conf.templates.cleverLinks = true;
            output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="path/to/test.html">test</a>');
        });

        // c) if monospaceLinks is additionally `true` it is ignored in favour
        //    of cleverLinks
        it('if conf.cleverLinks is true and so is conf.monospaceLinks, cleverLinks overrides', () => {
            const input = 'Link to {@link test} and {@link http://github.com}';
            let output;

            env.conf.templates.cleverLinks = true;
            env.conf.templates.monospaceLinks = true;
            output = helper.resolveLinks(input);

            expect(output).toBe(
                'Link to <a href="path/to/test.html"><code>test</code></a> and ' +
                '<a href="http://github.com">http://github.com</a>'
            );
        });

        it('if conf.useShortNamesInLinks is true, it uses the short name in links', () => {
            const input = 'Link to {@link my.long.namespace}';
            let output;

            env.conf.templates.useShortNamesInLinks = true;
            helper.registerLink('my.long.namespace', 'asdf.html');
            output = helper.resolveLinks(input);

            expect(output).toBe('Link to <a href="asdf.html">namespace</a>');
        });
    });

    describe("createLink", () => {
        it('should create a url for a simple global.', () => {
            const mockDoclet = {
                kind: 'function',
                longname: 'foo',
                name: 'foo',
                scope: 'global'
            };
            const url = helper.createLink(mockDoclet);

            expect(url).toBe('global.html#foo');
        });

        it('should create a url for a namespace.', () => {
            const mockDoclet = {
                kind: 'namespace',
                longname: 'foo',
                name: 'foo'
            };
            const url = helper.createLink(mockDoclet);

            expect(url).toBe('foo.html');
        });

        it('should create a url for a member of a namespace.', () => {
            const mockDoclet = {
                kind: 'function',
                longname: 'ns.foo',
                name: 'foo',
                memberof: 'ns'
            };
            const url = helper.createLink(mockDoclet);

            expect(url).toBe('ns.html#foo');
        });

        const nestedNamespaceDoclet = {
            kind: 'function',
            longname: 'ns1.ns2.foo',
            name: 'foo',
            memberof: 'ns1.ns2'
        };
        let nestedNamespaceUrl;

        it('should create a url for a member of a nested namespace.', () => {
            nestedNamespaceUrl = helper.createLink(nestedNamespaceDoclet);

            expect(nestedNamespaceUrl).toBe('ns1.ns2.html#foo');
        });

        it('should return the same value when called twice with the same doclet.', () => {
            const newUrl = helper.createLink(nestedNamespaceDoclet);

            expect(newUrl).toBe(nestedNamespaceUrl);
        });

        it('should create a url for a name with invalid characters.', () => {
            const mockDoclet = {
                kind: 'function',
                longname: 'ns1."!"."*foo"',
                name: '"*foo"',
                memberof: 'ns1."!"'
            };
            const url = helper.createLink(mockDoclet);

            expect(url).toEqual('ns1._!_.html#%22*foo%22');
        });

        it('should create a url for a function that is the only symbol exported by a module.',
            () => {
                const mockDoclet = {
                    kind: 'function',
                    longname: 'module:bar',
                    name: 'module:bar'
                };
                const url = helper.createLink(mockDoclet);

                expect(url).toEqual('module-bar.html');
            });

        it('should create a url for a doclet with the wrong kind (caused by incorrect JSDoc tags', () => {
            const moduleDoclet = {
                kind: 'module',
                longname: 'module:baz',
                name: 'module:baz'
            };
            const badDoclet = {
                kind: 'member',
                longname: 'module:baz',
                name: 'module:baz'
            };
            const moduleDocletUrl = helper.createLink(moduleDoclet);
            const badDocletUrl = helper.createLink(badDoclet);

            expect(moduleDocletUrl).toBe('module-baz.html');
            expect(badDocletUrl).toBe('module-baz.html');
        });

        it('should create a url for a function that is a member of a doclet with the wrong kind', () => {
            const badModuleDoclet = {
                kind: 'member',
                longname: 'module:qux',
                name: 'module:qux'
            };
            const memberDoclet = {
                kind: 'function',
                name: 'frozzle',
                memberof: 'module:qux',
                scope: 'instance',
                longname: 'module:qux#frozzle'
            };
            const badModuleDocletUrl = helper.createLink(badModuleDoclet);
            const memberDocletUrl = helper.createLink(memberDoclet);

            expect(badModuleDocletUrl).toBe('module-qux.html');
            expect(memberDocletUrl).toBe('module-qux.html#frozzle');
        });

        it('should include the scope punctuation in the fragment ID for static members', () => {
            const functionDoclet = {
                kind: 'function',
                longname: 'Milk.pasteurize',
                name: 'pasteurize',
                memberof: 'Milk',
                scope: 'static'
            };
            const docletUrl = helper.createLink(functionDoclet);

            expect(docletUrl).toBe('Milk.html#.pasteurize');
        });

        it('should include the scope punctuation in the fragment ID for inner members', () => {
            const functionDoclet = {
                kind: 'function',
                longname: 'Milk~removeSticksAndLeaves',
                name: 'removeSticksAndLeaves',
                memberof: 'Milk',
                scope: 'inner'
            };
            const docletUrl = helper.createLink(functionDoclet);

            expect(docletUrl).toBe('Milk.html#~removeSticksAndLeaves');
        });

        it('should omit the scope punctuation from the fragment ID for instance members', () => {
            const propertyDoclet = {
                kind: 'member',
                longname: 'Milk#calcium',
                name: 'calcium',
                memberof: 'Milk',
                scope: 'instance'
            };
            const docletUrl = helper.createLink(propertyDoclet);

            expect(docletUrl).toBe('Milk.html#calcium');
        });

        it('should include the variation, if present, in the fragment ID', () => {
            const variationDoclet = {
                kind: 'function',
                longname: 'Milk#fat(percent)',
                name: 'fat',
                memberof: 'Milk',
                scope: 'instance',
                variation: '(percent)'
            };
            const docletUrl = helper.createLink(variationDoclet);

            expect(docletUrl).toBe('Milk.html#fat(percent)');
        });
    });

    describe("resolveAuthorLinks", () => {
        it('should not crash JSDoc if no text is specified', () => {
            function resolve() {
                helper.resolveAuthorLinks();
            }

            expect(resolve).not.toThrow();
        });

        // convert Jane Doe <jdoe@example.org> to a mailto link.
        it('should convert email addresses in angle brackets *after* a name to mailto links', () => {
            const str = ' John Doe  <asdf.fdsa-2@gmail.com> ';
            const out = helper.resolveAuthorLinks(str);

            expect(out).toBe('<a href="mailto:asdf.fdsa-2@gmail.com">John Doe</a>');
        });

        it('should HTML-safe author names', () => {
            const str = ' John<Doe  <asdf.fdsa-2@gmail.com> ';
            const out = helper.resolveAuthorLinks(str);

            expect(out).toBe(`<a href="mailto:asdf.fdsa-2@gmail.com">${helper.htmlsafe('John<Doe')}</a>`);
        });

        it('should simply return the input string, HTML-safe, if no email is detected', () => {
            const str = 'John Doe <dummy>';
            const out = helper.resolveAuthorLinks(str);

            expect(out).toBe(helper.htmlsafe(str));
        });
    });

    xdescribe('longnamesToTree', () => {
        // TODO
    });
});

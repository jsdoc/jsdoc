/*eslint quotes:0 */
'use strict';

var hasOwnProp = Object.prototype.hasOwnProperty;

describe("jsdoc/util/templateHelper", function() {
    var definitions = require('jsdoc/tag/dictionary/definitions');
    var dictionary = require('jsdoc/tag/dictionary');
    var doclet = require('jsdoc/doclet');
    var doop = require('jsdoc/util/doop');
    var env = require('jsdoc/env');
    var helper = require('jsdoc/util/templateHelper');
    var logger = require('jsdoc/util/logger');
    var resolver = require('jsdoc/tutorial/resolver');
    var taffy = require('taffydb').taffy;

    helper.registerLink('test', 'path/to/test.html');

    it("should exist", function() {
        expect(helper).toBeDefined();
        expect(typeof helper).toBe('object');
    });

    it("should export a 'setTutorials' function", function() {
        expect(helper.setTutorials).toBeDefined();
        expect(typeof helper.setTutorials).toBe("function");
    });

    it("should export a 'globalName' property", function() {
        expect(helper.globalName).toBeDefined();
        expect(typeof helper.globalName).toBe("string");
    });

    it("should export a 'fileExtension' property", function() {
        expect(helper.fileExtension).toBeDefined();
        expect(typeof helper.fileExtension).toBe("string");
    });

    it("should export a 'scopeToPunc' property", function() {
        expect(helper.scopeToPunc).toBeDefined();
        expect(typeof helper.scopeToPunc).toBe("object");
    });

    it("should export a 'getUniqueFilename' function", function() {
        expect(helper.getUniqueFilename).toBeDefined();
        expect(typeof helper.getUniqueFilename).toBe("function");
    });

    it("should export a 'getUniqueId' function", function() {
        expect(helper.getUniqueId).toBeDefined();
        expect(typeof helper.getUniqueId).toBe('function');
    });

    it("should export a 'longnameToUrl' property", function() {
        expect(helper.longnameToUrl).toBeDefined();
        expect(typeof helper.longnameToUrl).toBe("object");
    });

    it("should export a 'linkto' function", function() {
        expect(helper.linkto).toBeDefined();
        expect(typeof helper.linkto).toBe("function");
    });

    it("should export an 'htmlsafe' function", function() {
        expect(helper.htmlsafe).toBeDefined();
        expect(typeof helper.htmlsafe).toBe("function");
    });

    it("should export a 'find' function", function() {
        expect(helper.find).toBeDefined();
        expect(typeof helper.find).toBe("function");
    });

    it("should export a 'getMembers' function", function() {
        expect(helper.getMembers).toBeDefined();
        expect(typeof helper.getMembers).toBe("function");
    });

    it("should export a 'getAttribs' function", function() {
        expect(helper.getAttribs).toBeDefined();
        expect(typeof helper.getAttribs).toBe("function");
    });

    it("should export a 'getSignatureTypes' function", function() {
        expect(helper.getSignatureTypes).toBeDefined();
        expect(typeof helper.getSignatureTypes).toBe("function");
    });

    it("should export a 'getSignatureParams' function", function() {
        expect(helper.getSignatureParams).toBeDefined();
        expect(typeof helper.getSignatureParams).toBe("function");
    });

    it("should export a 'getSignatureReturns' function", function() {
        expect(helper.getSignatureReturns).toBeDefined();
        expect(typeof helper.getSignatureReturns).toBe("function");
    });

    it("should export a 'getAncestors' function", function() {
        expect(helper.getAncestors).toBeDefined();
        expect(typeof helper.getAncestors).toBe('function');
    });

    it("should export a 'getAncestorLinks' function", function() {
        expect(helper.getAncestorLinks).toBeDefined();
        expect(typeof helper.getAncestorLinks).toBe("function");
    });

    it("should export a 'addEventListeners' function", function() {
        expect(helper.addEventListeners).toBeDefined();
        expect(typeof helper.addEventListeners).toBe("function");
    });

    it("should export a 'prune' function", function() {
        expect(helper.prune).toBeDefined();
        expect(typeof helper.prune).toBe("function");
    });

    it("should export a 'registerLink' function", function() {
        expect(helper.registerLink).toBeDefined();
        expect(typeof helper.registerLink).toBe("function");
    });

    it("should export a 'tutorialToUrl' function", function() {
        expect(helper.tutorialToUrl).toBeDefined();
        expect(typeof helper.tutorialToUrl).toBe("function");
    });

    it("should export a 'toTutorial' function", function() {
        expect(helper.toTutorial).toBeDefined();
        expect(typeof helper.toTutorial).toBe("function");
    });

    it("should export a 'resolveLinks' function", function() {
        expect(helper.resolveLinks).toBeDefined();
        expect(typeof helper.resolveLinks).toBe("function");
    });

    it("should export a 'resolveAuthorLinks' function", function() {
        expect(helper.resolveAuthorLinks).toBeDefined();
        expect(typeof helper.resolveAuthorLinks).toBe("function");
    });

    it("should export a 'createLink' function", function() {
        expect(helper.createLink).toBeDefined();
        expect(typeof helper.createLink).toBe("function");
    });

    it('should export a "longnamesToTree" function', function() {
        expect(helper.longnamesToTree).toBeDefined();
        expect(typeof helper.longnamesToTree).toBe('function');
    });

    describe("setTutorials", function() {
        // used in tutorialToUrl, toTutorial.
        it("setting tutorials to null causes all tutorial lookups to fail", function() {
            // bit of a dodgy test but the best I can manage. setTutorials doesn't do much.
            helper.setTutorials(null);
            // should throw error: no 'getByName' in tutorials.
            expect(function () { return helper.tutorialToUrl('asdf'); }).toThrow();
        });

        it("setting tutorials to the root tutorial object lets lookups work", function() {
            helper.setTutorials(resolver.root);
            spyOn(resolver.root, 'getByName');
            helper.tutorialToUrl('asdf');

            expect(resolver.root.getByName).toHaveBeenCalled();
        });
    });

    describe("globalName", function() {
        it("should equal 'global'", function() {
            expect(helper.globalName).toBe('global');
        });
    });

    describe("fileExtension", function() {
        it("should equal '.html'", function() {
            expect(helper.fileExtension).toBe('.html');
        });
    });

    describe("scopeToPunc", function() {
        it("should map 'static' to '.', 'inner', to '~', 'instance' to '#'", function() {
            expect(helper.scopeToPunc).toEqual({static: '.', inner: '~', instance: '#'});
        });
    });

    describe("getUniqueFilename", function() {
        afterEach(function() {
            var dict = new dictionary.Dictionary();

            definitions.defineTags(dict);
            doclet._replaceDictionary(dict);
        });

        // TODO: needs more tests for unusual values and things that get special treatment (such as
        // inner members)
        it('should convert a simple string into the string plus the default extension', function() {
            var filename = helper.getUniqueFilename('BackusNaur');
            expect(filename).toBe('BackusNaur.html');
        });

        it('should replace slashes with underscores', function() {
            var filename = helper.getUniqueFilename('tick/tock');
            expect(filename).toBe('tick_tock.html');
        });

        it('should replace other problematic characters with underscores', function() {
            var filename = helper.getUniqueFilename('a very strange \\/?*:|\'"<> filename');
            expect(filename).toBe('a very strange __________ filename.html');
        });

        it('should not allow a filename to start with an underscore', function() {
            expect( helper.getUniqueFilename('') ).toBe('-_.html');
        });

        it('should not return the same filename twice', function() {
            var name = 'polymorphic';
            var filename1 = helper.getUniqueFilename(name);
            var filename2 = helper.getUniqueFilename(name);

            expect(filename1).not.toBe(filename2);
        });

        it('should not consider the same name with different letter case to be unique', function() {
            var camel = 'myJavaScriptIdentifier';
            var pascal = 'MyJavaScriptIdentifier';
            var filename1 = helper.getUniqueFilename(camel);
            var filename2 = helper.getUniqueFilename(pascal);

            expect( filename1.toLowerCase() ).not.toBe( filename2.toLowerCase() );
        });

        it('should remove variations from the longname before generating the filename', function() {
            var filename = helper.getUniqueFilename('MyClass(foo, bar)');
            expect(filename).toBe('MyClass.html');
        });

        it('should generate the correct filename for built-in namespaces', function() {
            var filenameEvent = helper.getUniqueFilename('event:userDidSomething');
            var filenameExternal = helper.getUniqueFilename('external:NotInThisPackage');
            var filenameModule = helper.getUniqueFilename('module:some/sort/of/module');
            var filenamePackage = helper.getUniqueFilename('package:node-solve-all-your-problems');

            expect(filenameEvent).toBe('event-userDidSomething.html');
            expect(filenameExternal).toBe('external-NotInThisPackage.html');
            expect(filenameModule).toBe('module-some_sort_of_module.html');
            expect(filenamePackage).toBe('package-node-solve-all-your-problems.html');
        });

        it('should generate the correct filename for user-specified namespaces', function() {
            var filename;
            var dict = new dictionary.Dictionary();

            dict.defineTag('anaphylaxis', {
                isNamespace: true
            });
            definitions.defineTags(dict);
            doclet._replaceDictionary(dict);

            filename = helper.getUniqueFilename('anaphylaxis:peanut');

            expect(filename).toBe('anaphylaxis-peanut.html');
        });
    });

    describe('getUniqueId', function() {
        it('should return the provided string in normal cases', function() {
            var id = helper.getUniqueId('futon.html', 'backrest');
            expect(id).toBe('backrest');
        });

        it('should return an empty string if no base ID is provided', function() {
            var id = helper.getUniqueId('futon.html', '');
            expect(id).toBe('');
        });

        it('should remove whitespace characters', function() {
            var id = helper.getUniqueId('futon.html', 'a very long identifier');
            expect(id).toBe('averylongidentifier');
        });

        it('should not return the same ID twice for a given file', function() {
            var filename = 'futon.html';
            var name = 'polymorphic';
            var id1 = helper.getUniqueId(filename, name);
            var id2 = helper.getUniqueId(filename, name);

            expect(id1).not.toBe(id2);
        });

        it('should allow duplicate IDs if they are in different files', function() {
            var name = 'magnificence';
            var id1 = helper.getUniqueId('supersensational.html', name);
            var id2 = helper.getUniqueId('razzledazzle.html', name);

            expect(id1).toBe(id2);
        });

        it('should not consider the same name with different letter case to be unique', function() {
            var camel = 'myJavaScriptIdentifier';
            var pascal = 'MyJavaScriptIdentifier';
            var filename = 'mercutio.html';
            var id1 = helper.getUniqueId(filename, camel);
            var id2 = helper.getUniqueId(filename, pascal);

            expect( id1.toLowerCase() ).not.toBe( id2.toLowerCase() );
        });
    });

    describe("longnameToUrl", function() {
        it("is an object", function() {
            expect(typeof helper.longnameToUrl).toBe('object');
        });

        it("has an entry added into it by calling registerLink", function() {
            helper.registerLink('MySymbol', 'asdf.html');
            expect(helper.longnameToUrl.MySymbol).toBeDefined();
            expect(helper.longnameToUrl.MySymbol).toBe('asdf.html');

            delete helper.longnameToUrl.MySymbol;
        });

        it("adding an entry to it allows me to link with linkto", function() {
            helper.longnameToUrl.foo2 = 'bar.html';
            expect(helper.linkto('foo2')).toBe('<a href="bar.html">foo2</a>');
            delete helper.longnameToUrl.foo2;
        });
    });

    describe("linkto", function() {
        beforeEach(function() {
            helper.longnameToUrl.linktoTest = 'test.html';
            helper.longnameToUrl.LinktoFakeClass = 'fakeclass.html';
            helper.longnameToUrl['Foo#bar(baz)'] = 'foo-bar-baz.html';
        });

        afterEach(function() {
            delete helper.longnameToUrl.linktoTest;
            delete helper.longnameToUrl.LinktoFakeClass;
            delete helper.longnameToUrl['Foo#bar(baz)'];
        });

        it('returns the longname if only the longname is specified and has no URL', function() {
            var link = helper.linkto('example');
            expect(link).toBe('example');
        });

        it('returns the link text if only the link text is specified', function() {
            var link = helper.linkto(null, 'link text');
            expect(link).toBe('link text');
        });

        it('returns the link text if the longname does not have a URL, and both the longname and ' +
            'link text are specified', function() {
            var link = helper.linkto('example', 'link text');
            expect(link).toBe('link text');
        });

        it('uses the longname as the link text if no link text is provided', function() {
            var link = helper.linkto('linktoTest');
            expect(link).toBe('<a href="test.html">linktoTest</a>');
        });

        it('uses the link text if it is specified', function() {
            var link = helper.linkto('linktoTest', 'link text');
            expect(link).toBe('<a href="test.html">link text</a>');
        });

        it('includes a "class" attribute in the link if a class is specified', function() {
            var link = helper.linkto('linktoTest', 'link text', 'myclass');
            expect(link).toBe('<a href="test.html" class="myclass">link text</a>');
        });

        it('is careful with longnames that are reserved words in JS', function() {
            // we don't have a registered link for 'constructor' so it should return the text 'link text'.
            var link = helper.linkto('constructor', 'link text');
            expect(typeof link).toBe('string');
            expect(link).toBe('link text');
        });

        it('works correctly with type applications if only the longname is specified', function() {
            var link = helper.linkto('Array.<LinktoFakeClass>');
            expect(link).toBe('Array.&lt;<a href="fakeclass.html">LinktoFakeClass</a>>');
        });

        it('works correctly with type applications if a class is not specified', function() {
            var link = helper.linkto('Array.<LinktoFakeClass>', 'link text');
            expect(link).toBe('Array.&lt;<a href="fakeclass.html">LinktoFakeClass</a>>');
        });

        it('works correctly with type applications if a class is specified', function() {
            var link = helper.linkto('Array.<LinktoFakeClass>', 'link text', 'myclass');
            expect(link).toBe('Array.&lt;<a href="fakeclass.html" class="myclass">LinktoFakeClass' +
                '</a>>');
        });

        it('works correctly with type applications that include a type union', function() {
            var link = helper.linkto('Array.<(linktoTest|LinktoFakeClass)>', 'link text');
            expect(link).toBe('Array.&lt;(<a href="test.html">linktoTest</a>|' +
                '<a href="fakeclass.html">LinktoFakeClass</a>)>');
        });

        it('works correctly with type unions that are not enclosed in parentheses', function() {
            var link = helper.linkto('linktoTest|LinktoFakeClass', 'link text');
            expect(link).toBe('(<a href="test.html">linktoTest</a>|' +
                '<a href="fakeclass.html">LinktoFakeClass</a>)');
        });

        it('does not try to parse a longname starting with <anonymous> as a type application',
            function() {
            spyOn(logger, 'error');

            helper.linkto('<anonymous>~foo');
            expect(logger.error).not.toHaveBeenCalled();
        });

        it('does not treat a longname with a variation as a type application', function() {
            var link = helper.linkto('Foo#bar(baz)', 'link text');

            expect(link).toBe('<a href="foo-bar-baz.html">link text</a>');
        });

        it('returns a link when a URL is specified', function() {
            var link = helper.linkto('http://example.com');
            expect(link).toBe('<a href="http://example.com">http://example.com</a>');
        });

        it('returns a link if a URL wrapped in angle brackets is specified', function() {
            var link = helper.linkto('<http://example.com>');
            expect(link).toBe('<a href="http://example.com">http://example.com</a>');
        });

        it('returns a link with link text if a URL and link text are specified', function() {
            var link = helper.linkto('http://example.com', 'text');
            expect(link).toBe('<a href="http://example.com">text</a>');
        });

        it('returns a link with a fragment ID if a URL and fragment ID are specified', function() {
            var link = helper.linkto('LinktoFakeClass', null, null, 'fragment');
            expect(link).toBe('<a href="fakeclass.html#fragment">LinktoFakeClass</a>');
        });

        it('returns the original text if an HTML <a> tag is specified', function() {
            var text = '<a href="http://example.com">text</a>';
            var link = helper.linkto(text);

            expect(link).toBe(text);
        });

        it('returns the original text if an inline {@link} tag is specified', function() {
            var link;
            var text = '{@link Foo}';

            function getLink() {
                link = helper.linkto(text);
            }

            // make sure we're not trying to parse the inline link as a type expression
            expect(getLink).not.toThrow();
            // linkto doesn't process {@link} tags
            expect(link).toBe(text);
        });
    });

    describe("htmlsafe", function() {
        it('should convert all occurences of < to &lt;', function() {
            var inp = '<h1>Potentially dangerous.</h1>',
                out = helper.htmlsafe(inp);
            expect(out).toBe('&lt;h1>Potentially dangerous.&lt;/h1>');
        });

        it('should convert all occurrences of & to &amp;', function() {
            var input = 'foo && bar & baz;';
            expect( helper.htmlsafe(input) ).toBe('foo &amp;&amp; bar &amp; baz;');
        });

        it('should not double-convert ampersands', function() {
            var input = '<h1>Foo & Friends</h1>';
            expect( helper.htmlsafe(input) ).toBe('&lt;h1>Foo &amp; Friends&lt;/h1>');
        });

        it('should convert non-strings to strings', function() {
            function htmlsafe() {
                return helper.htmlsafe(false);
            }

            expect(htmlsafe).not.toThrow();
            expect(htmlsafe()).toBe('false');
        });
    });

    describe("find", function() {
        var array = [
            // match
            { number: 2, A: true },
            // match
            { number: 1, A: true, D: 'hello', Q: false },
            // match
            { number: 3, A: 'maybe', squiggle: '?' },
            // no match (number not in spec)
            { number: 4, A: true },
            // no match (missing top-level property)
            { A: true }
        ];
        var matches = array.slice(0, 3);
        var spec = { number: [1, 2, 3], A: [true, 'maybe'] };

        it('should find the requested items', function() {
            expect( helper.find(taffy(array), spec) ).toEqual(matches);
        });
    });

    // we can't use toEqual() because TaffyDB adds its own stuff to the array it returns.
    // instead, we make sure arrays a and b are the same length, and that each object in
    // array b has all the properties of the corresponding object in array a
    // used for getMembers and prune tests.
    function compareObjectArrays(a, b) {
        expect(a.length).toEqual(b.length);

        for (var i = 0, l = a.length; i < l; i++) {
            for (var prop in a[i]) {
                if ( hasOwnProp.call(a[i], prop) ) {
                    expect(b[i][prop]).toBeDefined();
                    expect(a[i][prop]).toEqual(b[i][prop]);
                }
            }
        }
    }
    describe("getMembers", function() {
        // instead parse a file from fixtures and verify it?
        var classes = [
            {kind: 'class'}, // global
            {kind: 'class', memberof: 'SomeNamespace'} // not global
        ];
        var externals = [
            {kind: 'external', name: 'foo'}
        ];
        var events = [
            {kind: 'event'}
        ];
        var mixins = [
            {kind: 'mixin'}
        ];
        var modules = [
            {kind: 'module'}
        ];
        var namespaces = [
            {kind: 'namespace'}
        ];
        var miscGlobal = [
            {kind: 'function'},
            {kind: 'member'},
            {kind: 'constant'},
            {kind: 'typedef'}
        ];
        var miscNonGlobal = [
            {kind: 'constant', memberof: 'module:one/two'},
            {kind: 'function', name: 'module:foo', longname: 'module:foo'},
            {kind: 'member', name: 'module:bar', longname: 'module:bar'}
        ];
        var misc = miscGlobal.concat(miscNonGlobal);
        var array = classes.concat(externals.concat(events.concat(mixins.concat(modules.concat(namespaces.concat(misc))))));
        var data = taffy(array);
        var members = helper.getMembers(data);

        // check the output object has properties as expected.
        it("should have a 'classes' property", function() {
            expect(members.classes).toBeDefined();
        });

        it("should have a 'externals' property", function() {
            expect(members.externals).toBeDefined();
        });

        it("should have a 'events' property", function() {
            expect(members.events).toBeDefined();
        });

        it("should have a 'globals' property", function() {
            expect(members.globals).toBeDefined();
        });

        it("should have a 'mixins' property", function() {
            expect(members.mixins).toBeDefined();
        });

        it("should have a 'modules' property", function() {
            expect(members.modules).toBeDefined();
        });

        it("should have a 'namespaces' property", function() {
            expect(members.namespaces).toBeDefined();
        });

        // check that things were found properly.
        it("classes are detected", function() {
            compareObjectArrays(classes, members.classes);
        });

        it("externals are detected", function() {
            compareObjectArrays(externals, members.externals);
        });

        it("events are detected", function() {
            compareObjectArrays(events, members.events);
        });

        it("mixins are detected", function() {
            compareObjectArrays(mixins, members.mixins);
        });

        it("modules are detected", function() {
            compareObjectArrays(modules, members.modules);
        });

        it("namespaces are detected", function() {
            compareObjectArrays(namespaces, members.namespaces);
        });

        it("globals are detected", function() {
            compareObjectArrays(miscGlobal, members.globals);
        });
    });

    describe("getAttribs", function() {
        var doc;
        var attribs;

        it('should return an array of strings', function() {
            doc = new doclet.Doclet('/** ljklajsdf */', {});
            attribs = helper.getAttribs(doc);
            expect(Array.isArray(attribs)).toBe(true);
        });

        // tests is an object of test[doclet src] = <result expected in attribs|false>
        // if false, we expect attribs to either not contain anything in whatNotToContain,
        // or be empty (if whatNotToContain was not provided).
        function doTests(tests, whatNotToContain) {
            for (var src in tests) {
                if (tests.hasOwnProperty(src)) {
                    doc = new doclet.Doclet('/** ' + src + ' */', {});
                    attribs = helper.getAttribs(doc);

                    if (tests[src]) {
                        expect(attribs).toContain(tests[src]);
                    } else if (Array.isArray(whatNotToContain)) {
                        for (var i = 0; i < whatNotToContain.length; ++i) {
                            expect(attribs).not.toContain(whatNotToContain[i]);
                        }
                    } else {
                        expect(attribs.length).toBe(0);
                    }
                }
            }
        }

        it('should detect if a doclet is virtual', function() {
            var tests = {
                'My constant. \n @virtual': 'abstract',
                'asdf': false
            };
            doTests(tests);
        });

        it("should detect if a doclet's access is not public", function() {
            var tests = {'@private': 'private',
                 '@access private': 'private',
                 '@protected': 'protected',
                 '@access protected': 'protected',
                 '@public': false,
                 '@access public': false,
                 'asdf': false
            };
            doTests(tests);
        });

        it("should detect if a doclet's scope is inner or static AND it is a function or member or constant", function() {
            var tests = {
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

        it("should detect if a doclet is readonly (and its kind is 'member')", function() {
            var tests = {
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

        it("should detect if the doclet is a for constant", function() {
            var tests = {
                'Enum. @enum\n@constant': 'constant',
                '@function Foo#BAR\n@const': 'constant',
                '@const Asdf': 'constant'
            };
            doTests(tests, 'constant');
        });

        it("should detect multiple attributes", function() {
            var fdsaFoo = new doclet.Doclet('/** @const module:fdsa~FOO\n@readonly\n@private */', {});
            attribs = helper.getAttribs(fdsaFoo);

            expect(attribs).toContain('private');
            // expect(attribs).toContain('readonly'); // kind is 'constant' not 'member'.
            expect(attribs).toContain('constant');
            expect(attribs).toContain('inner');
        });

        it('should return an empty array for null values', function() {
            var emptyAttribs;

            function getAttribs() {
                return helper.getAttribs();
            }

            expect(getAttribs).not.toThrow();

            emptyAttribs = getAttribs();
            expect( Array.isArray(emptyAttribs) ).toBe(true);
            expect(emptyAttribs.length).toBe(0);
        });
    });

    describe("getSignatureTypes", function() {
        // returns links to allowed types for a doclet.
        it("returns an empty array if the doclet has no specified type", function() {
            var doc = new doclet.Doclet('/** @const ASDF */', {}),
                types = helper.getSignatureTypes(doc);

            expect(Array.isArray(types)).toBe(true);
            expect(types.length).toBe(0);
        });

        it("returns a string array of the doclet's types", function() {
            var doc = new doclet.Doclet('/** @const {number|Array.<boolean>} ASDF */', {}),
                types = helper.getSignatureTypes(doc);

            expect(types.length).toBe(2);
            expect(types).toContain('number');
            expect(types).toContain(helper.htmlsafe('Array.<boolean>')); // should be HTML safe
        });

        it("creates links for types if relevant", function() {
            // make some links.
            helper.longnameToUrl.MyClass = 'MyClass.html';

            var doc = new doclet.Doclet('/** @const {MyClass} ASDF */', {}),
                types = helper.getSignatureTypes(doc);
            expect(types.length).toBe(1);
            expect(types).toContain('<a href="MyClass.html">MyClass</a>');

            delete helper.longnameToUrl.MyClass;
        });

        it("uses the cssClass parameter for links if it is provided", function() {
            // make some links.
            helper.longnameToUrl.MyClass = 'MyClass.html';

            var doc = new doclet.Doclet('/** @const {MyClass} ASDF */', {}),
                types = helper.getSignatureTypes(doc, 'myCSSClass');
            expect(types.length).toBe(1);
            expect(types).toContain('<a href="MyClass.html" class="myCSSClass">MyClass</a>');

            delete helper.longnameToUrl.MyClass;
        });
    });

    describe("getSignatureParams", function() {
        // retrieves parameter names.
        // if css class is provided, optional parameters are wrapped in a <span> with that class.
        it("returns an empty array if the doclet has no specified type", function() {
            var doc = new doclet.Doclet('/** @function myFunction */', {}),
                params = helper.getSignatureParams(doc);
            expect(Array.isArray(params)).toBe(true);
            expect(params.length).toBe(0);
        });

        it("returns a string array of the doclet's parameter names", function() {
            var doc = new doclet.Doclet('/** @function myFunction\n @param {string} foo - asdf. */', {}),
                params = helper.getSignatureParams(doc);
            expect(params.length).toBe(1);
            expect(params).toContain('foo');
        });

        it("wraps optional parameters in <span class=..> if optClass is provided", function() {
            var doc = new doclet.Doclet(
                '/** @function myFunction\n' +
                ' * @param {boolean} foo - explanation.\n' +
                ' * @param {number} [bar=1] - another explanation.\n' +
                ' * @param {string} [baz] - another explanation.\n' +
                ' */', {}),
                params = helper.getSignatureParams(doc, 'cssClass');

            expect(params.length).toBe(3);
            expect(params).toContain('foo');
            expect(params).toContain('<span class="cssClass">bar</span>');
            expect(params).toContain('<span class="cssClass">baz</span>');
        });

        it("doesn't wrap optional parameters in <span class=..> if optClass is not provided", function() {
            var doc = new doclet.Doclet(
                '/** @function myFunction\n' +
                ' * @param {boolean} foo - explanation.\n' +
                ' * @param {number} [bar=1] - another explanation.\n' +
                ' * @param {string} [baz] - another explanation.\n' +
                ' */', {}),
                params = helper.getSignatureParams(doc);

            expect(params.length).toBe(3);
            expect(params).toContain('foo');
            expect(params).toContain('bar');
            expect(params).toContain('baz');
        });
    });

    describe("getSignatureReturns", function() {
        // retrieves links to types that the member can return.

        it("returns a value with correctly escaped HTML", function() {
            var mockDoclet = {
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

            var html = helper.getSignatureReturns(mockDoclet);
            expect(html).not.toContain('Array.<string>');
            expect(html).toContain('Array.&lt;string>');
        });

        it("returns an empty array if the doclet has no returns", function() {
            var doc = new doclet.Doclet('/** @function myFunction */', {}),
                returns = helper.getSignatureReturns(doc);

            expect(Array.isArray(returns)).toBe(true);
            expect(returns.length).toBe(0);
        });

        it("returns an empty array if the doclet has @returns but with no type", function() {
            var doc = new doclet.Doclet('/** @function myFunction\n@returns an interesting result.*/', {}),
                returns = helper.getSignatureReturns(doc);

            expect(Array.isArray(returns)).toBe(true);
            expect(returns.length).toBe(0);
        });

        it("creates links for return types if relevant", function() {
            // make some links.
            helper.longnameToUrl.MyClass = 'MyClass.html';

            var doc = new doclet.Doclet('/** @function myFunction\n@returns {number|MyClass} an interesting result.*/', {}),
                returns = helper.getSignatureReturns(doc);

            expect(returns.length).toBe(2);
            expect(returns).toContain('<a href="MyClass.html">MyClass</a>');
            expect(returns).toContain('number');

            delete helper.longnameToUrl.MyClass;
        });

        it("uses the cssClass parameter for links if it is provided", function() {
            // make some links.
            helper.longnameToUrl.MyClass = 'MyClass.html';

            var doc = new doclet.Doclet('/** @function myFunction\n@returns {number|MyClass} an interesting result.*/', {}),
                returns = helper.getSignatureReturns(doc, 'myCssClass');

            expect(returns.length).toBe(2);
            expect(returns).toContain('<a href="MyClass.html" class="myCssClass">MyClass</a>');
            expect(returns).toContain('number');

            delete helper.longnameToUrl.MyClass;
        });
    });

    xdescribe('getAncestors', function() {
        // TODO
    });

    describe("getAncestorLinks", function() {
        // make a hierarchy.
        var lackeys = new doclet.Doclet('/** @member lackeys\n@memberof module:mafia/gangs.Sharks~Henchman\n@instance*/', {}),
            henchman = new doclet.Doclet('/** @class Henchman\n@memberof module:mafia/gangs.Sharks\n@inner */', {}),
            gang = new doclet.Doclet('/** @namespace module:mafia/gangs.Sharks */', {}),
            mafia = new doclet.Doclet('/** @module mafia/gangs */', {}),
            data = taffy([lackeys, henchman, gang, mafia]);

        // register some links
        it("returns an empty array if there are no ancestors", function() {
            var links = helper.getAncestorLinks(data, mafia);
            expect(Array.isArray(links)).toBe(true);
            expect(links.length).toBe(0);
        });

        it("returns an array of ancestor names (with preceding punctuation) if there are ancestors, the direct ancestor with following punctuation too", function() {
            var links = helper.getAncestorLinks(data, lackeys);
            expect(links.length).toBe(3);
            expect(links).toContain('~Henchman#');
            expect(links).toContain('.Sharks');
            expect(links).toContain('mafia/gangs');

            links = helper.getAncestorLinks(data, henchman);
            expect(links.length).toBe(2);
            expect(links).toContain('.Sharks~');
            expect(links).toContain('mafia/gangs');

            links = helper.getAncestorLinks(data, gang);
            expect(links.length).toBe(1);
            expect(links).toContain('mafia/gangs.');
        });

        it("adds links if they exist", function() {
            // register some links
            helper.longnameToUrl['module:mafia/gangs'] = 'mafia_gangs.html';
            helper.longnameToUrl['module:mafia/gangs.Sharks~Henchman'] = 'henchman.html';

            var links = helper.getAncestorLinks(data, lackeys);
            expect(links.length).toBe(3);
            expect(links).toContain('<a href="henchman.html">~Henchman</a>#');
            expect(links).toContain('.Sharks');
            expect(links).toContain('<a href="mafia_gangs.html">mafia/gangs</a>');

            delete helper.longnameToUrl['module:mafia/gangs'];
            delete helper.longnameToUrl['module:mafia/gangs.Sharks~Henchman'];
        });

        it("adds cssClass to any link", function() {
            // register some links
            helper.longnameToUrl['module:mafia/gangs'] = 'mafia_gangs.html';
            helper.longnameToUrl['module:mafia/gangs.Sharks~Henchman'] = 'henchman.html';

            var links = helper.getAncestorLinks(data, lackeys, 'myClass');
            expect(links.length).toBe(3);
            expect(links).toContain('<a href="henchman.html" class="myClass">~Henchman</a>#');
            expect(links).toContain('.Sharks');
            expect(links).toContain('<a href="mafia_gangs.html" class="myClass">mafia/gangs</a>');

            delete helper.longnameToUrl['module:mafia/gangs'];
            delete helper.longnameToUrl['module:mafia/gangs.Sharks~Henchman'];
        });
    });

    describe("addEventListeners", function() {
        var doclets = ( taffy(doop(jasmine.getDocSetFromFile('test/fixtures/listenstag.js').doclets)) ),
            ev = helper.find(doclets, {longname: 'module:myModule.event:MyEvent'})[0],
            ev2 = helper.find(doclets, {longname: 'module:myModule~Events.event:Event2'})[0],
            ev3 = helper.find(doclets, {longname: 'module:myModule#event:Event3'})[0];

        helper.addEventListeners(doclets);

        it("adds a 'listeners' array to events with the longnames of the listeners", function() {
            expect(Array.isArray(ev.listeners)).toBe(true);
            expect(Array.isArray(ev2.listeners)).toBe(true);

            expect(ev.listeners.length).toBe(2);
            expect(ev.listeners).toContain('module:myModule~MyHandler');
            expect(ev.listeners).toContain('module:myModule~AnotherHandler');

            expect(ev2.listeners.length).toBe(1);
            expect(ev2.listeners).toContain('module:myModule~MyHandler');
        });

        it("does not add listeners for events with no listeners", function() {
            expect(ev3.listeners).not.toBeDefined();
        });

        it("does not make spurious doclets if something @listens to a non-existent symbol", function() {
            expect(helper.find(doclets, {longname: 'event:fakeEvent'}).length).toBe(0);
        });
    });

    describe("prune", function() {
        var access = env.opts.access;
        var priv = !!env.opts.private;

        afterEach(function() {
            env.opts.access = access;
            env.opts.private = priv;
        });

        var array = [
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
        var keep = [
            // keep
            {undocumented: false},
            // keep
            {ignore: false},
            // keep
            {memberof: 'SomeClass'}
        ];
        var arrayPrivate = [
            // prune (unless env.opts.private is truthy)
            {access: 'private'}
        ];
        var arrayMixed = [
            {access: 'public'},
            {asdf: true},
            {access: 'protected'},
            {access: 'private'}
        ];

        it('should prune the correct members', function() {
            var pruned = helper.prune( taffy(array) )().get();
            compareObjectArrays(keep, pruned);
        });

        it('should prune private members if env.opts.private is falsy', function() {
            var pruned;

            env.opts.private = false;
            pruned = helper.prune( taffy(arrayPrivate) )().get();
            compareObjectArrays([], pruned);
        });

        it('should only keep public members if env.opts.access only contains "public"', function() {
            var pruned;
            var keepPublic = [{access: 'public'}];

            env.opts.access = 'public';
            pruned = helper.prune( taffy(arrayMixed) )().get();
            compareObjectArrays(keepPublic, pruned);
        });

        it('should only keep undefined members if env.opts.access only contains "undefined"', function() {
            var pruned;
            var keepUndefined = [{asdf: true}];

            env.opts.access = 'undefined';
            pruned = helper.prune( taffy(arrayMixed) )().get();
            compareObjectArrays(keepUndefined, pruned);
        });

        it('should only keep protected members if env.opts.access only contains "protected"', function() {
            var pruned;
            var keepProtected = [{access: 'protected'}];

            env.opts.access = 'protected';
            pruned = helper.prune( taffy(arrayMixed) )().get();
            compareObjectArrays(keepProtected, pruned);
        });

        it('should only keep private members if env.opts.access only contains "private"', function() {
            var pruned;
            var keepPrivate = [{access: 'private'}];

            env.opts.access = 'private';
            pruned = helper.prune( taffy(arrayMixed) )().get();
            compareObjectArrays(keepPrivate, pruned);
        });

        it('should keep public and protected members if env.opts.access contains "public" and "protected"', function() {
            var pruned;
            var keepPublicProtected = [{access: 'public'}, {access: 'protected'}];

            env.opts.access = ['public', 'protected'];
            pruned = helper.prune( taffy(arrayMixed) )().get();
            compareObjectArrays(keepPublicProtected, pruned);
        });

        it('should keep everything if env.opts.access contains "all"', function() {
            var pruned;

            env.opts.access = 'all';
            pruned = helper.prune( taffy(arrayMixed) )().get();

            compareObjectArrays(arrayMixed, pruned);
        });

        it('should not prune private members if env.opts.private is truthy', function() {
            var pruned;

            env.opts.private = true;
            pruned = helper.prune( taffy(arrayPrivate) )().get();
            compareObjectArrays(arrayPrivate, pruned);
        });
    });

    describe("registerLink", function() {
        it("adds an entry to exports.longnameToUrl", function() {
            helper.longnameToUrl.MySymbol = 'asdf.html';

            expect(helper.longnameToUrl.MySymbol).toBeDefined();
            expect(helper.longnameToUrl.MySymbol).toBe('asdf.html');

            delete helper.longnameToUrl.MySymbol;
        });

        it("allows linkto to work", function() {
            helper.registerLink('MySymbol', 'asdf.html');

            expect(helper.linkto('MySymbol')).toBe('<a href="asdf.html">MySymbol</a>');

            delete helper.longnameToUrl.MySymbol;
        });
    });

    describe("tutorialToUrl", function() {
        function missingTutorial() {
            var url = helper.tutorialToUrl("be-a-perfect-person-in-just-three-days");
        }

        beforeEach(function() {
            spyOn(logger, 'error');
            helper.setTutorials(resolver.root);
        });

        afterEach(function() {
            helper.setTutorials(null);
        });

        it('logs an error if the tutorial is missing', function() {
            helper.tutorialToUrl('be-a-perfect-person-in-just-three-days');

            expect(logger.error).toHaveBeenCalled();
        });

        it("logs an error if the tutorial's name is a reserved JS keyword and it doesn't exist", function() {
            helper.tutorialToUrl('prototype');

            expect(logger.error).toHaveBeenCalled();
        });

        it("creates links to tutorials if they exist", function() {
            // load the tutorials we already have for the tutorials tests
            resolver.load(env.dirname + "/test/tutorials/tutorials");
            resolver.resolve();

            var url = helper.tutorialToUrl('test');
            expect(typeof url).toBe('string');
            expect(url).toBe('tutorial-test.html');
        });

        it("creates links for tutorials where the name is a reserved JS keyword", function() {
            var url = helper.tutorialToUrl('constructor');
            expect(typeof url).toBe('string');
            expect(url).toBe('tutorial-constructor.html');
        });

        it("returns the same link if called multiple times on the same tutorial", function() {
            expect(helper.tutorialToUrl('test2')).toBe(helper.tutorialToUrl('test2'));
        });
    });

    describe("toTutorial", function() {
        beforeEach(function () {
            spyOn(logger, 'error');
            helper.setTutorials(resolver.root);
        });

        afterEach(function() {
            helper.setTutorials(null);
        });

        it('logs an error if the first param is missing', function() {
            helper.toTutorial();

            expect(logger.error).toHaveBeenCalled();
        });

        // missing tutorials
        it("returns the tutorial name if it's missing and no missingOpts is provided", function() {
            helper.setTutorials(resolver.root);
            var link = helper.toTutorial('qwerty');
            expect(link).toBe('qwerty');
        });

        it("returns the tutorial name wrapped in missingOpts.tag if provided and the tutorial is missing", function() {
            var link = helper.toTutorial('qwerty', 'lkjklqwerty', {tag: 'span'});
            expect(link).toBe('<span>qwerty</span>');
        });

        it("returns the tutorial name wrapped in missingOpts.tag with class missingOpts.classname if provided and the tutorial is missing", function() {
            var link = helper.toTutorial('qwerty', 'lkjklqwerty', {classname: 'missing'});
            expect(link).toBe('qwerty');

            link = helper.toTutorial('qwerty', 'lkjklqwerty', {tag: 'span', classname: 'missing'});
            expect(link).toBe('<span class="missing">qwerty</span>');
        });

        it("prefixes the tutorial name with missingOpts.prefix if provided and the tutorial is missing", function() {
            var link = helper.toTutorial('qwerty', 'lkjklqwerty', {tag: 'span', classname: 'missing', prefix: 'TODO-'});
            expect(link).toBe('<span class="missing">TODO-qwerty</span>');

            link = helper.toTutorial('qwerty', 'lkjklqwerty', {prefix: 'TODO-'});
            expect(link).toBe('TODO-qwerty');

            link = helper.toTutorial('qwerty', 'lkjklqwerty', {prefix: 'TODO-', classname: 'missing'});
            expect(link).toBe('TODO-qwerty');
        });

        // now we do non-missing tutorials.
        it("returns a link to the tutorial if not missing", function() {
            // load the tutorials we already have for the tutorials tests
            resolver.load(env.dirname + "/test/tutorials/tutorials");
            resolver.resolve();

            var link = helper.toTutorial('constructor', 'The Constructor tutorial');
            expect(link).toBe('<a href="' + helper.tutorialToUrl('constructor') + '">The Constructor tutorial</a>');
        });

        it("uses the tutorial's title for the link text if no content parameter is provided", function() {
            var link = helper.toTutorial('test');
            expect(link).toBe('<a href="' + helper.tutorialToUrl('test') + '">Test tutorial</a>');
        });

        it("does not apply any of missingOpts if the tutorial was found", function() {
            var link = helper.toTutorial('test', '', {tag: 'span', classname: 'missing', prefix: 'TODO-'});
            expect(link).toBe('<a href="' + helper.tutorialToUrl('test') + '">Test tutorial</a>');
        });
    });

    // couple of convenience functions letting me set conf variables and restore
    // them back to the originals later.
    function setConfTemplatesVariables(hash) {
        var keys = Object.keys(hash);
        var storage = {};
        for (var i = 0; i < keys.length; ++i) {
            storage[keys[i]] = env.conf.templates[keys[i]];
            // works because hash[key] is a scalar not an array/object
            env.conf.templates[keys[i]] = hash[keys[i]];
        }
        return storage;
    }

    function restoreConfTemplates(storage) {
        var keys = Object.keys(storage);
        for (var i = 0; i < keys.length; ++i) {
            env.conf.templates[keys[i]] = storage[keys[i]];
        }
    }

    describe("resolveLinks", function() {
        it('should translate {@link test} into a HTML link.', function() {
            var input = 'This is a {@link test}.',
                output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">test</a>.');
        });

        it('should translate {@link unknown} into a simple text.', function() {
            var input = 'This is a {@link unknown}.',
                output = helper.resolveLinks(input);

            expect(output).toBe('This is a unknown.');
        });

        it('should translate {@link test} into a HTML links multiple times.', function() {
            var input = 'This is a {@link test} and {@link test}.',
                output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">test</a> and <a href="path/to/test.html">test</a>.');
        });

        it('should translate [hello there]{@link test} into a HTML link with the custom content.', function() {
            var input = 'This is a [hello there]{@link test}.',
                output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">hello there</a>.');
        });

        it('should translate [dummy text] and [hello there]{@link test} into an HTML link with the custom content.', function() {
            var input = 'This is [dummy text] and [hello there]{@link test}.',
                output = helper.resolveLinks(input);

            expect(output).toBe('This is [dummy text] and <a href="path/to/test.html">hello there</a>.');
        });

        it('should translate [dummy text] and [more] and [hello there]{@link test} into an HTML link with the custom content.', function() {
            var input = 'This is [dummy text] and [more] and [hello there]{@link test}.',
                output = helper.resolveLinks(input);

            expect(output).toBe('This is [dummy text] and [more] and <a href="path/to/test.html">hello there</a>.');
        });

        it('should ignore [hello there].', function() {
            var input = 'This is a [hello there].',
                output = helper.resolveLinks(input);

            expect(output).toBe(input);
        });

        it('should translate http links in the tag', function() {
            var input = 'Link to {@link http://github.com}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="http://github.com">http://github.com</a>');
        });

        it('should translate ftp links in the tag', function() {
            var input = 'Link to {@link ftp://foo.bar}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="ftp://foo.bar">ftp://foo.bar</a>');
        });

        it('should allow pipe to be used as delimiter between href and text (external link)', function() {
            var input = 'Link to {@link http://github.com|Github}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="http://github.com">Github</a>');
        });

        it('should allow pipe to be used as delimiter between href and text (symbol link)', function() {
            var input = 'Link to {@link test|Test}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="path/to/test.html">Test</a>');
        });

        it('should allow first space to be used as delimiter between href and text (external link)', function() {
            var input = 'Link to {@link http://github.com Github}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="http://github.com">Github</a>');
        });

        it('should allow first space to be used as delimiter between href and text (symbol link)', function() {
            var input = 'Link to {@link test My Caption}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="path/to/test.html">My Caption</a>');
        });

        it('if pipe and space are present in link tag, use pipe as the delimiter', function() {
            var input = 'Link to {@link test|My Caption}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="path/to/test.html">My Caption</a>');
        });

        it('Test of {@linkcode } which should be in monospace', function() {
            var input = 'Link to {@linkcode test}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="path/to/test.html"><code>test</code></a>');
        });

        it('Test of {@linkplain } which should be in normal font', function() {
            var input = 'Link to {@linkplain test}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="path/to/test.html">test</a>');
        });

        it('should be careful with linking to links whose names are reserved JS keywords', function() {
            var input = 'Link to {@link constructor}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to constructor');
        });

        it('should allow linebreaks between link tag and content', function() {
            var input = 'This is a {@link\ntest}.',
                output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">test</a>.');
        });

        it('should allow linebreaks to separate url from link text', function() {
            var input = 'This is a {@link\ntest\ntest}.',
                output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">test</a>.');
        });

        it('should normalize additional newlines to spaces', function() {
            var input = 'This is a {@link\ntest\ntest\n\ntest}.',
                output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">test test</a>.');
        });

        it('should allow tabs between link tag and content', function() {
            var input = 'This is a {@link\ttest}.',
                output = helper.resolveLinks(input);

            expect(output).toBe('This is a <a href="path/to/test.html">test</a>.');
        });

        // conf.monospaceLinks. check that
        // a) it works
        it('if conf.monospaceLinks is true, all {@link} should be monospace', function () {
            var storage = setConfTemplatesVariables({monospaceLinks: true});
            var input = 'Link to {@link test}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="path/to/test.html"><code>test</code></a>');
            restoreConfTemplates(storage);
        });

        // b) linkcode and linkplain are still respected
        it('if conf.monospaceLinks is true, all {@linkcode} should still be monospace', function () {
            var storage = setConfTemplatesVariables({monospaceLinks: true});
            var input = 'Link to {@linkcode test}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="path/to/test.html"><code>test</code></a>');
            restoreConfTemplates(storage);
        });

        it('if conf.monospaceLinks is true, all {@linkplain} should still be plain', function () {
            var storage = setConfTemplatesVariables({monospaceLinks: true});
            var input = 'Link to {@linkplain test}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="path/to/test.html">test</a>');
            restoreConfTemplates(storage);
        });

        // conf.cleverLinks. check that
        // a) it works
        it('if conf.cleverLinks is true, {@link symbol} should be in monospace', function () {
            var storage = setConfTemplatesVariables({cleverLinks: true});
            var input = 'Link to {@link test}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="path/to/test.html"><code>test</code></a>');
            restoreConfTemplates(storage);
        });

        it('if conf.cleverLinks is true, {@link URL} should be in plain text', function () {
            var storage = setConfTemplatesVariables({cleverLinks: true});
            var input = 'Link to {@link http://github.com}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="http://github.com">http://github.com</a>');
            restoreConfTemplates(storage);
        });

        // b) linkcode and linkplain are still respected
        it('if conf.cleverLinks is true, all {@linkcode} should still be clever', function () {
            var storage = setConfTemplatesVariables({cleverLinks: true});
            var input = 'Link to {@linkcode test}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="path/to/test.html"><code>test</code></a>');
            restoreConfTemplates(storage);
        });

        it('if conf.cleverLinks is true, all {@linkplain} should still be plain', function () {
            var storage = setConfTemplatesVariables({cleverLinks: true});
            var input = 'Link to {@linkplain test}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="path/to/test.html">test</a>');
            restoreConfTemplates(storage);
        });

        // c) if monospaceLinks is additionally `true` it is ignored in favour
        //    of cleverLinks
        it('if conf.cleverLinks is true and so is conf.monospaceLinks, cleverLinks overrides', function () {
            var storage = setConfTemplatesVariables({cleverLinks: true, monospaceLinks: true});
            var input = 'Link to {@link test} and {@link http://github.com}',
                output = helper.resolveLinks(input);
            expect(output).toBe('Link to <a href="path/to/test.html"><code>test</code></a> and <a href="http://github.com">http://github.com</a>');
            restoreConfTemplates(storage);
        });
    });

    describe("createLink", function() {
        it('should create a url for a simple global.', function() {
            var mockDoclet = {
                    kind: 'function',
                    longname: 'foo',
                    name: 'foo',
                    scope: 'global'
                },
                url = helper.createLink(mockDoclet);

            expect(url).toBe('global.html#foo');
        });

        it('should create a url for a namespace.', function() {
            var mockDoclet = {
                    kind: 'namespace',
                    longname: 'foo',
                    name: 'foo'
                },
                url = helper.createLink(mockDoclet);

            expect(url).toBe('foo.html');
        });

        it('should create a url for a member of a namespace.', function() {
            var mockDoclet = {
                    kind: 'function',
                    longname: 'ns.foo',
                    name: 'foo',
                    memberof: 'ns'
                },
                url = helper.createLink(mockDoclet);

            expect(url).toBe('ns.html#foo');
        });

        var nestedNamespaceDoclet = {
            kind: 'function',
            longname: 'ns1.ns2.foo',
            name: 'foo',
            memberof: 'ns1.ns2'
        };
        var nestedNamespaceUrl;

        it('should create a url for a member of a nested namespace.', function() {
            nestedNamespaceUrl = helper.createLink(nestedNamespaceDoclet);

            expect(nestedNamespaceUrl).toBe('ns1.ns2.html#foo');
        });

        it('should return the same value when called twice with the same doclet.', function() {
            var newUrl = helper.createLink(nestedNamespaceDoclet);
            expect(newUrl).toBe(nestedNamespaceUrl);
        });

        it('should create a url for a name with invalid characters.', function() {
            var mockDoclet = {
                    kind: 'function',
                    longname: 'ns1."!"."*foo"',
                    name: '"*foo"',
                    memberof: 'ns1."!"'
                },
                url = helper.createLink(mockDoclet);

            expect(url).toEqual('ns1._!_.html#%22*foo%22');
        });

        it('should create a url for a function that is the only symbol exported by a module.',
            function() {
            var mockDoclet = {
                kind: 'function',
                longname: 'module:bar',
                name: 'module:bar'
            };
            var url = helper.createLink(mockDoclet);

            expect(url).toEqual('module-bar.html');
        });

        it('should create a url for a doclet with the wrong kind (caused by incorrect JSDoc tags', function() {
            var moduleDoclet = {
                kind: 'module',
                longname: 'module:baz',
                name: 'module:baz'
            };
            var badDoclet = {
                kind: 'member',
                longname: 'module:baz',
                name: 'module:baz'
            };

            var moduleDocletUrl = helper.createLink(moduleDoclet);
            var badDocletUrl = helper.createLink(badDoclet);

            expect(moduleDocletUrl).toBe('module-baz.html');
            expect(badDocletUrl).toBe('module-baz.html');
        });

        it('should create a url for a function that is a member of a doclet with the wrong kind', function() {
            var badModuleDoclet = {
                kind: 'member',
                longname: 'module:qux',
                name: 'module:qux'
            };
            var memberDoclet = {
                kind: 'function',
                name: 'frozzle',
                memberof: 'module:qux',
                scope: 'instance',
                longname: 'module:qux#frozzle'
            };

            var badModuleDocletUrl = helper.createLink(badModuleDoclet);
            var memberDocletUrl = helper.createLink(memberDoclet);

            expect(badModuleDocletUrl).toBe('module-qux.html');
            expect(memberDocletUrl).toBe('module-qux.html#frozzle');
        });

        it('should include the scope punctuation in the fragment ID for static members', function() {
            var functionDoclet = {
                kind: 'function',
                longname: 'Milk.pasteurize',
                name: 'pasteurize',
                memberof: 'Milk',
                scope: 'static'
            };
            var docletUrl = helper.createLink(functionDoclet);

            expect(docletUrl).toBe('Milk.html#.pasteurize');
        });

        it('should include the scope punctuation in the fragment ID for inner members', function() {
            var functionDoclet = {
                kind: 'function',
                longname: 'Milk~removeSticksAndLeaves',
                name: 'removeSticksAndLeaves',
                memberof: 'Milk',
                scope: 'inner'
            };
            var docletUrl = helper.createLink(functionDoclet);

            expect(docletUrl).toBe('Milk.html#~removeSticksAndLeaves');
        });

        it('should omit the scope punctuation from the fragment ID for instance members', function() {
            var propertyDoclet = {
                kind: 'member',
                longname: 'Milk#calcium',
                name: 'calcium',
                memberof: 'Milk',
                scope: 'instance'
            };
            var docletUrl = helper.createLink(propertyDoclet);

            expect(docletUrl).toBe('Milk.html#calcium');
        });

        it('should include the variation, if present, in the fragment ID', function() {
            var variationDoclet = {
                kind: 'function',
                longname: 'Milk#fat(percent)',
                name: 'fat',
                memberof: 'Milk',
                scope: 'instance',
                variation: '(percent)'
            };
            var docletUrl = helper.createLink(variationDoclet);

            expect(docletUrl).toBe('Milk.html#fat(percent)');
        });
    });

    describe("resolveAuthorLinks", function() {
        // convert Jane Doe <jdoe@example.org> to a mailto link.
        it('should convert email addresses in angle brackets *after* a name to mailto links', function() {
            var str = ' John Doe  <asdf.fdsa-2@gmail.com> ',
                out = helper.resolveAuthorLinks(str);
            expect(out).toBe('<a href="mailto:asdf.fdsa-2@gmail.com">John Doe</a>');
        });

        it('should HTML-safe author names', function() {
            var str = ' John<Doe  <asdf.fdsa-2@gmail.com> ',
                out = helper.resolveAuthorLinks(str);
            expect(out).toBe('<a href="mailto:asdf.fdsa-2@gmail.com">' + helper.htmlsafe('John<Doe') + '</a>');
        });

        it('should simply return the input string, HTML-safe, if no email is detected', function() {
            var str = 'John Doe <dummy>',
                out = helper.resolveAuthorLinks(str);
            expect(out).toBe(helper.htmlsafe(str));
        });
    });

    xdescribe('longnamesToTree', function() {
        // TODO
    });
});

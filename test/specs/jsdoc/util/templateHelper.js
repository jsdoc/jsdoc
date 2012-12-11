/*global afterEach: true, beforeEach: true, describe: true, expect: true, env: true, it: true, xdescribe: true */
var hasOwnProp = Object.prototype.hasOwnProperty;

describe("jsdoc/util/templateHelper", function() {
    var helper = require('jsdoc/util/templateHelper');
    helper.registerLink('test', 'path/to/test.html');
    helper.registerLink('test."long blah"/blah', 'path/to/test_long_blah_blah.html');

    it("should exist", function() {
        expect(helper).toBeDefined();
        expect(typeof helper).toEqual('object');
    });

    it("should export a 'setTutorials' function", function() {
        expect(helper.setTutorials).toBeDefined();
        expect(typeof helper.setTutorials).toEqual("function");
    });

    it("should export a 'globalName' property", function() {
        expect(helper.globalName).toBeDefined();
        expect(typeof helper.globalName).toEqual("string");
    });

    it("should export a 'fileExtension' property", function() {
        expect(helper.fileExtension).toBeDefined();
        expect(typeof helper.fileExtension).toEqual("string");
    });

    it("should export a 'scopeToPunc' property", function() {
        expect(helper.scopeToPunc).toBeDefined();
        expect(typeof helper.scopeToPunc).toEqual("object");
    });

    it("should export a 'getUniqueFilename' function", function() {
        expect(helper.getUniqueFilename).toBeDefined();
        expect(typeof helper.getUniqueFilename).toEqual("function");
    });

    it("should export a 'longnameToUrl' property", function() {
        expect(helper.longnameToUrl).toBeDefined();
        expect(typeof helper.longnameToUrl).toEqual("object");
    });

    it("should export a 'linkto' function", function() {
        expect(helper.linkto).toBeDefined();
        expect(typeof helper.linkto).toEqual("function");
    });

    it("should export an 'htmlsafe' function", function() {
        expect(helper.htmlsafe).toBeDefined();
        expect(typeof helper.htmlsafe).toEqual("function");
    });

    it("should export a 'find' function", function() {
        expect(helper.find).toBeDefined();
        expect(typeof helper.find).toEqual("function");
    });

    it("should export a 'getMembers' function", function() {
        expect(helper.getMembers).toBeDefined();
        expect(typeof helper.getMembers).toEqual("function");
    });

    it("should export a 'getAttribs' function", function() {
        expect(helper.getAttribs).toBeDefined();
        expect(typeof helper.getAttribs).toEqual("function");
    });

    it("should export a 'getSignatureTypes' function", function() {
        expect(helper.getSignatureTypes).toBeDefined();
        expect(typeof helper.getSignatureTypes).toEqual("function");
    });

    it("should export a 'getSignatureParams' function", function() {
        expect(helper.getSignatureParams).toBeDefined();
        expect(typeof helper.getSignatureParams).toEqual("function");
    });

    it("should export a 'getSignatureReturns' function", function() {
        expect(helper.getSignatureReturns).toBeDefined();
        expect(typeof helper.getSignatureReturns).toEqual("function");
    });

    it("should export a 'getAncestorLinks' function", function() {
        expect(helper.getAncestorLinks).toBeDefined();
        expect(typeof helper.getAncestorLinks).toEqual("function");
    });

    it("should export a 'prune' function", function() {
        expect(helper.prune).toBeDefined();
        expect(typeof helper.prune).toEqual("function");
    });

    it("should export a 'registerLink' function", function() {
        expect(helper.registerLink).toBeDefined();
        expect(typeof helper.registerLink).toEqual("function");
    });

    it("should export a 'tutorialToUrl' function", function() {
        expect(helper.tutorialToUrl).toBeDefined();
        expect(typeof helper.tutorialToUrl).toEqual("function");
    });

    it("should export a 'toTutorial' function", function() {
        expect(helper.toTutorial).toBeDefined();
        expect(typeof helper.toTutorial).toEqual("function");
    });

    it("should export a 'resolveLinks' function", function() {
        expect(helper.resolveLinks).toBeDefined();
        expect(typeof helper.resolveLinks).toEqual("function");
    });

    it("should export a 'createLink' function", function() {
        expect(helper.createLink).toBeDefined();
        expect(typeof helper.createLink).toEqual("function");
    });


    xdescribe("setTutorials", function() {
        // TODO
    });

    describe("globalName", function() {
        it("should equal 'global'", function() {
            expect(helper.globalName).toEqual('global');
        });
    });

    describe("fileExtension", function() {
        it("should equal '.html'", function() {
            expect(helper.fileExtension).toEqual('.html');
        });
    });

    xdescribe("scopeToPunc", function() {
        // TODO
    });

    // disabled because Jasmine appears to execute this code twice, which causes getUniqueFilename
    // to return an unexpected variation on the name the second time
    xdescribe("getUniqueFilename", function() {
        it('should convert a simple string into the string plus the default extension', function() {
            var filename = helper.getUniqueFilename('BackusNaur');
            expect(filename).toEqual('BackusNaur.html');
        });

        it('should convert a string with slashes into an alphanumeric hash plus the default extension', function() {
            var filename = helper.getUniqueFilename('tick/tock');
            expect(filename).toMatch(/^[A-Za-z0-9]+\.html$/);
        });

        it('should not return the same filename twice', function() {
            var name = 'polymorphic';
            var filename1 = helper.getUniqueFilename(name);
            var filename2 = helper.getUniqueFilename(name);

            expect(filename1).not.toEqual(filename2);
        });

        it('should not consider the same name with different letter case to be unique', function() {
            var camel = 'myJavaScriptIdentifier';
            var pascal = 'MyJavaScriptIdentifier';
            var filename1 = helper.getUniqueFilename(camel);
            var filename2 = helper.getUniqueFilename(pascal);

            expect( filename1.toLowerCase() ).not.toEqual( filename2.toLowerCase() );
        });
    });

    xdescribe("longnameToUrl", function() {
        // TODO
    });

    xdescribe("linkto", function() {
        // TODO
    });

    xdescribe("htmlsafe", function() {
        // TODO
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
        var taffy = require('taffydb').taffy(array);
        var spec = { number: [1, 2, 3], A: [true, 'maybe'] };

        it('should find the requested items', function() {
            expect( helper.find(taffy, spec) ).toEqual(matches);
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
            {kind: 'class', memberof: 'SomeNamespace'}, // not global
        ];
        var externals = [
            {kind: 'external'},
        ];
        var events = [
            {kind: 'event'},
        ];
        var mixins = [
            {kind: 'mixin'},
        ];
        var modules = [
            {kind: 'module'},
        ];
        var namespaces = [
            {kind: 'namespace'},
        ];
        var misc = [
            {kind: 'function'}, // global
            {kind: 'member'}, // global
            {kind: 'constant'}, // global
            {kind: 'typedef'}, // global
            {kind: 'constant', memberof: 'module:one/two'}, // not global
        ];
        var array = classes.concat(externals.concat(events.concat(mixins.concat(modules.concat(namespaces.concat(misc))))));
        var data = require('taffydb').taffy(array);
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
            compareObjectArrays(misc.slice(0, -1), members.globals);
        });
    });

    xdescribe("getAttribs", function() {
        // TODO
    });

    xdescribe("getSignatureTypes", function() {
        // TODO
    });

    xdescribe("getSignatureParams", function() {
        // TODO
    });

    xdescribe("getSignatureReturns", function() {
        // TODO
    });

    xdescribe("getAncestorLinks", function() {
        // TODO
    });

    describe("prune", function() {

        var taffy = require('taffydb').taffy;

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
        var arrayPrivate = [
            // prune (unless env.opts.private is truthy)
            {access: 'private'}
        ];
        var keep = array.slice(0, 3);

        it('should prune the correct members', function() {
            var pruned = helper.prune( taffy(array) )().get();
            compareObjectArrays(keep, pruned);
        });

        it('should prune private members if env.opts.private is falsy', function() {
            var priv = !!env.opts['private'];

            env.opts['private'] = false;
            var pruned = helper.prune( taffy(arrayPrivate) )().get();
            compareObjectArrays([], pruned);

            env.opts['private'] = !!priv;
        });

        it('should not prune private members if env.opts.private is truthy', function() {
            var priv = !!env.opts['private'];

            env.opts['private'] = true;
            var pruned = helper.prune( taffy(arrayPrivate) )().get();
            compareObjectArrays(arrayPrivate, pruned);

            env.opts['private'] = !!priv;
        });
    });

    xdescribe("registerLink", function() {
        // TODO
    });

    describe("tutorialToUrl", function() {
        /*jshint evil: true */
        
        // TODO: more tests

        var lenient = !!env.opts.lenient,
            log = eval(console.log);

        function missingTutorial() {
            var url = helper.tutorialToUrl("be-a-perfect-person-in-just-three-days");
        }

        beforeEach(function() {
            var root = require('jsdoc/tutorial/resolver').root;
            helper.setTutorials(root);
        });

        afterEach(function() {
            helper.setTutorials(null);
            env.opts.lenient = lenient;
            console.log = log;
        });

        it('throws an exception if the tutorial is missing and the lenient option is not enabled', function() {
            env.opts.lenient = false;
            expect(missingTutorial).toThrow();
        });
        
        it('does not throw an exception if the tutorial is missing and the lenient option is enabled', function() {
            console.log = function() {};
            env.opts.lenient = true;

            expect(missingTutorial).not.toThrow();
        });
    });

    describe("toTutorial", function() {
        /*jshint evil: true */
        
        // TODO: more tests

        var lenient = !!env.opts.lenient,
            log = eval(console.log);

        function missingParam() {
            helper.toTutorial();
        }

        afterEach(function() {
            env.opts.lenient = lenient;
            console.log = log;
        });

        it('throws an exception if the first param is missing and the lenient option is not enabled', function() {
            env.opts.lenient = false;

            expect(missingParam).toThrow();
        });
        
        it('does not throw an exception if the first param is missing and the lenient option is enabled', function() {
            console.log = function() {};
            env.opts.lenient = true;

            expect(missingParam).not.toThrow();
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

            expect(output).toEqual('This is a <a href="path/to/test.html">test</a>.');
        });

        it('should translate {@link unknown} into a simple text.', function() {
            var input = 'This is a {@link unknown}.',
                output = helper.resolveLinks(input);

            expect(output).toEqual('This is a unknown.');
        });

        it('should translate {@link test} into a HTML links multiple times.', function() {
            var input = 'This is a {@link test} and {@link test}.',
                output = helper.resolveLinks(input);

            expect(output).toEqual('This is a <a href="path/to/test.html">test</a> and <a href="path/to/test.html">test</a>.');
        });

        it('should translate [hello there]{@link test} into a HTML link with the custom content.', function() {
            var input = 'This is a [hello there]{@link test}.',
                output = helper.resolveLinks(input);

            expect(output).toEqual('This is a <a href="path/to/test.html">hello there</a>.');
        });

        it('should ignore [hello there].', function() {
            var input = 'This is a [hello there].',
                output = helper.resolveLinks(input);

            expect(output).toEqual(input);
        });

        it('should translate http links in the tag', function() {
            var input = 'Link to {@link http://github.com}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="http://github.com">http://github.com</a>');
        });

        it('should translate ftp links in the tag', function() {
            var input = 'Link to {@link ftp://foo.bar}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="ftp://foo.bar">ftp://foo.bar</a>');
        });

        it('should allow pipe to be used as delimiter between href and text (external link)', function() {
            var input = 'Link to {@link http://github.com|Github}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="http://github.com">Github</a>');
        });

        it('should allow pipe to be used as delimiter between href and text (symbol link)', function() {
            var input = 'Link to {@link test|Test}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="path/to/test.html">Test</a>');
        });

        it('should allow first space to be used as delimiter between href and text (external link)', function() {
            var input = 'Link to {@link http://github.com Github}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="http://github.com">Github</a>');
        });

        it('should allow first space to be used as delimiter between href and text (symbol link)', function() {
            var input = 'Link to {@link test My Caption}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="path/to/test.html">My Caption</a>');
        });

        it('if pipe and space are present in link tag, use pipe as the delimiter', function() {
            var input = 'Link to {@link test|My Caption}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="path/to/test.html">My Caption</a>');
        });

        it('Test of {@linkcode } which should be in monospace', function() {
            var input = 'Link to {@linkcode test}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="path/to/test.html"><code>test</code></a>');
        });

        it('Test of {@linkplain } which should be in normal font', function() {
            var input = 'Link to {@linkplain test}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="path/to/test.html">test</a>');
        });

        // conf.monospaceLinks. check that
        // a) it works
        it('if conf.monospaceLinks is true, all {@link} should be monospace', function () {
            var storage = setConfTemplatesVariables({monospaceLinks: true});
            var input = 'Link to {@link test}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="path/to/test.html"><code>test</code></a>');
            restoreConfTemplates(storage);
        });

        // b) linkcode and linkplain are still respected
        it('if conf.monospaceLinks is true, all {@linkcode} should still be monospace', function () {
            var storage = setConfTemplatesVariables({monospaceLinks: true});
            var input = 'Link to {@linkcode test}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="path/to/test.html"><code>test</code></a>');
            restoreConfTemplates(storage);
        });

        it('if conf.monospaceLinks is true, all {@linkplain} should still be plain', function () {
            var storage = setConfTemplatesVariables({monospaceLinks: true});
            var input = 'Link to {@linkplain test}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="path/to/test.html">test</a>');
            restoreConfTemplates(storage);
        });

        // conf.cleverLinks. check that
        // a) it works
        it('if conf.cleverLinks is true, {@link symbol} should be in monospace', function () {
            var storage = setConfTemplatesVariables({cleverLinks: true});
            var input = 'Link to {@link test}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="path/to/test.html"><code>test</code></a>');
            restoreConfTemplates(storage);
        });

        it('if conf.cleverLinks is true, {@link URL} should be in plain text', function () {
            var storage = setConfTemplatesVariables({cleverLinks: true});
            var input = 'Link to {@link http://github.com}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="http://github.com">http://github.com</a>');
            restoreConfTemplates(storage);
        });

        // b) linkcode and linkplain are still respected
        it('if conf.cleverLinks is true, all {@linkcode} should still be clever', function () {
            var storage = setConfTemplatesVariables({cleverLinks: true});
            var input = 'Link to {@linkcode test}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="path/to/test.html"><code>test</code></a>');
            restoreConfTemplates(storage);
        });

        it('if conf.cleverLinks is true, all {@linkplain} should still be plain', function () {
            var storage = setConfTemplatesVariables({cleverLinks: true});
            var input = 'Link to {@linkplain test}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="path/to/test.html">test</a>');
            restoreConfTemplates(storage);
        });

        // c) if monospaceLinks is additionally `true` it is ignored in favour
        //    of cleverLinks
        it('if conf.cleverLinks is true and so is conf.monospaceLinks, cleverLinks overrides', function () {
            var storage = setConfTemplatesVariables({cleverLinks: true, monospaceLinks: true});
            var input = 'Link to {@link test} and {@link http://github.com}',
                output = helper.resolveLinks(input);
            expect(output).toEqual('Link to <a href="path/to/test.html"><code>test</code></a> and <a href="http://github.com">http://github.com</a>');
            restoreConfTemplates(storage);
        });

    });

    describe("createLink", function() {
        it('should create a url for a simple global.', function() {
            var mockDoclet = {
                    kind: 'function',
                    longname: 'foo',
                    name: 'foo'
                },
                url = helper.createLink(mockDoclet);

            expect(url).toEqual('global.html#foo');
        });

        it('should create a url for a namespace.', function() {
            var mockDoclet = {
                    kind: 'namespace',
                    longname: 'foo',
                    name: 'foo'
                },
                url = helper.createLink(mockDoclet);

            expect(url).toEqual('foo.html');
        });

        it('should create a url for a member of a namespace.', function() {
            var mockDoclet = {
                    kind: 'function',
                    longname: 'ns.foo',
                    name: 'foo',
                    memberof: 'ns'
                },
                url = helper.createLink(mockDoclet);

            expect(url).toEqual('ns.html#foo');
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

            expect(nestedNamespaceUrl).toEqual('ns1.ns2.html#foo');
        });

        it('should return the same value when called twice with the same doclet.', function() {
            var newUrl = helper.createLink(nestedNamespaceDoclet);
            expect(newUrl).toEqual(nestedNamespaceUrl);
        });

        it('should create a url for a name with invalid characters using a digest.', function() {
            var mockDoclet = {
                    kind: 'function',
                    longname: 'ns1."!"."*foo"',
                    name: '"*foo"',
                    memberof: 'ns1."!"'
                },
                url = helper.createLink(mockDoclet);

            expect(url).toEqual('be9d9563a3.html#"*foo"');
        });
    });
});

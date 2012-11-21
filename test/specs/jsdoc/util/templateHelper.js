/*global afterEach: true, beforeEach: true, describe: true, expect: true, env: true, it: true,
xdescribe: true, xit: true */
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

    it("should export a 'remove' function", function() {
        expect(helper.remove).toBeDefined();
        expect(typeof helper.remove).toEqual("function");
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
        var doop = require('jsdoc/util/doop').doop;
        var array = [
            // match
            { number: 2, letters: {A: true} },
            // match
            { number: 1, letters: {A: true, D: 'hello', Q: false} },
            // match
            { number: 3, letters: {A: 'maybe'}, squiggle: '?' },
            // no match (number not in spec)
            { number: 4, letters: {A: true} },
            // no match (missing top-level property)
            { letters: {A: true} },
            // no match (missing property in child object)
            { number: 2, letters: {D: 'maybe'} }
        ];
        var matches = doop(array).slice(0, 3);
        var invertMatches = doop(array).slice(3);
        var taffy = require('taffydb').taffy( doop(array) );
        var spec = { number: [1, 2, 3], letters: {A: [true, 'maybe']} };

        it('should find the requested items in an array', function() {
            expect( helper.find(doop(array), spec) ).toEqual(matches);
        });

        it('should find the requested items in a TaffyDB object', function() {
            expect( helper.find(taffy, spec) ).toEqual(matches);
        });

        it('should return items that do not match the spec if invert is true', function(){
            expect( helper.find(doop(array), spec, true) ).toEqual(invertMatches);
        });
    });

    describe("remove", function() {
        // alias to "find"; covered by "find" spec
    });

    xdescribe("getMembers", function() {
        // TODO
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
        var doop = require('jsdoc/util/doop').doop;
        var taffy = require('taffydb').taffy;
        var isArray = require('util').isArray;

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
        var keep = doop(array).slice(0, 3);
        var privateKeep = doop(arrayPrivate);

        it('should prune the correct members with a TaffyDB', function() {
            function prune() {
                return helper.prune( taffy(array) );
            }

            expect(prune).not.toThrow();
            expect( isArray(prune()) ).toEqual(false);
            // we use helper.find() to strip out the TaffyDB junk
            expect( helper.find(prune()().get(), {}) ).toEqual(keep);
        });

        it('should prune the correct members with an array of objects', function() {
            function prune() {
                return helper.prune(array);
            }

            expect(prune).not.toThrow();
            expect( isArray(prune()) ).toEqual(true);
            expect( prune() ).toEqual(keep);
        });

        it('should prune private members if env.opts.private is falsy', function() {
            var priv = !!env.opts['private'];

            env.opts['private'] = false;
            expect( helper.prune(arrayPrivate) ).toEqual([]);

            env.opts['private'] = !!priv;
        });

        it('should not prune private members if env.opts.private is truthy', function() {
            var priv = !!env.opts['private'];

            env.opts['private'] = true;
            expect( helper.prune(arrayPrivate) ).toEqual(privateKeep);

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

    describe("resolveLinks", function() {
        it('should translate {@link test} into a HTML link.', function() {
            var input = 'This is a {@link test}.',
                output = helper.resolveLinks(input);

            expect(output).toEqual('This is a <a href="path/to/test.html">test</a>.');
        });

        it('should translate {@link test."long blah"/blah} into a HTML link.', function() {
            var input = 'This is a {@link test."long blah"/blah}.',
                output = helper.resolveLinks(input);

            expect(output).toEqual('This is a <a href="path/to/test_long_blah_blah.html">test."long blah"/blah</a>.');
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
    });

    // disabled because Jasmine appears to execute this code twice, which causes createLink to
    // return an unexpected variation on the name the second time
    xdescribe("createLink", function() {
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

        it('should create a url for a member of a nested namespace.', function() {
            var mockDoclet = {
                    kind: 'function',
                    longname: 'ns1.ns2.foo',
                    name: 'foo',
                    memberof: 'ns1.ns2'
                },
                url = helper.createLink(mockDoclet);

            expect(url).toEqual('ns1.ns2.html#foo');
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

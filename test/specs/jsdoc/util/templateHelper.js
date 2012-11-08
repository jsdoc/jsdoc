/*global afterEach: true, beforeEach: true, describe: true, expect: true, env: true, it: true, xdescribe: true */
describe("jsdoc/util/templateHelper", function() {
    var helper = require('jsdoc/util/templateHelper');
    helper.registerLink('test', 'path/to/test.html');
    helper.registerLink('test."long blah"/blah', 'path/to/test_long_blah_blah.html');

    it("should exist", function() {
        expect(helper).toBeDefined();
        expect(typeof helper).toEqual('object');
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

    it("should export a 'resolveLinks' function", function() {
        expect(helper.resolveLinks).toBeDefined();
        expect(typeof helper.resolveLinks).toEqual("function");
    });

    it("should export a 'createLink' function", function() {
        expect(helper.createLink).toBeDefined();
        expect(typeof helper.createLink).toEqual("function");
    });

    it("should export a 'setTutorials' function", function() {
        expect(helper.setTutorials).toBeDefined();
        expect(typeof helper.setTutorials).toEqual("function");
    });

    it("should export a 'toTutorial' function", function() {
        expect(helper.toTutorial).toBeDefined();
        expect(typeof helper.toTutorial).toEqual("function");
    });

    it("should export a 'tutorialToUrl' function", function() {
        expect(helper.tutorialToUrl).toBeDefined();
        expect(typeof helper.tutorialToUrl).toEqual("function");
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

    xdescribe("registerLink", function() {
        // TODO
    });

    xdescribe("longnameToUrl", function() {
        // TODO
    });

    xdescribe("setTutorials", function() {
        // TODO
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
});

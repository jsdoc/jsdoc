/*global afterEach: true, beforeEach: true, describe: true, expect: true, env: true, it: true, xdescribe: true */
describe("jsdoc/util/templateHelper", function() {
    var helper = require('jsdoc/util/templateHelper');
    helper.registerLink('test', 'path/to/test.html');
    helper.registerLink('test."long blah"/blah', 'path/to/test_long_blah_blah.html');

    it("should exist", function() {
        expect(helper).toBeDefined();
        expect(typeof helper).toEqual('object');
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

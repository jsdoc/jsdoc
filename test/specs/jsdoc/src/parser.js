/*global beforeEach: true, describe: true, expect: true, it: true, jasmine: true, xdescribe: true, xit: true */
describe("jsdoc/src/parser", function() {
    var jsdoc = {src: { parser: require('jsdoc/src/parser')}};

    it("should exist", function() {
        expect(jsdoc.src.parser).toBeDefined();
        expect(typeof jsdoc.src.parser).toEqual("object");
    });

    it("should export a 'Parser' constructor", function() {
        expect(jsdoc.src.parser.Parser).toBeDefined();
        expect(typeof jsdoc.src.parser.Parser).toEqual("function");
    });

    describe("Parser", function() {
        var parser;

        function newParser() {
            parser = new jsdoc.src.parser.Parser();
        }

        it("should have a 'parse' function", function() {
            expect(jsdoc.src.parser.Parser.prototype.parse).toBeDefined();
            expect(typeof jsdoc.src.parser.Parser.prototype.parse).toEqual("function");
        });

        it("should have a 'results' function", function() {
            expect(jsdoc.src.parser.Parser.prototype.results).toBeDefined();
            expect(typeof jsdoc.src.parser.Parser.prototype.results).toEqual("function");
        });

        describe("parse", function() {
            beforeEach(newParser);

            it("should fire 'parseBegin' events before it parses any files", function() {
                var spy = jasmine.createSpy(),
                    sourceFiles = ["javascript:/** @name foo */"];

                parser.on("parseBegin", spy).parse(sourceFiles);
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0].sourcefiles).toBe(sourceFiles);
            });

            it("should allow 'parseBegin' handlers to modify the list of source files", function() {
                var sourceCode = "javascript:/** @name foo */",
                    newFiles = ["[[replaced]]"],
                    evt;

                function handler(e) {
                    e.sourcefiles = newFiles;
                    evt = e;
                }

                parser.on('parseBegin', handler).parse(sourceCode);
                expect(evt.sourcefiles).toBe(newFiles);
            });

            it("should fire 'jsdocCommentFound' events when parsing source containing jsdoc comments", function() {
                var spy = jasmine.createSpy(),
                    sourceCode = ['javascript:/** @name bar */'];
                parser.on('jsdocCommentFound', spy).parse(sourceCode);
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0].comment).toEqual("/** @name bar */");
            });

            it("should fire 'symbolFound' events when parsing source containing named symbols", function() {
                var spy = jasmine.createSpy(),
                    sourceCode = 'javascript:var foo = 1';
                parser.on('symbolFound', spy).parse(sourceCode);
                expect(spy).toHaveBeenCalled();
            });

            it("should fire 'parseComplete' events after it finishes parsing files", function() {
                var spy = jasmine.createSpy(),
                    sourceCode = ['javascript:var bar = false;'];
                parser.on('parseComplete', spy).parse(sourceCode);
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0].sourcefiles).toEqual(["[[string0]]"]);
            });
            
            it("should be able to parse its own source file", function() {
                var fs = require('jsdoc/fs'),
                    path = require('path'),
                    parserSrc = 'javascript:' + fs.readFileSync( path.join(__dirname,
                        'lib', 'jsdoc', 'src', 'parser.js'), 'utf8' ),
                    parse = function() {
                        parser.parse(parserSrc);
                    };
                
                expect(parse).not.toThrow();
            });
        });

        describe("results", function() {
            beforeEach(newParser);

            xit("contains an empty array before files are parsed", function() {
                // TODO
            });

            xit("contains an array of doclets after files are parsed", function() {

            });

            it("should reflect comment changes made by 'jsdocCommentFound' handlers", function() {
                // we test both POSIX and Windows line endings
                var source = "javascript:/**\n * replaceme\r\n * @module foo\n */\n\n" +
                    "/**\n * replaceme\n */\nvar bar;";

                parser.on('jsdocCommentFound', function(e) {
                    e.comment = e.comment.replace('replaceme', 'REPLACED!');
                });
                require("jsdoc/src/handlers").attachTo(parser);

                parser.parse(source);
                parser.results().forEach(function(doclet) {
                    expect(doclet.comment).not.toMatch('replaceme');
                    expect(doclet.comment).toMatch('REPLACED!');
                });
            });
        });
    });
});
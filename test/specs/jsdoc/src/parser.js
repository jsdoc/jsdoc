/*global beforeEach: true, describe: true, expect: true, it: true, jasmine: true, xdescribe: true */
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

            it("should fire 'jsdocCommentFound' events when parsing source containing jsdoc comments", function() {
                var spy = jasmine.createSpy(),
                    sourceCode = 'javascript:/** @name bar */';
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

            // TODO: more tests?

            it("should reflect comment changes made by 'jsdocCommentFound' handlers", function() {
                var source = "javascript:/**\n * replaceme\n * @module foo\n */\n\n" +
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
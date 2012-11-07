/*global describe: true, expect: true, it: true */
describe("jsdoc/src/handlers", function() {
    var jsdoc = {src: { parser: require('jsdoc/src/parser')}},
        testParser = new jsdoc.src.parser.Parser(),
        handlers = require('jsdoc/src/handlers');

    handlers.attachTo(testParser);

    it("should exist", function() {
        expect(handlers).toBeDefined();
        expect(typeof handlers).toEqual("object");
    });

    it("should export an 'attachTo' function", function() {
        expect(handlers.attachTo).toBeDefined();
        expect(typeof handlers.attachTo).toEqual("function");
    });

    describe("attachTo", function() {
        it("should attach a 'jsdocCommentFound' handler to the parser", function() {
            var callbacks = testParser.listeners("jsdocCommentFound");
            expect(callbacks).toBeDefined();
            expect(callbacks.length).toEqual(1);
            expect(typeof callbacks[0]).toEqual("function");
        });

        it("should attach a 'symbolFound' handler to the parser", function() {
            var callbacks = testParser.listeners("symbolFound");
            expect(callbacks).toBeDefined();
            expect(callbacks.length).toEqual(1);
            expect(typeof callbacks[0]).toEqual("function");
        });

        it("should attach a 'fileComplete' handler to the parser", function() {
            var callbacks = testParser.listeners("fileComplete");
            expect(callbacks).toBeDefined();
            expect(callbacks.length).toEqual(1);
            expect(typeof callbacks[0]).toEqual("function");
        });
    });

    describe("jsdocCommentFound handler", function() {
        var sourceCode = 'javascript:/** @name bar */',
            result = testParser.parse(sourceCode);

        it("should create a doclet for comments with '@name' tags", function() {
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('bar');
        });
    });

    describe("symbolFound handler", function() {
        //TODO
    });
});
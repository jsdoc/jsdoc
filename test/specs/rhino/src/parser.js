'use strict';

describe('rhino/jsdoc/src/parser', function() {
    var jsdoc = {
        src: {
            parser: (function() {
                var runtime = require('jsdoc/util/runtime');
                return require( runtime.getModulePath('jsdoc/src/parser') );
            })()
        }
    };

    // don't run this spec if we're currently testing another parser
    if (jasmine.jsParser !== 'rhino') {
        return;
    }

    it('should exist', function() {
        expect(jsdoc.src.parser).toBeDefined();
        expect(typeof jsdoc.src.parser).toBe('object');
    });

    it('should export a "Parser" constructor', function() {
        expect(jsdoc.src.parser.Parser).toBeDefined();
        expect(typeof jsdoc.src.parser.Parser).toBe('function');
    });

    describe('Parser', function() {
        var parser;

        function newParser() {
            parser = jsdoc.src.parser.createParser('rhino');
        }

        newParser();

        it('should inherit from jsdoc/src/parser', function() {
            var parent = require('jsdoc/src/parser').Parser;
            expect(parser instanceof parent).toBe(true);
        });

        it('should have an "addNodeVisitor" method', function() {
            expect(parser.addNodeVisitor).toBeDefined();
            expect(typeof parser.addNodeVisitor).toBe('function');
        });

        it('should have a "getNodeVisitors" method', function() {
            expect(parser.getNodeVisitors).toBeDefined();
            expect(typeof parser.getNodeVisitors).toBe('function');
        });

        describe('addNodeVisitor', function() {
            function visitorA() {}
            function visitorB() {}

            var visitors;

            beforeEach(newParser);

            it('should work with a single Rhino node visitor', function() {
                parser.addNodeVisitor(visitorA);

                visitors = parser.getNodeVisitors();

                expect(visitors.length).toBe(1);
                expect(visitors[0]).toBe(visitorA);
            });

            it('should work with multiple Rhino node visitors', function() {
                parser.addNodeVisitor(visitorA);
                parser.addNodeVisitor(visitorB);

                visitors = parser.getNodeVisitors();

                expect(visitors.length).toBe(2);
                expect(visitors[0]).toBe(visitorA);
                expect(visitors[1]).toBe(visitorB);
            });
        });

        describe('getNodeVisitors', function() {
            beforeEach(newParser);

            it('should return an empty array by default', function() {
                var visitors = parser.getNodeVisitors();

                expect( Array.isArray(visitors) ).toBe(true);
                expect(visitors.length).toBe(0);
            });

            // other functionality is covered by the addNodeVisitors tests
        });

        describe('parse', function() {
            /*eslint no-script-url: 0 */
            beforeEach(newParser);

            var sourceCode = ['javascript:/** foo */var foo;'];

            it('should call Rhino node visitors', function() {
                var args;

                var visitor = {
                    visitNode: function(rhinoNode, e, visitParser, sourceName) {
                        if (e && e.code && !args) {
                            args = Array.prototype.slice.call(arguments);
                        }
                    }
                };

                require('jsdoc/src/handlers').attachTo(parser);
                parser.addNodeVisitor(visitor);
                parser.parse(sourceCode);

                expect(args).toBeDefined();
                expect( Array.isArray(args) ).toBe(true);
                expect(args.length).toBe(4);

                // args[0]: Rhino node
                expect(args[0].toSource).toBeDefined();
                expect( String(args[0].toSource()) ).toBe('foo');

                // args[1]: JSDoc event
                expect(typeof args[1]).toBe('object');
                expect(args[1].code).toBeDefined();
                expect(args[1].code.name).toBeDefined();
                expect( String(args[1].code.name) ).toBe('foo');

                // args[2]: parser
                expect(typeof args[2]).toBe('object');

                // args[3]: current source name
                expect( String(args[3]) ).toBe('[[string0]]');
            });

            it('should reflect changes made by Rhino node visitors', function() {
                var doclet;

                var visitor = {
                    visitNode: function(rhinoNode, e, visitParser, sourceName) {
                        if (e && e.code && e.code.name === 'foo') {
                            e.code.name = 'bar';
                        }
                    }
                };

                require('jsdoc/src/handlers').attachTo(parser);
                parser.addNodeVisitor(visitor);
                parser.parse(sourceCode);

                doclet = parser.results()[0];

                expect(doclet).toBeDefined();
                expect(typeof doclet).toBe('object');
                expect(doclet.name).toBeDefined();
                expect(doclet.name).toBe('bar');
            });

            it('should not call a second Rhino node visitor if the first visitor stopped ' +
                'propagation', function() {
                var doclet;

                var visitor1 = {
                    visitNode: function(rhinoNode, e, visitParser, sourceName) {
                        e.stopPropagation = true;
                    }
                };
                var visitor2 = {
                    visitNode: function(rhinoNode, e, visitParser, sourceName) {
                        e.propertyThatWillNeverBeSet = ':(';
                    }
                };

                require('jsdoc/src/handlers').attachTo(parser);
                parser.addNodeVisitor(visitor1);
                parser.addNodeVisitor(visitor2);
                parser.parse(sourceCode);

                doclet = parser.results()[0];

                expect(doclet.propertyThatWillNeverBeSet).not.toBeDefined();
            });
        });
    });
});

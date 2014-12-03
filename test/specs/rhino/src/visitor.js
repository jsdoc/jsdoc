'use strict';

describe('rhino/jsdoc/src/visitor', function() {
    var runtime = require('jsdoc/util/runtime');
    var jsdoc = {
        src: {
            visitor: require( runtime.getModulePath('jsdoc/src/visitor') )
        }
    };

    it('should exist', function() {
        expect(jsdoc.src.visitor).toBeDefined();
        expect(typeof jsdoc.src.visitor).toBe('object');
    });

    it('should export a "Visitor" constructor', function() {
        expect(jsdoc.src.visitor.Visitor).toBeDefined();
        expect(typeof jsdoc.src.visitor.Visitor).toBe('function');
    });

    describe('Visitor', function() {
        var parser;
        var visitor;

        function newVisitor() {
            parser = require('jsdoc/src/parser').createParser('rhino');
            visitor = new jsdoc.src.visitor.Visitor(parser);
        }

        newVisitor();

        it('should inherit from jsdoc/src/visitor', function() {
            var parent = require('jsdoc/src/visitor').Visitor;
            expect(visitor instanceof parent).toBe(true);
        });

        it('should have an "addRhinoNodeVisitor" method', function() {
            expect(visitor.addRhinoNodeVisitor).toBeDefined();
            expect(typeof visitor.addRhinoNodeVisitor).toBe('function');
        });

        it('should have a "getRhinoNodeVisitors" method', function() {
            expect(visitor.getRhinoNodeVisitors).toBeDefined();
            expect(typeof visitor.getRhinoNodeVisitors).toBe('function');
        });

        describe('addRhinoNodeVisitor', function() {
            function visitorA() {}
            function visitorB() {}

            var visitors;

            beforeEach(newVisitor);

            it('should work with a single Rhino node visitor', function() {
                visitor.addRhinoNodeVisitor(visitorA);

                visitors = visitor.getRhinoNodeVisitors();

                expect(visitors.length).toBe(1);
                expect(visitors[0]).toBe(visitorA);
            });

            it('should work with multiple Rhino node visitors', function() {
                visitor.addRhinoNodeVisitor(visitorA);
                visitor.addRhinoNodeVisitor(visitorB);

                visitors = visitor.getRhinoNodeVisitors();

                expect(visitors.length).toBe(2);
                expect(visitors[0]).toBe(visitorA);
                expect(visitors[1]).toBe(visitorB);
            });
        });

        describe('getRhinoNodeVisitors', function() {
            beforeEach(newVisitor);

            it('should return an empty array by default', function() {
                var visitors = visitor.getRhinoNodeVisitors();

                expect( Array.isArray(visitors) ).toBe(true);
                expect(visitors.length).toBe(0);
            });

            // other functionality is covered by the addNodeVisitors tests
        });
    });
});

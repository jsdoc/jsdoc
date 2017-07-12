'use strict';

describe('jsdoc/src/visitor', function() {
    // TODO: more tests

    var jsdoc = {
        src: {
            parser: require('jsdoc/src/parser'),
            visitor: require('jsdoc/src/visitor')
        }
    };
    var parser = new jsdoc.src.parser.Parser();
    var visitor = new jsdoc.src.visitor.Visitor();

    describe('visitNodeComments', function() {
        // TODO: more tests

        var events = [];

        function listener(event) {
            events.push(event);
        }

        beforeEach(function() {
            parser.addListener('jsdocCommentFound', listener);
        });

        afterEach(function() {
            parser.removeListener('jsdocCommentFound', listener);
            events = [];
        });

        it('should ignore line comments', function() {
            var node = {
                leadingComments: [
                    {
                        type: 'CommentLine',
                        value: ' line comment',
                        loc: {
                            start: {
                                line: 0,
                                column: 0
                            }
                        }
                    }
                ]
            };

            visitor.visitNodeComments(node, parser, 'fake');

            expect(events).toEqual([]);
        });

        it('should ignore normal, non-JSDoc block comments', function() {
            var node = {
                leadingComments: [
                    {
                        type: 'CommentBlock',
                        value: ' block comment ',
                        loc: {
                            start: {
                                line: 0,
                                column: 0
                            }
                        }
                    }
                ]
            };

            visitor.visitNodeComments(node, parser, 'fake');

            expect(events).toEqual([]);
        });

        it('should ignore comments that begin with three or more asterisks', function() {
            var node = {
                leadingComments: [
                    {
                        type: 'CommentBlock',
                        value: '** block comment ',
                        loc: {
                            start: {
                                line: 0,
                                column: 0
                            }
                        }
                    }
                ]
            };

            visitor.visitNodeComments(node, parser, 'fake');

            expect(events).toEqual([]);
        });

        it('should fire an event for JSDoc comments', function() {
            var node = {
                leadingComments: [
                    {
                        type: 'CommentBlock',
                        value: '* block comment ',
                        loc: {
                            start: {
                                line: 0,
                                column: 0
                            }
                        }
                    }
                ]
            };

            visitor.visitNodeComments(node, parser, 'fake');

            expect(events.length).toBe(1);
            expect(events[0].comment).toBe('/** block comment */');
        });
    });
});

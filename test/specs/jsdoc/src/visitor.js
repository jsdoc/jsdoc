describe('jsdoc/src/visitor', () => {
    // TODO: more tests

    const jsdoc = {
        src: {
            parser: require('./parser'),
            visitor: require('./visitor')
        }
    };
    const parser = new jsdoc.src.parser.Parser();
    const visitor = new jsdoc.src.visitor.Visitor();

    describe('visitNodeComments', () => {
        // TODO: more tests

        let events = [];

        function listener(event) {
            events.push(event);
        }

        beforeEach(() => {
            parser.addListener('jsdocCommentFound', listener);
        });

        afterEach(() => {
            parser.removeListener('jsdocCommentFound', listener);
            events = [];
        });

        it('should ignore line comments', () => {
            const node = {
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

        it('should ignore normal, non-JSDoc block comments', () => {
            const node = {
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

        it('should ignore comments that begin with three or more asterisks', () => {
            const node = {
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

        it('should ignore empty block comments', () => {
            const node = {
                leadingComments: [
                    {
                        type: 'CommentBlock',
                        value: '',
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

        it('should fire an event for JSDoc comments', () => {
            const node = {
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

    // TODO: these tests aren't working; for some strange reason, Node.js 6.10.2 stops running code
    // for visitor.visitNode() while it's in the middle of the SymbolFound constructor. maybe a
    // version-specific bug?
    xdescribe('visitNode', () => {
        // TODO: more tests

        let events = [];

        function listener(event) {
            events.push(event);
        }

        beforeEach(() => {
            parser.addListener('symbolFound', listener);
        });

        afterEach(() => {
            parser.removeListener('symbolFound', listener);
            events = [];
        });

        it('should ignore non-JSDoc leading comments', () => {
            const node = {
                type: 'Property',
                key: {
                    type: 'Identifier',
                    name: 'foo'
                },
                value: {
                    type: 'Literal',
                    value: true
                },
                kind: 'init',
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

            visitor.visitNode(node, parser, 'fake');

            expect(events[0].comment).toBe('');
        });

        it('should include JSDoc leading comments', () => {
            const node = {
                type: 'Property',
                key: {
                    type: 'Identifier',
                    name: 'foo'
                },
                value: {
                    type: 'Literal',
                    value: true
                },
                kind: 'init',
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

            visitor.visitNode(node, parser, 'fake');

            expect(events[0].comment).toBe('/** block comment */');
        });
    });
});

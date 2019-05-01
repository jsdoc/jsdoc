/* eslint no-script-url: 0 */
describe('jsdoc/src/parser', () => {
    const fs = require('../fs');
    const jsdoc = {
        env: require('../env'),
        src: {
            handlers: require('./handlers'),
            parser: require('./parser')
        },
        util: {
            logger: require('../util/logger')
        }
    };
    const path = require('../path');

    it('should exist', () => {
        expect(jsdoc.src.parser).toBeDefined();
        expect(typeof jsdoc.src.parser).toBe('object');
    });

    it('should export a "createParser" method', () => {
        expect(typeof jsdoc.src.parser.createParser).toBe('function');
    });

    it('should export a "Parser" constructor', () => {
        expect(typeof jsdoc.src.parser.Parser).toBe('function');
    });

    describe('createParser', () => {
        it('should return a Parser when called without arguments', () => {
            expect(typeof jsdoc.src.parser.createParser()).toBe('object');
        });

        it('should create a jsdoc/src/parser.Parser instance with the argument "js"', () => {
            const parser = jsdoc.src.parser.createParser('js');

            expect(parser instanceof jsdoc.src.parser.Parser).toBe(true);
        });

        it('should log a fatal error on bad input', () => {
            spyOn(jsdoc.util.logger, 'fatal');
            jsdoc.src.parser.createParser('not-a-real-parser-ever');

            expect(jsdoc.util.logger.fatal).toHaveBeenCalled();
        });
    });

    describe('Parser', () => {
        let parser;

        function newParser() {
            parser = new jsdoc.src.parser.Parser();
        }

        newParser();

        it('should have an "astBuilder" property', () => {
            expect(parser.astBuilder).toBeDefined();
        });

        it('should have a "visitor" property', () => {
            expect(parser.visitor).toBeDefined();
        });

        it('should have a "walker" property', () => {
            expect(parser.walker).toBeDefined();
        });

        it('should accept an astBuilder, visitor, and walker as arguments', () => {
            const astBuilder = {};
            const visitor = {
                /* eslint-disable no-empty-function */
                setParser() {}
                /* eslint-enable no-empty-function */
            };
            const walker = {};

            const myParser = new jsdoc.src.parser.Parser(astBuilder, visitor, walker);

            expect(myParser.astBuilder).toBe(astBuilder);
            expect(myParser.visitor).toBe(visitor);
            expect(myParser.walker).toBe(walker);
        });

        it('should have a "parse" method', () => {
            expect(parser.parse).toBeDefined();
            expect(typeof parser.parse).toBe('function');
        });

        it('should have a "results" method', () => {
            expect(parser.results).toBeDefined();
            expect(typeof parser.results).toBe('function');
        });

        it('should have an "addAstNodeVisitor" method', () => {
            expect(parser.addAstNodeVisitor).toBeDefined();
            expect(typeof parser.addAstNodeVisitor).toBe('function');
        });

        it('should have a "getAstNodeVisitors" method', () => {
            expect(parser.getAstNodeVisitors).toBeDefined();
            expect(typeof parser.getAstNodeVisitors).toBe('function');
        });

        describe('astBuilder', () => {
            it('should contain an appropriate astBuilder by default', () => {
                expect(parser.astBuilder instanceof (require('./astbuilder')).AstBuilder).toBe(true);
            });
        });

        describe('visitor', () => {
            it('should contain an appropriate visitor by default', () => {
                expect(parser.visitor instanceof (require('./visitor')).Visitor).toBe(true);
            });
        });

        describe('walker', () => {
            it('should contain an appropriate walker by default', () => {
                expect(parser.walker instanceof (require('./walker')).Walker).toBe(true);
            });
        });

        describe('parse', () => {
            beforeEach(newParser);

            it('should fire "parseBegin" events before it parses any files', () => {
                const spy = jasmine.createSpy();
                const sourceFiles = ['javascript:/** @name foo */'];

                parser.on('parseBegin', spy).parse(sourceFiles);
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0].sourcefiles).toBe(sourceFiles);
            });

            it("should allow 'parseBegin' handlers to modify the list of source files", () => {
                const sourceCode = 'javascript:/** @name foo */';
                const newFiles = ['[[replaced]]'];
                let evt;

                function handler(e) {
                    e.sourcefiles = newFiles;
                    evt = e;
                }

                parser.on('parseBegin', handler).parse(sourceCode);
                expect(evt.sourcefiles).toBe(newFiles);
            });

            it('should fire "jsdocCommentFound" events when a source file contains JSDoc comments', () => {
                const spy = jasmine.createSpy();
                const sourceCode = ['javascript:/** @name bar */'];

                parser.on('jsdocCommentFound', spy).parse(sourceCode);

                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0].comment).toBe('/** @name bar */');
            });

            it('should fire "symbolFound" events when a source file contains named symbols', () => {
                const spy = jasmine.createSpy();
                const sourceCode = 'javascript:var foo = 1';

                parser.on('symbolFound', spy).parse(sourceCode);

                expect(spy).toHaveBeenCalled();
            });

            it('should fire "newDoclet" events after creating a new doclet', () => {
                const spy = jasmine.createSpy();
                const sourceCode = 'javascript:var foo = 1';

                parser.on('symbolFound', spy).parse(sourceCode);

                expect(spy).toHaveBeenCalled();
            });

            it('should allow "newDoclet" handlers to modify doclets', () => {
                let results;
                const sourceCode = 'javascript:/** @class */function Foo() {}';

                function handler(e) {
                    const doop = require('../util/doop');

                    e.doclet = doop(e.doclet);
                    e.doclet.foo = 'bar';
                }

                jsdoc.src.handlers.attachTo(parser);
                parser.on('newDoclet', handler).parse(sourceCode);
                results = parser.results();

                expect(results[0].foo).toBe('bar');
            });

            it('should call AST node visitors', () => {
                const Syntax = require('./syntax').Syntax;

                let args;
                const sourceCode = ['javascript:/** foo */var foo;'];
                const visitor = {
                    visitNode(node, e) {
                        if (e && e.code && !args) {
                            args = Array.prototype.slice.call(arguments);
                        }
                    }
                };

                jsdoc.src.handlers.attachTo(parser);
                parser.addAstNodeVisitor(visitor);
                parser.parse(sourceCode);

                expect(args).toBeDefined();
                expect( Array.isArray(args) ).toBe(true);
                expect(args.length).toBe(4);

                // args[0]: AST node
                expect(args[0].type).toBeDefined();
                expect(args[0].type).toBe(Syntax.VariableDeclarator);

                // args[1]: JSDoc event
                expect(typeof args[1]).toBe('object');
                expect(args[1].code).toBeDefined();
                expect(args[1].code.name).toBeDefined();
                expect(args[1].code.name).toBe('foo');

                // args[2]: parser
                expect(typeof args[2]).toBe('object');
                expect(args[2] instanceof jsdoc.src.parser.Parser).toBe(true);

                // args[3]: current source name
                expect( String(args[3]) ).toBe('[[string0]]');
            });

            it('should reflect changes made by AST node visitors', () => {
                let doclet;
                const sourceCode = ['javascript:/** foo */var foo;'];
                const visitor = {
                    visitNode(node, e) {
                        if (e && e.code && e.code.name === 'foo') {
                            e.code.name = 'bar';
                        }
                    }
                };

                jsdoc.src.handlers.attachTo(parser);
                parser.addAstNodeVisitor(visitor);
                parser.parse(sourceCode);

                doclet = parser.results()[0];

                expect(doclet).toBeDefined();
                expect(typeof doclet).toBe('object');
                expect(doclet.name).toBeDefined();
                expect(doclet.name).toBe('bar');
            });

            it('should fire "parseComplete" events after it finishes parsing files', () => {
                let eventObject;
                const spy = jasmine.createSpy();
                const sourceCode = ['javascript:/** @class */function Foo() {}'];

                jsdoc.src.handlers.attachTo(parser);
                parser.on('parseComplete', spy).parse(sourceCode);

                expect(spy).toHaveBeenCalled();

                eventObject = spy.mostRecentCall.args[0];
                expect(eventObject).toBeDefined();
                expect( Array.isArray(eventObject.sourcefiles) ).toBe(true);
                expect(eventObject.sourcefiles.length).toBe(1);
                expect(eventObject.sourcefiles[0]).toBe('[[string0]]');
                expect( Array.isArray(eventObject.doclets) ).toBe(true);
                expect(eventObject.doclets.length).toBe(1);
                expect(eventObject.doclets[0].kind).toBe('class');
                expect(eventObject.doclets[0].longname).toBe('Foo');
            });

            it('should fire a "processingComplete" event when fireProcessingComplete is called', () => {
                const spy = jasmine.createSpy();
                const doclets = ['a', 'b'];

                parser.on('processingComplete', spy).fireProcessingComplete(doclets);

                expect(spy).toHaveBeenCalled();
                expect(typeof spy.mostRecentCall.args[0]).toBe('object');
                expect(spy.mostRecentCall.args[0].doclets).toBeDefined();
                expect(spy.mostRecentCall.args[0].doclets).toBe(doclets);
            });

            it('should not throw errors when parsing files with ES6 syntax', () => {
                function parse() {
                    const parserSrc = `javascript:${fs.readFileSync(
                        path.join(jsdoc.env.dirname, 'test/fixtures/es6.js'), 'utf8')}`;

                    parser.parse(parserSrc);
                }

                expect(parse).not.toThrow();
            });

            it('should be able to parse its own source file', () => {
                const parserSrc = `javascript:${fs.readFileSync(path.join(jsdoc.env.dirname,
                    'lib/jsdoc/src/parser.js'), 'utf8')}`;

                function parse() {
                    parser.parse(parserSrc);
                }

                expect(parse).not.toThrow();
            });

            it('should comment out a POSIX hashbang at the start of the file', () => {
                const parserSrc = 'javascript:#!/usr/bin/env node\n/** class */function Foo() {}';

                function parse() {
                    parser.parse(parserSrc);
                }

                expect(parse).not.toThrow();
            });
        });

        describe('results', () => {
            beforeEach(newParser);

            it('returns an empty array before files are parsed', () => {
                const results = parser.results();

                expect(results).toBeDefined();
                expect( Array.isArray(results) ).toBe(true);
                expect(results.length).toBe(0);
            });

            it('returns an array of doclets after files are parsed', () => {
                const source = 'javascript:var foo;';
                let results;

                jsdoc.src.handlers.attachTo(parser);

                parser.parse(source);
                results = parser.results();

                expect(results).toBeDefined();
                expect(results[0]).toBeDefined();
                expect(typeof results[0]).toBe('object');
                expect(results[0].name).toBeDefined();
                expect(results[0].name).toBe('foo');
            });

            it('should reflect comment changes made by "jsdocCommentFound" handlers', () => {
                // we test both POSIX and Windows line endings
                const source = 'javascript:/**\n * replaceme\r\n * @module foo\n */\n\n' +
                    '/**\n * replaceme\n */\nvar bar;';

                parser.on('jsdocCommentFound', e => {
                    e.comment = e.comment.replace('replaceme', 'REPLACED!');
                });
                jsdoc.src.handlers.attachTo(parser);

                parser.parse(source);
                parser.results().forEach(({comment}) => {
                    expect(comment).not.toMatch('replaceme');
                    expect(comment).toMatch('REPLACED!');
                });
            });

            // TODO: this test appears to be doing nothing...
            xdescribe('event order', () => {
                const events = {
                    all: [],
                    jsdocCommentFound: [],
                    symbolFound: []
                };
                const source = fs.readFileSync(path.join(jsdoc.env.dirname,
                    'test/fixtures/eventorder.js'), 'utf8');

                /*
                function pushEvent(e) {
                    events.all.push(e);
                    events[e.event].push(e);
                }
                */

                function sourceOrderSort(atom1, atom2) {
                    if (atom1.range[1] < atom2.range[0]) {
                        return -1;
                    }
                    else if (atom1.range[0] < atom2.range[0] && atom1.range[1] === atom2.range[1]) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }

                it('should fire interleaved jsdocCommentFound and symbolFound events, ' +
                    'in source order', () => {
                    jsdoc.src.handlers.attachTo(parser);
                    parser.parse(source);
                    events.all.slice(0).sort(sourceOrderSort).forEach((e, i) => {
                        expect(e).toBe(events.all[i]);
                    });
                });
            });
        });

        describe('addAstNodeVisitor', () => {
            /* eslint-disable no-empty-function */
            function visitorA() {}
            function visitorB() {}
            /* eslint-enable no-empty-function */

            let visitors;

            beforeEach(newParser);

            it('should work with a single node visitor', () => {
                parser.addAstNodeVisitor(visitorA);

                visitors = parser.getAstNodeVisitors();

                expect(visitors.length).toBe(1);
                expect(visitors[0]).toBe(visitorA);
            });

            it('should work with multiple node visitors', () => {
                parser.addAstNodeVisitor(visitorA);
                parser.addAstNodeVisitor(visitorB);

                visitors = parser.getAstNodeVisitors();

                expect(visitors.length).toBe(2);
                expect(visitors[0]).toBe(visitorA);
                expect(visitors[1]).toBe(visitorB);
            });
        });

        describe('getAstNodeVisitors', () => {
            beforeEach(newParser);

            it('should return an empty array by default', () => {
                const visitors = parser.getAstNodeVisitors();

                expect( Array.isArray(visitors) ).toBe(true);
                expect(visitors.length).toBe(0);
            });

            // other functionality is covered by the addNodeVisitors tests
        });
    });
});

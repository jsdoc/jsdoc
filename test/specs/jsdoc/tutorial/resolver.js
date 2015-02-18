'use strict';

describe('jsdoc/tutorial/resolver', function() {
    var env = require('jsdoc/env');
    var logger = require('jsdoc/util/logger');
    var resolver = require('jsdoc/tutorial/resolver');
    var tutorial = require('jsdoc/tutorial');

    var childNames;
    var constr;
    var test;
    var test2;
    var test3;
    var test4;
    var test6;

    function resetRootTutorial() {
        resolver.root = new tutorial.RootTutorial();
    }

    function loadTutorials() {
        resetRootTutorial();

        resolver.load(env.dirname + '/test/tutorials/tutorials');

        childNames = resolver.root.children.map(function (t) { return t.name; });
        test = resolver.root.getByName('test');
        test2 = resolver.root.getByName('test2');
        test3 = resolver.root.getByName('test3');
        test4 = resolver.root.getByName('test4');
        test6 = resolver.root.getByName('test6');
        constr = resolver.root.getByName('constructor');
    }

    it('should exist', function() {
        expect(resolver).toBeDefined();
        expect(typeof resolver).toBe('object');
    });

    it('should export an "addTutorial" function', function() {
        expect(resolver.addTutorial).toBeDefined();
        expect(typeof resolver.addTutorial).toBe('function');
    });

    it('should export a "load" function', function() {
        expect(resolver.load).toBeDefined();
        expect(typeof resolver.load).toBe('function');
    });

    it('should export a "resolve" function', function() {
        expect(resolver.resolve).toBeDefined();
        expect(typeof resolver.resolve).toBe('function');
    });

    it('should export a "root" tutorial', function() {
        expect(resolver.root).toBeDefined();
        expect(resolver.root instanceof tutorial.RootTutorial).toBe(true);
    });

    it('exported "root" tutorial should export a "getByName" function', function() {
        expect(resolver.root.getByName).toBeDefined();
        expect(typeof resolver.root.getByName).toBe('function');
    });

    // note: every time we addTutorial or run the resolver, we are *adding*
    // to the root tutorial.
    describe('addTutorial', function() {
        var tute;

        beforeEach(function() {
            resetRootTutorial();

            tute = new tutorial.Tutorial('myTutorial', '', tutorial.TYPES.HTML);
            resolver.addTutorial(tute);
        });

        afterEach(resetRootTutorial);

        it('should add a default parent of the root tutorial', function() {
            expect(tute.parent).toBe(resolver.root);
        });

        it('should be added to the root tutorial as a child', function() {
            expect(resolver.root.children).toContain(tute);
        });
    });

    describe('load', function() {
        beforeEach(loadTutorials);

        afterEach(resetRootTutorial);

        it('does not, by default, recurse into subdirectories', function() {
            expect(resolver.root.getByName('test_recursive')).toBeFalsy();
        });

        it('recurses into subdirectories when the --recurse flag is used', function() {
            var recurse = env.opts.recurse;
            var recursiveTute;

            env.opts.recurse = true;
            loadTutorials();
            recursiveTute = resolver.root.getByName('test_recursive');

            expect(recursiveTute).toBeDefined();
            expect(recursiveTute instanceof tutorial.Tutorial).toBe(true);

            env.opts.recurse = recurse;
        });

        it('all tutorials are added, initially as top-level tutorials', function() {
            // check they were added
            expect(test).toBeDefined();
            expect(test2).toBeDefined();
            expect(test3).toBeDefined();
            expect(test4).toBeDefined();
            expect(test6).toBeDefined();
            expect(constr).toBeDefined();
            // check they are top-level in resolver.root
            expect(childNames).toContain('test');
            expect(childNames).toContain('test2');
            expect(childNames).toContain('test3');
            expect(childNames).toContain('test4');
            expect(childNames).toContain('test6');
        });

        it('tutorials with names equal to reserved keywords in JS still function as expected', function() {
            expect(constr instanceof tutorial.Tutorial).toBe(true);
        });

        it('non-tutorials are skipped', function() {
            expect(resolver.root.getByName('multiple')).toBeFalsy();
            expect(resolver.root.getByName('test5')).toBeFalsy();
        });

        it('tutorial types are determined correctly', function() {
            // test.html, test2.markdown, test3.html, test4.md, test6.xml
            expect(test.type).toBe(tutorial.TYPES.HTML);
            expect(test2.type).toBe(tutorial.TYPES.MARKDOWN);
            expect(test3.type).toBe(tutorial.TYPES.HTML);
            expect(test4.type).toBe(tutorial.TYPES.MARKDOWN);
            expect(test6.type).toBe(tutorial.TYPES.HTML);
            expect(constr.type).toBe(tutorial.TYPES.MARKDOWN);
        });
    });

    // resolve
    // myTutorial
    // constructor
    // test
    // |- test2
    //    |- test6
    //    |- test3
    //       |- test4
    describe('resolve', function() {
        beforeEach(function() {
            spyOn(logger, 'error');
            spyOn(logger, 'warn');
            loadTutorials();
            resolver.resolve();
        });

        afterEach(resetRootTutorial);

        it('hierarchy is resolved properly no matter how the children property is defined', function() {
            // root has child 'test'
            expect(resolver.root.children.length).toBe(2);
            expect(resolver.root.children).toContain(test);
            expect(resolver.root.children).toContain(constr);
            expect(test.parent).toBe(resolver.root);
            expect(constr.parent).toBe(resolver.root);

            // test has child 'test2'
            expect(test.children.length).toBe(1);
            expect(test.children).toContain(test2);
            expect(test2.parent).toBe(test);

            // test2 has children test3, test6
            expect(test2.children.length).toBe(2);
            expect(test2.children).toContain(test3);
            expect(test2.children).toContain(test6);
            expect(test3.parent).toBe(test2);
            expect(test6.parent).toBe(test2);

            // test3 has child test4
            expect(test3.children.length).toBe(1);
            expect(test3.children).toContain(test4);
            expect(test4.parent).toBe(test3);
        });

        it('tutorials without configuration files have titles matching filenames', function() {
            // test6.xml didn't have a metadata
            expect(test6.title).toBe('test6');
        });

        it('tutorials with configuration files have titles as specified in configuration', function() {
            // test.json had info for just test.json
            expect(test.title).toBe('Test tutorial');
        });

        it('multiple tutorials can appear in a configuration file', function() {
            expect(test2.title).toBe('Test 2');
            expect(test3.title).toBe('Test 3');
            expect(test4.title).toBe('Test 4');
        });

        it('logs an error for missing tutorials', function() {
            resolver.load(env.dirname + '/test/tutorials/incomplete');
            resolver.resolve();

            expect(logger.error).toHaveBeenCalled();
        });

        it('logs a warning for duplicate-named tutorials (e.g. test.md, test.html)', function() {
            var tute = new tutorial.Tutorial('myTutorial', '', tutorial.TYPES.HTML);
            resolver.addTutorial(tute);
            resolver.addTutorial(tute);

            expect(logger.warn).toHaveBeenCalled();
        });

        it('allows tutorials to be defined in one .json file and redefined in another', function() {
            resolver.load(env.dirname + '/test/tutorials/duplicateDefined');
            resolver.resolve();

            expect(logger.error).not.toHaveBeenCalled();
            expect(logger.warn).toHaveBeenCalled();
            // we don't check to see which one wins; it depends on the order in which the JS engine
            // iterates over object keys
            expect(resolver.root.getByName('asdf')).toBeDefined();
        });
    });
});

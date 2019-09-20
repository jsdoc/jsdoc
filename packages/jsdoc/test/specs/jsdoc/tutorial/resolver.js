describe('jsdoc/tutorial/resolver', () => {
    const env = require('jsdoc/env');
    const logger = require('jsdoc/util/logger');
    const resolver = require('jsdoc/tutorial/resolver');
    const tutorial = require('jsdoc/tutorial');

    let childNames;
    let constr;
    let test;
    let test2;
    let test3;
    let test4;
    let test6;

    function resetRootTutorial() {
        resolver.root = new tutorial.RootTutorial();
    }

    function loadTutorials() {
        resetRootTutorial();

        resolver.load(`${env.dirname}/test/fixtures/tutorials/tutorials`);

        childNames = resolver.root.children.map(({name}) => name);
        test = resolver.root.getByName('test');
        test2 = resolver.root.getByName('test2');
        test3 = resolver.root.getByName('test3');
        test4 = resolver.root.getByName('test4');
        test6 = resolver.root.getByName('test6');
        constr = resolver.root.getByName('constructor');
    }

    it('should exist', () => {
        expect(resolver).toBeObject();
    });

    it('should export an "addTutorial" function', () => {
        expect(resolver.addTutorial).toBeFunction();
    });

    it('should export a "load" function', () => {
        expect(resolver.load).toBeFunction();
    });

    it('should export a "resolve" function', () => {
        expect(resolver.resolve).toBeFunction();
    });

    it('should export a "root" tutorial', () => {
        expect(resolver.root).toBeObject();
        expect(resolver.root instanceof tutorial.RootTutorial).toBe(true);
    });

    it('exported "root" tutorial should export a "getByName" function', () => {
        expect(resolver.root.getByName).toBeFunction();
    });

    // note: every time we addTutorial or run the resolver, we are *adding*
    // to the root tutorial.
    describe('addTutorial', () => {
        let tute;

        beforeEach(() => {
            resetRootTutorial();

            tute = new tutorial.Tutorial('myTutorial', '', tutorial.TYPES.HTML);
            resolver.addTutorial(tute);
        });

        afterEach(resetRootTutorial);

        it('should add a default parent of the root tutorial', () => {
            expect(tute.parent).toBe(resolver.root);
        });

        it('should be added to the root tutorial as a child', () => {
            expect(resolver.root.children).toContain(tute);
        });
    });

    describe('load', () => {
        const recurse = env.opts.recurse;

        beforeEach(loadTutorials);

        afterEach(() => {
            resetRootTutorial();

            env.opts.recurse = recurse;
        });

        it('does not, by default, recurse into subdirectories', () => {
            expect(resolver.root.getByName('test_recursive')).toBeFalsy();
        });

        it('recurses into subdirectories when the --recurse flag is used', () => {
            let recursiveTute;

            env.opts.recurse = true;
            loadTutorials();
            recursiveTute = resolver.root.getByName('test_recursive');

            expect(recursiveTute).toBeObject();
            expect(recursiveTute instanceof tutorial.Tutorial).toBe(true);
        });

        it('all tutorials are added, initially as top-level tutorials', () => {
            // check they were added
            expect(test).toBeObject();
            expect(test2).toBeObject();
            expect(test3).toBeObject();
            expect(test4).toBeObject();
            expect(test6).toBeObject();
            expect(constr).toBeObject();
            // check they are top-level in resolver.root
            expect(childNames).toContain('test');
            expect(childNames).toContain('test2');
            expect(childNames).toContain('test3');
            expect(childNames).toContain('test4');
            expect(childNames).toContain('test6');
        });

        it('tutorials with names equal to reserved keywords in JS still function as expected', () => {
            expect(constr instanceof tutorial.Tutorial).toBe(true);
        });

        it('non-tutorials are skipped', () => {
            expect(resolver.root.getByName('multiple')).toBeFalse();
            expect(resolver.root.getByName('test5')).toBeFalse();
        });

        it('tutorial types are determined correctly', () => {
            // test.html, test2.markdown, test3.html, test4.md, test6.xml
            expect(test.type).toBe(tutorial.TYPES.HTML);
            expect(test2.type).toBe(tutorial.TYPES.MARKDOWN);
            expect(test3.type).toBe(tutorial.TYPES.HTML);
            expect(test4.type).toBe(tutorial.TYPES.MARKDOWN);
            expect(test6.type).toBe(tutorial.TYPES.HTML);
            expect(constr.type).toBe(tutorial.TYPES.MARKDOWN);
        });

        it('JSON files with a leading BOM are handled correctly', () => {
            resetRootTutorial();

            function loadBomTutorials() {
                resolver.load(`${env.dirname}/test/fixtures/tutorials/bom`);
            }

            expect(loadBomTutorials).not.toThrow();
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
    describe('resolve', () => {
        beforeEach(() => {
            spyOn(logger, 'error');
            spyOn(logger, 'warn');
            loadTutorials();
            resolver.resolve();
        });

        afterEach(resetRootTutorial);

        it('hierarchy is resolved properly no matter how the children property is defined', () => {
            // root has child 'test'
            expect(resolver.root.children).toBeArrayOfSize(2);
            expect(resolver.root.children).toContain(test);
            expect(resolver.root.children).toContain(constr);
            expect(test.parent).toBe(resolver.root);
            expect(constr.parent).toBe(resolver.root);

            // test has child 'test2'
            expect(test.children).toBeArrayOfSize(1);
            expect(test.children).toContain(test2);
            expect(test2.parent).toBe(test);

            // test2 has children test3, test6
            expect(test2.children).toBeArrayOfSize(2);
            expect(test2.children).toContain(test3);
            expect(test2.children).toContain(test6);
            expect(test3.parent).toBe(test2);
            expect(test6.parent).toBe(test2);

            // test3 has child test4
            expect(test3.children).toBeArrayOfSize(1);
            expect(test3.children).toContain(test4);
            expect(test4.parent).toBe(test3);
        });

        it('tutorials without configuration files have titles matching filenames', () => {
            // test6.xml didn't have a metadata
            expect(test6.title).toBe('test6');
        });

        it('tutorials with configuration files have titles as specified in configuration', () => {
            // test.json had info for just test.json
            expect(test.title).toBe('Test tutorial');
        });

        it('multiple tutorials can appear in a configuration file', () => {
            expect(test2.title).toBe('Test 2');
            expect(test3.title).toBe('Test 3');
            expect(test4.title).toBe('Test 4');
        });

        it('logs an error for missing tutorials', () => {
            resolver.load(`${env.dirname}/test/fixtures/tutorials/incomplete`);
            resolver.resolve();

            expect(logger.error).toHaveBeenCalled();
        });

        it('logs a warning for duplicate-named tutorials (e.g. test.md, test.html)', () => {
            const tute = new tutorial.Tutorial('myTutorial', '', tutorial.TYPES.HTML);

            resolver.addTutorial(tute);
            resolver.addTutorial(tute);

            expect(logger.warn).toHaveBeenCalled();
        });

        it('allows tutorials to be defined in one .json file and redefined in another', () => {
            resolver.load(`${env.dirname}/test/fixtures/tutorials/duplicateDefined`);
            resolver.resolve();

            expect(logger.error).not.toHaveBeenCalled();
            expect(logger.warn).toHaveBeenCalled();
            // we don't check to see which one wins; it depends on the order in which the JS engine
            // iterates over object keys
            expect(resolver.root.getByName('asdf')).toBeObject();
        });
    });
});

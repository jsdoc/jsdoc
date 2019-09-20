describe('module names', () => {
    const env = require('jsdoc/env');
    const path = require('jsdoc/path');

    let doclets;

    const pwd = env.pwd;
    let srcParser = null;
    const sourceFiles = env.sourceFiles.slice(0);
    const sourcePaths = env.opts._.slice(0);

    beforeEach(() => {
        env.opts._ = [path.normalize(`${__dirname}/../../fixtures/modules/data`)];
        env.pwd = env.dirname;
        env.sourceFiles = [];
        srcParser = jsdoc.createParser();
        require('jsdoc/src/handlers').attachTo(srcParser);
    });

    afterEach(() => {
        env.opts._ = sourcePaths;
        env.pwd = pwd;
        env.sourceFiles = sourceFiles;
    });

    it('should create a name from the file path when no documented module name exists', () => {
        const filename = 'test/fixtures/modules/data/mod-1.js';

        env.sourceFiles.push(filename);
        doclets = srcParser.parse(
            path.normalize( path.join(env.pwd, filename) )
        );

        expect(doclets.length).toBeGreaterThan(1);
        expect(doclets[0].longname).toBe('module:mod-1');
    });

    // Windows-specific test
    if ( /^win/.test(require('os').platform()) ) {
        it('should always use forward slashes when creating a name from the file path', () => {
            const { Doclet } = require('jsdoc/doclet');
            let doclet;

            env.sourceFiles = [
                'C:\\Users\\Jane Smith\\myproject\\index.js',
                'C:\\Users\\Jane Smith\\myproject\\lib\\mymodule.js'
            ];
            env.opts._ = [];

            doclet = new Doclet('/** @module */', {
                lineno: 1,
                filename: 'C:\\Users\\Jane Smith\\myproject\\lib\\mymodule.js'
            });

            expect(doclet.name).toBe('lib/mymodule');
        });
    }

    it('should use the documented module name if available', () => {
        const filename = 'test/fixtures/modules/data/mod-2.js';

        env.sourceFiles.push(filename);
        doclets = srcParser.parse(
            path.normalize( path.join(env.pwd, filename) )
        );

        expect(doclets.length).toBeGreaterThan(1);
        expect(doclets[0].longname).toBe('module:my/module/name');
    });
});

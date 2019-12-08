describe('@overview tag', () => {
    const env = require('jsdoc/env');
    const path = require('path');

    let doclets;

    let srcParser;
    const sourceFiles = env.sourceFiles.slice(0);
    const sourcePaths = env.opts._.slice(0);

    beforeEach(() => {
        env.opts._ = [path.normalize(`${__dirname}/../../fixtures`)];
        env.sourceFiles = [];
        srcParser = jsdoc.createParser();
        require('jsdoc/src/handlers').attachTo(srcParser);
    });

    afterEach(() => {
        env.opts._ = sourcePaths;
        env.sourceFiles = sourceFiles;
    });

    it('When a file overview tag appears in a doclet, the name of the doclet should contain the path to the file.', () => {
        const filename = path.resolve(env.dirname, 'test/fixtures/file.js');

        env.sourceFiles.push(filename);
        doclets = srcParser.parse(filename);

        expect(doclets[0].name).toMatch(/^file\.js$/);
    });

    it('The name and longname should be equal', () => {
        const filename = 'test/fixtures/file.js';

        env.sourceFiles.push(filename);
        doclets = srcParser.parse(
            path.normalize( path.join(env.dirname, filename) )
        );

        expect(doclets[0].name).toBe(doclets[0].longname);
    });

    it('The name should not include the entire filepath when the source file is outside the ' +
        'JSDoc directory', () => {
        const Doclet = require('jsdoc/doclet').Doclet;

        let doclet;
        let docletMeta;
        let docletSrc;
        let fakePath = path.resolve(path.join(env.dirname, '..', 'somefile.js'));

        // set up the environment to reflect the fake filepath
        env.opts._ = [fakePath];

        // create a doclet with a fake filepath, then add a `@file` tag
        docletSrc = '/** @class */';
        docletMeta = {
            lineno: 1,
            filename: fakePath
        };
        doclet = new Doclet(docletSrc, docletMeta);
        doclet.addTag('file', 'A random file.');

        expect(doclet.name).toBe('somefile.js');
    });
});

'use strict';

describe('@overview tag', function() {
    var env = require('jsdoc/env');
    var path = require('jsdoc/path');
    var runtime = require('jsdoc/util/runtime');

    var doclets;

    var pwd = env.pwd;
    var srcParser = null;
    var sourceFiles = env.sourceFiles.slice(0);
    var sourcePaths = env.opts._.slice(0);

    beforeEach(function() {
        env.opts._ = [path.normalize(env.pwd + '/test/fixtures/')];
        env.pwd = env.dirname;
        env.sourceFiles = [];
        srcParser = jasmine.createParser();
        require('jsdoc/src/handlers').attachTo(srcParser);
    });

    afterEach(function() {
        env.opts._ = sourcePaths;
        env.pwd = pwd;
        env.sourceFiles = sourceFiles;
    });

    it('When a file overview tag appears in a doclet, the name of the doclet should contain the path to the file.', function() {
        var filename = 'test/fixtures/file.js';

        env.sourceFiles.push(filename);
        doclets = srcParser.parse(
            path.normalize( path.join(env.pwd, filename) )
        );
        expect(doclets[0].name).toMatch(/^file\.js$/);
    });

    it('The name and longname should be equal', function() {
        var filename = 'test/fixtures/file.js';

        env.sourceFiles.push(filename);
        doclets = srcParser.parse(
            path.normalize( path.join(env.pwd, filename) )
        );
        expect(doclets[0].name).toBe(doclets[0].longname);
    });

    it('The name should not include the entire filepath when the source file is outside the ' +
        'JSDoc directory', function() {
        var Doclet = require('jsdoc/doclet').Doclet;
        var os = require('os');

        var doclet;
        var docletMeta;
        var docletSrc;

        var fakePath = '/Users/jdoe/foo/bar/someproject/junk/okayfile.js';

        // set up the environment to reflect the fake filepath
        env.pwd = '/Users/jdoe/someproject';
        env.sourceFiles = [];
        env.opts._ = [fakePath];

        // ensure that paths are resolved consistently on Windows
        if (os.platform().indexOf('win') === 0) {
            fakePath = 'c:' + fakePath;
            env.pwd = 'c:' + env.pwd;
        }

        // create a doclet with a fake filepath, then add a `@file` tag
        docletSrc = '/** @class */';
        docletMeta = {
            lineno: 1,
            filename: fakePath
        };
        doclet = new Doclet(docletSrc, docletMeta);
        doclet.addTag('file', 'This file is pretty okay.');

        expect(doclet.name).toBe('okayfile.js');
    });
});

'use strict';

describe('module names', function() {
    var env = require('jsdoc/env');
    var path = require('jsdoc/path');
    var runtime = require('jsdoc/util/runtime');

    var doclets;

    var pwd = env.pwd;
    var srcParser = null;
    var sourceFiles = env.sourceFiles.slice(0);
    var sourcePaths = env.opts._.slice(0);

    beforeEach(function() {
        env.opts._ = [path.normalize(env.pwd + '/test/fixtures/modules/data/')];
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

    it('should create a name from the file path when no documented module name exists', function() {
        var filename = 'test/fixtures/modules/data/mod-1.js';

        env.sourceFiles.push(filename);
        doclets = srcParser.parse(
            path.normalize( path.join(env.pwd, filename) )
        );
        expect(doclets.length).toBeGreaterThan(1);
        expect(doclets[0].longname).toBe('module:mod-1');
    });

    // Windows-specific test
    if ( /^win/.test(require('os').platform()) ) {
        it('should always use forward slashes when creating a name from the file path', function() {
            var Doclet = require('jsdoc/doclet').Doclet;
            var doclet;

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

    it('should use the documented module name if available', function() {
        var filename = 'test/fixtures/modules/data/mod-2.js';

        env.sourceFiles.push(filename);
        doclets = srcParser.parse(
            path.normalize( path.join(env.pwd, filename) )
        );

        expect(doclets.length).toBeGreaterThan(1);
        expect(doclets[0].longname).toBe('module:my/module/name');
    });
});

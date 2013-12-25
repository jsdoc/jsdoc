/*global afterEach: true, beforeEach: true, describe: true, env: true, expect: true, it: true,
jasmine: true, spyOn: true */
describe("module names", function() {
    var path = require('jsdoc/path');
    var runtime = require('jsdoc/util/runtime');

    var doclets;

    var srcParser = null;
    var sourcePaths = env.opts._.slice(0);

    beforeEach(function() {
        env.opts._ = [path.normalize(env.dirname + '/test/fixtures/modules/data/')];
        srcParser = jasmine.createParser();
        require('jsdoc/src/handlers').attachTo(srcParser);
    });

    afterEach(function() {
        env.opts._ = sourcePaths;
    });

    it("should create a name from the file path when no documented module name exists", function() {
        doclets = srcParser.parse(
            path.normalize(env.dirname + '/test/fixtures/modules/data/mod-1.js')
        );
        expect(doclets.length).toBeGreaterThan(1);
        expect(doclets[0].longname).toEqual('module:mod-1');
    });

    // only works on Windows (which is fine)
    if ( /^win/.test(require('os').platform()) ) {
        it("should always use forward slashes when creating a name from the file path", function() {
            var Doclet = require('jsdoc/doclet').Doclet;
            var doclet;

            // setup
            var sourceFiles = env.sourceFiles.slice(0);
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

            // teardown
            env.sourceFiles = sourceFiles;
        });
    }

    it("should use the documented module name if available", function() {
        doclets = srcParser.parse(
            path.normalize(env.dirname + '/test/fixtures/modules/data/mod-2.js')
        );
        expect(doclets.length).toBeGreaterThan(1);
        expect(doclets[0].longname).toEqual('module:my/module/name');
    });
});
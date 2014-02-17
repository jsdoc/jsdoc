/*global beforeEach: true, afterEach: true, describe: true, env: true, expect: true, it: true,
jasmine: true */

describe("@overview tag", function() {
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

    it("The name and longname should be equal", function() {
        var filename = 'test/fixtures/file.js';

        env.sourceFiles.push(filename);
        doclets = srcParser.parse(
            path.normalize( path.join(env.pwd, filename) )
        );
        expect(doclets[0].name).toBe(doclets[0].longname);
    });
});

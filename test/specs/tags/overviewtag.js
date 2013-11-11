/*global beforeEach: true, afterEach: true, describe: true, env: true, expect: true, it: true,
jasmine: true */

describe("@overview tag", function() {
    var path = require('jsdoc/path');
    var runtime = require('jsdoc/util/runtime');

    var doclets;

    var srcParser = null;
    var sourcePaths = env.opts._.slice(0);

    beforeEach(function() {
        env.opts._ = [path.normalize(env.dirname + '/test/fixtures/')];
        srcParser = jasmine.createParser();
        require('jsdoc/src/handlers').attachTo(srcParser);
    });

    afterEach(function() {
        env.opts._ = sourcePaths;
    });

    it('When a file overview tag appears in a doclet, the name of the doclet should contain the path to the file.', function() {
        doclets = srcParser.parse( path.normalize(env.dirname + '/test/fixtures/file.js') );
        expect(doclets[0].name).toMatch(/^(fixtures[\/\\]file\.js)$/);
    });

    it("The name and longname should be equal", function() {
        doclets = srcParser.parse( path.normalize(env.dirname + '/test/fixtures/file.js') );
        expect(doclets[0].name).toBe(doclets[0].longname);
    });
});

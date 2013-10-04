/*global beforeEach: true, afterEach: true, describe: true, env: true, expect: true, it: true */

describe("@overview tag", function() {
    var parser = require('jsdoc/src/parser');
    var srcParser = null;
    var doclets;
    var sourcePaths = env.opts._.slice(0);

    beforeEach(function() {
        env.opts._ = [__dirname + '/test/fixtures/'];
        srcParser = new parser.Parser();
        require('jsdoc/src/handlers').attachTo(srcParser);
    });

    afterEach(function() {
        env.opts._ = sourcePaths;
    });

    it('When a file overview tag appears in a doclet, the name of the doclet should contain the path to the file.', function() {
        doclets = srcParser.parse(__dirname + '/test/fixtures/file.js');
        expect(doclets[0].name).toMatch(/^(fixtures[\/\\]file\.js)$/);
    });

    it("The name and longname should be equal", function() {
        doclets = srcParser.parse(__dirname + '/test/fixtures/file.js');
        expect(doclets[0].name).toBe(doclets[0].longname);
    });
});

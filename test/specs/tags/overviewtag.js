/*global describe: true, env: true, expect: true, it: true */

describe("@overview tag", function() {
    var parser = require('jsdoc/src/parser'),
        srcParser = new parser.Parser(),
        doclets;

    require('jsdoc/src/handlers').attachTo(srcParser);
    doclets = srcParser.parse(__dirname + '/test/fixtures/file.js');

    it('When a file overview tag appears in a doclet, the name of the doclet should contain the path to the file.', function() {
        expect(doclets[0].name).toMatch(/^(fixtures[\/\\]file\.js)$/);
    });

    it("The name and longname should be equal", function() {
        expect(doclets[0].name).toBe(doclets[0].longname);
    });
});

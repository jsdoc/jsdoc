/*global afterEach: true, beforeEach: true, describe: true, env: true, expect: true, it: true */
describe("module names", function() {
    var parser = require('jsdoc/src/parser');
    var srcParser = null;
    var doclets;
    var sourcePaths = env.opts._.slice(0);

    beforeEach(function() {
        env.opts._ = [__dirname + '/test/fixtures/modules/data/'];
        srcParser = new parser.Parser();
        require('jsdoc/src/handlers').attachTo(srcParser);
    });

    afterEach(function() {
        env.opts._ = sourcePaths;
    });

    it("should create a name from the file path when no documented module name exists", function() {
        doclets = srcParser.parse(__dirname + '/test/fixtures/modules/data/mod-1.js');
        expect(doclets.length).toBeGreaterThan(1);
        expect(doclets[0].longname).toEqual('module:data/mod-1');
    });

    it("should use the documented module name if available", function() {
        doclets = srcParser.parse(__dirname + '/test/fixtures/modules/data/mod-2.js');
        expect(doclets.length).toBeGreaterThan(1);
        expect(doclets[0].longname).toEqual('module:my/module/name');
    });
});
/*global afterEach: true, beforeEach: true, describe: true, env: true, expect: true, it: true,
jasmine: true */
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
        expect(doclets[0].longname).toEqual('module:data/mod-1');
    });

    it("should use the documented module name if available", function() {
        doclets = srcParser.parse(
            path.normalize(env.dirname + '/test/fixtures/modules/data/mod-2.js')
        );
        expect(doclets.length).toBeGreaterThan(1);
        expect(doclets[0].longname).toEqual('module:my/module/name');
    });
});
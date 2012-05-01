describe("module names", function() {
    var parser = require('jsdoc/src/parser'),
        srcParser = null, doclets;

    beforeEach(function() {
        env.opts._ = [__dirname + '/test/cases/modules/'];
        srcParser = new parser.Parser();
        require('jsdoc/src/handlers').attachTo(srcParser);
    });

    it("should create a name from the file path when no documented module name exists", function() {
        doclets = srcParser.parse(__dirname + '/test/cases/modules/data/mod-1.js');
        assert.ok(doclets.length > 1);
        assert.equal(doclets[0].longname, 'module:data/mod-1');
    });

    it("should use the documented module name if available", function() {
        doclets = srcParser.parse(__dirname + '/test/cases/modules/data/mod-2.js');
        assert.ok(doclets.length > 1);
        assert.equal(doclets[0].longname, 'module:my/module/name');
    });
});
/**
 * @author Rob Taylor [manix84@gmail.com]
 */

describe("verbose output plugin", function () {
    var parser = new (require("jsdoc/src/parser")).Parser(),
        plugin = require('plugins/verboseOutput'),
        docSet;

    installPlugins(['plugins/verboseOutput'], parser);
    docSet = jasmine.getDocSetFromFile("plugins/verboseOutput.js", parser);

    it("should log file names to console", function() {
        var fileBegin = docSet.getByLongname("module:plugins/verboseOutput.handlers.fileBegin");
        expect(fileBegin[0].description).toEqual("Logging the file name to the console.");
    });
});

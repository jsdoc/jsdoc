/*global describe: true, expect: true, it: true, jasmine: true, xit: true */
/**
 * @author Rob Taylor [manix84@gmail.com]
 */

describe("verbose output plugin", function () {
    var parser = new (require("jsdoc/src/parser")).Parser(),
        plugin = require('plugins/verboseOutput'),
        docSet;

    //require('jsdoc/plugins').installPlugins(['plugins/verboseOutput'], parser);
    docSet = jasmine.getDocSetFromFile("plugins/verboseOutput.js", parser);

    xit("should log file names to console", function() {
        // TODO: this doesn't actually test the plugin...
        var fileBegin = docSet.getByLongname("module:plugins/verboseOutput.handlers.fileBegin");
        expect(fileBegin[0].description).toEqual("Logging the file name to the console.");
    });
});

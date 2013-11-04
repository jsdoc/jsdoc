/*global describe: true, env: true, expect: true, it: true, jasmine: true, xit: true */
/**
 * @author Rob Taylor [manix84@gmail.com]
 */

var path = require('jsdoc/path');

describe("verbose output plugin", function () {
    var parser = jasmine.createParser();
    var path = require('jsdoc/path');

    var docSet;
    var pluginPath = 'plugins/verboseOutput';
    var plugin = require( path.resolve(env.dirname, pluginPath) );

    //require('jsdoc/plugins').installPlugins(['plugins/verboseOutput'], parser);
    docSet = jasmine.getDocSetFromFile(pluginPath + '.js', parser);

    xit("should log file names to console", function() {
        // TODO: this doesn't actually test the plugin...
        var fileBegin = docSet.getByLongname("module:plugins/verboseOutput.handlers.fileBegin");
        expect(fileBegin[0].description).toEqual("Logging the file name to the console.");
    });
});

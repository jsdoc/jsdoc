/*global describe: true, env: true, expect: true, it: true, jasmine: true */
describe("parseHtml plugin", function() {
    var parser = jasmine.createParser();
    var path = require('jsdoc/path');

    var pluginPath = 'plugins/parseHtml';
    var pluginPathResolved = path.join(env.dirname, pluginPath);
    var plugin = require(pluginPathResolved);

    require('jsdoc/plugins').installPlugins([pluginPathResolved], parser);
    require('jsdoc/src/handlers').attachTo(parser);

    it("should extract <!-- --> and /** */ from HTML files and convert to /** */", function() {
        var docSet = parser.parse([path.join(env.dirname, "plugins/test/fixtures/parseHtml.html")]);

        expect(docSet[0].description).toEqual("Extracts javascript source and comments from HTML files");
        expect(docSet[2].description).toEqual("First Comment");
        expect(docSet[3].description).toEqual("Second Comment");
    });

});

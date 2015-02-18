'use strict';

// TODO: consolidate with specs/jsdoc/parser and specs/jsdoc/plugins
describe('plugins', function() {
    var app = require('jsdoc/app');
    var env = require('jsdoc/env');
    var path = require('jsdoc/path');

    var docSet;
    var pluginPaths = [
        path.normalize(env.dirname + '/test/fixtures/testPlugin1'),
        path.normalize(env.dirname + '/test/fixtures/testPlugin2')
    ];

    // TODO: decouple this from the global parser
    app.jsdoc.parser = jasmine.createParser();

    global.jsdocPluginsTest = global.jsdocPluginsTest || {};

    require('jsdoc/plugins').installPlugins(pluginPaths, app.jsdoc.parser);

    docSet = jasmine.getDocSetFromFile('test/fixtures/plugins.js', app.jsdoc.parser, false);

    it("should fire the plugin's event handlers", function() {
        expect(global.jsdocPluginsTest.plugin1.fileBegin).toBeDefined();
        expect(global.jsdocPluginsTest.plugin1.fileBegin).toBe(true);
        expect(global.jsdocPluginsTest.plugin1.beforeParse).toBeDefined();
        expect(global.jsdocPluginsTest.plugin1.beforeParse).toBe(true);
        expect(global.jsdocPluginsTest.plugin1.jsdocCommentFound).toBeDefined();
        expect(global.jsdocPluginsTest.plugin1.jsdocCommentFound).toBe(true);
        expect(global.jsdocPluginsTest.plugin1.symbolFound).toBeDefined();
        expect(global.jsdocPluginsTest.plugin1.symbolFound).toBe(true);
        expect(global.jsdocPluginsTest.plugin1.newDoclet).toBeDefined();
        expect(global.jsdocPluginsTest.plugin1.newDoclet).toBe(true);
        expect(global.jsdocPluginsTest.plugin1.fileComplete).toBeDefined();
        expect(global.jsdocPluginsTest.plugin1.fileComplete).toBe(true);

        expect(global.jsdocPluginsTest.plugin2.fileBegin).toBeDefined();
        expect(global.jsdocPluginsTest.plugin2.fileBegin).toBe(true);
        expect(global.jsdocPluginsTest.plugin2.beforeParse).toBeDefined();
        expect(global.jsdocPluginsTest.plugin2.beforeParse).toBe(true);
        expect(global.jsdocPluginsTest.plugin2.jsdocCommentFound).toBeDefined();
        expect(global.jsdocPluginsTest.plugin2.jsdocCommentFound).toBe(true);
        expect(global.jsdocPluginsTest.plugin2.symbolFound).toBeDefined();
        expect(global.jsdocPluginsTest.plugin2.symbolFound).toBe(true);
        expect(global.jsdocPluginsTest.plugin2.newDoclet).toBeDefined();
        expect(global.jsdocPluginsTest.plugin2.newDoclet).toBe(true);
        expect(global.jsdocPluginsTest.plugin2.fileComplete).toBeDefined();
        expect(global.jsdocPluginsTest.plugin2.fileComplete).toBe(true);
    });

    it("should add the plugin's tag definitions to the dictionary", function() {
        var test = docSet.getByLongname('test');

        expect(test[0].longname).toBe('test');
        expect(test[0].foo).toBe(true);
    });
});

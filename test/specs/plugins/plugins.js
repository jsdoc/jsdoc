/* global jsdoc */
// TODO: consolidate with specs/jsdoc/parser and specs/jsdoc/plugins
describe('plugins', () => {
    const env = require('jsdoc/env');
    const path = require('jsdoc/path');

    let docSet;
    const pluginPaths = [
        path.normalize(`${env.dirname}/test/fixtures/testPlugin1`),
        path.normalize(`${env.dirname}/test/fixtures/testPlugin2`)
    ];
    const parser = jsdoc.createParser();

    global.jsdocPluginsTest = global.jsdocPluginsTest || {};

    require('jsdoc/plugins').installPlugins(pluginPaths, parser);

    docSet = jsdoc.getDocSetFromFile('test/fixtures/plugins.js', parser, false);

    it("should fire the plugin's event handlers", () => {
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

    it("should add the plugin's tag definitions to the dictionary", () => {
        const test = docSet.getByLongname('test');

        expect(test[0].longname).toBe('test');
        expect(test[0].foo).toBe(true);
    });
});

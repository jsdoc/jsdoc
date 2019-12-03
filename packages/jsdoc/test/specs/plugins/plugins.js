// TODO: consolidate with specs/jsdoc/parser and specs/jsdoc/plugins
describe('plugins', () => {
    const env = require('jsdoc/env');
    const path = require('path');

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
        expect(global.jsdocPluginsTest.plugin1.fileBegin).toBeTrue();
        expect(global.jsdocPluginsTest.plugin1.beforeParse).toBeTrue();
        expect(global.jsdocPluginsTest.plugin1.jsdocCommentFound).toBeTrue();
        expect(global.jsdocPluginsTest.plugin1.symbolFound).toBeTrue();
        expect(global.jsdocPluginsTest.plugin1.newDoclet).toBeTrue();
        expect(global.jsdocPluginsTest.plugin1.fileComplete).toBeTrue();

        expect(global.jsdocPluginsTest.plugin2.fileBegin).toBeTrue();
        expect(global.jsdocPluginsTest.plugin2.beforeParse).toBeTrue();
        expect(global.jsdocPluginsTest.plugin2.jsdocCommentFound).toBeTrue();
        expect(global.jsdocPluginsTest.plugin2.symbolFound).toBeTrue();
        expect(global.jsdocPluginsTest.plugin2.newDoclet).toBeTrue();
        expect(global.jsdocPluginsTest.plugin2.fileComplete).toBeTrue();
    });

    it("should add the plugin's tag definitions to the dictionary", () => {
        const test = docSet.getByLongname('test');

        expect(test[0].longname).toBe('test');
        expect(test[0].foo).toBeTrue();
    });
});

/* global jsdoc */
describe('sourcetag plugin', () => {
    const env = require('jsdoc/env');
    const path = require('path');

    let docSet;
    const parser = jsdoc.createParser();
    const pluginPath = 'plugins/sourcetag';
    const pluginPathResolved = path.join(env.dirname, pluginPath);

    require('jsdoc/plugins').installPlugins([pluginPathResolved], parser);
    docSet = jsdoc.getDocSetFromFile(`${pluginPath}.js`, parser);

    it("should set the lineno and filename of the doclet's meta property", () => {
        const doclet = docSet.getByLongname('module:plugins/sourcetag.handlers.newDoclet');

        expect(doclet[0].meta).toBeDefined();
        expect(doclet[0].meta.filename).toEqual('sourcetag.js');
        expect(doclet[0].meta.lineno).toEqual(9);
    });
});

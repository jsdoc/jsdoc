/* global jsdoc */
describe('shout plugin', () => {
    const env = require('jsdoc/env');
    const path = require('path');

    let docSet;
    const parser = jsdoc.createParser();
    const pluginPath = 'plugins/shout';
    const pluginPathResolved = path.join(env.dirname, pluginPath);

    require('jsdoc/plugins').installPlugins([pluginPathResolved], parser);
    docSet = jsdoc.getDocSetFromFile(`${pluginPath}.js`, parser);

    it('should make the description uppercase', () => {
        const doclet = docSet.getByLongname('module:plugins/shout.handlers.newDoclet');

        expect(doclet[0].description).toEqual('MAKE YOUR DESCRIPTIONS MORE SHOUTIER.');
    });
});

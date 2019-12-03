/* global jsdoc */
describe('railsTemplate plugin', () => {
    const env = require('jsdoc/env');
    const path = require('path');

    const parser = jsdoc.createParser();
    const pluginPath = path.join(env.dirname, 'plugins/railsTemplate');

    require('jsdoc/plugins').installPlugins([pluginPath], parser);
    require('jsdoc/src/handlers').attachTo(parser);

    it('should remove <% %> rails template tags from the source of *.erb files', () => {
        const docSet = parser.parse([path.join(env.dirname, 'plugins/test/fixtures/railsTemplate.js.erb')]);

        expect(docSet[2].description).toEqual('Remove rails tags from the source input (e.g. )');
    });
});

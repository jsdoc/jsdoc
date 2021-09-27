/* global jsdoc */
describe('railsTemplate plugin', () => {
  const path = require('path');

  const parser = jsdoc.createParser();
  const pluginPath = path.join(__dirname, '../../railsTemplate');

  require('jsdoc/plugins').installPlugins([pluginPath], parser, jsdoc.deps);
  require('jsdoc/src/handlers').attachTo(parser);

  it('should remove <% %> rails template tags from the source of *.erb files', () => {
    const docSet = parser.parse([path.join(__dirname, '../fixtures/railsTemplate.js.erb')]);

    expect(docSet[2].description).toEqual('Remove rails tags from the source input (e.g. )');
  });
});

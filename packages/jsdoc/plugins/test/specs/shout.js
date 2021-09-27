/* global jsdoc */
describe('shout plugin', () => {
  const path = require('path');

  let docSet;
  const parser = jsdoc.createParser();
  const pluginPath = path.join(__dirname, '../../shout');

  require('jsdoc/plugins').installPlugins([pluginPath], parser, jsdoc.deps);
  docSet = jsdoc.getDocSetFromFile('plugins/shout.js', parser);

  it('should make the description uppercase', () => {
    const doclet = docSet.getByLongname('module:plugins/shout.handlers.newDoclet');

    expect(doclet[0].description).toEqual('MAKE YOUR DESCRIPTIONS MORE SHOUTIER.');
  });
});

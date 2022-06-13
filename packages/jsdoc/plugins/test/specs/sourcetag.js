/* global jsdoc */
describe('sourcetag plugin', () => {
  const path = require('path');

  let docSet;
  const parser = jsdoc.createParser();
  const pluginPath = path.join(__dirname, '../../sourcetag');

  require('jsdoc/plugins').installPlugins([pluginPath], parser, jsdoc.deps);
  docSet = jsdoc.getDocSetFromFile('plugins/sourcetag.js', parser);

  it("should set the lineno and filename of the doclet's meta property", () => {
    const doclet = docSet.getByLongname('module:plugins/sourcetag.handlers.newDoclet');

    expect(doclet[0].meta).toBeDefined();
    expect(doclet[0].meta.filename).toEqual('sourcetag.js');
    expect(doclet[0].meta.lineno).toEqual(9);
  });
});

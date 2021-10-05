/* global jsdoc */

describe('commentConvert plugin', () => {
  const path = require('path');

  let docSet;
  const parser = jsdoc.createParser();
  const pluginPath = path.join(__dirname, '../../commentConvert');

  require('jsdoc/plugins').installPlugins([pluginPath], parser, jsdoc.deps);
  docSet = jsdoc.getDocSetFromFile(`plugins/commentConvert.js`, parser);

  it('should convert ///-style comments into jsdoc comments', () => {
    const doclet = docSet.getByLongname('module:plugins/commentConvert.handlers.beforeParse');

    expect(doclet.length).toEqual(1);
  });
});

/* global jsdoc */
describe('escapeHtml plugin', () => {
  const path = require('path');

  let docSet;
  const parser = jsdoc.createParser();
  const pluginPath = path.join(__dirname, '../../escapeHtml');

  require('jsdoc/plugins').installPlugins([pluginPath], parser, jsdoc.deps);
  docSet = jsdoc.getDocSetFromFile(`plugins/escapeHtml.js`, parser);

  it("should escape '&', '<' and newlines in doclet descriptions", () => {
    const doclet = docSet.getByLongname('module:plugins/escapeHtml.handlers.newDoclet');

    expect(doclet[0].description).toBe(
      'Translate HTML tags in descriptions into safe ' +
        'entities. Replaces &lt;, &amp; and newlines'
    );
  });
});

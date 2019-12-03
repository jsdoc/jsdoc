/* global jsdoc */
describe('escapeHtml plugin', () => {
    const env = require('jsdoc/env');
    const path = require('path');

    let docSet;
    const parser = jsdoc.createParser();
    const pluginPath = 'plugins/escapeHtml';
    const pluginPathResolved = path.join(env.dirname, pluginPath);

    require('jsdoc/plugins').installPlugins([pluginPathResolved], parser);
    docSet = jsdoc.getDocSetFromFile(`${pluginPath}.js`, parser);

    it("should escape '&', '<' and newlines in doclet descriptions", () => {
        const doclet = docSet.getByLongname('module:plugins/escapeHtml.handlers.newDoclet');

        expect(doclet[0].description).toBe('Translate HTML tags in descriptions into safe ' +
            'entities. Replaces &lt;, &amp; and newlines');
    });
});

/* global jsdoc */

describe('commentConvert plugin', () => {
    const env = require('jsdoc/env');
    const path = require('path');

    let docSet;
    const parser = jsdoc.createParser();
    const pluginPath = 'plugins/commentConvert';
    const pluginPathResolved = path.join(env.dirname, pluginPath);

    require('jsdoc/plugins').installPlugins([pluginPathResolved], parser);
    docSet = jsdoc.getDocSetFromFile(`${pluginPath}.js`, parser);

    it('should convert ///-style comments into jsdoc comments', () => {
        const doclet = docSet.getByLongname('module:plugins/commentConvert.handlers.beforeParse');

        expect(doclet.length).toEqual(1);
    });
});

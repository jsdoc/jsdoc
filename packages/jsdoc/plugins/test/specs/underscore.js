/* global jsdoc */
describe('underscore plugin', () => {
    const env = require('jsdoc/env');
    const path = require('path');

    let docSet;
    const parser = jsdoc.createParser();
    const pluginPath = 'plugins/underscore';
    const fixturePath = 'plugins/test/fixtures/underscore';
    const pluginPathResolved = path.join(env.dirname, pluginPath);

    require('jsdoc/plugins').installPlugins([pluginPathResolved], parser);
    docSet = jsdoc.getDocSetFromFile(`${fixturePath}.js`, parser);

    it('should not mark normal, public properties as private', () => {
        // Base line tests
        const normal = docSet.getByLongname('normal');

        expect(normal[0].access).toBeUndefined();

        const realPrivate = docSet.getByLongname('Klass#privateProp');

        expect(realPrivate[0].access).toEqual('private');
    });

    it('should hide doclet for symbols beginning with an underscore under normal circumstances', () => {
        const hidden = docSet.getByLongname('_hidden');

        expect(hidden[0].access).toEqual('private');
    });

    it('picks up "this"', () => {
        const privateUnderscore = docSet.getByLongname('Klass#_privateProp');

        expect(privateUnderscore[0].access).toEqual('private');
    });
});

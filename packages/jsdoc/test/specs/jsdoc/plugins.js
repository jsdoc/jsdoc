describe('jsdoc/plugins', () => {
    const plugins = require('jsdoc/plugins');

    it('should exist', () => {
        expect(plugins).toBeObject();
    });

    it('should export an "installPlugins" function', () => {
        expect(plugins.installPlugins).toBeFunction();
    });

    xdescribe('installPlugins', () => {
        // TODO
    });
});

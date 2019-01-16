describe('jsdoc/plugins', () => {
    const plugins = require('jsdoc/plugins');

    it('should exist', () => {
        expect(plugins).toBeDefined();
        expect(typeof plugins).toBe('object');
    });

    it('should export an "installPlugins" function', () => {
        expect(plugins.installPlugins).toBeDefined();
        expect(typeof plugins.installPlugins).toBe('function');
    });

    xdescribe('installPlugins', () => {
        // TODO
    });
});

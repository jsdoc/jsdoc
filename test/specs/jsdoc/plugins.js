'use strict';

describe('jsdoc/plugins', function() {
    var plugins = require('jsdoc/plugins');

    it('should exist', function() {
        expect(plugins).toBeDefined();
        expect(typeof plugins).toBe('object');
    });

    it('should export an "installPlugins" function', function() {
        expect(plugins.installPlugins).toBeDefined();
        expect(typeof plugins.installPlugins).toBe('function');
    });

    xdescribe('installPlugins', function() {
        // TODO
    });
});

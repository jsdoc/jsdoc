/*global describe: true, expect: true, it: true, xdescribe: true */

describe("jsdoc/plugins", function() {
    var plugins = require('jsdoc/plugins');

    it("should exist", function() {
        expect(plugins).toBeDefined();
        expect(typeof plugins).toEqual('object');
    });

    it("should export an 'installPlugins' function", function() {
        expect(plugins.installPlugins).toBeDefined();
        expect(typeof plugins.installPlugins).toEqual('function');
    });


    xdescribe("installPlugins", function() {
        // TODO
    });
});

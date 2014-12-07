'use strict';

describe('jsdoc/config', function() {
    var jsdoc = {
        config: require('jsdoc/config')
    };
    var Config = jsdoc.config;

    it('should exist', function() {
        expect(jsdoc.config).toBeDefined();
        expect(typeof jsdoc.config).toBe('function');
    });

    it('should provide a "get" instance function', function() {
        var config = new Config();

        expect(config.get).toBeDefined();
        expect(typeof config.get).toBe('function');
    });

    describe('constructor with empty', function() {
        it('should be possible to construct a Config with an empty arguments', function() {
            var config = new Config().get();

            expect( Array.isArray(config.plugins) ).toBe(true);
            expect(config.plugins.length).toBe(0);
        });
    });

    describe('constructor with {}', function() {
        it('should be possible to construct a Config with JSON of an object literal that is empty', function() {
            var config = new Config('{}').get();

            expect( Array.isArray(config.plugins) ).toBe(true);
            expect(config.plugins.length).toBe(0);
        });
    });

    describe('constructor with plugins value', function() {
        it('should be possible to construct a Config with JSON of an object literal that has a plugin value', function() {
            var config = new Config('{"plugins":[42]}').get();

            expect( Array.isArray(config.plugins) ).toBe(true);
            expect(config.plugins.length).toBe(1);
            expect(config.plugins[0]).toBe(42);
        });
    });

    describe('constructor with source value', function() {
        it('should be possible to construct a Config with JSON of an object literal that has a source value', function() {
            var config = new Config('{"source":{"includePattern":"hello"}}').get();

            expect(config.source.includePattern).toBe('hello');
        });
    });
});

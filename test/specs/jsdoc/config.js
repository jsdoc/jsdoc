describe('jsdoc/config', () => {
    const Config = require('jsdoc/config');

    it('should exist', () => {
        expect(Config).toBeFunction();
    });

    it('should provide a "get" instance function', () => {
        const config = new Config();

        expect(config.get).toBeFunction();
    });

    describe('constructor with empty', () => {
        it('should be possible to construct a Config with an empty arguments', () => {
            const config = new Config().get();

            expect(config.plugins).toBeEmptyArray();
        });
    });

    describe('constructor with {}', () => {
        it('should be possible to construct a Config with JSON of an object literal that is empty', () => {
            const config = new Config('{}').get();

            expect(config.plugins).toBeEmptyArray();
        });

        it('should be possible to construct a Config with an empty JavaScript object', () => {
            const config = new Config({}).get();

            expect(config.plugins).toBeEmptyArray();
        });
    });

    describe('constructor with leading BOM', () => {
        it('should be possible to construct a Config with JSON that has a leading BOM', () => {
            function getConfig() {
                return new Config('\uFEFF{}').get();
            }

            expect(getConfig).not.toThrow();
        });
    });

    describe('constructor with comments', () => {
        it('should be possible to construct a Config with JSON that includes comments', () => {
            function getConfig() {
                return new Config('{\n// comment\n}').get();
            }

            expect(getConfig).not.toThrow();
        });
    });

    describe('constructor with plugins value', () => {
        it('should be possible to construct a Config with JSON of an object literal that has a plugin value', () => {
            const config = new Config('{"plugins":[42]}').get();

            expect(config.plugins).toBeArrayOfSize(1);
            expect(config.plugins[0]).toBe(42);
        });

        it('should be possible to construct a Config with a JavaScript object that has a plugin value', () => {
            const config = new Config({'plugins': [42]}).get();

            expect(config.plugins).toBeArrayOfSize(1);
            expect(config.plugins[0]).toBe(42);
        });
    });

    describe('constructor with source value', () => {
        it('should be possible to construct a Config with JSON of an object literal that has a source value', () => {
            const config = new Config('{"source":{"includePattern":"hello"}}').get();

            expect(config.source.includePattern).toBe('hello');
        });

        it('should be possible to construct a Config with a JavaScript object that has a source value', () => {
            const config = new Config({'source': {'includePattern': 'hello'}}).get();

            expect(config.source.includePattern).toBe('hello');
        });
    });
});

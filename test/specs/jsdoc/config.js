describe('jsdoc/config', () => {
    const Config = require('jsdoc/config');

    it('should exist', () => {
        expect(Config).toBeDefined();
        expect(typeof Config).toBe('function');
    });

    it('should provide a "get" instance function', () => {
        const conf = new Config();

        expect(conf.get).toBeDefined();
        expect(typeof conf.get).toBe('function');
    });

    describe('constructor with empty', () => {
        it('should be possible to construct a Config with an empty arguments', () => {
            const conf = new Config().get();

            expect(Array.isArray(conf.plugins)).toBe(true);
            expect(conf.plugins.length).toBe(0);
        });
    });

    describe('constructor with {}', () => {
        it('should be possible to construct a Config with JSON of an object literal that is empty', () => {
            const conf = new Config('{}').get();

            expect(Array.isArray(conf.plugins)).toBe(true);
            expect(conf.plugins.length).toBe(0);
        });

        it('should be possible to construct a Config with an empty JavaScript object', () => {
            const conf = new Config({}).get();

            expect(Array.isArray(conf.plugins)).toBe(true);
            expect(conf.plugins.length).toBe(0);
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
            const conf = new Config('{"plugins":[42]}').get();

            expect(Array.isArray(conf.plugins)).toBe(true);
            expect(conf.plugins.length).toBe(1);
            expect(conf.plugins[0]).toBe(42);
        });

        it('should be possible to construct a Config with a JavaScript object that has a plugin value', () => {
            const conf = new Config({'plugins': [42]}).get();

            expect(Array.isArray(conf.plugins)).toBe(true);
            expect(conf.plugins.length).toBe(1);
            expect(conf.plugins[0]).toBe(42);
        });
    });

    describe('constructor with source value', () => {
        it('should be possible to construct a Config with JSON of an object literal that has a source value', () => {
            const conf = new Config('{"source":{"includePattern":"hello"}}').get();

            expect(conf.source.includePattern).toBe('hello');
        });

        it('should be possible to construct a Config with a JavaScript object that has a source value', () => {
            const conf = new Config({source: {includePattern: 'hello'}}).get();

            expect(conf.source.includePattern).toBe('hello');
        });
    });
});

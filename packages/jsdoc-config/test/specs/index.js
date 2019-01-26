describe('@jsdoc/config', () => {
    const mockFs = require('mock-fs');
    const config = require('../../index');
    const defaults = require('../../defaults');

    afterEach(() => mockFs.restore());

    it('exists', () => {
        expect(config).toBeObject();
    });

    it('has a loadSync method', () => {
        expect(config.loadSync).toBeFunction();
    });

    describe('loadSync', () => {
        it('returns an object with `config` and `filepath` properties', () => {
            mockFs({
                'conf.json': '{}'
            });

            const conf = config.loadSync('conf.json');

            expect(conf.config).toBeObject();
            expect(conf.filepath).toEndWith('conf.json');
        });

        it('loads settings from the specified filepath if there is one', () => {
            mockFs({
                'conf.json': '{"foo":"bar"}'
            });

            const conf = config.loadSync('conf.json');

            expect(conf.config.foo).toBe('bar');
        });

        it('finds the config file when no filepath is specified', () => {
            mockFs({
                'package.json': '{"jsdoc":{"foo":"bar"}}'
            });

            const conf = config.loadSync();

            expect(conf.config.foo).toBe('bar');
        });

        it('parses JSON config files that have an extension and contain comments', () => {
            mockFs({
                '.jsdocrc.json': '// comment\n{"foo":"bar"}'
            });

            const conf = config.loadSync();

            expect(conf.config.foo).toBe('bar');
        });

        it('parses JSON files that start with a BOM', () => {
            mockFs({
                '.jsdocrc.json': '\uFEFF{"foo":"bar"}'
            });

            const conf = config.loadSync();

            expect(conf.config.foo).toBe('bar');
        });

        it('parses YAML files that start with a BOM', () => {
            mockFs({
                '.jsdocrc.yaml': '\uFEFF{"foo":"bar"}'
            });

            const conf = config.loadSync();

            expect(conf.config.foo).toBe('bar');
        });

        it('provides the default config if the user config is an empty object', () => {
            mockFs({
                '.jsdocrc.json': '{}'
            });

            const conf = config.loadSync();

            expect(conf.config).toEqual(defaults);
        });

        it('provides the default config if there is no user config', () => {
            const conf = config.loadSync();

            expect(conf.config).toEqual(defaults);
        });

        it('merges nested defaults with nested user settings as expected', () => {
            mockFs({
                '.jsdocrc.json': '{"tags":{"foo":"bar"}}'
            });

            const conf = config.loadSync();

            expect(conf.config.tags.allowUnknownTags).toBe(defaults.tags.allowUnknownTags);
            expect(conf.config.tags.foo).toBe('bar');
        });
    });
});

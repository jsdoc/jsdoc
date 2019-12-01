const mockFs = require('mock-fs');
const config = require('../../../lib/config');

describe('@jsdoc/core/lib/config', () => {
    // Explicitly require `yaml` before we run any tests. `cosmiconfig` tries to load `yaml` lazily,
    // but that doesn't work when the file system is mocked.
    beforeAll(() => require('yaml'));

    afterEach(() => mockFs.restore());

    it('is an object', () => {
        expect(config).toBeObject();
    });

    describe('loadSync', () => {
        it('is a function', () => {
            expect(config.loadSync).toBeFunction();
        });

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

            expect(conf.config).toEqual(config.defaults);
        });

        it('provides the default config if there is no user config', () => {
            const conf = config.loadSync();

            expect(conf.config).toEqual(config.defaults);
        });

        it('merges nested defaults with nested user settings as expected', () => {
            mockFs({
                '.jsdocrc.json': '{"tags":{"foo":"bar"}}'
            });

            const conf = config.loadSync();

            expect(conf.config.tags.allowUnknownTags).toBe(config.defaults.tags.allowUnknownTags);
            expect(conf.config.tags.foo).toBe('bar');
        });
    });

    describe('defaults', () => {
        const { defaults } = config;

        it('is an object', () => {
            expect(defaults).toBeObject();
        });

        describe('plugins', () => {
            it('is an array', () => {
                expect(defaults.plugins).toBeArray();
            });
        });

        describe('source', () => {
            it('is an object', () => {
                expect(defaults.source).toBeObject();
            });

            describe('excludePattern', () => {
                it('is a string', () => {
                    expect(defaults.source.excludePattern).toBeString();
                });

                it('represents a valid regexp', () => {
                    expect(() => new RegExp(defaults.source.excludePattern)).not.toThrow();
                });
            });

            describe('includePattern', () => {
                it('is a string', () => {
                    expect(defaults.source.includePattern).toBeString();
                });

                it('represents a valid regexp', () => {
                    expect(() => new RegExp(defaults.source.includePattern)).not.toThrow();
                });
            });

            describe('type', () => {
                it('is a string', () => {
                    expect(defaults.source.type).toBeString();
                });
            });

            describe('tags', () => {
                it('is an object', () => {
                    expect(defaults.tags).toBeObject();
                });

                describe('allowUnknownTags', () => {
                    it('is a boolean', () => {
                        expect(defaults.tags.allowUnknownTags).toBeBoolean();
                    });
                });

                describe('dictionaries', () => {
                    it('is an array of strings', () => {
                        expect(defaults.tags.dictionaries).toBeArrayOfStrings();
                    });
                });
            });

            describe('templates', () => {
                it('is an object', () => {
                    expect(defaults.templates).toBeObject();
                });

                describe('cleverLinks', () => {
                    it('is a boolean', () => {
                        expect(defaults.templates.cleverLinks).toBeBoolean();
                    });
                });

                describe('monospaceLinks', () => {
                    it('is a boolean', () => {
                        expect(defaults.templates.monospaceLinks).toBeBoolean();
                    });
                });
            });
        });
    });
});

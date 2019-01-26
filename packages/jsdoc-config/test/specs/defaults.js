const defaults = require('../../defaults');

describe('@jsdoc/config/defaults', () => {
    it('exists', () => {
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

describe('@jsdoc/util/lib/path', () => {
    const os = require('os');
    const path = require('path');
    const libPath = require('../../../lib/path');

    const isWindows = /^win/.test(os.platform());
    const fakeCwd = isWindows ? 'C:\\Users\\jsdoc' : '/Users/jsdoc';

    beforeEach(() => {
        spyOn(process, 'cwd').and.returnValue(fakeCwd);
    });

    it('has a commonPrefix method', () => {
        expect(libPath.commonPrefix).toBeFunction();
    });

    it('has a makeFilter method', () => {
        expect(libPath.makeFilter).toBeFunction();
    });

    describe('commonPrefix', () => {
        it('finds the correct prefix for a single relative path', () => {
            const paths = [path.join('foo', 'bar', 'baz', 'qux.js')];
            const expected = path.join(fakeCwd, 'foo', 'bar', 'baz');

            expect(libPath.commonPrefix(paths)).toBe(expected);
        });

        it('finds the correct prefix for a group of relative paths', () => {
            const paths = [
                path.join('foo', 'bar', 'baz', 'qux.js'),
                path.join('foo', 'bar', 'baz', 'quux.js'),
                path.join('foo', 'bar', 'baz.js')
            ];
            const expected = path.join(fakeCwd, 'foo', 'bar');

            expect(libPath.commonPrefix(paths)).toEqual(expected);
        });

        it('finds the correct prefix for a single absolute path', () => {
            const paths = [path.join(fakeCwd, 'foo', 'bar', 'baz', 'qux.js')];
            const expected = path.join(fakeCwd, 'foo', 'bar', 'baz');

            expect(libPath.commonPrefix(paths)).toBe(expected);
        });

        it('finds the correct prefix for a group of absolute paths', () => {
            const paths = [
                path.join(fakeCwd, 'foo', 'bar', 'baz', 'qux.js'),
                path.join(fakeCwd, 'foo', 'bar', 'baz', 'quux.js'),
                path.join(fakeCwd, 'foo', 'bar', 'baz.js')
            ];
            const expected = path.join(fakeCwd, 'foo', 'bar');

            expect(libPath.commonPrefix(paths)).toBe(expected);
        });

        it('finds the correct prefix for a group of absolute paths and dotted relative paths',
            () => {
                const paths = [
                    path.join('..', 'jsdoc', 'foo', 'bar', 'baz', 'qux', 'quux', 'test.js'),
                    path.join(fakeCwd, 'foo', 'bar', 'bazzy.js'),
                    path.join('..', '..', 'Users', 'jsdoc', 'foo', 'bar', 'foobar.js')
                ];
                const expected = path.join(fakeCwd, 'foo', 'bar');

                expect(libPath.commonPrefix(paths)).toBe(expected);
            });

        it('returns an empty string when the paths array is empty', () => {
            expect(libPath.commonPrefix([])).toBe('');
        });

        // Skip on Windows, because the paths share a drive letter at the start.
        if (!isWindows) {
            it('returns an empty string when there is no common prefix', () => {
                const paths = [
                    path.join('foo', 'bar', 'baz', 'qux.js'),
                    path.join('..', '..', 'Library', 'foo', 'bar', 'baz.js')
                ];

                expect(libPath.commonPrefix(paths)).toBe('');
            });
        }

        if (isWindows) {
            it('works with Windows paths that contain spaces', () => {
                const prefix = 'C:\\Users\\Jane Smith\\myproject';
                const paths = [
                    `${prefix}\\index.js`,
                    `${prefix}\\lib\\mymodule.js`
                ];

                expect(libPath.commonPrefix(paths)).toBe(prefix);
            });
        }
    });

    describe('makeFilter', () => {
        it('returns a function', () => {
            expect(typeof libPath.makeFilter({})).toBe('function');
        });

        it('throws on bad input', () => {
            expect(() => libPath.makeFilter()).toThrow();
        });

        describe('exclude', () => {
            it('accepts a string', () => {
                expect(() => libPath.makeFilter({ exclude: 'foo' })).not.toThrow();
            });

            it('accepts an array of strings', () => {
                expect(() => libPath.makeFilter({ exclude: ['foo', 'bar'] })).not.toThrow();
            });

            it('throws on invalid types', () => {
                expect(() => libPath.makeFilter({ exclude: 7 })).toThrow();
            });

            it('filters out filepaths that end with excluded values', () => {
                const filter = libPath.makeFilter({ exclude: ['nope/nuh-uh.md', 'neverever'] });
                const filteredFiles = [
                    'path/to/some/file.js',
                    'another/path/nope/nuh-uh.md',
                    'neverever'
                ].filter(filter);

                expect(filteredFiles).toEqual(['path/to/some/file.js']);
            });

            it('does not filter out filepaths that contain excluded values in the middle', () => {
                const filter = libPath.makeFilter({ exclude: 'to/some' });
                const filteredFiles = [
                    'path/to/some/file.js'
                ].filter(filter);

                expect(filteredFiles).toEqual(['path/to/some/file.js']);
            });

            it('takes precedence over includePattern', () => {
                const filter = libPath.makeFilter({
                    exclude: ['nope/nuh-uh.md', 'neverever'],
                    includePattern: '(?:\\.js|\\.md)$'
                });
                const filteredFiles = [
                    'path/to/some/file.js',
                    'another/path/nope/nuh-uh.md',
                    'neverever'
                ].filter(filter);

                expect(filteredFiles).toEqual(['path/to/some/file.js']);
            });
        });

        describe('excludePattern', () => {
            it('accepts a string', () => {
                expect(() => libPath.makeFilter({ excludePattern: 'foo' })).not.toThrow();
            });

            it('accepts a RegExp', () => {
                expect(() => libPath.makeFilter({ excludePattern: new RegExp('z') })).not.toThrow();
            });

            it('throws on invalid types', () => {
                expect(() => libPath.makeFilter({ excludePattern: 7 })).toThrow();
            });

            it('filters out filepaths that match excludePattern', () => {
                const filter = libPath.makeFilter({
                    excludePattern: '(?:nuh.+?\\.md|neverever)$'
                });
                const filteredFiles = [
                    'path/to/some/file.js',
                    'another/path/nope/nuh-uh.md',
                    'neverever'
                ].filter(filter);

                expect(filteredFiles).toEqual(['path/to/some/file.js']);
            });

            it('takes precedence over includePattern', () => {
                const filter = libPath.makeFilter({
                    excludePattern: '(?:nuh.+?\\.md|neverever)$',
                    includePattern: '(?:\\.js|\\.md)$'
                });
                const filteredFiles = [
                    'path/to/some/file.js',
                    'another/path/nope/nuh-uh.md',
                    'neverever'
                ].filter(filter);

                expect(filteredFiles).toEqual(['path/to/some/file.js']);
            });
        });

        describe('includePattern', () => {
            it('accepts a string', () => {
                expect(() => libPath.makeFilter({ includePattern: 'foo' })).not.toThrow();
            });

            it('accepts a RegExp', () => {
                expect(() => libPath.makeFilter({ includePattern: new RegExp('z') })).not.toThrow();
            });

            it('throws on invalid types', () => {
                expect(() => libPath.makeFilter({ includePattern: 7 })).toThrow();
            });

            it('includes only filepaths that match includePattern', () => {
                const filter = libPath.makeFilter({ includePattern: '\\.js$' });
                const filteredFiles = [
                    'path/to/some/file.js',
                    'another/path/nope/nuh-uh.md',
                    'neverever'
                ].filter(filter);

                expect(filteredFiles).toEqual(['path/to/some/file.js']);
            });
        });
    });
});

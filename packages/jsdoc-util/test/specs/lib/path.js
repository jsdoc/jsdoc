describe('@jsdoc/util/lib/path', () => {
    const os = require('os');
    const path = require('path');
    const libPath = require('../../../lib/path');

    const isWindows = /^win/.test(os.platform());

    it('has a commonPrefix method', () => {
        expect(libPath.commonPrefix).toBeFunction();
    });

    describe('commonPrefix', () => {
        const fakeCwd = isWindows ? 'C:\\Users\\jsdoc' : '/Users/jsdoc';

        beforeEach(() => {
            spyOn(process, 'cwd').and.returnValue(fakeCwd);
        });

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
});

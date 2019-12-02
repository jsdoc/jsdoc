describe('jsdoc/path', () => {
    const env = require('jsdoc/env');
    const os = require('os');
    const path = require('jsdoc/path');
    const standardPath = require('path');

    const isWindows = /^win/.test( os.platform() );

    it('should exist', () => {
        expect(path).toBeObject();
    });

    it('should export all functions in the "path" module', () => {
        Object.keys(standardPath).forEach(item => {
            if (typeof standardPath[item] === 'function') {
                expect(path[item]).toBeFunction();
            }
        });
    });

    it('should export a "commonPrefix" function', () => {
        expect(path.commonPrefix).toBeFunction();
    });

    describe('commonPrefix', () => {
        let oldPwd;
        let cwd;

        beforeEach(() => {
            oldPwd = env.pwd;
            env.pwd = isWindows ? 'C:\\Users\\jsdoc' : '/Users/jsdoc';
            cwd = env.pwd.split(path.sep);
        });

        afterEach(() => {
            env.pwd = oldPwd;
        });

        it('finds the correct prefix for a single relative path', () => {
            const paths = [path.join('foo', 'bar', 'baz', 'qux.js')];
            // we expect a trailing slash
            const expected = cwd.concat('foo', 'bar', 'baz', '').join(path.sep);

            expect( path.commonPrefix(paths) ).toBe(expected);
        });

        it('finds the correct prefix for a group of relative paths', () => {
            const paths = [
                path.join('foo', 'bar', 'baz', 'qux.js'),
                path.join('foo', 'bar', 'baz', 'quux.js'),
                path.join('foo', 'bar', 'baz.js')
            ];
            // we expect a trailing slash
            const expected = cwd.concat('foo', 'bar', '').join(path.sep);

            expect( path.commonPrefix(paths) ).toBe(expected);
        });

        it('finds the correct prefix for a single absolute path', () => {
            const paths = [cwd.concat('foo', 'bar', 'baz', 'qux.js').join(path.sep)];
            // we expect a trailing slash
            const expected = cwd.concat('foo', 'bar', 'baz', '').join(path.sep);

            expect( path.commonPrefix(paths) ).toBe(expected);
        });

        it('finds the correct prefix for a group of absolute paths', () => {
            const paths = [
                cwd.concat('foo', 'bar', 'baz', 'qux.js').join(path.sep),
                cwd.concat('foo', 'bar', 'baz', 'quux.js').join(path.sep),
                cwd.concat('foo', 'bar', 'baz.js').join(path.sep)
            ];
            // we expect a trailing slash
            const expected = cwd.concat('foo', 'bar', '').join(path.sep);

            expect( path.commonPrefix(paths) ).toBe(expected);
        });

        it('finds the correct prefix for a group of absolute paths and dotted relative paths',
            () => {
                const paths = [
                    path.join('..', 'jsdoc', 'foo', 'bar', 'baz', 'qux', 'quux', 'test.js'),
                    cwd.concat('foo', 'bar', 'bazzy.js').join(path.sep),
                    path.join('..', '..', 'Users', 'jsdoc', 'foo', 'bar', 'foobar.js')
                ];
                // we expect a trailing slash
                const expected = cwd.concat('foo', 'bar', '').join(path.sep);

                expect( path.commonPrefix(paths) ).toBe(expected);
            });

        it('returns an empty string when the paths array is empty', () => {
            const paths = [];

            expect( path.commonPrefix(paths) ).toBe('');
        });

        // skip on Windows, since the paths share a drive letter at the start
        if (!isWindows) {
            it('returns an empty string when there is no common prefix', () => {
                const paths = [
                    path.join('foo', 'bar', 'baz', 'qux.js'),
                    path.join('..', '..', 'Library', 'foo', 'bar', 'baz.js')
                ];

                expect( path.commonPrefix(paths) ).toBe('');
            });
        }

        // only test Windows paths on Windows
        if (isWindows) {
            it('works with Windows paths that contain spaces', () => {
                const prefix = 'C:\\Users\\Jane Smith\\myproject\\';
                const paths = [
                    `${prefix}index.js`,
                    `${prefix}lib\\mymodule.js`
                ];

                expect( path.commonPrefix(paths) ).toBe(prefix);
            });
        }
    });
});

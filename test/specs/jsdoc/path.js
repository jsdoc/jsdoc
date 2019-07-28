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

    it('should export a "getResourcePath" function', () => {
        expect(path.getResourcePath).toBeFunction();
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

    describe('getResourcePath', () => {
        let oldConf;
        let oldPwd;

        beforeEach(() => {
            oldConf = env.opts.configure;
            oldPwd = env.pwd;

            env.opts.configure = path.join(env.dirname, 'lib', 'conf.json');
            env.pwd = __dirname;
        });

        afterEach(() => {
            env.opts.configure = oldConf;
            env.pwd = oldPwd;
        });

        it('resolves pwd-relative path that exists', () => {
            const resolved = path.getResourcePath('doclet');

            expect(resolved).toBe( path.join(__dirname, 'doclet.js') );
        });

        it('resolves relative to ./ path that exists', () => {
            // `path.join` discards the `.`, so we join with `path.sep` instead
            const p = ['.', 'util'].join(path.sep);
            const resolved = path.getResourcePath(p);

            expect(resolved).toBe( path.join(__dirname, 'util') );
        });

        it('resolves relative to ../ path that exists', () => {
            const p = path.join('..', 'jsdoc', 'util');
            const resolved = path.getResourcePath(p);

            expect(resolved).toBe( path.join(__dirname, 'util') );
        });

        it('resolves path using node_modules/', () => {
            const resolved = path.getResourcePath('node_modules', 'catharsis');

            expect(resolved).toBe( path.join(env.dirname, 'node_modules', 'catharsis') );
        });

        it('resolves paths relative to the configuration file\'s path', () => {
            const resolved = path.getResourcePath('jsdoc');

            expect(resolved).toBe( path.join(env.dirname, 'lib', 'jsdoc') );
        });

        it('resolves paths relative to the JSDoc path', () => {
            const resolved = path.getResourcePath( path.join('lib', 'jsdoc') );

            expect(resolved).toBe( path.join(env.dirname, 'lib', 'jsdoc') );
        });

        it('resolves installed module', () => {
            const resolved = path.getResourcePath('catharsis');

            expect(resolved).toBe( path.join(env.dirname, 'node_modules', 'catharsis',
                'catharsis.js') );
        });

        it('fails to find a relative path that does not exist', () => {
            const resolved = path.getResourcePath('foo');

            expect(resolved).toBeNull();
        });

        it('finds an absolute path that does exist', () => {
            const p = path.join(env.dirname, 'lib');
            const resolved = path.getResourcePath(p);

            expect(resolved).toBe(p);
        });

        it('fails to find an absolute path that does not exist', () => {
            const resolved = path.getResourcePath( path.join(env.dirname, 'foo') );

            expect(resolved).toBeNull();
        });
    });
});

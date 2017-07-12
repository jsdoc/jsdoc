'use strict';

describe('jsdoc/path', function() {
    var env = require('jsdoc/env');
    var os = require('os');
    var path = require('jsdoc/path');
    var standardPath = require('path');

    var isWindows = /^win/.test( os.platform() );

    it('should exist', function() {
        expect(path).toBeDefined();
        expect(typeof path).toEqual('object');
    });

    it('should export all functions in the "path" module', function() {
        Object.keys(standardPath).forEach(function(item) {
            if (typeof standardPath[item] === 'function') {
                expect(path[item]).toBeDefined();
                expect(typeof path[item]).toEqual('function');
            }
        });
    });

    it('should export a "commonPrefix" function', function() {
        expect(path.commonPrefix).toBeDefined();
        expect(typeof path.commonPrefix).toEqual('function');
    });

    it('should export a "getResourcePath" function', function() {
        expect(path.getResourcePath).toBeDefined();
        expect(typeof path.getResourcePath).toEqual('function');
    });

    describe('commonPrefix', function() {
        var oldPwd;
        var cwd;

        beforeEach(function() {
            oldPwd = env.pwd;
            env.pwd = isWindows ? 'C:\\Users\\jsdoc' : '/Users/jsdoc';
            cwd = env.pwd.split(path.sep);
        });

        afterEach(function() {
            env.pwd = oldPwd;
        });

        it('finds the correct prefix for a single relative path', function() {
            var paths = [path.join('foo', 'bar', 'baz', 'qux.js')];
            // we expect a trailing slash
            var expected = cwd.concat('foo', 'bar', 'baz', '').join(path.sep);

            expect( path.commonPrefix(paths) ).toBe(expected);
        });

        it('finds the correct prefix for a group of relative paths', function() {
            var paths = [
                path.join('foo', 'bar', 'baz', 'qux.js'),
                path.join('foo', 'bar', 'baz', 'quux.js'),
                path.join('foo', 'bar', 'baz.js')
            ];
            // we expect a trailing slash
            var expected = cwd.concat('foo', 'bar', '').join(path.sep);

            expect( path.commonPrefix(paths) ).toEqual(expected);
        });

        it('finds the correct prefix for a single absolute path', function() {
            var paths = [cwd.concat('foo', 'bar', 'baz', 'qux.js').join(path.sep)];
            // we expect a trailing slash
            var expected = cwd.concat('foo', 'bar', 'baz', '').join(path.sep);

            expect( path.commonPrefix(paths) ).toBe(expected);
        });

        it('finds the correct prefix for a group of absolute paths', function() {
            var paths = [
                cwd.concat('foo', 'bar', 'baz', 'qux.js').join(path.sep),
                cwd.concat('foo', 'bar', 'baz', 'quux.js').join(path.sep),
                cwd.concat('foo', 'bar', 'baz.js').join(path.sep)
            ];
            // we expect a trailing slash
            var expected = cwd.concat('foo', 'bar', '').join(path.sep);

            expect( path.commonPrefix(paths) ).toEqual(expected);
        });

        it('finds the correct prefix for a group of absolute paths and dotted relative paths',
            function() {
                var paths = [
                    path.join('..', 'jsdoc', 'foo', 'bar', 'baz', 'qux', 'quux', 'test.js'),
                    cwd.concat('foo', 'bar', 'bazzy.js').join(path.sep),
                    path.join('..', '..', 'Users', 'jsdoc', 'foo', 'bar', 'foobar.js')
                ];
                // we expect a trailing slash
                var expected = cwd.concat('foo', 'bar', '').join(path.sep);

                expect( path.commonPrefix(paths) ).toEqual(expected);
            });

        it('returns an empty string when the paths array is empty', function() {
            var paths = [];

            expect( path.commonPrefix(paths) ).toBe('');
        });

        // skip on Windows, since the paths share a drive letter at the start
        if (!isWindows) {
            it('returns an empty string when there is no common prefix', function() {
                var paths = [
                    path.join('foo', 'bar', 'baz', 'qux.js'),
                    path.join('..', '..', 'Library', 'foo', 'bar', 'baz.js')
                ];

                expect( path.commonPrefix(paths) ).toEqual('');
            });
        }

        // only test Windows paths on Windows
        if (isWindows) {
            it('works with Windows paths that contain spaces', function() {
                var prefix = 'C:\\Users\\Jane Smith\\myproject\\';
                var paths = [
                    prefix + 'index.js',
                    prefix + 'lib\\mymodule.js'
                ];

                expect( path.commonPrefix(paths) ).toBe(prefix);
            });
        }
    });

    describe('getResourcePath', function() {
        var oldConf;
        var oldPwd;

        beforeEach(function() {
            oldConf = env.opts.configure;
            oldPwd = env.pwd;

            env.opts.configure = path.join(env.dirname, 'lib', 'conf.json');
            env.pwd = __dirname;
        });

        afterEach(function() {
            env.opts.configure = oldConf;
            env.pwd = oldPwd;
        });

        it('resolves pwd-relative path that exists', function() {
            var resolved = path.getResourcePath('doclet');

            expect(resolved).toBe( path.join(__dirname, 'doclet.js') );
        });

        it('resolves relative to ./ path that exists', function() {
            // `path.join` discards the `.`, so we join with `path.sep` instead
            var p = ['.', 'util'].join(path.sep);
            var resolved = path.getResourcePath(p);

            expect(resolved).toBe( path.join(__dirname, 'util') );
        });

        it('resolves relative to ../ path that exists', function() {
            var p = path.join('..', 'jsdoc', 'util');
            var resolved = path.getResourcePath(p);

            expect(resolved).toBe( path.join(__dirname, 'util') );
        });

        it('resolves path using node_modules/', function() {
            var resolved = path.getResourcePath('node_modules', 'catharsis');

            expect(resolved).toBe( path.join(env.dirname, 'node_modules', 'catharsis') );
        });

        it('resolves paths relative to the configuration file\'s path', function() {
            var resolved = path.getResourcePath('jsdoc');

            expect(resolved).toBe( path.join(env.dirname, 'lib', 'jsdoc') );
        });

        it('resolves paths relative to the JSDoc path', function() {
            var resolved = path.getResourcePath( path.join('lib', 'jsdoc') );

            expect(resolved).toBe( path.join(env.dirname, 'lib', 'jsdoc') );
        });

        it('resolves installed module', function() {
            var resolved = path.getResourcePath('catharsis');

            expect(resolved).toBe( path.join(env.dirname, 'node_modules', 'catharsis',
                'catharsis.js') );
        });

        it('fails to find a relative path that does not exist', function() {
            var resolved = path.getResourcePath('foo');

            expect(resolved).toBeNull();
        });

        it('finds an absolute path that does exist', function() {
            var p = path.join(env.dirname, 'lib');
            var resolved = path.getResourcePath(p);

            expect(resolved).toBe(p);
        });

        it('fails to find an absolute path that does not exist', function() {
            var resolved = path.getResourcePath( path.join(env.dirname, 'foo') );

            expect(resolved).toBeNull();
        });
    });
});

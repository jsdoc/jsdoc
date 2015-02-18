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

    xdescribe('getResourcePath', function() {
        // TODO
    });
});

/*global beforeEach: true, describe: true, expect: true, it: true, spyOn: true, xdescribe: true */

describe('jsdoc/path', function() {
    var os = require('os');
    var path = require('jsdoc/path');
    var standardPath = require('path');

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
        beforeEach(function() {
            spyOn(process, 'cwd').andCallFake(function() {
                return os.platform().match(/^win/) ? 'C:\\Users\\jsdoc' : '/Users/jsdoc';
            });
        });

        it('finds the correct prefix for a group of relative paths', function() {
            var cwd = process.cwd().split(path.sep);
            var paths = [
                path.join('foo', 'bar', 'baz', 'qux.js'),
                path.join('foo', 'bar', 'baz', 'quux.js'),
                path.join('foo', 'bar', 'baz.js')
            ];
            // we expect a trailing slash
            var expected = cwd.concat('foo', 'bar', '').join(path.sep);

            expect( path.commonPrefix(paths) ).toEqual(expected);
        });

        it('finds the correct prefix for a group of absolute paths', function() {
            var cwd = process.cwd().split(path.sep);
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
            var cwd = process.cwd().split(path.sep);
            var paths = [
                path.join('..', 'jsdoc', 'foo', 'bar', 'baz', 'qux', 'quux', 'test.js'),
                cwd.concat('foo', 'bar', 'bazzy.js').join(path.sep),
                path.join('..', '..', 'Users', 'jsdoc', 'foo', 'bar', 'foobar.js')
            ];
            // we expect a trailing slash
            var expected = cwd.concat('foo', 'bar', '').join(path.sep);

            expect( path.commonPrefix(paths) ).toEqual(expected);
        });

        it('returns an empty string when there is no common prefix', function() {
            // skip on Windows, since the paths share a drive letter at the start
            if ( !os.platform().match(/^win/) ) {
                var paths = [
                    path.join('foo', 'bar', 'baz', 'qux.js'),
                    path.join('..', '..', 'Library', 'foo', 'bar', 'baz.js')
                ];

                expect( path.commonPrefix(paths) ).toEqual('');
            }
        });
    });

    xdescribe('getResourcePath', function() {
        // TODO
    });
});

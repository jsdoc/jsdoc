'use strict';

describe('jsdoc/fs', function() {
    var fs = require('jsdoc/fs');
    var filter = require('jsdoc/src/filter');
    var env = require('jsdoc/env');
    var path = require('path');

    function ls() {
        return fs.ls.apply(fs, arguments).map(function(file) {
            return path.relative(env.pwd, file);
        });
    }

    it('should exist', function() {
        expect(fs).toBeDefined();
        expect(typeof fs).toBe('object');
    });

    it('should export a ls function', function() {
        expect(fs.ls).toBeDefined();
        expect(typeof fs.ls).toBe('function');
    });

    describe('ls', function() {
        it('should list files without recursing into directories', function() {
            var files = ls(env.pwd);

            files.forEach(function(file) {
                expect(file).not.toContain(path.sep);
            });
        });

        it('should list files and recurse into directories', function() {
            var recurseDepth = 3;
            var files = ls(env.pwd, recurseDepth);
            var regExp = new RegExp(path.sep, 'g');

            files.forEach(function(file) {
                var matches = file.match(regExp);

                if (matches) {
                    expect(matches.length).toBeLessThan(recurseDepth);
                }
            });
        });

        it('should list files and recurse into directories using filter', function() {
            var myFilter = new filter.Filter({
                excludePattern: new RegExp('node_modules')
            });
            var files = ls(env.pwd, 10, myFilter);

            files.forEach(function(file) {
                expect(file).not.toContain('node_modules');
            });
        });
    });
});

'use strict';

describe('jsdoc/src/scanner', function() {
    var env = require('jsdoc/env');
    var path = require('jsdoc/path');
    var scanner = require('jsdoc/src/scanner');

    var filter = new (require('jsdoc/src/filter').Filter)({
        includePattern: new RegExp('.+\\.js(doc)?$'),
        excludePattern: new RegExp('(^|\\/|\\\\)_')
    });
    var sourcePath = path.normalize(env.pwd + '/test/fixtures/src');

    it('should exist', function() {
        expect(scanner).toBeDefined();
        expect(typeof scanner).toBe('object');
    });

    it('should export a "Scanner" class', function() {
        expect(scanner.Scanner).toBeDefined();
        expect(typeof scanner.Scanner).toBe('function');
    });

    describe('Scanner', function() {
        it('should inherit from EventEmitter', function() {
            var EventEmitter = require('events').EventEmitter;
            var testScanner = new scanner.Scanner();

            expect(testScanner instanceof EventEmitter).toBe(true);
        });

        it('should have a "scan" method', function() {
            var testScanner = new scanner.Scanner();

            expect(testScanner.scan).toBeDefined();
            expect(typeof testScanner.scan).toBe('function');
        });

        describe('scan', function() {
            it('should return the correct source files', function() {
                var testScanner = new scanner.Scanner();
                var sourceFiles = testScanner.scan([sourcePath], 3, filter);

                sourceFiles = sourceFiles.map(function($) {
                    return path.relative(env.pwd, $);
                });

                expect(sourceFiles.length).toEqual(3);
                expect( sourceFiles.indexOf(path.join('test', 'fixtures', 'src', 'one.js')) )
                    .toBeGreaterThan(-1);
                expect( sourceFiles.indexOf(path.join('test', 'fixtures', 'src', 'two.js')) )
                    .toBeGreaterThan(-1);
                expect( sourceFiles.indexOf(path.join('test', 'fixtures', 'src', 'dir1', 'three.js')) )
                    .toBeGreaterThan(-1);
            });
        });
    });
});

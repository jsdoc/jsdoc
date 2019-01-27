describe('jsdoc/src/scanner', () => {
    const env = require('jsdoc/env');
    const path = require('path');
    const scanner = require('jsdoc/src/scanner');

    const filter = new (require('jsdoc/src/filter').Filter)({
        includePattern: new RegExp('.+\\.js(doc)?$'),
        excludePattern: new RegExp('(^|\\/|\\\\)_')
    });
    const sourcePath = path.normalize(`${env.pwd}/test/fixtures/src`);

    it('should exist', () => {
        expect(scanner).toBeDefined();
        expect(typeof scanner).toBe('object');
    });

    it('should export a "Scanner" class', () => {
        expect(scanner.Scanner).toBeDefined();
        expect(typeof scanner.Scanner).toBe('function');
    });

    describe('Scanner', () => {
        it('should inherit from EventEmitter', () => {
            const EventEmitter = require('events').EventEmitter;
            const testScanner = new scanner.Scanner();

            expect(testScanner instanceof EventEmitter).toBe(true);
        });

        it('should have a "scan" method', () => {
            const testScanner = new scanner.Scanner();

            expect(testScanner.scan).toBeDefined();
            expect(typeof testScanner.scan).toBe('function');
        });

        describe('scan', () => {
            it('should return the correct source files', () => {
                const testScanner = new scanner.Scanner();
                let sourceFiles = testScanner.scan([sourcePath], 3, filter);

                sourceFiles = sourceFiles.map($ => path.relative(env.pwd, $));

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

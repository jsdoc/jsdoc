describe('jsdoc/src/scanner', () => {
    const env = require('jsdoc/env');
    const path = require('jsdoc/path');
    const scanner = require('jsdoc/src/scanner');

    const filter = new (require('jsdoc/src/filter').Filter)({
        includePattern: new RegExp('.+\\.js(doc)?$'),
        excludePattern: new RegExp('(^|\\/|\\\\)_')
    });
    const sourcePath = path.normalize(`${env.pwd}/test/fixtures/src`);

    it('should exist', () => {
        expect(scanner).toBeObject();
    });

    it('should export a "Scanner" class', () => {
        expect(scanner.Scanner).toBeFunction();
    });

    describe('Scanner', () => {
        it('should inherit from EventEmitter', () => {
            const { EventEmitter } = require('events');
            const testScanner = new scanner.Scanner();

            expect(testScanner instanceof EventEmitter).toBeTrue();
        });

        it('should have a "scan" method', () => {
            const testScanner = new scanner.Scanner();

            expect(testScanner.scan).toBeFunction();
        });

        describe('scan', () => {
            it('should return the correct source files', () => {
                const testScanner = new scanner.Scanner();
                let sourceFiles = testScanner.scan([sourcePath], 3, filter);

                sourceFiles = sourceFiles.map($ => path.relative(env.pwd, $));

                expect(sourceFiles).toBeArrayOfSize(3);
                expect( sourceFiles.includes(path.join('test', 'fixtures', 'src', 'one.js')) )
                    .toBeTrue();
                expect( sourceFiles.includes(path.join('test', 'fixtures', 'src', 'two.js')) )
                    .toBeTrue();
                expect( sourceFiles.includes(path.join('test', 'fixtures', 'src', 'dir1', 'three.js')) )
                    .toBeTrue();
            });
        });
    });
});

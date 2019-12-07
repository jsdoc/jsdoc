describe('jsdoc/src/scanner', () => {
    const path = require('path');
    const scanner = require('jsdoc/src/scanner');

    const filter = new (require('jsdoc/src/filter').Filter)({
        includePattern: /.+\.js(doc)?$/,
        excludePattern: /(^|\/|\\)_/
    });
    const sourcePath = path.normalize(`${__dirname}/../../../fixtures/src`);

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
                const parentPath = path.normalize(`${__dirname}/../../../..`);
                let sourceFiles = testScanner.scan([sourcePath], 3, filter);

                sourceFiles = sourceFiles.map($ => path.relative(parentPath, $));

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

describe('@jsdoc/util/lib/fs', () => {
    const mockFs = require('mock-fs');
    const fsUtil = require('../../../lib/fs');
    const path = require('path');

    afterEach(() => mockFs.restore());

    it('has an lsSync method', () => {
        expect(fsUtil.lsSync).toBeFunction();
    });

    describe('lsSync', () => {
        beforeEach(() => {
            mockFs({
                head: {
                    eyes: '',
                    ears: '',
                    mouth: '',
                    nose: '',
                    shoulders: {
                        knees: {
                            meniscus: '',
                            toes: {
                                phalanx: '',
                                '.big-toe-phalanx': ''
                            }
                        }
                    }
                }
            });
        });

        const cwd = process.cwd();

        function resolvePaths(files) {
            return files.map(f => path.join(cwd, f)).sort();
        }

        const allFiles = resolvePaths([
            'head/eyes',
            'head/ears',
            'head/mouth',
            'head/nose',
            'head/shoulders/knees/meniscus',
            'head/shoulders/knees/toes/phalanx'
        ]);

        it('gets all non-hidden files from all levels by default', () => {
            const files = fsUtil.lsSync(cwd).sort();

            expect(files).toEqual(allFiles);
        });

        it('limits recursion depth when asked', () => {
            const files = fsUtil.lsSync(cwd, { depth: 1 }).sort();

            expect(files).toEqual(resolvePaths([
                'head/eyes',
                'head/ears',
                'head/mouth',
                'head/nose'
            ]));
        });

        it('treats a depth of -1 as infinite', () => {
            const files = fsUtil.lsSync('head', { depth: -1 }).sort();

            expect(files).toEqual(allFiles);
        });
    });
});

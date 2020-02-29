describe('@override tag', () => {
    const env = require('jsdoc/env');

    const allowUnknownTags = Boolean(env.conf.tags.allowUnknownTags);

    function ignored({ignore}) {
        return ignore !== true;
    }

    beforeEach(() => {
        env.conf.tags.allowUnknownTags = false;
    });

    afterEach(() => {
        jsdoc.restoreTagDictionary();
        env.conf.tags.allowUnknownTags = allowUnknownTags;
    });

    describe('JSDoc tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('jsdoc');
        });

        it('should not recognize the @override tag', () => {
            function getDocSet() {
                jsdoc.getDocSetFromFile('test/fixtures/overridetag.js');
            }

            expect(jsdoc.didLog(getDocSet, 'error')).toBeTrue();
        });
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('closure');
        });

        describe('classes', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/overridetag.js');

            it('should cause the symbol to be documented', () => {
                const open = docSet.getByLongname('Socket#open');

                expect(open).toBeArrayOfSize(2);
                expect(open[0].ignore).toBeTrue();
                expect(open[1].ignore).toBeUndefined();
                expect(open[1].description).toBe('Open the connection.');
            });

            it('should use any other tags that are defined', () => {
                const close = docSet.getByLongname('Socket#close').filter(ignored)[0];

                expect(close.description).toBe('Close the socket.');
                expect(close.params).toBeArrayOfSize(1);
            });

            it('should not say that the child symbol is abstract', () => {
                const open = docSet.getByLongname('Socket#open').filter(ignored)[0];
                const parentOpen = docSet.getByLongname('Connection#open')[0];

                expect(parentOpen.virtual).toBeTrue();
                expect(open.virtual).toBeUndefined();
            });

            it('should work with class members whose names are specified in the comment', () => {
                const connectionRead = docSet.getByLongname('Connection#read').filter(ignored)[0];
                const socketRead = docSet.getByLongname('Socket#read').filter(ignored)[0];

                expect(socketRead).toBeObject();
                expect(socketRead.description).toBe(connectionRead.description);
            });
        });

        describe('interfaces', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/overridetag2.js');

            it('should cause the symbol to be documented', () => {
                const open = docSet.getByLongname('Socket#open').filter(ignored);

                expect(open).toBeArrayOfSize(1);
                expect(open[0].description).toBe('Open the connection.');
            });

            it('should use any other tags that are defined', () => {
                const close = docSet.getByLongname('Socket#close').filter(ignored)[0];

                expect(close.description).toBe('Close the socket.');
                expect(close.params).toBeArrayOfSize(1);
            });

            it('should work with interface members whose names are specified in the comment',
                () => {
                    const connectionRead = docSet.getByLongname('Connection#read').filter(ignored)[0];
                    const socketRead = docSet.getByLongname('Socket#read').filter(ignored)[0];

                    expect(socketRead).toBeObject();
                    expect(socketRead.description).toBe(connectionRead.description);
                });
        });
    });
});

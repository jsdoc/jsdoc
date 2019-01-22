/* global jsdoc */
describe('@override tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/overridetag.js');
    const docSet2 = jsdoc.getDocSetFromFile('test/fixtures/overridetag2.js');

    function ignored({ignore}) {
        return ignore !== true;
    }

    xit('should only be available if the Closure dictionary is enabled', () => {
        // TODO
    });

    describe('classes', () => {
        it('should cause the symbol to be documented', () => {
            const open = docSet.getByLongname('Socket#open');

            expect(open.length).toBe(2);
            expect(open[0].ignore).toBe(true);
            expect(open[1].ignore).not.toBeDefined();
            expect(open[1].description).toBe('Open the connection.');
        });

        it('should use any other tags that are defined', () => {
            const close = docSet.getByLongname('Socket#close').filter(ignored)[0];

            expect(close.description).toBe('Close the socket.');
            expect(close.params).toBeDefined();
            expect(close.params.length).toBe(1);
        });

        it('should not say that the child symbol is abstract', () => {
            const open = docSet.getByLongname('Socket#open').filter(ignored)[0];
            const parentOpen = docSet.getByLongname('Connection#open')[0];

            expect(parentOpen.virtual).toBe(true);
            expect(open.virtual).not.toBeDefined();
        });

        it('should work with class members whose names are specified in the comment', () => {
            const connectionRead = docSet.getByLongname('Connection#read').filter(ignored)[0];
            const socketRead = docSet.getByLongname('Socket#read').filter(ignored)[0];

            expect(socketRead).toBeDefined();
            expect(socketRead.description).toBe(connectionRead.description);
        });
    });

    describe('interfaces', () => {
        it('should cause the symbol to be documented', () => {
            const open = docSet2.getByLongname('Socket#open').filter(ignored);

            expect(open.length).toBe(1);
            expect(open[0].description).toBe('Open the connection.');
        });

        it('should use any other tags that are defined', () => {
            const close = docSet2.getByLongname('Socket#close').filter(ignored)[0];

            expect(close.description).toBe('Close the socket.');
            expect(close.params).toBeDefined();
            expect(close.params.length).toBe(1);
        });

        it('should work with interface members whose names are specified in the comment',
            () => {
                const connectionRead = docSet2.getByLongname('Connection#read').filter(ignored)[0];
                const socketRead = docSet2.getByLongname('Socket#read').filter(ignored)[0];

                expect(socketRead).toBeDefined();
                expect(socketRead.description).toBe(connectionRead.description);
            });
    });
});

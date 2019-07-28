describe('@inheritdoc tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/inheritdoctag.js');

    function ignored({ignore}) {
        return ignore !== true;
    }

    it('should cause the symbol to be documented', () => {
        const open = docSet.getByLongname('Socket#open');

        expect(open).toBeArrayOfSize(2);
        expect(open[0].ignore).toBeTrue();
        expect(open[1].ignore).toBeUndefined();
        expect(open[1].description).toBe('Open the connection.');
    });

    it('should cause all other tags to be ignored', () => {
        const close = docSet.getByLongname('Socket#close').filter(ignored)[0];

        expect(close.description).toBe('Close the connection.');
        expect(close.params).toBeUndefined();
    });

    it('should not say that the child symbol is abstract', () => {
        const open = docSet.getByLongname('Socket#open').filter(ignored)[0];
        const parentOpen = docSet.getByLongname('Connection#open')[0];

        expect(parentOpen.virtual).toBeTrue();
        expect(open.virtual).toBeUndefined();
    });

    it('should work with interface members whose names are specified in the comment', () => {
        const connectionRead = docSet.getByLongname('Connection#read').filter(ignored)[0];
        const socketRead = docSet.getByLongname('Socket#read').filter(ignored)[0];

        expect(socketRead).toBeObject();
        expect(socketRead.description).toBe(connectionRead.description);
    });
});

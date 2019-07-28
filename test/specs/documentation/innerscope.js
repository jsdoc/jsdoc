describe('inner scope', () => {
    describe('Outer~inner.member cases', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/innerscope.js');
        const to = docSet.getByLongname('Message~headers.to');
        const from = docSet.getByLongname('Message~headers.from');
        const response = docSet.getByLongname('Message~response.code');

        it('should occur when a member of a var member is documented.', () => {
            expect(to).toBeArrayOfSize(1);
        });

        it('should occur when a second member of a var member is documented.', () => {
            expect(response).toBeArrayOfSize(1);
        });

        it('should occur when a deeply nested member of a var member is documented.', () => {
            expect(from).toBeArrayOfSize(1);
        });
    });

    describe('other cases', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/innerscope2.js');
        const from = docSet.getByLongname('<anonymous>~headers.from');
        const cache = docSet.getByLongname('<anonymous>~headers.cache');

        it('When a var is declared in a function, It is like Inner~member', () => {
            expect(cache).toBeArrayOfSize(1);
        });

        it('When a var is masked by an inner var and a member of the inner is documented, it is like Inner~inner.member', () => {
            expect(from).toBeArrayOfSize(1);
        });

        it('When a documented member is assigned to a var that masks an outer var.', () => {
            expect(from[0].name).toBe('from');
            expect(from[0].memberof).toBe('<anonymous>~headers');
        });
    });
});

describe('const declarations', () => {
    it('should automatically set the doclet.kind to "constant" for const declarations', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/constanttag.js');
        const myPocket = docSet.getByLongname('myPocket')[0];

        expect(myPocket.kind).toBe('constant');
    });

    describe('ES 2015 only', () => {
        it('should not override kind="class" when a const is autodetected', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/constanttag2.js');
            const foo = docSet.getByLongname('Foo')[0];

            expect(foo.kind).toBe('class');
        });
    });
});

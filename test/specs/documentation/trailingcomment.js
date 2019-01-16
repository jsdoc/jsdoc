describe('trailing comment', () => {
    it('should not ignore trailing comments in a non-empty source file with a `use strict` ' +
        'declaration', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/trailingcomment.js');
        const foo = docSet.getByLongname('external:foo');

        expect(foo.length).toBe(1);
    });

    it('should not ignore trailing comments in an empty source file with a `use strict` ' +
        'declaration', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/trailingcomment2.js');
        const foo = docSet.getByLongname('external:foo');

        expect(foo.length).toBe(1);
    });
});

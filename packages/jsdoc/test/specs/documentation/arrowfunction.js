describe('arrow functions', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/arrowfunction.js');
    const increment = docSet.getByLongname('increment')[0];
    const print = docSet.getByLongname('print')[0];
    const name = docSet.getByLongname('<anonymous>#name');

    it('should use the correct name and longname', () => {
        expect(increment).toBeObject();
        expect(increment.name).toBe('increment');
    });

    it('should allow function parameters to be documented', () => {
        expect(increment.params).toBeArrayOfSize(1);
        expect(increment.params[0].name).toBe('n');
    });

    it('should support inline comments on parameters', () => {
        expect(print.params).toBeArrayOfSize(1);
        expect(print.params[0].type.names[0]).toBe('*');
    });

    // TODO: we currently use the wrong longname in this case; see
    // `module:@jsdoc/parse.astNode.nodeToValue` and the comment on `case Syntax.MethodDefinition`
    // for details
    xit('should use the correct longname for members of a class returned by an arrow function',
        () => {
            expect(name).toBeArrayOfSize(2);
        });
});

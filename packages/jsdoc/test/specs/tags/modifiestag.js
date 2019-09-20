describe('@modifies tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/modifiestag.js');
    const mutator = docSet.getByLongname('mutator')[0];

    it('should add the specified types to the doclet\'s `modifies` property', () => {
        expect(mutator.modifies).toBeArrayOfSize(1);
        expect(mutator.modifies[0].type).toBeObject();
        expect(mutator.modifies[0].type.names).toBeArrayOfSize(2);
        expect(mutator.modifies[0].type.names[0]).toBe('foo');
        expect(mutator.modifies[0].type.names[1]).toBe('bar');
    });
});

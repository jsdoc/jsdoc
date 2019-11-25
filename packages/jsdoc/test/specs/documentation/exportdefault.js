describe('export default', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/exportdefault.js');
    const member = docSet.getByLongname('module:test')[1];

    it('should use the correct kind and description for the default export', () => {
        expect(member.kind).toBe('member');
        expect(member.description).toBe('Test value');
    });
});

describe('object keys', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/objectkeys.js');

    it('should assign the correct longname and memberof to object keys after the first key', () => {
        const bar = docSet.getByLongname('myObject.bar')[0];

        expect(bar).toBeObject();
        expect(bar.memberof).toBe('myObject');
    });
});

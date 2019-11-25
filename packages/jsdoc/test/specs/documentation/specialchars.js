describe('longnames with special characters', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/specialchars.js');
    const portNumber = docSet.getByLongname('Socket#\'port#number\'')[0];
    const open = docSet.getByLongname('Socket#\'open~a.connection#now\'')[0];

    it('should use the correct longname for instance members of "this" whose names contain ' +
        'scope punctuation', () => {
        expect(portNumber).toBeObject();
    });

    it('should use the correct longname for instance members of the prototype whose names ' +
        'contain scope punctuation', () => {
        expect(open).toBeObject();
    });
});

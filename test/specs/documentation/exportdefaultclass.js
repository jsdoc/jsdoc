describe('export default class', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/exportdefaultclass.js');
    const klass = docSet.getByLongname('module:test').filter(({undocumented}) => !undocumented)[1];

    it('should combine the classdesc and constructor description into a single doclet', () => {
        expect(klass.classdesc).toBe('Test class');
        expect(klass.description).toBe('Test constructor');
    });
});

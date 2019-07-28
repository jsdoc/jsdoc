describe('export class', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/exportclass.js');
    const bar = docSet.getByLongname('module:foo.Bar')[0];

    it('should name exported classes correctly', () => {
        expect(bar).toBeObject();
        expect(bar.name).toBe('Bar');
    });

    it('should merge the class description with the doclet for the class', () => {
        expect(bar.classdesc).toBe('Class description');
    });
});

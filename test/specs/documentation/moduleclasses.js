function filter({undocumented}) {
    return !undocumented;
}

describe('module classes', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduleclasses.js');
    const bar = docSet.getByLongname('module:foo~Bar').filter(filter)[0];
    const barBar = docSet.getByLongname('module:foo~Bar#bar')[0];
    const baz = docSet.getByLongname('module:foo.Baz').filter(filter)[0];
    const bazBaz = docSet.getByLongname('module:foo.Baz#baz')[0];

    describe('inner classes', () => {
        it('should merge the constructor doclet with the class doclet', () => {
            expect(bar.description).toBe('Construct a Bar.');
            expect(bar.classdesc).toBe('Bar class.');
        });

        it('should correctly mark the scope of instance properties', () => {
            expect(barBar.scope).toBe('instance');
        });
    });

    describe('exported classes', () => {
        it('should merge the constructor doclet with the class doclet', () => {
            expect(baz.description).toBe('Construct a Baz.');
            expect(baz.classdesc).toBe('Baz class.');
        });

        it('should correctly mark the scope of instance properties', () => {
            expect(bazBaz.scope).toBe('instance');
        });
    });
});

describe('anonymous class', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/anonymousclass.js');
    const klass = docSet.getByLongname('module:test').filter(({undocumented}) => !undocumented)[1];
    const foo = docSet.getByLongname('module:test#foo')[0];
    const klassTest = docSet.getByLongname('module:test#test')[0];
    const klassStaticTest = docSet.getByLongname('module:test.staticTest')[0];

    it('should merge the constructor docs with the class docs', () => {
        expect(klass.description).toBe('Test constructor');
    });

    it('should use the correct longname for instance properties', () => {
        expect(foo.description).toBe('Test member');
    });

    it('should use the correct longname for instance methods', () => {
        expect(klassTest.description).toBe('Test method');
    });

    it('should use the correct longname for static methods', () => {
        expect(klassStaticTest.description).toBe('Test static method');
    });
});

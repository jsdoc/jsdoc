describe('@yields tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/yieldstag.js');
    const fibonacci = docSet.getByLongname('fibonacci')[0];
    const fibonacci2 = docSet.getByLongname('fibonacci2')[0];
    const fibonacci3 = docSet.getByLongname('fibonacci3')[0];

    it('should add the type and description to the doclet\'s `yields` property', () => {
        expect(Array.isArray(fibonacci.yields)).toBe(true);
        expect(fibonacci.yields.length).toBe(1);
        expect(fibonacci.yields[0].type.names.join(', ')).toBe('number');
        expect(fibonacci.yields[0].description).toBe('The next number in the Fibonacci sequence.');
    });

    it('should work when only a description is present', () => {
        expect(Array.isArray(fibonacci2.yields)).toBe(true);
        expect(fibonacci2.yields.length).toBe(1);
        expect(fibonacci2.yields[0].type).not.toBeDefined();
        expect(fibonacci2.yields[0].description).toBe('The next number in the Fibonacci sequence.');
    });

    it('should work when only a type is present', () => {
        expect(Array.isArray(fibonacci3.yields)).toBe(true);
        expect(fibonacci3.yields.length).toBe(1);
        expect(fibonacci3.yields[0].type.names.join(', ')).toBe('number');
        expect(fibonacci3.yields[0].description).not.toBeDefined();
    });
});

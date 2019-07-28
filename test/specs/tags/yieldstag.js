describe('@yields tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/yieldstag.js');
    const fibonacci = docSet.getByLongname('fibonacci')[0];
    const fibonacci2 = docSet.getByLongname('fibonacci2')[0];
    const fibonacci3 = docSet.getByLongname('fibonacci3')[0];

    it('should add the type and description to the doclet\'s `yields` property', () => {
        expect(fibonacci.yields).toBeArrayOfSize(1);
        expect(fibonacci.yields[0].type.names.join(', ')).toBe('number');
        expect(fibonacci.yields[0].description).toBe('The next number in the Fibonacci sequence.');
    });

    it('should work when only a description is present', () => {
        expect(fibonacci2.yields).toBeArrayOfSize(1);
        expect(fibonacci2.yields[0].type).toBeUndefined();
        expect(fibonacci2.yields[0].description).toBe('The next number in the Fibonacci sequence.');
    });

    it('should work when only a type is present', () => {
        expect(fibonacci3.yields).toBeArrayOfSize(1);
        expect(fibonacci3.yields[0].type.names.join(', ')).toBe('number');
        expect(fibonacci3.yields[0].description).toBeUndefined();
    });
});

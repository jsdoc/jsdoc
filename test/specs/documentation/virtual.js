describe('virtual symbols', () => {
    describe('simple cases', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/virtual.js');
        const dimensions = docSet.getByLongname('dimensions');
        const width = docSet.getByLongname('width');

        it('should document virtual symbols', () => {
            expect(dimensions).toBeArrayOfSize(1);
        });

        it('should document an undocumented symbol found after a comment for a virtual symbol', () => {
            expect(width).toBeArrayOfSize(1);
        });
    });

    describe('complex cases', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/virtual2.js');
        const say = docSet.getByLongname('Person#say')[0];
        const sayCallback = docSet.getByLongname('Person~sayCallback')[0];

        it('should document virtual symbols inside an object literal', () => {
            expect(sayCallback).toBeObject();
            expect(sayCallback.undocumented).toBeUndefined();
        });

        it('should attach the comment to a documented symbol that follows a virtual symbol', () => {
            expect(say).toBeObject();
            expect(say.undocumented).toBeUndefined();
        });
    });

    describe('overloaded virtual symbols', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/virtual3.js');
        const constructors = docSet.getByLongname('module:connection');

        it('should create multiple doclets for overloaded virtual symbols', () => {
            expect(constructors).toBeArrayOfSize(2);
        });

        it('should use the correct signature for each virtual symbol', () => {
            expect(constructors[0]).toBeObject();
            expect(constructors[0].params).toBeArray();
            expect(constructors[0].params[0].name).toBe('name');

            expect(constructors[1]).toBeObject();
            expect(constructors[1].params).toBeUndefined();
        });
    });
});

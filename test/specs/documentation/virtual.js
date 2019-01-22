/* global jsdoc */
describe('virtual symbols', () => {
    describe('simple cases', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/virtual.js');
        const dimensions = docSet.getByLongname('dimensions');
        const width = docSet.getByLongname('width');

        it('should document virtual symbols', () => {
            expect(dimensions.length).toBe(1);
        });

        it('should document an undocumented symbol found after a comment for a virtual symbol', () => {
            expect(width.length).toBe(1);
        });
    });

    describe('complex cases', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/virtual2.js');
        const say = docSet.getByLongname('Person#say')[0];
        const sayCallback = docSet.getByLongname('Person~sayCallback')[0];

        it('should document virtual symbols inside an object literal', () => {
            expect(sayCallback).toBeDefined();
            expect(sayCallback.undocumented).not.toBeDefined();
        });

        it('should attach the comment to a documented symbol that follows a virtual symbol', () => {
            expect(say).toBeDefined();
            expect(say.undocumented).not.toBeDefined();
        });
    });

    describe('overloaded virtual symbols', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/virtual3.js');
        const constructors = docSet.getByLongname('module:connection');

        it('should create multiple doclets for overloaded virtual symbols', () => {
            expect(constructors).toBeDefined();
            expect(constructors.length).toBe(2);
        });

        it('should use the correct signature for each virtual symbol', () => {
            expect(constructors[0]).toBeDefined();
            expect(constructors[0].params).toBeDefined();
            expect(Array.isArray(constructors[0].params)).toBe(true);
            expect(constructors[0].params[0].name).toBe('name');

            expect(constructors[1]).toBeDefined();
            expect(constructors[1].params).not.toBeDefined();
        });
    });
});

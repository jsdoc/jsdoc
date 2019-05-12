describe('@implements tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/interface-implements.js');

    const myTester = docSet.getByLongname('MyTester')[0];
    const beforeEachMethod = docSet.getByLongname('MyTester#beforeEach')[0];
    const itMethod = docSet.getByLongname('MyTester#it').filter(({undocumented}) => !undocumented)[0];
    const processMethod = docSet.getByLongname('MyWorker#process')[0];

    it('MyTester has an "implements" array', () => {
        expect(Array.isArray(myTester.implements)).toBe(true);
        expect(myTester.implements.length).toBe(1);
        expect(myTester.implements[0]).toBe('ITester');
    });

    it('beforeEach has an "implements" array', () => {
        expect(Array.isArray(beforeEachMethod.implements)).toBe(true);
        expect(beforeEachMethod.implements.length).toBe(1);
        expect(beforeEachMethod.implements[0]).toBe('ITester#beforeEach');
    });

    it('MyTester#it inherits the docs from ITester#it', () => {
        expect(itMethod.description).toBe('it method.');
    });

    it('MyWorker\'s process() method does not implement an interface', () => {
        expect(processMethod.implements).toBeUndefined();
    });

    it('MyIncompleteWorker does not have any methods', () => {
        expect(docSet.getByLongname('MyIncompleteWorker#work').length).toBe(0);
    });
});

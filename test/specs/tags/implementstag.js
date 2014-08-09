describe('@interface tag', function() {
    var docSet = jasmine.getDocSetFromFile("test/fixtures/interface-implements.js");

    var foundMyTester = docSet.getByLongname('MyTester');
    var foundBeforeEachMethod = docSet.getByLongname('MyTester#beforeEach');

    var foundProcessMethod = docSet.getByLongname('MyWorker#process');

    it('MyTester has "implements" array property', function() {
        expect(Array.isArray(foundMyTester[0].implements)).toBeTruthy();
        expect(foundMyTester[0].implements.length).toBe(1);
        expect(foundMyTester[0].implements[0]).toEqual('ITester');
    });

    it('beforeEach has "implemented" and "implementMethod" property', function() {
        expect(foundBeforeEachMethod[0].implemented).toBeDefined();
        expect(foundBeforeEachMethod[0].implementMethod).toBeDefined();
    });

    it('MyWorker\'s process() method is not implemented', function() {
        expect(foundProcessMethod[0].implements).toBeUndefined();
    });



});
xdescribe('interface-implements suite', function() {
    var docSet = jasmine.getDocSetFromFile("test/fixtures/interface-implements.js");

    var foundMyTester = docSet.getByLongname('MyTester');
    var foundBeforeEachMethod = docSet.getByLongname('MyTester#beforeEach');

    it('MyTester has "implements" array property', function() {
        expect(Array.isArray(foundMyTester[0].implements)).toBeTruthy();
    });

    it('beforeEach has "implemented" and "implements" property', function() {
        expect(foundBeforeEachMethod[0].implemented).toBeDefined();
        expect(foundBeforeEachMethod[0].implemented).toBeTruthy();
        expect(foundBeforeEachMethod[0].implements).toBeDefined();
        expect(Array.isArray(foundMyTester[0].implements)).toBeTruthy();
    });

});
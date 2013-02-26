describe("@listens tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/listenstag.js'),
        doc = docSet.getByLongname('handler')[0];

    it("should create a 'listens' property on the doclet, an array, with the events that are listened to", function() {
        expect(Array.isArray(doc.listens)).toBeTruthy();
        expect(doc.listens.length).toBe(2);
        expect(doc.listens).toContain('event:Foo');
        expect(doc.listens).toContain('event:Bar');
    });
});

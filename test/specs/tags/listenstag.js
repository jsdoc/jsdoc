describe("@listens tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/listenstag.js'),
        doc = docSet.getByLongname('module:myModule~MyHandler')[0];

    it("should create a 'listens' property on the doclet, an array, with the events that are listened to (with event namespace)", function() {
        expect(Array.isArray(doc.listens)).toBeTruthy();
        expect(doc.listens).toContain('module:myModule.event:MyEvent');
        expect(doc.listens).toContain('module:myModule~Events.event:Event2');
    });

    it("includes events even if non-existent", function() {
        expect(doc.listens.length).toBe(3);
        expect(doc.listens).toContain('event:fakeEvent');
    });
});

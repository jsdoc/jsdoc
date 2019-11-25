describe('@listens tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/listenstag.js');
    const doc = docSet.getByLongname('module:myModule~MyHandler')[0];

    it("should create a 'listens' property on the doclet, an array, with the events that are listened to (with event namespace)", () => {
        expect(doc.listens).toBeArray();
        expect(doc.listens).toContain('module:myModule.event:MyEvent');
        expect(doc.listens).toContain('module:myModule~Events.event:Event2');
    });

    it('includes events that do not have their own documentation', () => {
        expect(doc.listens).toBeArrayOfSize(3);
        expect(doc.listens).toContain('event:fakeEvent');
    });
});

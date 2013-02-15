describe("@listens tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** An event handler\n@function handler\n@listens Foo\n@listens Bar */', {});

    it("should create a 'listens' property on the doclet, an array, with the events that are listened to", function() {
        expect(Array.isArray(doc.listens)).toBeTruthy();
        expect(doc.listens.length).toBe(2);
        expect(doc.listens).toContain('event:Foo');
        expect(doc.listens).toContain('event:Bar');
    });
});

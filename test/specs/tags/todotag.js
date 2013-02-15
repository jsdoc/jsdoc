describe("@todo tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @todo something\n@todo something else */', {});

    it("adds the entries into a 'todo' array on the doclet", function() {
        expect(doc.todo).toBeDefined();
        expect(Array.isArray(doc.todo)).toBeTruthy();
        expect(doc.todo.length).toBe(2);

        expect(doc.todo).toContain('something');
        expect(doc.todo).toContain('something else');
    });
});

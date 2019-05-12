describe('@todo tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/todotag.js');
    const doc = docSet.getByLongname('x')[0];

    it("adds the entries into a 'todo' array on the doclet", () => {
        expect(doc.todo).toBeDefined();
        expect(Array.isArray(doc.todo)).toBeTruthy();
        expect(doc.todo.length).toBe(2);

        expect(doc.todo).toContain('something');
        expect(doc.todo).toContain('something else');
    });
});

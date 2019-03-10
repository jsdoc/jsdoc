describe('inline comments', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/inlinecomment.js');
    const t = docSet.getByLongname('test');
    const t2 = docSet.getByLongname('test2');

    it('When there is an inline comment on a line ending with no semicolon, ' +
        'that comment and the next comment are still captured', () => {
        // Inline comment on line without semicolon is captured
        expect(t.length).toEqual(1);
        // Inline comment on line after line without semicolon is captured
        expect(t2.length).toEqual(1);
    });
});

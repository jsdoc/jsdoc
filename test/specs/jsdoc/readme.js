describe('jsdoc/readme', () => {
    const jsdoc = { readme: require('jsdoc/readme') };
    const Readme = jsdoc.readme;
    const html = (new Readme('test/fixtures/markdowntest.md')).html;

    it('should convert Markdown files to HTML', () => {
        expect(html).toBeDefined();
        expect(typeof html).toBe('string');
        expect(html).toContain('<code>');
        expect(html).toContain('<h2>');
        expect(html).toContain('<p>');
        expect(html).toContain('<li>');
    });
});

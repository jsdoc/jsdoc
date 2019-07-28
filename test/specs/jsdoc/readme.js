describe('jsdoc/readme', () => {
    const Readme = require('jsdoc/readme');
    const html = (new Readme('test/fixtures/markdowntest.md')).html;

    it('should convert Markdown files to HTML', () => {
        expect(html).toBeString();
        expect(html).toContain('<code>');
        expect(html).toContain('<h2>');
        expect(html).toContain('<p>');
        expect(html).toContain('<li>');
    });
});

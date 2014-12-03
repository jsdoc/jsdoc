'use strict';

describe('jsdoc/readme', function() {
    var jsdoc = { readme: require('jsdoc/readme') };
    var Readme = jsdoc.readme;
    var html = (new Readme('test/fixtures/markdowntest.md')).html;

    it('should convert Markdown files to HTML', function() {
        expect(html).toBeDefined();
        expect(typeof html).toBe('string');
        expect(html).toContain('<code>');
        expect(html).toContain('<h2>');
        expect(html).toContain('<p>');
        expect(html).toContain('<li>');
    });
});

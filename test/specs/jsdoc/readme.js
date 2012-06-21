describe("jsdoc/readme", function() {
    var jsdoc = {readme: require('jsdoc/readme') },
        html = (new jsdoc.readme('test/fixtures/markdowntest.md')).html;

    it("should parse html out of markdown", function() {
        expect(html).toBeDefined();
        expect(typeof html).toEqual("string");
        expect(html).toContain('<code>');
        expect(html).toContain('<h2>');
        expect(html).toContain('<p>');
        expect(html).toContain('<li>');
    });

});